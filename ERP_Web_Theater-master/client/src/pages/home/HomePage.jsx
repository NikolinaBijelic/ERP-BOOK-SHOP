import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";

const HomePage = () => {
  const books = useSelector((state) => state.bookReducer);
console.log (books)
  return (
    <div>
      {books.content &&
        books.content.map((item) => (
          <Container
            sx={{
              paddingBottom: 5,
              paddingTop: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                minWidth: 275,
                width: 140,
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Knjige
                </Typography>
                <Typography variant="h5" component="div">
                  {item.Bookname} 1.150,00 rsd
                </Typography>
                
              </CardContent>
              {/* <CardActions>Price 1150,00RSD</CardActions> */}
            </Card>
          </Container>
        ))}
    </div>
  );
};

export default HomePage;
