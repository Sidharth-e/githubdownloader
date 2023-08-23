import React from 'react';
import './Header.css'; // Import the Header.css stylesheet
import logo from '../../assets/images/logo.svg'

function Header() {
  return (
    <header className="header">
      <img src={logo} alt='logo'/>
      <h1>GitHub Repository Downloader</h1>
    </header>
  );
}

export default Header;
