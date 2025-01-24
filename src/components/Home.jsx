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
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [myData, setMyData] = useState([]);
  const fetchData = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategory(json));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const cardData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setMyData(json));
  };
  console.log(myData, "myData");
  useEffect(() => {
    cardData();
  }, []);
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  console.log("category", category);

  return (
    <>
      <h1>Home Pcategory</h1>
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
          onChange={handleChange}
        >
          {category.map((v) => {
            return <MenuItem value={v}>{v}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <div className="grid grid-cols-4">
      {myData.map((ele) => {
        return (
            <Card sx={{ minWidth: 275, marginTop: "20px" }}>
              <CardMedia
                sx={{ width: "100%" }}
                component="img"
                height="400"
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
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
        );
    })}
    </div>
    </>
  );
};
export default Home;
