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

const Home = () => {
  const [category, setCategory] = useState([]);
  const [myData, setMyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true)
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
  console.log(myData, "myData");
  useEffect(() => {
    cardData();
  }, []);

//   const handleChange = (e) => {
//     const cat = e.target.value;
//     console.log(cat, "value");
//   };

  const filteredData = (e) => {
    setIsLoading(true)
    const cat = e.target.value;
    console.log(cat, "value");

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
  console.log(myData,"Filtered Data");


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
              label="category"
              onChange={filteredData}
            >
              {category.map((v) => {
                return <MenuItem value={v}>{v}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <div className="grid grid-cols-4 gap-4">
            {myData.map((ele) => {
              return (
                <Card
                  sx={{ minWidth: 275, marginTop: "20px", height: "400px" }}
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
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      {ele.title}
                    </Typography>
                    <Typography variant="h5" component="div"></Typography>
                    <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                      {ele.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
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
