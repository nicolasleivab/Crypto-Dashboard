import React from "react";

export default function Copyright(props) {
  return (
    <p
      style={{
        marginBottom: 10,
        marginLeft: 10,
        color: "#ccffff",
        fontSize: "1.3rem",
      }}
    >
      {"Copyright ©" + props.copyright + " " + new Date().getFullYear() + "."}
    </p>
  );
}
