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

    console.log(deleteBlog)
    res.redirect("/blog-list", deleteBlog)
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


module.exports={
    renderBlog,
    addBlog,
    deleteBlog,
    renderEditBlog,
    editBlog,
    renderBlogDetail,
};