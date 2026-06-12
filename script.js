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
  sidemenu.style.right = "-280px";
}

// Close mobile menu when a link is clicked
document.querySelectorAll("#sidemenu .nav-link").forEach((link) => {
  link.addEventListener("click", closemenu);
});

// Navbar background on scroll + back-to-top visibility
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  backToTop.classList.toggle("show", window.scrollY > 600);
});

// Typing effect
const roles = [
  "Full Stack MERN Developer",
  "React.js Developer",
  "Backend Engineer",
  "Real-Time Systems Builder",
];
const typedEl = document.getElementById("typed");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (deleting) {
    charIndex--;
  } else {
    charIndex++;
  }
  typedEl.textContent = current.slice(0, charIndex);

  let delay = deleting ? 40 : 90;
  if (!deleting && charIndex === current.length) {
    delay = 1800;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

// Scroll reveal animations
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Active nav link highlighting
const navSections = document.querySelectorAll(
  "#header, #about, #services, #portfolio, #contact"
);
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
navSections.forEach((section) => sectionObserver.observe(section));

// Google Sheet Integration
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzo4mOspRRDlYSWeRTIoQ08ZchQqtVUVbYEfqpcbz09ORu_1pCWCjhZbwsR3WFaQLA/exec";
const form = document.forms["submit-to-google-sheet"];
const msgElement = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msgElement.innerHTML = "Message sent successfully!";
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
    moreProjects.style.display = "contents"; // cards join the existing grid
    seeMoreBtn.style.display = "none";
  });
}
