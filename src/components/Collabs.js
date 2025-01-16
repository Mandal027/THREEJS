import React from "react";

const Collabs = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        width: "90%",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Collaborations</h1>
      <p style={{ fontSize: "1rem", color: "#555" }}>
        Welcome to the Collaborations section! Here, we highlight partnership
        opportunities, joint ventures, and exciting projects that bring
        creativity and innovation together.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            padding: "15px",
            width: "30%",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ fontSize: "1.2rem" }}>Project A</h3>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Collaborate on innovative solutions for sustainable growth.
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            padding: "15px",
            width: "30%",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ fontSize: "1.2rem" }}>Project B</h3>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Join hands to revolutionize the tech landscape together.
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            padding: "15px",
            width: "30%",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ fontSize: "1.2rem" }}>Project C</h3>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Be part of groundbreaking research and development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Collabs;
