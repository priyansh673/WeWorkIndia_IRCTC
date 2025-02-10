const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const db = require("./db");

const env = dotenv.config();

const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute");
const bookRoutes = require("./routes/bookRoute");

app.use("/irctc/users", userRoutes);
app.use("/irctc/admin", adminRoutes);
app.use("/irctc/bookings", bookRoutes);


app.use((req,res) => {
    res.status(404).send("Not Found");
})


const PORT = process.env.PORT || 2432;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});