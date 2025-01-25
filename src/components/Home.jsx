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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [myData, setMyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = () => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategory(json))
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const cardData = () => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setMyData(json))
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    cardData();
  }, []);

  const filteredData = (e) => {
    setIsLoading(true);
    const cat = e.target.value;

    fetch(`https://fakestoreapi.com/products/category/${cat}`)
      .then((res) => res.json())
      .then((json) => setMyData(json))
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleSingleProduct = (id) => {
    navigate(`/cart/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              style={{ backgroundColor: "white" }}
            >
              {" "}
              products{" "}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={category}
              onChange={filteredData}
            >
              {category.map((v) => {
                return <MenuItem value={v}>{v}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <div className="grid grid-cols-4 gap-4">
            {myData.map((ele, ind) => {
              return (
                <Card
                  key={ele.id}
                  sx={{ minWidth: 300, marginTop: "20px", height: "400px" }}
                >
                  <CardMedia
                    sx={{ height: "300px" }}
                    component="img"
                    image={ele.image}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 12, height: 25 }}
                    >
                      {ele.title}
                    </Typography>
                    <div className="flex justify-between items-end">
                      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        <b> Price :</b> {ele.price}
                      </Typography>
                      <CardActions>
                        <Button
                          size="small"
                          className="border-2"
                          onClick={() => handleSingleProduct(ele.id)}
                        >
                          Add To Cart
                        </Button>
                      </CardActions>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
