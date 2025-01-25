import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardActions,
  Typography,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
} from "@mui/material";
const Cart = () => {
  const { id } = useParams();
  const [myData, setMyData] = useState({});

  const cardData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        const filteredData = json.find((ele) => ele.id == id);
        setMyData(filteredData);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      });
  };
  useEffect(() => {
    cardData();
  }, []);
  console.log(myData, "myData");

  return (
    <>
      <h1>Cart Page</h1>
      <Card className="my-10 flex h-full">
        <div className="w-72 m-5 p-10">
          <CardMedia
            className="w-full"
            component="img"
            image={myData.image}
            alt="Paella dish"
          />
        </div>
        <div className="mx-14">
          <CardContent>
            <Typography className="text-slate-800 text-2xl py-5">
              {myData.title}
            </Typography>
            <Typography className="text-slate-800 text-2xl py-5">
              {myData.description}
            </Typography>
            <Typography className="text-slate-800 text-2xl py-5">
              <b> Price :</b> {myData.price}
            </Typography>
            <Typography className="text-slate-800 text-2xl py-5">
              <Link to="/" className="text-white no-underline ms-1">
                Back to Home Page
              </Link>
            </Typography>
          </CardContent>
        </div>
      </Card>
    </>
  );
};
export default Cart;
