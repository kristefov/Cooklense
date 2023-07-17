import React from "react";

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
