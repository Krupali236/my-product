import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";

const Cart = () => {
  const { id } = useParams();
  const [myData, setMyData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        const filteredData = json.find((ele) => ele.id == id);
        setMyData(filteredData);
      })
      .catch((error) => console.error("Fetch error:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">Cart Page</h1>
      <Card className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg p-6">
        {/* Product Image */}
        <div className="w-full md:w-1/3 flex justify-center p-4">
          <CardMedia
            className="w-full max-w-xs object-contain"
            component="img"
            image={myData.image}
            alt={myData.title}
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-2/3 p-4 text-center md:text-left">
          <CardContent>
            <Typography className="text-gray-800 text-2xl font-semibold py-2">
              {myData.title}
            </Typography>
            <Typography className="text-gray-600 text-lg py-2">
              {myData.description}
            </Typography>
            <Typography className="text-gray-800 text-xl font-bold py-2">
              Price: ${myData.price}
            </Typography>

            {/* Back to Home Button */}
            <div className="mt-5">
              <Link
                to="/"
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                Back to Home Page
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Cart;
