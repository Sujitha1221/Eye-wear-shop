import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const Dashboard = () => {
  const [allRatings, setAllRatings] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [chartLabel, setChartLabel] = useState(null);
  const [deliveryChartData, setDeliveryChartData] = useState(null);
  const [deliveryChartLabel, setDeliveryChartLabel] = useState(null);
  const [deliveries, setAllDeliveries] = useState([]);
  const [products, setProducts] = useState([]);
  const [productChartData, setProductChartData] = useState(null);
  const [productChartLabel, setProductChartLabel] = useState(null);

  useEffect(() => {
    const getAllRatings = () => {
      axios
        .get("http://localhost:8080/rating")
        .then((res) => {
          setAllRatings(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    function getAllDeliveries() {
      axios
        .get("http://localhost:8080/delivery/get-all-delivery")
        .then((res) => {
          setAllDeliveries(res.data);
        })
        .catch((err) => {
          console.error("Error : " + err.message);
        });
    }

    getAllDeliveries();
    getAllRatings();
  }, []);

  useEffect(() => {
    if (allRatings) {
      let five = 0;
      let four = 0;
      let three = 0;
      let two = 0;
      let one = 0;

      allRatings.map((item) => {
        if (item.rating == 5) five++;
        else if (item.rating == 4) four++;
        else if (item.rating == 3) three++;
        else if (item.rating == 2) two++;
        else if (item.rating == 1) one++;
      });

      const data = [one, two, three, four, five];
      const labels = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];

      setChartData(data);
      setChartLabel(labels);
    }

    if (deliveries) {
      let delivered = 0;
      let totalDeliveries = deliveries.length;
      let notDelivered = totalDeliveries - delivered;

      deliveries.map((delivery) => {
        if (delivery.status == "Delivered") delivered++;
      });

      const data = [delivered, notDelivered];
      const labels = ["Delivered", "Pending Delivery"];

      setDeliveryChartData(data);
      setDeliveryChartLabel(labels);
    }
  }, [allRatings]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: chartLabel,
    width: "300 px",
    height: "300 px",
    datasets: [
      {
        label: "Number of Ratings",
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const deliveryData = {
    labels: deliveryChartLabel,
    width: "300 px",
    height: "300 px",
    datasets: [
      {
        label: "Deliveries",
        data: deliveryChartData,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
  };

  useEffect(() => {
    // Fetch product data from your backend
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/product/get-products"
        );
        if (response.data.success) {
          setProducts(response.data.products);

          // Process the product data to get chart data
          const productCounts = {};
          for (const product of response.data.products) {
            if (product.category) {
              if (!productCounts[product.category.categoryName]) {
                productCounts[product.category.categoryName] = 1;
              } else {
                productCounts[product.category.categoryName]++;
              }
            }
          }

          const labels = Object.keys(productCounts);
          const data = Object.values(productCounts);

          setProductChartLabel(labels);
          setProductChartData(data);
        }
      } catch (error) {
        console.log(error);
        alert("Error while fetching product data");
      }
    };

    fetchProductData();
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const productData = {
    labels: productChartLabel,
    datasets: [
      {
        label: "Product Categories",
        data: productChartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const productChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
  };

  return (
    <>
      <div className="flex">
        <div className="h-[full] w-fit px-[40px] text-xl font-semibold pt-[20px] flex flex-col justify-center text-center rounded shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)]">
          Total Ratings
          <Pie data={data} options={chartOptions} />
        </div>
        <div className="h-[full] w-fit px-[40px] text-xl font-semibold pt-[20px] flex flex-col justify-center text-center rounded shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)]">
          Deliveries
          <Pie data={deliveryData} options={chartOptions} />
        </div>
        <div className="h-[full] w-fit px-[40px] text-xl font-semibold pt-[20px] flex flex-col justify-center text-center rounded shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)]">
          Product Categories
          <Pie data={productData} options={productChartOptions} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
