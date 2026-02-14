const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');
const app = express();
app.use('/static', express.static('node_modules'));

app.use(express.json());//for parsing application/json
app.use(express.urlencoded({extended:true}));//for parsing application/x-www-form-urlencoded

app.set("views", path.join(__dirname, "../views"));

app.set('view engine', 'ejs');// Middleware to parse form data
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res)=>{
    res.render("login");
});
app.get("/login", (req, res)=>{
    res.render("login");
});
// GET /login
app.get("/signup", (req, res) =>{
    res.render('signup');
})
app.get("/userexist", (req, res) =>{
    res.render('userexist');
});


//register user
app.post("/signup", async (req, res) => {
    const data = {
        name:req.body.name,
        password:req.body.password
    }
    
    //check if user already exists

    const existingUser = await collection.findOne({name:data.name});
    if(existingUser){
        return res.redirect("/userexist");
        

    }else{
        //hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
        const userdata = await collection.insertMany([data]);
        console.log(userdata);
        res.redirect("/login");
    }
});

//login user

app.post("/login", async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.name});
        if(!check){
            return res.render("wronglogin");
        }
        //compare the hashed password with the user input
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            return res.render("home");
        }else{
            return res.render("wronglogin");
        }
    }catch(err){
        return res.render("wronglogin");
    }
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})