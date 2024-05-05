import React from "react";
import { useNavigate } from "react-router-dom";
import "./pageNotFound.css"
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="page-not-found-container"
      >
        <div className="back-arrow-container">
          <div className="back-arrow" onClick={() => navigate(-1)}>
            &#10094;
          </div>
        </div>
        <div
          className="page-not-found-message-center"
        >
          <p className="title">Uh-oh! Something went wrong...</p>
          <p>The resource you requested could not be found.</p>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
