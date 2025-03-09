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
  const [addProduct, setAddProduct] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateIndex, setUpdateIndex] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategory(json))
      .catch((error) => console.error("Fetch error:", error))
      .finally(() => setIsLoading(false));

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setMyData(json))
      .catch((error) => console.error("Fetch error:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredData = (e) => {
    setIsLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${e.target.value}`)
      .then((res) => res.json())
      .then((json) => setMyData(json))
      .catch((error) => console.error("Fetch error:", error))
      .finally(() => setIsLoading(false));
  };

  const handleSingleProduct = (id) => navigate(`/cart/${id}`);
  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
    setAddProduct({});
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAddProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddButton = () => setOpen(true);

  const handleAddItem = () => {
    setIsLoading(true);
    const payload = { ...addProduct };
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((json) => setMyData([...myData, { ...payload, id: json.id }]))
      .finally(() => setIsLoading(false));

    handleClose();
  };

  const handleUpdateButton = (index) => {
    setUpdateIndex(index);
    setAddProduct({ ...myData[index] });
    setIsUpdate(true);
    setOpen(true); // ✅ Ensure the dialog opens
  };

  const handleUpdateProduct = () => {
    setIsLoading(true);

    const updatedProducts = [...myData];
    updatedProducts[updateIndex] = {
      ...addProduct,
      id: myData[updateIndex].id,
    }; // ✅ Keep the same ID

    setMyData(updatedProducts);
    handleClose();
    setIsLoading(false);
  };

  const handleDeleteButton = (index) => {
    setIsLoading(true);
    fetch(`https://fakestoreapi.com/products/${index}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => setMyData(myData.filter((_, ind) => ind !== index)))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto p-4">
          {/* Category & Add Button */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Products</InputLabel>
              <Select
                labelId="category-select-label"
                onChange={filteredData}
                defaultValue=""
              >
                {category.map((v, index) => (
                  <MenuItem key={index} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              sx={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={handleAddButton}
            >
              Add Product
            </Button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 my-6">
            {myData.map((ele, ind) => (
              <Card
                key={ele.id}
                sx={{ minWidth: 280, height: 500, border: "1px solid grey" }}
              >
                <CardMedia
                  sx={{ height: 300 }}
                  component="img"
                  image={ele.image}
                  alt={ele.title}
                />
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14, height: 45, fontWeight: "bold" }}
                    gutterBottom
                  >
                    {ele.title}
                  </Typography>
                  <Typography sx={{ marginTop: 3 }}>
                    <b className="font-bold font-mono">
                      Price:{" "}
                      <span className="font-mono text-blue-800">
                        {" "}
                        ${ele.price}
                      </span>
                    </b>
                  </Typography>
                  <CardActions className="flex justify-between my-3">
                    <Button
                      sx={{
                        backgroundColor: "blue",
                        color: "white",
                        padding: 1,
                      }}
                      size="small"
                      onClick={() => handleSingleProduct(ele.id)}
                    >
                      View
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "blue",
                        color: "white",
                        padding: 1,
                      }}
                      size="small"
                      onClick={() => handleUpdateButton(ind)}
                    >
                      Update
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "blue",
                        color: "white",
                        padding: 1,
                      }}
                      size="small"
                      onClick={() => handleDeleteButton(ind)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add / Update Product Dialog */}
      {(open || isUpdate) && (
        <Dialog open={open || isUpdate} onClose={handleClose} fullWidth>
          <DialogTitle>
            {isUpdate ? "Update Product" : "Add Product"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              name="title"
              label="Product Title"
              fullWidth
              variant="standard"
              value={addProduct.title || ""}
              onChange={handleOnChange}
            />
            <TextField
              required
              margin="dense"
              name="price"
              label="Product Price"
              fullWidth
              variant="standard"
              value={addProduct.price || ""}
              onChange={handleOnChange}
            />
            <TextField
              required
              margin="dense"
              name="image"
              label="Product Image"
              fullWidth
              variant="standard"
              value={addProduct.image || ""}
              onChange={handleOnChange}
            />
            <TextField
              required
              margin="dense"
              name="description"
              label="Product Description"
              fullWidth
              variant="standard"
              value={addProduct.description || ""}
              onChange={handleOnChange}
            />
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="category-label">Select Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={addProduct.category || ""}
                onChange={handleOnChange}
              >
                {category.map((v, index) => (
                  <MenuItem key={index} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={isUpdate ? handleUpdateProduct : handleAddItem}>
              {isUpdate ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Home;
