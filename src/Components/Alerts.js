import Swal from "sweetalert2";

export const showErrorMessage = (message) => {
  Swal.fire({
    icon: "error",
    title: "bir hata oluştu",
    text: message,
  });
};

export const showSuccessMessage = (message) => {
  Swal.fire({
    icon: "success",
    title: "Başarılı",
    text: message,
  });
};
