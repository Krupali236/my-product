const Cart = ()=>{
    
     
    return (<><h1>Cart Page
        
        <Card
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
                      sx={{ color: "text.secondary", fontSize: 12 ,height:25 }}
                    >
                      {ele.title}
                    </Typography>
                    <div className="flex justify-between items-end  ">
                      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        <b> Price :</b> {ele.price}
                      </Typography>
                      {/* <CardActions>
                        <Button size="small" className="border-2" onClick={handleSingleProduct}>
                          Add To Cart
                        </Button>
                      </CardActions> */}
                    </div>
                  </CardContent>
                </Card>
        
        </h1></>)
}