import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { Rating } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const ViewRating = () => {
  const [allRatings, setAllRatings] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [chartLabel, setChartLabel] = useState(null);
  const [filterByStars, setFilterByStars] = useState(null);
  const [filteredRatings, setFilteredRatings] = useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1d93bc",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    const getAllRatings = () => {
      axios
        .get("http://localhost:8080/rating")
        .then((res) => {
            if (filterByStars) {
                const filteredItems = res.data.filter(
                  (item) => item.rating == filterByStars
                );
                setFilteredRatings(filteredItems);
              } else {
                setFilteredRatings(res.data);
                console.log(res.data)
              }
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getAllRatings();
  }, [filterByStars]);

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

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
  };

  return (
    <>
      {/* <div className="h-[full] w-fit px-[40px] text-xl font-semibold pt-[20px] flex flex-col justify-center text-center rounded shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)]">
        Total Ratings
        <Pie data={data} options={chartOptions} />
      </div> */}
      <div>
        <div className="border-[2px] rounded px-[10px] border-cyan-600 w-fit">
          <select
            className="h-[50px] border-black w-fit px-[5px] focus:outline-0"
            id="star-filter"
            onChange={(e) => {
              setFilterByStars(e.target.value);
            }}
          >
            <option hidden value="">Select Number of Stars</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
            <option value="">All</option>
          </select>
        </div>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell align="center">Product ID</StyledTableCell>
                <StyledTableCell align="center">Rating</StyledTableCell>
                <StyledTableCell align="right">Feedback</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRatings && filteredRatings.length ? (
                filteredRatings.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {item.user}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.product}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Rating value={item.rating} readOnly />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.feedback}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <div>No Data</div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ViewRating;
