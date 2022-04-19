import React from "react";
import { Link } from "react-router-dom";

export default function Rating(props) {
  const {
    rating,
    numReviews,
    label,
    size,
    color,
    bar,
    percentages,
    productId,
  } = props;
  const fas = size && size === "lg" ? "lg" : "";

  const progress = percentages ? percentages : ["20", "20", "20", "20", "20"];

  return (
    <>
      <div className="rating">
        <span>
          <i
            className={
              rating >= 1
                ? `fa fa-star ${fas} ${color}`
                : rating >= 0.5
                ? `fa fa-star-half-o ${fas} ${color}`
                : `fa fa-star-o ${fas} ${color}`
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 2
                ? `fa fa-star ${fas} ${color}`
                : rating >= 1.5
                ? `fa fa-star-half-o ${fas} ${color}`
                : `fa fa-star-o ${fas} ${color}`
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 3
                ? `fa fa-star ${fas} ${color}`
                : rating >= 2.5
                ? `fa fa-star-half-o ${fas} ${color}`
                : `fa fa-star-o ${fas} ${color}`
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 4
                ? `fa fa-star ${fas} ${color}`
                : rating >= 3.5
                ? `fa fa-star-half-o ${fas} ${color}`
                : `fa fa-star-o ${fas} ${color}`
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 5
                ? `fa fa-star ${fas} ${color}`
                : rating >= 4.5
                ? `fa fa-star-half-o ${fas} ${color}`
                : `fa fa-star-o ${fas} ${color}`
            }
          ></i>
        </span>
        {size === "lg" ? (
          <>
            <big>
              <strong className="ml-2">
                {rating ? rating : ""} {label}
              </strong>
            </big>
            <div className="mt-2 mb-1 ">
              <span className="grey">
                {numReviews ? numReviews : ""} global ratings{" "}
              </span>
            </div>
          </>
        ) : (
          <span>
            {label ? (
              <strong className="ml-2">
                {rating ? rating : ""} {label}
              </strong>
            ) : numReviews ? (
              `${numReviews} ratings`
            ) : (
              ""
            )}
          </span>
        )}
      </div>
      {bar && (
        <div>
          <div className="rating-progress-bar">
            <Link to={`/review?product=${productId}&rating=5`}>
              <span>5 star</span>
              <div className="rating-bar">
                <div style={{ width: `${progress[0]}%` }}></div>
              </div>
              <span>{progress[0]}%</span>
            </Link>
          </div>
          <div className="rating-progress-bar">
            <Link to={`/review?product=${productId}&rating=4`}>
              <span>4 star</span>
              <div className="rating-bar">
                <div style={{ width: `${progress[1]}%` }}></div>
              </div>
              <span>{progress[1]}%</span>
            </Link>
          </div>{" "}
          <div className="rating-progress-bar">
            <Link to={`/review?product=${productId}&rating=3`}>
              <span>3 star</span>
              <div className="rating-bar">
                <div style={{ width: `${progress[2]}%` }}></div>
              </div>
              <span>{progress[2]}%</span>
            </Link>
          </div>{" "}
          <div className="rating-progress-bar">
            <Link to={`/review?product=${productId}&rating=2`}>
              <span>2 star</span>
              <div className="rating-bar">
                <div style={{ width: `${progress[3]}%` }}></div>
              </div>
              <span>{progress[3]}%</span>
            </Link>
          </div>{" "}
          <div className="rating-progress-bar">
            <Link to={`/review?product=${productId}&rating=1`}>
              <span>1 star</span>
              <div className="rating-bar">
                <div style={{ width: `${progress[4]}%` }}></div>
              </div>
              <span>{progress[4]}%</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
