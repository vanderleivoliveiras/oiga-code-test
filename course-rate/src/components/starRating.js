import React, { useEffect, useState } from "react";

const StarRating = ({rating, setRating, hover, setHover}) => {
    
    return (
      <div className="star-rating d-flex justify-content-center">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on btn-lg" : "off btn-lg"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

export default StarRating;