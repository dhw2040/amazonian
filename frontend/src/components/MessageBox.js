import React from "react";

export default function MessageBox(props) {
  return (
    <div className={`alert alert-${props.variants || "info"}`}>
      {props.children}
    </div>
  );
}
