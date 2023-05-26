import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ promedioDiasAtrasados }) => {
  const maxStars = 5;

  const filledStars = promedioDiasAtrasados < 0 ? Math.ceil(Math.abs(promedioDiasAtrasados)) : 0;

  const StarStyles = (index) => {
    if (index < filledStars) {
      return { color: "yellow" };
    }
    return { color: "gray" };
  };

  return (
    <div>
      <h4 className="text-secondary text-center">Calificación del Cliente</h4>
      <div className="d-flex flex-row justify-content-center">
        {[...Array(maxStars)].map((_, index) => (
          <h4 className="text-secondary" key={index}>
            {index < filledStars ? (
              <AiFillStar className="text-warning" style={StarStyles(index)} />
            ) : (
              <AiOutlineStar className="text-secondary" style={StarStyles(index)} />
            )}
          </h4>
        ))}
      </div>
    </div>
  );
};

export default Rating;