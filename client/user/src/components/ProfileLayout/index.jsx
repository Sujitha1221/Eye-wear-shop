import React, { useState, useEffect } from "react";
import Header from "../HeaderLayout";
import Footer from "../FooterLayout";
import axios from "axios";

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
//   const [user, setUser] = useState("");

  const user = JSON.parse(localStorage.getItem("UserInfo"));
  const id = user._id;

  useEffect(() => {
    function GET() {
      axios
        .get(`http://localhost:8080/user/get/${id}`)
        .then((res) => {
            setFirstname(res.data.user.firstname);
            setLastname(res.data.user.lastname);
            setEmail(res.data.user.email)
          
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    GET();
  }, []);
    

    // useEffect(() => {

    //       setFirstname(user.firstname);
    //       setLastname(user.lastname);
    //       setEmail(user.email);
 
    //   }, []);

  async function updateData(e) {
    e.preventDefault();

    const updateUser = { firstname, lastname, email };

    if(!email.match(/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/)){
      alert("Email doesn't match the format")

    }
    else{
    await axios
      .put(`http://localhost:8080/user/update/${user._id}`, updateUser)
      .then((res) => {
        if (res.data === "Done") {
          alert("User updated successfully ");
          setFirstname(firstname);
          setLastname(lastname);
          setEmail(email);
          window.location.replace("/profile");
        } else {
          alert("Couldn't update profile");
          window.location.replace("/home");
        }
      })
      .catch((msg) => {
        alert(msg);
      });
    }
  }

  async function deleteData(e) {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/user/delete/${user._id}`)
      .then((res) => {
        if (res.data === "success") {
          window.location.replace("/user/signup");
        } else if (res.data === "failed") {
          alert("Error deleting your profile");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/649071264/vector/glasses-on-blue-background.jpg?s=612x612&w=0&k=20&c=6W7uRQoGydei1xTQj5KvQ-ZFutgs_Xor9YzUQiogqWw=')`, // Replace with the actual path to your background image
      }}
    >
      <Header />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-10 pt-10"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOaDiUMRWbbmP9Ib9O7-JpIlxCf1q_96fuJ4BsjKKpbApekNO8YSzByuP59Gh0-JnJX5I&usqp=CAU"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              User Profile
            </h5>

            <div className="pb-6">
              <label
                htmlFor="firstname"
                className="font-semibold text-white block pb-1"
              >
                First Name
              </label>
              <div className="flex">
                <input
                  id="firstname"
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                  value={firstname}
                  className="border-1 bg-white rounded-r px-4 py-2 w-full"
                  type="text"
                />
              </div>
            </div>

            <div className="pb-6">
              <label
                htmlFor="lastname"
                className="font-semibold text-white block pb-1"
              >
                Last Name
              </label>
              <div className="flex">
                <input
                  id="lastname"
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                    value={lastname}
                  className="border-1 bg-white rounded-r px-4 py-2 w-full"
                  type="text"
                />
              </div>
            </div>
            <div className="pb-4">
              <label
                htmlFor="text"
                className="font-semibold text-white block pb-1"
              >
                Email
              </label>
              <input
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                className="border-1 bg-white rounded-r px-4 py-2 w-full"
                type="email"
              />
            </div>

            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                onClick={updateData}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
              <button
                onClick={deleteData}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-red-500 border border-gray-300 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-red-700 dark:text-white dark:border-gray-600 dark:hover:bg-red-800 dark:hover:border-red-800 dark:focus:ring-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}
