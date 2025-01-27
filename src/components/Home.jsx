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
import { image } from "framer-motion/client";

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
  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
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
  const handleAddButton = () => {
    console.log("add");
    setOpen(true);
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
  const handleUpdateButton = (index) => {
    setUpdateIndex(index);
    console.log(myData[index], "myData[index]");
    setAddProduct({
      title: myData[index].title,
      price: myData[index].price,
      description: myData[index].description,
      image: myData[index].image,
      category: myData[index].category,
    });
    setIsUpdate(true);
  };
  const handleUpdateProduct = (index) => {
    const updatedProducts = [...myData];
    updatedProducts[updateIndex] = { ...addProduct };
    setMyData(updatedProducts);
    // console.log(updatedProducts[index], "updateProduct[index]");

    fetch(`https://fakestoreapi.com/products/${index}`, {
      method: "PUT",
      body: JSON.stringify(updatedProducts),
    })
      .then((res) => res.json())
      .then((json) => {
        setMyData(updatedProducts);
        // console.log(updatedProducts, "updatedProducts");
        // console.log(json, "json");
      });

    setIsUpdate(false);
    setAddProduct({});
  };
  const handleDeleteButton = (index) => {
    // console.log(index, "index");
    // const deleteProduct = myData.filter((_, ind) => ind !== index);
    // setMyData(deleteProduct);

    fetch(`https://fakestoreapi.com/products/${index}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        const deleteProduct = myData.filter((_, ind) => ind !== index);
        setMyData(deleteProduct);
      });
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
                <>
                  <Card
                    key={ele.id}
                    sx={{ minWidth: 300, marginTop: "20px", height: "480px" }}
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
                        sx={{
                          color: "text.secondary",
                          fontSize: 12,
                          height: 35,
                        }}
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
                        <Button
                          size="small"
                          className="border-2"
                          onClick={() => handleDeleteButton(ind)}
                        >
                          Delete Product
                        </Button>
                      </CardActions>
                    </CardContent>
                  </Card>
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
                            onClick={() => handleUpdateProduct(ind)}
                          >
                            Save
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  )}
                </>
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
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
