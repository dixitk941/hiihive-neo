import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";

const BlogCard = ({ blog, theme }) => {
  const { id, title, content, username, avatarUrl, imageUrl } = blog;
  const isDark = theme === "dark";

  return (
    <div className={`blog-card p-4 rounded-lg shadow-md transition-all ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      {/* Top Section: Avatar and Username */}
      <div className="blog-card-header flex items-center gap-3 mb-3 p-2 rounded-md" style={{
        backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
        color: isDark ? "#ffffff" : "#111827",
        border: isDark ? "1px solid #374151" : "1px solid #d1d5db"
      }}>
        <img src={avatarUrl} alt={username} className="avatar w-10 h-10 rounded-full border border-gray-500" />
        <span className="username font-semibold">{username}</span>
      </div>

      {/* Middle Section: Title and Content Preview */}
      <div className="blog-card-body">
        <h3 className="blog-title text-xl font-bold mb-2">{title}</h3>
        <div className={`blog-content-preview text-sm ${isDark ? "text-white" : "text-gray-600"}`}>
        <div className={`blog-content-preview text-sm ${isDark ? "text-white" : "text-gray-600"}`}>
  <ReactMarkdown
    components={{
      p: ({ children }) => <p className={isDark ? "text-white" : "text-gray-800"}>{children}</p>,
      span: ({ children }) => <span className={isDark ? "text-white" : "text-gray-800"}>{children}</span>,
      strong: ({ children }) => <strong className={isDark ? "text-white" : "text-gray-900"}>{children}</strong>
    }}
  >
    {content.substring(0, 200) + "..."}
  </ReactMarkdown>
</div>
        </div>


        <Link to={`/blog/${id}`} className={`read-more-btn inline-flex items-center gap-2 mt-2 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
          <FontAwesomeIcon icon={faBookOpen} /> Read More
        </Link>
      </div>

      {/* Bottom Section: Blog Image */}
      {imageUrl && (
        <div className="blog-card-footer mt-3">
          <img src={imageUrl} alt={title} className="blog-image w-full h-40 object-cover rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default BlogCard;
