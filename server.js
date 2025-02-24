//konfigurasi timenya di pertemuan 12
//memanggil library express
const express = require("express");
const app = express();
const port = 3000;
const hbs = require("hbs")
const path = require("path")
const flash = require("express-flash")
const methodOverride = require('method-override')
const session = require("express-session")

app.set('view engine', 'hbs')
app.set("views" ,path.join(__dirname, '/views'))

//module apa saj ayan gkita gunakan
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static('asets'))
app.use(flash());
app.use(session(
    {
    name :"my-session",
    secret:"asdasda",
    resave:false,
    saveUninitialized: true
    }
))


hbs.registerPartials(__dirname + "/views/partials", function (err) {})
hbs.registerHelper("equal", function (a, b){
    return a===b;
});

const {formatDateToWIB, getRelatifTime} = require("./utils/time");

const{
    renderBlog,
    addBlog,
    deleteBlog,
    renderEditBlog,
    editBlog,
    renderBlogDetail,
    addProject,
    renderProject,
    deleteProject,
    renderEditProject,
    editProject,
    authLogin,
    authResgister,
    renderHome,
    authLogout,
    renderLogin,
    renderRegister,
    }= require("./controllers/controllers");

hbs.registerHelper("formatDateToWIB", formatDateToWIB)
hbs.registerHelper("getRelatifTime", getRelatifTime)




// panggil halaman login----------------------------------------------------------------

app.get("/login", (req,res)=>{
res.render("auth-login")
})
app.get("/register", (req,res)=>{
res.render("auth-register")
})

app.post("/login", authLogin)

app.post("/register" ,authResgister)

app.post("/login", renderLogin)
app.post("/register", renderRegister)

//panggil halaman index-----------------------------------------------------------------
app.get("/", renderHome)

//panggil halaman contact
app.get("/contact", (req, res)=>{
    const user = req.session.user;
    res.render("contact", {user: user})
})

// ---------------logout---------
app.get("/logout", authLogout)
//panggil blog----------------------------------------------------------------------------------------
//panggil halaman blog
app.get("/blog-list", renderBlog)
//panggil halaman blog-add
app.get("/blog-add", (req, res)=>{
    const user = req.session.user;
    if(user){
        res.render("blog-add", {user: user})
    }else{
        res.redirect("/login")
    }
})
//tambah blog
app.post("/blog-add", addBlog);
//hapus blog
app.post("/blog-list/:id", renderBlog);
app.delete("/blog-list/:id", deleteBlog);
//render edit blog
app.get("/blog-edit/:id", renderEditBlog);
//edit blog
app.post("/blog-edit/:id", editBlog);
//render blog detail
app.get("/blog-detail/:id", renderBlogDetail);

//-----------------------------proses project page--------------------
//panggil halaman project-list
app.get("/projectList", renderProject)
//panggil halaman project-add
app.get("/projectAdd", (req, res)=>{
    const user = req.session.user;
    res.render("project-add", {user: user})
})
//tambah project
app.post("/projectAdd", addProject);
//deleteproject
app.delete("/projectList/:id", deleteProject)
//render Project
app.get("/projectEdit",  (req, res)=>{
    res.render("project-edit")
})
app.get("/projectEdit/:id", renderEditProject)
app.post("/projectEdit/:id", editProject)

// -------------------render testimonials------------------------------------
app.get("/testimonials",(req,res)=>{
    const user = req.session.user;
    res.render("testimonials", {user: user})
})
//----------------------------------------------------------------------------------------------------

app.listen(port, () =>{
    console.log(`server berjalan di port ${port}`)
})