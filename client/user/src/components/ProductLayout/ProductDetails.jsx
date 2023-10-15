import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import Loader from "../Loader";
import Header from "../HeaderLayout";
import Footer from "../FooterLayout";

const ProductDetails = () => {
  const [noofItems, setNoOfItems] = useState("");
  const params = useParams();
  const [product, setProduct] = useState({});
  const [averageRating, setAverageRating] = useState();
  const [productId, setProductId] = useState(localStorage.getItem("productId"));
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("UserInfo"))._id
  );
  const [rating, setRating] = useState();
  const [feedback, setFeedback] = useState();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {}
  };

  const addToCart = (product, selectedQuantity) => {
    const existingCartItem = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemIndex = existingCartItem.findIndex(
      (item) => item._id === product._id
    );

    if (cartItemIndex !== -1) {
      existingCartItem[cartItemIndex].selectedQuantity = selectedQuantity;
    } else {
      existingCartItem.push({ ...product, selectedQuantity });
    }
    localStorage.setItem("cart", JSON.stringify(existingCartItem));
    alert("Item added to cart successfully");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/rating/product/${productId}`)
      .then((res) => {
        let total = 0;
        let count = 0;

        if (res.data && res.data.length) {
          res.data.map((item) => {
            total = total + item.rating;
            count++;
          });
        }

        setAverageRating(total / count);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const addRatings = (e) => {
    e.preventDefault();

    setSuccess("");

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
        setSuccess("Rating added successfully");
        setErrors("");
        setFeedback("");
        setRating("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const hideSuccess = () => {
    setSuccess("");
  };

  useEffect(() => {
    setTimeout(hideSuccess, 3000);
  }, [success]);

  const virtualTryOn = () => {
    setLoading(true);
    axios
      .get(
        "http://localhost:8080/try-on/?imageURL=" +
          `http://localhost:8080/product/get-product-photo/${productId}`
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
      });
  };

  return (
    <>
      <Header></Header>
      <div className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:8080/product/get-product-photo/${product._id}`}
                  alt="product_photo"
                />
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold mb-2">{product.productName}</h2>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700">Price:</span>
                  <span className="text-gray-600">Rs.{product.price}.00</span>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700">In Stock:</span>
                  <span className="text-gray-600">{product.inStock}</span>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700">Category:</span>
                  <span className="text-gray-600">
                    {product.category?.categoryName}
                  </span>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700">
                  Product Description:
                </span>
                <p className="text-gray-600 text-sm mt-2">
                  {product.description}
                </p>
              </div>
              <Rating
                className="mt-[10px]"
                value={averageRating || 0}
                precision={0.1}
                readOnly
              />
              <div className="mt-4 flex items-center gap-[20px]">
                <TextField
                  id="outlined-basic"
                  type="Number"
                  label="No of items you need"
                  variant="outlined"
                  onChange={(e) => setNoOfItems(e.target.value)}
                  sx={{ marginTop: "10px" }}
                  required
                />
                <button
                  className="bg-black text-white px-[20px] py-[10px] rounded-full hover:bg-gray-700 duration-300 flex items-center relative"
                  onClick={() => {
                    virtualTryOn();
                  }}
                >
                  <div className="text-xs bg-red-500 py-[2px] px-[10px] rounded-full absolute top-[-10px] right-[-10px]">
                    FREE
                  </div>
                  Virtual Try On
                </button>
              </div>
              <div className="mt-4">
                <button
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                  onClick={() => addToCart(product, noofItems)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-full flex justify-center pb-[40px]">
        <div className="flex items-center w-[500px]">
          <form
            onSubmit={addRatings}
            className="flex flex-col justify-center items-center w-full gap-[10px]"
          >
            <div className="text-xl font-semibold">Give a Rating</div>
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
                className="border-2 border-black rounded p-[10px] w-full focus:outline-gray-700 h-[100px]"
              />
            </div>
            {errors ? (
              <div className="w-full justify-center text-center px-[20px] py-[10px] border-2 border-red-700 bg-red-100 text-red-700 rounded text-xs">
                {errors ? errors : ""}
              </div>
            ) : (
              <></>
            )}

            {success ? (
              <div className="w-full justify-center text-center px-[20px] py-[10px] border-2 border-green-700 bg-green-100 text-green-700 rounded text-xs">
                {success ? success : ""}
              </div>
            ) : (
              <></>
            )}

            <div className="flex w-full flex-end justify-end">
              <button
                className="uppercase py-[10px] px-[20px] rounded-full font-semibold border-[2px] border-black text-black hover:bg-black hover:text-white duration-300"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading ? <Loader /> : ""}
      <Footer></Footer>
    </>
  );
};

export default ProductDetails;
