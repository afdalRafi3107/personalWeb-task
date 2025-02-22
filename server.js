//konfigurasi timenya di pertemuan 12
//memanggil library express
const express = require("express");
const app = express();
const port = 3000;
const hbs = require("hbs")
const path = require("path")
const methodOverride = require('method-override')

app.set('view engine', 'hbs')
app.set("views" ,path.join(__dirname, '/views'))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))

app.use(express.static('asets'))
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
    }= require("./controllers/controllers");

hbs.registerHelper("formatDateToWIB", formatDateToWIB)
hbs.registerHelper("getRelatifTime", getRelatifTime)



//panggil halaman index
app.get("/index", (req, res)=>{
    res.render("index")
})

//panggil halaman project-list
app.get("/projectList", (req, res)=>{
    res.render("project-list")
})
//panggil halaman project-add
app.get("/projectAdd", (req, res)=>{
    res.render("project-add")
})
//panggil halaman contact
app.get("/contact", (req, res)=>{
    res.render("contact")
})
//panggil blog----------------------------------------------------------------------------------------
//panggil halaman blog
app.get("/blog-list", renderBlog)
//panggil halaman blog-add
app.get("/blog-add", (req, res)=>{
    res.render("blog-add")
})
//tambah blog
app.post("/blog-add", addBlog);
//hapus blog
app.delete("/blog-list/:id", deleteBlog);
//render edit blog
app.get("/blog-edit/:id", renderEditBlog);
//edit blog
app.post("/blog-edit/:id", editBlog);
//render blog detail
app.get("/blog-detail/:id", renderBlogDetail);

//rendecontent blog

//----------------------------------------------------------------------------------------------------

app.listen(port, () =>{
    console.log(`server berjalan di port ${port}`)
})