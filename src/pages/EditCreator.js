import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

const EditCreator = ({ refreshCreators }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("creators")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;

        setName(data.name);
        setUrl(data.url);
        setDescription(data.description);
        setImageURL(data.imageURL);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("creators")
        .update({ name, url, description, imageURL })
        .eq("id", id);

      if (error) throw error;
      refreshCreators();
      navigate(`/view/${id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this content creator?"
    );
    if (!confirmed) return;

    try {
      const { error } = await supabase.from("creators").delete().eq("id", id);

      if (error) throw error;
      refreshCreators();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={containerStyle}>
      <h1>Edit Content Creator</h1>
      <form onSubmit={handleUpdate} style={formStyle}>
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
        <div style={buttonContainerStyle}>
          <button type="submit" style={submitButtonStyle}>
            Update Creator
          </button>
          <button
            type="button"
            onClick={handleDelete}
            style={deleteButtonStyle}
          >
            Delete Creator
          </button>
        </div>
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
  marginRight: "5px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const deleteButtonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
};

export default EditCreator;
