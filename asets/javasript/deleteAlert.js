function hapus(event){
    event.preventDefault();
        Swal.fire({
        title: "Kamu yakin?",
        text: "Yakin mau menghapus ini?",
        icon: "Peringatan!!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!!"
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById('delete').submit();
        }
      });
  }