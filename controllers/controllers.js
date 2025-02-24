const {Sequelize, QueryTypes, DATE} = require('sequelize')
const config = require("../config/config.json");
const { query } = require('express');

const sequelize = new Sequelize(config.development);

const bcrypt = require("bcrypt")

const {User,BLog,Project} = require("../models")

const saltRounds = 10;

//-------------------login dan register-----------------------------

async function authLogin(req, res) {
    const {email, password} = req.body;


    console.log(req.body);

    //cek kalau usernya ada atau tidak
    const user = await User.findOne({
        where:{
            email: email,
        }
    });
    if(!user){
        console.log("tidak ada user")
        req.flash("error", "email atau password salah")
        return res.redirect("/login")
    }

    const isValidated = await bcrypt.compare(password ,user.password); //meriturn sebuah bolean
    console.log("isvalidated : ", isValidated);
    

    if(!isValidated) {
        req.flash("error", "email atau password salah")
        return res.redirect("/login")
    }

    //sembunyi kan password
    let loggedInUser = user.toJSON();//conver objek ke strin
    delete loggedInUser.password;

    console.log("user paswordnya setelah di delete ", loggedInUser);
    req.session.user = loggedInUser;

    req.flash("succes", `Selamat datang, ${loggedInUser.name}`)

    res.redirect("/")
    
    
}
async function authResgister(req, res) {
    const {name, email, password, confirmPassword} = req.body;

    console.log(req.body);

    if (password != confirmPassword){
        return res.render("auth-register", {
            error: "Password tidak sama"})
    }

    // --cek user email sudah ada
    const user = await User.findOne({
        where:{
            email: email,
        }
    });
    if(user){
        console.log("userny sudah ada", user);
        
        req.flash("error", "Email sudah ada")
        return res.redirect("/register")
    }
    
    

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
        name,
        email,
        password :hashedPassword,
    }
    console.log("user baru : ", newUser);
    
    const userInsert = await User.create(newUser)
    req.flash("succes", "berhasil mendaftar silahkan login")

    res.redirect("/login");
    
}
//render loginpage
async function renderLogin(req, res) {
    const user = req.session.user;
    console.log("usernya adalah ",user);

    if(user){
        res.redirect("/")
    }else{
        res.render("auth-login")
    }
    
}
//  render registerpage
async function renderRegister(req,res) {
    const user = req.session.user;
    console.log("usernya adalah ",user);

    if(user){
        res.redirect("/");
    }else{
        res.render("auth-register", {user:user})
    }
}
// --------------------------------------------------------logout-----------------------
async function authLogout(req, res) {
    //hapus user dari session
    req.session.user=null;
    res.redirect("/login")
}
// -----------------render halaman home-----------
async function renderHome(req, res) {

    const user = req.session.user;
    console.log("usernya adalah ",user);
    
    res.render("index", {user: user})
    
}


//------------------codign berkaitan dengan blog---------------------

//render blog di halaman blog

async function renderBlog(req,res){
    const user = req.session.user;
    console.log("usernya adalah ",user);

    // const blogs = await sequelize.query(`SELECT * FROM public. "BLogs"`, {
    //     type: sequelize.QueryTypes.SELECT,
    // })
    const blogs = await BLog.findAll({
        include:{
            model: User,
            as: "user",
            attributes: {exclude: ["password"]}
        },
        order:  [["createdAt", "DESC"]]
    });
    console.log("Pemilik Blog Paling Atas" , blogs[0].user)

    // console.log("ini isi blog", blogs);

    if(user){
        res.render("blog",{blogs:blogs, user:user});
    }else{
        res.render("blog", {blogs:blogs})
    }
    
}
//delet blog
async function addBlog(req, res) {
    const user = req.session.user;
    console.log("addblog usernya adalah ",user);
    const idUser = user.id;
    console.log("ID usernya adalah : ", idUser);
    
    
    const {title, content} = req.body;
    let image = "https://picsum.photos/300/300";
    let query = `INSERT INTO  "BLogs" ("authorId",title,content,image)
                 VALUES ('${idUser}','${title}', '${content}', '${image}')`;
    console.log("judulny adalah : ", title)
    console.log("contetnny adalah : ", content)
    console.log("gambar adalah : ", image)

    const newblog = await sequelize.query(query,{
        type: QueryTypes.INSERT
    })
    console.log("baru di tambahkan : ", newblog);
    res.redirect("/blog-list")
}

//delet blog
async function deleteBlog(req, res) {
    const id = req.params.id;
    const query = `DELETE FROM "BLogs" WHERE id = ${id}`;

    const deleteBlog = await sequelize.query(query, {
        type: QueryTypes.DELETE
    })

    console.log("Blog yang di hapus", deleteBlog)
    res.redirect("/blog-list")
}

// render edit blog

async function renderEditBlog(req, res) {
    const user = req.session.user;
    console.log("usernya adalah ",user);

    const id = req.params.id;
    const query = `SELECT * FROM "BLogs" WHERE id=${id}`;
 if(!user){
    res.redirect("/login")
 }else{

     const renderBlogEdit = await sequelize.query(query,{
         type: QueryTypes.SELECT
     })
     console.log("ini yamg mau di edit ", renderBlogEdit[0]);
     res.render("blog-edit", {blog:renderBlogEdit[0]});
 }
}

