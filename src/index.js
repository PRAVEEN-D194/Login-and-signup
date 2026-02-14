const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();

app.set("views", path.join(__dirname, "../views"));

app.set('view engine', 'ejs');// Middleware to parse form data
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res)=>{
    res.render("login");
});
app.get("/signup", (req, res) =>{
    res.render('signup');
})
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})