import Swal from "sweetalert2";

export const showLoadingAlert = () => {
  Swal.fire({
    html: `
              <div
    class="relative rounded-lg w-[300px] h-[500px] flex flex-col sm:w-[450px] md:h-[400px]"
  >
    <div class="basis-1/2 bg-white p-4 rounded-lg text-center"></div>
    <div class="absolute w-full h-full flex items-center justify-center">
      <img
        src="/jff-logo.png"
        alt="Custom Image"
        class="w-24 sm:w-32"
      />
    </div>
    <div
      class="basis-1/2 bg-secondary py-12 text-center w-full h- flex flex-col justify-end gap-12 md:py-6 md:gap-6"
    >
      <div class="flex gap-2 justify-center text-white">
        <span class="loading loading-ring loading-md"></span>
        <span class="loading loading-ring loading-lg"></span>
        <span class="loading loading-ring loading-md"></span>
      </div>
      <div class="text-lg text-white md:text-xl">it doesn't take long</div>
    </div>
  </div>
          `,
    allowOutsideClick: false,
    showConfirmButton: false,
    background: "transparent",
    padding: "0",
    backdrop: `
              rgba(0,0,0,0.4)
          `,
  });
};

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: false,
});

export const showToast = ({ icon, title }) => {
  return Toast.fire({
    icon: icon,
    title: title,
  });
};
