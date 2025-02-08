import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faTags, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const BlogView = ({ blog }) => {
  const { title, category, content, username, avatarUrl, imageUrl, createdAt } = blog;
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className={`blog-view p-6 max-w-3xl mx-auto ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 fixed top-4 right-4 text-black dark:text-white"
      >
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </button>

      {/* Blog Header: Title and Category */}
      <div className="blog-header mb-4">
        <h1 className="text-3xl font-bold text-black dark:text-white">{title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <FontAwesomeIcon icon={faTags} /> {category}
        </p>
      </div>

      {/* Author Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img src={avatarUrl} alt={username} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold text-black dark:text-white">{username}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon icon={faCalendar} /> {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Blog Image */}
      {imageUrl && (
        <div className="blog-image-container mb-6">
          <img src={imageUrl} alt={title} className="w-full rounded-lg" />
        </div>
      )}

      {/* Blog Content */}
      <div className="prose dark:prose-invert max-w-none text-black dark:text-white">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogView;
