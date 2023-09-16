import React, { useState, useEffect } from "react";
import Header from "../HeaderLayout";
import { useNavigate } from "react-router-dom";
import Footer from "../FooterLayout";
import axios from "axios";

export default function History() {
    let navigate = useNavigate();



  // Simulated data for demonstration purposes

const [orders,setOrders] = useState([]);
const user = JSON.parse(localStorage.getItem("UserInfo"));
  const userName = user.email;

  useEffect(() => {
    function getOrders() {
      axios
        .get(`http://localhost:8080/user/history/${userName}`)
        .then((res) => {

          console.log(res.data);
          setOrders(res.data);
        })
        .catch((err) => {
          alert("No orders available");
          navigate('/home')
        });
    }

    getOrders();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/649071264/vector/glasses-on-blue-background.jpg?s=612x612&w=0&k=20&c=6W7uRQoGydei1xTQj5KvQ-ZFutgs_Xor9YzUQiogqWw=')`, // Replace with the actual path to your background image
      }}
    >
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
      <div className="flex justify-center">
        <div className=" max-w-screen-xl overflow-x-auto">
            
          <table className="w-[1000px] text-sm text-left text-white dark:text-white">
            <thead className="text-xs text-white uppercase bg-gray-800 dark:bg-gray-700 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order No
                </th>
                <th scope="col" className="px-6 py-3">
                  Products
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody>
            {orders.map((o, index) => (
              
                // eslint-disable-next-line react/jsx-key
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{o.products}</td>
                  <td className="px-6 py-4">Rs.{o.amount}.00</td>
                  <td className="px-6 py-4">{o.transactionDateTime.toString().slice(0,15)}</td>
                </tr>
                ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
}