async function editBlog(req, res) {
    
    const id = req.params.id
    const{title, content} = req.body;
    let image = "https://picsum.photos/300/300";

    const query = `UPDATE "BLogs" set title='${title}', content='${content}', image='${image}' WHERE id=${id}`

    const editBlog = await sequelize.query(query, {
        type: QueryTypes.UPDATE
    }) 
    
    console.log("hasil update : ", editBlog);
    res.redirect("/blog-list")
    
}

async function renderBlogDetail(req, res) {
    
    const user = req.session.user;

    const id = req.params.id;
    console.log("ini id : ",id);
    console.log("usernya di blog detail adlaha", user);
    

    const blogDetail = await BLog.findOne({
        include:{
            model: User,
            as: "user",
            attributes: {exclude: ["password"]}
        },
        where : {
            id: id,
        }
    })
    // console.log("pemilik renderBlog" , blogDetail[0].user)
    if(blogDetail == null){
        res.render("page-404")
    }else{
        console.log("yan di pilih :", blogDetail);
        
        res.render('blog-detail', {blog:blogDetail});
    }
}

//-----------------------------Proses project-------------------------
//render project
async function renderProject(req, res) {
    const user = req.session.user;
    console.log("usernya adalah ",user);
    const project = await Project.findAll({
        include:{
            model: User,
            as: "user",
            attributes: {exclude: ["password"]}
        },
        order:  [["createdAt", "DESC"]]
    });
    console.log("Pemilik project Paling Atas" , project[0].user)
    

    // const query = `SELECT * FROM public. "Projects"`

    // const project = await sequelize.query(query, {
    //     type: QueryTypes.SELECT
    // })
    if(user){
        console.log("project list : ", project)
        res.render("project-list", {project:project, user:user});
    }else{
        res.render("project-list", {project:project})
    }
    
}

//addproject
async function addProject(req,res) {
    const{projectName,startAt,endAt,descript,tech}=req.body;

    console.log("nama project: ",projectName);
    console.log("dibuat pada: ",startAt);
    console.log("selesai pada: ",endAt);
    console.log("desktipsi: ",descript);
    console.log("tech: ",tech);
    let teknologi = tech.join(", ");
    console.log("teknologi: ",teknologi);
    
    const oneDay = 24 * 60 * 60 * 1000;
    var tglPertama = Date.parse(startAt);
    var tglKedua = Date.parse(endAt);
    
    var selisih = (tglKedua - tglPertama) / oneDay;
    console.log("Total hari: ",selisih);
    
    image = "https://picsum.photos/300/300";

    

    const query = `INSERT INTO  "Projects" ("projectName", descript, tech, "startAt", "endAt", image, "totalHari")
                  VALUES ('${projectName}', '${descript}', '${tech}', '${startAt}','${endAt}', '${image}', '${selisih}')`;

    const addProject = await sequelize.query(query, {
        type: QueryTypes.INSERT
    })
    console.log("basru saja input data", addProject);
    
    res.redirect("/projectList")
}


//project delete

async function deleteProject(req, res) {
    const id = req.params.id;
    console.log("ini id yan gmau dihapus: ",id);
    
    const query = `DELETE FROM "Projects" WHERE id = ${id}`;

    const deletePrjct = await sequelize.query(query, {
        type: QueryTypes.DELETE
    })
    console.log("project yang di hapus", deletePrjct)
    res.redirect("/projectList")
}

async function renderEditProject(req, res) {
    const id = req.params.id;
    const query = `SELECT * FROM "Projects" WHERE id=${id}`;

    const renderProjectDetail = await sequelize.query(query,{
        type: QueryTypes.SELECT
    })
    console.log("ini yamg mau di render ", renderProjectDetail[0]);
    res.render("project-edit", {project:renderProjectDetail[0]});
}


async function editProject(req,res){
    const id = req.params.id;
    const{projectName,startAt,endAt,descript,tech}=req.body;
    console.log("nama project: ",projectName);
    console.log("dibuat pada: ",startAt);
    console.log("selesai pada: ",endAt);
    console.log("desktipsi: ",descript);
    console.log("tech: ",tech);
    let teknologi = tech.join(", ");
    console.log("teknologi: ",teknologi);
    
    const oneDay = 24 * 60 * 60 * 1000;
    var tglPertama = Date.parse(startAt);
    var tglKedua = Date.parse(endAt);
    
    var selisih = (tglKedua - tglPertama) / oneDay;
    console.log("Total hari: ",selisih);
    
    image = "https://picsum.photos/300/300";

    const query = `UPDATE "Projects" set "projectName"='${projectName}', descript='${descript}', tech='${teknologi}', "startAt"='${startAt}', "endAt"='${endAt}', image='${image}', "totalHari"='${selisih}' WHERE id = ${id}`;
    const updateProject = await sequelize.query(query,{
        type: QueryTypes.UPDATE
    })
    console.log("terupdate : ", updateProject)
    res.redirect("/projectList")
}



module.exports={
    authLogout,
    renderHome,
    authLogin,
    authResgister,
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
    renderLogin,
    renderRegister,
};