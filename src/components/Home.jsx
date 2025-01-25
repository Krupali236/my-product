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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [myData, setMyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  console.log(myData, "myData");
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddItem = () => {
    console.log("add");
    setOpen(true);
    // fetch("https://fakestoreapi.com/products", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title: "test product",
    //     price: 13.5,
    //     description: "lorem ipsum set",
    //     image: "https://i.pravatar.cc",
    //     category: "electronic",
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((json) => console.log(json));
  };
  return (
    <>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="flex items-center">
            <div className="w-full">
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ backgroundColor: "white" }}
                >
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
            </div>
            <div className="w-52">
              <Button
                sx={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={handleAddItem}
              >
                Add Product
              </Button>
            </div>
          </div>

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
                      sx={{ color: "text.secondary", fontSize: 12, height: 35 }}
                    >
                      {ele.title}
                    </Typography>
                    <div className="flex justify-between items-end">
                      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        <b> Price :</b> ${ele.price}
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

            {open ? (
              <>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  // PaperProps={{
                  //   component: "form",
                  //   onSubmit: (event) => {
                  //     event.preventDefault();
                  //     const formData = new FormData(event.currentTarget);
                  //     const formJson = Object.fromEntries(formData.entries());
                  //     const email = formJson.email;
                  //     console.log(email);
                  //     handleClose();
                  //   },
                  // }}
                >
                  <DialogTitle>Add an item</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="title"
                      label="Product Title"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="price"
                      label="Product Price"
                      type="price"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="description"
                      type="file"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="description"
                      label="Product Description"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
