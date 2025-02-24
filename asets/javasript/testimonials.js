function fetchTestimonials() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.npoint.io/d1237d767d1c82efbd21", true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        // console.log("Response :", response);

        resolve(response.testimonials);
      } else {
        // console.error("Error :", xhr.status);
        reject("Error :", xhr.status);
      }
    };
    xhr.onerror = () => reject("network error");

    xhr.send();
  });
}

const testimonialsContainer = document.getElementById("testimonialsContainer");

const testimonialsHTML = (array) => {
  return array
    .map(
      (testimonial) => `
      <div class="col-sm-4 mt-3">
          <div class="card" style="width: 18rem;">
          <img src="/img/${testimonial.image}" class="card-img-top" alt="...">
          <div class="card-body">
          <p class="card-text">${testimonial.caption}</p>
                <p class="card-text" style="text-align: right;">- ${testimonial.author}</p>
                <p class="card-text" style="font-weight: bold; text-align: right;">${testimonial.rating}★</p>
          </div>
          </div>
        </div>
        `
    )
    .join("");
};

async function showAllTestimonials() {
  const testimonials = await fetchTestimonials();
  console.log(testimonials);
  testimonialsContainer.innerHTML = testimonialsHTML(testimonials);
}

showAllTestimonials();

async function filterTestimonialsByStar(rating) {
  const testimonials = await fetchTestimonials();

  const filteredTestimonials = testimonials.filter(
    (testimonial) => testimonial.rating === rating
  );

  console.log(filteredTestimonials);

  if (filteredTestimonials.length === 0) {
    return (testimonialsContainer.innerHTML = `<p>No testimonials.</p>`);
  }

  testimonialsContainer.innerHTML = testimonialsHTML(filteredTestimonials);
}