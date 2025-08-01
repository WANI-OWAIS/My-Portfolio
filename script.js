// Tab Navigation
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(event, tabname) {
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// Sidemenu Toggle
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-200px";
}

// Google Sheet Integration
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzo4mOspRRDlYSWeRTIoQ08ZchQqtVUVbYEfqpcbz09ORu_1pCWCjhZbwsR3WFaQLA/exec";
const form = document.forms["submit-to-google-sheet"];
const msgElement = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msgElement.innerHTML = "Message sent successfully";
      setTimeout(function () {
        msgElement.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => {
      msgElement.innerHTML = "Error! Message not sent.";
      setTimeout(function () {
        msgElement.innerHTML = "";
      }, 5000);
      console.error("Error!", error.message);
    });
});

// See More Projects Toggle
const seeMoreBtn = document.getElementById("seeMoreBtn");
const moreProjects = document.querySelector(".more-projects");

if (seeMoreBtn && moreProjects) {
  seeMoreBtn.addEventListener("click", function (e) {
    e.preventDefault();
    moreProjects.style.display = "flex"; // Adjust depending on layout
    seeMoreBtn.style.display = "none";
  });
}
