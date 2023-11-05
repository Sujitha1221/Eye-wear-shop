import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GetRatingForProduct = () => {

    const [averageRating, setAverageRating] = useState();

    const productId = "64f89873e68afcefbac48ad9";

    useEffect(() => {
        axios.get(`http://localhost:8080/rating/product/${productId}`).then((res) => {
            let total = 0;
            let count = 0;

           if(res.data && res.data.length) {
            res.data.map((item) => {
                total = total + item.rating;
                count++;
            })
           }

           setAverageRating(total/count);
        }).catch((err) => {
            console.error(err);
        })
    }, [])

    return (
        <>
         <Rating value={averageRating || 0} precision={0.1} readOnly/>
        </>
    );
}

export default GetRatingForProduct;
