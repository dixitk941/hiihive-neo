// components/BlogCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBookOpen } from "@fortawesome/free-solid-svg-icons";

const BlogCard = ({ blog }) => {
  const { id, title, content, username, avatarUrl, imageUrl } = blog;

  return (
    <div className="blog-card">
      {/* Top Section: Avatar and Username */}
      <div className="blog-card-header">
        <img src={avatarUrl} alt={username} className="avatar" />
        <span className="username">{username}</span>
      </div>

      {/* Middle Section: Title and Content Preview */}
      <div className="blog-card-body">
        <h3 className="blog-title">{title}</h3>
        <p className="blog-content-preview">
          {content.substring(0, 100)}...
        </p>
        <Link to={`/blog/${id}`} className="read-more-btn">
          <FontAwesomeIcon icon={faBookOpen} /> Read More
        </Link>
      </div>

      {/* Bottom Section: Blog Image */}
      <div className="blog-card-footer">
        <img src={imageUrl} alt={title} className="blog-image" />
      </div>
    </div>
  );
};

export default BlogCard;