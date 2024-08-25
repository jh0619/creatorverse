import React from "react";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ id, name, url, description, imageURL }) => {
  return (
    <div style={cardStyle}>
      {imageURL && <img src={imageURL} alt={name} style={imageStyle} />}
      <div style={infoStyle}>
        <h2>{name}</h2>

        <p>{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Visit {name}'s Channel
        </a>
      </div>
      <div style={iconContainerStyle}>
        <Link to={`/view/${id}`} style={iconStyle}>
          <FaEye />
        </Link>
        <Link to={`/edit/${id}`} style={iconStyle}>
          <FaPencilAlt />
        </Link>
      </div>
    </div>
  );
};

const iconStyle = {
  display: "inline-block",
  color: "blue",
  fontSize: "24px",
  cursor: "pointer",
  marginRight: "10px",
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "85%",
  height: "250px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  overflow: "hidden",
  maxHeight: "400px",
};

const imageStyle = {
  width: "auto",
  height: "100px",
  borderRadius: "8px",
};

const infoStyle = {
  textAlign: "center",
};

const iconContainerStyle = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "10px",
};

export default Card;
