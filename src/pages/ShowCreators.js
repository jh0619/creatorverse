import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
const ShowCreators = ({ creators, loading, error }) => {
  if (loading) return <p>Loading content creators...</p>;
  if (error) return <p>Error fetching content creators: {error}</p>;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>All Content Creators</h1>
      <div style={buttonContainerStyle}>
        <Link to="/new">
          <button style={addButtonStyle}>Add New Content Creator</button>
        </Link>
      </div>
      <div style={creatorsContainerStyle}>
        {creators.length > 0 ? (
          creators.map((creator, index) => (
            <Card
              key={creator.id}
              id={creator.id}
              name={creator.name}
              url={creator.url}
              description={creator.description}
              imageURL={creator.imageURL}
            />
          ))
        ) : (
          <p>No content creators found in the database.</p>
        )}
      </div>
    </div>
  );
};

const creatorsContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const addButtonStyle = {
  margin: "20px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "blue",
  color: "white",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
};

export default ShowCreators;
