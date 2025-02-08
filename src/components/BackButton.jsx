// components/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      <FontAwesomeIcon icon={faArrowLeft} /> Back to Blogs
    </button>
  );
};

export default BackButton;