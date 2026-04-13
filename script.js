let express = require("express");
let app = express();
let port = 3000;
let path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.listen(port,()=>{
    console.log("App is Listening");
});
app.get("/",(req,res)=>{
    console.log("Empty Page");
    let name = "";
    let filteredUsers = [];
    res.render("search.ejs",{name,filteredUsers});
})
app.get("/search",(req,res)=>{
    console.log("Processing.....");

    let { name } = req.query;
    let users = require("./users.json");

    let filteredUsers = [];

    if(!name){
        filteredUsers = [];
    } else {
        filteredUsers = users.filter((user) => {
            return user.name.toLowerCase().includes(name.toLowerCase());
        });
    }

    res.render("search.ejs",{filteredUsers, name});
});