import React, {} from 'react'
import NotesContext from '../context/notes/NotesContext'
import './About.css';
export const About = () => {

  return (
    <div className="about-container">
      <div className="about-title">Welcome to INOTEBOOK!</div>
      <div className="about-text">
        NotesApp is your ultimate companion for organizing your thoughts, ideas, and tasks all in one place. 
        Whether you’re a student, professional, or creative, NotesApp helps you stay on top of things with ease.
      </div>
      
      <div className="about-features">
        <h3>Key Features:</h3>
        <ul>
          <li>Simple and Intuitive Interface: Easily create, edit, and organize your notes in a distraction-free environment.</li>
          <li>Categories and Tags: Group your notes by categories or tag them for quicker access.</li>
          <li>Search Functionality: Quickly find notes using the built-in search feature.</li>
          <li>Sync Across Devices: Access your notes from anywhere with automatic sync across all your devices.</li>
          <li>Secure and Private: Your notes are stored securely with end-to-end encryption, ensuring privacy and protection of your data.</li>
          <li>Rich Formatting: Style your notes with headings, lists, bullet points, and much more for better organization and readability.</li>
          <li>Dark Mode Support: Enjoy writing at any time with an eye-friendly dark mode option.</li>
        </ul>
      </div>
    </div>
  );
};