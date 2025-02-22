function formatDateToWIB(date) {
    // let date = new Date();
    let monthsList = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "May",
      "Juni",
      "Juli",
      "Agustus",
      "Sebtember",
      "Oktober",
      "November",
      "Desember",
    ];
  
    let day = date.getDate().toString().padStart(2, "0");
    let month = monthsList[date.getMonth()];
    let year = date.getFullYear();
    let hour = date.getHours().toString().padStart(2, "0");
    let minute = date.getMinutes().toString().padStart(2, "0");
  
    let formateDate = `${day} ${month} ${year} ${hour}:${minute} WIB`;
  
    //console.log(formateDate);
    return formateDate;
  }

  function getRelatifTime(postTime) {
    let now = new Date();
    //console.log("Waktu Sekarang", now);
  
    //console.log("waktu user post :", postTime);
  
    let selisih = now - postTime;
    console.log(selisih);
  
    let SelisihDalamDetik = Math.floor((now - postTime) / 1000);
    let SelisihDalamMenit = Math.floor(SelisihDalamDetik / 60);
    let SelisihDalamJam = Math.floor(SelisihDalamMenit / 60);
  
    //console.log(SelisihDalamDetik);
  
    if (SelisihDalamDetik < 60) {
      return `${SelisihDalamDetik} seconds ago`;
    } else if (SelisihDalamMenit < 60) {
      return `${SelisihDalamMenit} minutes ago`;
    } else if (SelisihDalamJam <= 24) {
      return `${SelisihDalamJam} hours ago`;
    }
  }
   

  module.exports = {formatDateToWIB, getRelatifTime}