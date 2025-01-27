import js from "@eslint/js";
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
import { image, title } from "framer-motion/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [myData, setMyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [addProduct, setAddProduct] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateIndex, setUpdateIndex] = useState();
  const [updateProduct, setUpdateProduct] = useState({});
  const navigate = useNavigate();
  // console.log(myData, "myData");
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

  const handleUpdateButton = (index) => {
    setUpdateIndex(index);
    console.log(myData[index], "myData[index]");
    setUpdateProduct({
      title: myData[index].title,
      price: myData[index].price,
      description: myData[index].description,
      image: myData[index].image,
      category: myData[index].category,
    });
    setIsUpdate(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
  };

  const handleAddButton = () => {
    console.log("add");
    setOpen(true);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAddProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(addProduct);
    console.log(myData, "myData");
  };
  const handleAddItem = () => {
    console.log(addProduct, "addProduct");
    console.log(myData, "myData");
    const payload = {
      title: addProduct.title,
      price: addProduct.price,
      description: addProduct.description,
      image: addProduct.image,
      category: addProduct.category,
    };
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json, "json");
        console.log(json.id, "json.id");
        setMyData([...myData, { ...payload, id: json.id }]);
      });
    setOpen(false);
    setAddProduct({});
  };

  const handleUpdateProduct = (index) => {
    
    // const updatedProducts = [...myData];
    // updatedProducts[index] = {
    //   ...updatedProducts[index],
    //   title: "test product",
    //   price: 13.5,
    //   description: "lorem ipsum set",
    //   image:
    //     "data:image/jpeg;base64,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",
    //   category: "electronic",
    // };

    fetch(`https://fakestoreapi.com/products/${index}`, {
      method: "PUT",
      body: JSON.stringify(updatedProducts),
    })
      .then((res) => res.json())
      .then((json) => {
        // setMyData(updatedProducts);
        // console.log(updatedProducts, "updatedProducts");
        console.log(json, "json");
      });

    setIsUpdate(false);
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
                onClick={handleAddButton}
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
                  sx={{ minWidth: 300, marginTop: "20px", height: "450px" }}
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
                    <CardActions>
                      <Button
                        size="small"
                        className="border-2"
                        onClick={() => handleUpdateButton(ind)}
                      >
                        Update Product
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              );
            })}

            {open && (
              <>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Add an item</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="title"
                      name="title"
                      value={addProduct?.title}
                      label="Product Title"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="price"
                      name="price"
                      value={addProduct?.price}
                      label="Product Price"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="image"
                      name="image"
                      value={addProduct?.image}
                      label="Product Image"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="description"
                      name="description"
                      value={addProduct?.description}
                      label="Product Description"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                    <FormControl sx={{ margin: "10px 0px" }} fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        style={{ backgroundColor: "white" }}
                      >
                        Select Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label={category}
                        name="category"
                        value={addProduct?.category}
                        // onChange={filteredData}
                        onChange={(e) => {
                          handleOnChange(e);
                        }}
                      >
                        {category.map((v) => {
                          return <MenuItem value={v}>{v}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleAddItem}>
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}

            {isUpdate && (
              <>
                <Dialog open={isUpdate} onClose={handleClose}>
                  <DialogTitle>Add an item</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="title"
                      name="title"
                      value={updateProduct?.title}
                      label="Product Title"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="price"
                      name="price"
                      value={updateProduct?.price}
                      label="Product Price"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="image"
                      name="image"
                      value={updateProduct?.image}
                      label="Product Image"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="description"
                      name="description"
                      value={updateProduct?.description}
                      label="Product Description"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                    <FormControl sx={{ margin: "10px 0px" }} fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        style={{ backgroundColor: "white" }}
                      >
                        Select Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label={category}
                        name="category"
                        value={updateProduct?.category}
                        onChange={(e) => {
                          handleOnChange(e);
                        }}
                      >
                        {category.map((v) => {
                          return <MenuItem value={v}>{v}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      type="submit"
                      onClick={(ind) => handleUpdateProduct(ind)}
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
