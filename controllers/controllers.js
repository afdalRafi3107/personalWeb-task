const {Sequelize, QueryTypes, DATE} = require('sequelize')
const config = require("../config/config.json");
const { query } = require('express');

const sequelize = new Sequelize(config.development);

//------------------codign berkaitan dengan blog---------------------

//render blog di halaman blog

async function renderBlog(req,res){
    const blogs = await sequelize.query(`SELECT * FROM public. "BLogs"`, {
        type: sequelize.QueryTypes.SELECT,
    })
    console.log("ini isi blog", blogs);
    res.render("blog",{blogs:blogs});
    
}
//delet blog
async function addBlog(req, res) {
    const {title, content} = req.body;
    let image = "https://picsum.photos/300/300";
    let query = `INSERT INTO  "BLogs" (title,content,image)
                 VALUES ('${title}', '${content}', '${image}')`;
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
    const id = req.params.id;
    const query = `SELECT * FROM "BLogs" WHERE id=${id}`;

    const renderBlogEdit = await sequelize.query(query,{
        type: QueryTypes.SELECT
    })
    console.log("ini yamg mau di edit ", renderBlogEdit[0]);
    res.render("blog-edit", {blog:renderBlogEdit[0]});
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
    const id = req.params.id;
    const query = `SELECT * FROM "BLogs" WHERE id=${id}`;

    const renderBlogDetail = await sequelize.query(query,{
        type: QueryTypes.SELECT
    })
    console.log("ini yamg mau di render ", renderBlogDetail[0]);
    res.render("blog-detail", {blog:renderBlogDetail[0]});
}

//-----------------------------Proses project-------------------------
//render project
async function renderProject(req, res) {
    const query = `SELECT * FROM public. "Projects"`

    const project = await sequelize.query(query, {
        type: QueryTypes.SELECT
    })
    console.log("project list : ", project)
    res.render("project-list", {project:project});
    
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
};