import React from "react";

export default function MessageBox(props) {
  return (
    <div className={`alert alert-${props.variants || "info"}`}>
      <div>
        <span>
          <i className="fa fa-exclamation-triangle fa-2x"></i>
        </span>
      </div>
      <div>
        <big>
          <strong>There was a problem</strong>
        </big>
        {props.children}
      </div>
    </div>
  );
}
