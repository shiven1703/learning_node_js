const express = require("express");

const homeRoutes = require("./routes/home");

const app = express();

app.use(homeRoutes);

app.use((request, response) => {
  response.status(404).send("Page not found");
});

app.listen(5000, () => {
  console.log("Server started...");
});
