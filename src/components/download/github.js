import React, { useState, useRef } from "react";
import "./github.css";
import { FaPaste,FaFileZipper } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lotie from 'lottie-react';
import animationdata from '../../assets/animations/animation_llnjqm7j.json'

function App() {
  const [githubUrl, setGithubUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [repoInfo, setRepoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commits, setCommits] = useState([]);
  const inputRef = useRef(null); // Create a ref for the input element

  const handleGithubUrlChange = (event) => {
    setGithubUrl(event.target.value);
  };

  const handleDownload = () => {
    if (!githubUrl) {
      toast("Please provide a valid GitHub repository URL.");
      // alert("Please provide a valid GitHub repository URL.");
      return; // Don't proceed further if URL is empty
    }
    if (isValidGithubUrl(githubUrl)) {
      setLoading(true);
      const repoName = extractRepoName(githubUrl);
      const apiUrl = `https://api.github.com/repos/${repoName}`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error("Repository not found");
            }
            throw new Error("Error fetching repository information");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setRepoInfo(data);
          const zipDownloadLink = `https://github.com/${repoName}/archive/refs/heads/main.zip`;
          setDownloadLink(zipDownloadLink);
          fetch(`https://api.github.com/repos/${repoName}/commits`)
            .then((response) => response.json())
            .then((commitsData) => {
              setCommits(commitsData);
            })
            .catch((error) => {
              console.error("Error fetching commits:", error);
            });
        })
        .catch((error) => {
          if (error.message === "Repository not found") {
            setDownloadLink("");
            setRepoInfo(null);
            setCommits([]);
            toast(
              "Repository not found. Please provide a valid public repository URL."
            );
            // alert(
            //   "Repository not found. Please provide a valid public repository URL."
            // );
          } else {
            console.error("Error fetching repository information:", error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDownloadLink("");
      setRepoInfo(null);
      setCommits([]);
      toast(
        "Invalid GitHub URL. Please provide a valid public repository URL."
      );
      // alert(
      //   "Invalid GitHub URL. Please provide a valid public repository URL."
      // );
    }
  };

  const isValidGithubUrl = (url) => {
    return url.startsWith("https://github.com/");
  };

  const extractRepoName = (url) => {
    const parts = url.split("/");
    return `${parts[3]}/${parts[4]}`;
  };
  const handlePaste = async () => {
    // Access the clipboard content and paste it into the input
    try {
      const text = await navigator.clipboard.readText();
      setGithubUrl(text);
    } catch (error) {
      console.error("Error pasting from clipboard:", error);
    }
  };

  return (
    <>
        <div className="container">
      {/* <h1>GitHub Repository Downloader</h1> */}
      <div className="combo">
        <input
          type="text"
          ref={inputRef}
          value={githubUrl}
          onChange={handleGithubUrlChange}
          placeholder="Enter a GitHub repository URL"
        />
        <FaPaste style={{ marginRight: 5 }} onClick={handlePaste} />
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
    <div className="downloadbody">
    {loading ? (
        <p><Lotie style={{height:200}} animationData={animationdata}/></p>
      ) : (
        <>
        
        {downloadLink && repoInfo.owner && (
            <div className="download"> 
              <p>Ready to download the zip</p>
              <a href={downloadLink} download>
                <FaFileZipper size={0}/>
                <span>Download ZIP</span>
              </a>
            </div>
          )}
          {repoInfo && repoInfo.owner && (
            <div>
              <p>Description: {repoInfo.description}</p>
              <p>Stars: {repoInfo.stargazers_count}</p>
              <p>Forks: {repoInfo.forks_count}</p>
              <p>Owner: {repoInfo.owner.login}</p>
            </div>
          )}

          {commits.length > 0 && (
            <div >
              <h2>Recent Commits</h2>
              <ul className="commit">
                {commits.map((commit) => (
                  <li key={commit.sha}>{commit.commit.message}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      <ToastContainer autoClose={500} hideProgressBar={true} />
    </div>
    </>
  );
}

export default App;
