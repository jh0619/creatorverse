import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

const AddCreator = ({ refreshCreators }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleAddCreator = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("creators")
        .insert([{ name, url, description, imageURL }]);
      if (error) throw error;
      setLoading(false);
      refreshCreators();
      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Add New Content Creator</h1>
      <form onSubmit={handleAddCreator} style={formStyle}>
        <div style={inputContainerStyle}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={inputContainerStyle}>
          <label>URL:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div style={inputContainerStyle}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div style={inputContainerStyle}>
          <label>Image URL (optional):</label>
          <input
            type="url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={submitButtonStyle} disabled={loading}>
          {loading ? "Adding..." : "Add Creator"}
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: "500px",
  margin: "0 auto",
  padding: "20px",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputContainerStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
};

const submitButtonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "blue",
  color: "white",
};

export default AddCreator;
