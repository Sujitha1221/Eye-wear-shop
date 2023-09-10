import { Rating } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const GiveRating = () => {
  const [userId, setUserId] = useState("64f1ee23de20fa25ef6e884f");
  const [productId, setProductId] = useState("64f89873e68afcefbac48ad9");
  const [rating, setRating] = useState();
  const [feedback, setFeedback] = useState();
  const [errors, setErrors] = useState("");

  const addRatings = (e) => {
    e.preventDefault();

    if (!rating) {
      setErrors("Please provide a rating");
      return;
    }

    if (!feedback) {
      setErrors("Feedback cannot be empty");
      return;
    }

    const newRating = {
      user: userId,
      product: productId,
      rating: rating,
      feedback: feedback,
    };

    axios
      .post("http://localhost:8080/rating", newRating)
      .then(() => {
        alert("Success");
        setErrors("");
        setFeedback("");
        setRating("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div className="flex items-center w-[300px] p-[20px]">
        <form
          onSubmit={addRatings}
          className="flex flex-col justify-center items-center w-full gap-[10px]"
        >
          <div>
            <Rating
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div className="w-full">
            <textarea
              value={feedback}
              placeholder="Feedback Message"
              onChange={(e) => setFeedback(e.target.value)}
              className="border-2 border-cyan-600 rounded p-[10px] w-full focus:outline-cyan-800"
            />
          </div>
          {errors ? (
            <div className="w-full justify-center text-center px-[20px] py-[10px] border-2 border-red-700 bg-red-100 text-red-700 rounded text-xs">
              {errors ? errors : ""}
            </div>
          ) : (
            <></>
          )}

          <div className="flex w-full flex-end justify-end">
            <button
              className="uppercase py-[10px] px-[20px] rounded-full font-semibold border-[2px] border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white duration-300"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GiveRating;
