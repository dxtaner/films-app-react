import Swal from "sweetalert2";

export const showErrorMessage = (message) => {
  Swal.fire({
    icon: "error",
    title: "Hata",
    text: message,
    toast: true,
    position: "bottom-end",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    background: "#f8d7da",
    iconColor: "#721c24",
    customClass: {
      title: "text-danger",
      popup: "bg-white",
    },
  });
};

export const showSuccessMessage = (message) => {
  Swal.fire({
    icon: "success",
    title: "Başarılı",
    text: message,
    toast: true,
    position: "bottom-end",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    background: "#d4edda",
    iconColor: "#155724",
    customClass: {
      title: "text-success",
      popup: "bg-white",
    },
  });
};
