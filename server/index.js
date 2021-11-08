const express = require("express");
const cors = require("cors");

const controller = require("./controller");

const app = express();

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", controller.getCompliments);
app.delete("/api/compliment/:id", controller.deleteCompliment);
app.post("/api/compliment", controller.addQuote);
app.put("/api/compliment/:id", controller.changeQuoteFavorite);

app.listen(4000, () => console.log("Server running on 4000"));
