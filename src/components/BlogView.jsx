import React from "react";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faTags } from "@fortawesome/free-solid-svg-icons";

const BlogView = ({ blog }) => {
  const { title, category, content, username, avatarUrl, imageUrl, createdAt } = blog;

  return (
    <div className="blog-view">
      {/* Blog Header: Title and Category */}
      <div className="blog-header">
        <h1 className="blog-title">{title}</h1>
        <p className="blog-category">
          <FontAwesomeIcon icon={faTags} /> {category}
        </p>
      </div>

      {/* Author Info: Avatar, Username, and Date */}
      <div className="author-info">
        <img src={avatarUrl} alt={username} className="author-avatar" />
        <div className="author-details">
          <p className="author-name">{username}</p>
          <p className="blog-date">
            <FontAwesomeIcon icon={faCalendar} /> {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Blog Image */}
      {imageUrl && (
        <div className="blog-image-container">
          <img src={imageUrl} alt={title} className="blog-image" />
        </div>
      )}

      {/* Blog Content with Markdown Support */}
      <div className="blog-content markdown-body">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogView;
