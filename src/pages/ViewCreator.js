import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../client";

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        let { data, error } = await supabase
          .from("creators")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setCreator(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  if (loading) return <p>Loading content creator...</p>;
  if (error) return <p>Error fetching content creator: {error}</p>;

  return (
    <div style={containerStyle}>
      {creator ? (
        <>
          <h1>{creator.name}</h1>
          {creator.imageURL && (
            <img src={creator.imageURL} alt={creator.name} style={imageStyle} />
          )}
          <p>{creator.description}</p>
          <a href={creator.url} target="_blank" rel="noopener noreferrer">
            Visit {creator.name}'s Page
          </a>
          <div>
            <Link to={`/edit/${id}`}>
              <button style={editButtonStyle}>Edit</button>
            </Link>
            <Link to="/">
              <button style={goBackButtonStyle}>Go back to main page</button>
            </Link>
          </div>
        </>
      ) : (
        <p>No content creator found.</p>
      )}
    </div>
  );
};

const containerStyle = {
  textAlign: "center",
  padding: "20px",
};

const imageStyle = {
  maxWidth: "30%",
  height: "auto",
  borderRadius: "8px",
};

const editButtonStyle = {
  marginTop: "10px",
  padding: "8px 12px",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "8px",
};

const goBackButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ViewCreator;
