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
    distribution,
    productId,
  } = props;
  const fas = size && size === "lg" ? "lg" : "";

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
                {rating !== undefined ? rating : ""} {label}
              </strong>
            </big>
            <div className="mt-2 mb-1 ">
              <span className="grey">
                {numReviews !== undefined ? numReviews : ""} global ratings
              </span>
            </div>
          </>
        ) : (
          <span>
            {label ? (
              <strong className="ml-2">
                {rating !== undefined ? rating : ""} {label}
              </strong>
            ) : numReviews !== undefined ? (
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
                <div
                  className={distribution[0] === 0 ? "zero" : ""}
                  style={{ width: `${distribution[0]}%` }}
                ></div>
              </div>
              <span>{distribution[0]}%</span>
            </Link>
          </div>
          <div className="rating-progress-bar">
            <Link to={`/review?product=${productId}&rating=4`}>
              <span>4 star</span>
              <div className="rating-bar">
                <div
                  className={distribution[1] === 0 ? "zero" : ""}
                  style={{ width: `${distribution[1]}%` }}
                ></div>
              </div>
              <span>{distribution[1]}%</span>
            </Link>
          </div>
          <div className="rating-progress-bar">
            <Link to={`/review?product=${productId}&rating=3`}>
              <span>3 star</span>
              <div className="rating-bar">
                <div
                  className={distribution[2] === 0 ? "zero" : ""}
                  style={{ width: `${distribution[2]}%` }}
                ></div>
              </div>
              <span>{distribution[2]}%</span>
            </Link>
          </div>
          <div className="rating-progress-bar">
            <Link to={`/review?product=${productId}&rating=2`}>
              <span>2 star</span>
              <div className="rating-bar">
                <div
                  className={distribution[3] === 0 ? "zero" : ""}
                  style={{ width: `${distribution[3]}%` }}
                ></div>
              </div>
              <span>{distribution[3]}%</span>
            </Link>
          </div>
          <div className="rating-progress-bar">
            <Link to={`/review?product=${productId}&rating=1`}>
              <span>1 star</span>
              <div className="rating-bar">
                <div
                  className={distribution[4] === 0 ? "zero" : ""}
                  style={{ width: `${distribution[4]}%` }}
                ></div>
              </div>
              <span>{distribution[4]}%</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
