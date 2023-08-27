import "./css/styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

/* sidebar */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar-container");
const srMenu = document.querySelector(".sr-menu")

document.addEventListener("DOMContentLoaded", () =>{
    console.log(sidebar.classList)
})

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");

    if(sidebar.classList.contains("show")){
        srMenu.innerText = "Close menu";
        menuBtn.setAttribute("aria-expanded", "true")
    } else {
        srMenu.innerText = "Open menu";
        menuBtn.setAttribute("aria-expanded", "false")
    }
});


