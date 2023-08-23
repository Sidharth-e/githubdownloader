import React from 'react';
import './Tutorial.css';
import step1 from '../../assets/images/step1.png';
import step2 from '../../assets/images/step2.png';
import step3 from '../../assets/images/step3.jpeg';

function Tutorial() {
  const steps = [
    {
      image: step1,
      step: "Copy a GitHub repository URL that you want to download.",
      explanation:
        "Start by copying the URL of the GitHub repository you wish to download. You can find this URL in your browser's address bar while you're on the repository page.",
    },
    {
      image: step2,
      step: `Paste the copied URL into the input box by clicking the "Paste" icon or manually entering it.`,
      explanation:
        "Next, paste the copied URL into the input box provided on the website. You can either click the \"Paste\" icon to automatically paste the URL from your clipboard, or you can manually type it in. You can also specify an optional branch name if you want to download a specific branch other than the default one.",
    },
    {
      image: step3,
      step: `Click the "Download" button to initiate the download process.`,
      explanation:
        "Once you've entered the repository URL, click the \"Download\" button. This action will trigger the website to fetch the repository information and display it on the page.",
    },
  ];

  return (
    <div className="tutorial">
      <h2>How to Use the Website</h2>
      <p>
        Welcome to the GitHub Repository Downloader! Follow these steps to use the website:
      </p>
      <div className="projects-grid">
        {steps.map((step, index) => (
          <div key={index} className="card">
            <img src={step.image} alt={step.step} className="gif" />
            <div className="info">
              <h3>{step.step}</h3>
              <p>{step.explanation}</p>
            </div>
          </div>
        ))}
      </div>
      <p>
        The website will fetch repository information, including description, stars, forks, and owner,
        and display them. It will also show recent commits if available. You can then download the
        repository as a ZIP file using the provided link.
      </p>
    </div>
  );
}

export default Tutorial;
