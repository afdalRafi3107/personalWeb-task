let blogs = [];

document.getElementById("submit").onclick = function (event) {
  event.preventDefault();
  let project = document.getElementById("project").value;
  let startD = document.getElementById("startD").value;
  let endD = document.getElementById("endD").value;
  let description = document.getElementById("description").value;
  let tech = document.querySelectorAll('input[name="tech"]:checked');
  let image = document.getElementById("image");

  //   let values = [];
  //   tech.forEach((checkbox) => {
  //     values.push(checkbox.value);
  //   });

  //   let techName = values.toString();

  let imageFileName = URL.createObjectURL(image.files[0]);

  let blog = {
    project: project,
    description: description,
    image: imageFileName,
  };

  blogs.push(blog);

  console.log(blogs);

  uploadBlog();
};

function uploadBlog() {
  let blogList = document.getElementById("blogList");

  for (let i = 0; i < blogs.length; i++) {
    blogList.innerHTML += `<div class="blogCard">
              <div class="image">
                  <img src="${blogs[i].image}" alt="">
              </div>
              <div class= "blogList-content">

                  <h1>${blogs[i].project}</h1>
                  <p>Durasi : 3 Bulan</p>
                  <p>${blogs[i].description}</p>
                  <i data-feather="github"></i>
                  <i data-feather="eye"></i>
                  <i data-feather="send"></i>
                  <br>
                  <div class="button">
                      <button>edit</button>
                      <button>delete</button>
                  </div>
              </div>
          </div>
      `;
  }
}
