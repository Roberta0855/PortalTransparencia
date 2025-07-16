import React, { useState } from "react";

function ExpandableText({ text, maxLength = 100 }) {
  const [expanded, setExpanded] = useState(false);

  const isTruncated = text.length > maxLength;
  const displayText = expanded || !isTruncated
    ? text
    : text.slice(0, maxLength) + "...";

  return (
    <div style={{ display: "inline", wordWrap: "break-word", wordBreak: "break-word" }}>
      {displayText}
      {isTruncated && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            marginLeft: "6px",
            color: "#007bff",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            textDecoration: "underline",
            display: "inline",
          }}
        >
          {expanded ? "ver menos" : "ver mais"}
        </button>
      )}
    </div>
  );
}

export default ExpandableText;
