import React from "react";

// Component for rendering a star rating
function StarRating({ numStars }) {
  const stars = Array(numStars).fill(null);

  return (
    <>
      {stars.map((_, index) => (
        <i key={index} style={{ fontStyle: "normal" }}>
          ★
        </i>
      ))}
    </>
  );
}

export default StarRating;
