import React from "react";

export default function MessageBox(props) {
  return (
    <div className={`alert alert-${props.variants || "info"}`}>
      <div>
        <span>
          <i
            className={`fa ${
              props.variants === "danger"
                ? "fa-exclamation-triangle"
                : "fa-check"
            } fa-2x`}
          ></i>
        </span>
      </div>
      <div>
        <big>
          <strong>
            {props.variants === "danger"
              ? "There was a problem..."
              : "Success !"}
          </strong>
        </big>
        {props.children}
      </div>
    </div>
  );
}
