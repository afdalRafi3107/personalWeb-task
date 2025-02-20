function KirimEmail() {
  let nama = document.getElementById("nama").value;
  let email = document.getElementById("email").value;
  let subjek = document.getElementById("subjek").value;
  let skill = document.getElementById("skill").value;
  let pesan = document.getElementById("pesan").value;

  let a = document.createElement("a");

  const EmailTujuan = "afdalrafi990@gmail.com";
  a.href = `mailto:${EmailTujuan}?subject=${subjek}&body=${`nama saya ${nama} skill saya ${skill} pesan yang ingin saya sampaikan : ${pesan}`}`;
  a.click();
}
