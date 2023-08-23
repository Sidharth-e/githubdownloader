import React from 'react';
import './Tutorial.css';
import step1 from '../../assets/images/step1.png'
import step2 from '../../assets/images/step2.png'
import step3 from '../../assets/images/step3.jpg'



function Tutorial() {
  const steps = [
    {
      image: step1,
      step: "Copy a GitHub repository URL that you want to download.",
    },
    {
      image: step2,
      step: `Paste the copied URL into the input box by clicking the "Paste" icon or manually entering it.`,
    },
    {
      image: step3,
      step: `Click the "Download" button to initiate the download process.`,
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
          <div
          key={index}
            className="card"
          >
            <img
              src={step.image}
              alt={step.step}
              className="gif"
            />
            <div className="info">
              <h3>{step.step}</h3>
              {/* <p>{project.description}</p> */}
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
