/*
   theme
*/
const rootTheme = document.querySelector(":root");
const themeBtn = document.querySelector("#themeToggle");
let isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches; // Detect device theme

const updateThemeProperties = (properties) => {
   Object.keys(properties).forEach((key) => {
      rootTheme.style.setProperty(key, properties[key]);
   });
};

const setTheme = () => {
   const themeProperties = isDarkTheme
      ? {
           "--bgColor": "#050816",
           "--textColor": "#fff",
           "--aHover": "#332d51cf",
           "--link": "#ff0",
           "--invert": "0",
           "--inverti": "1",
           "--brightness": "1",
           "--brighten": "0.9",
        }
      : {
           "--bgColor": "#faf7e9",
           "--textColor": "#000",
           "--aHover": "#ebebebcc",
           "--link": "#00f",
           "--invert": "1",
           "--inverti": "0",
           "--brightness": "0",
           "--brighten": "1",
        };

   updateThemeProperties(themeProperties);

   themeBtn.checked = isDarkTheme;
};

themeBtn.addEventListener("change", () => {
   isDarkTheme = !isDarkTheme;
   setTheme();
});

setTheme();

/*
   header
*/
const indicator = document.querySelector(".nav-indicator");
const items = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");

function handleIndicator(el) {
   items.forEach((item) => {
      item.classList.remove("is-active", "reach");
      item.removeAttribute("style");
   });

   indicator.style.width = `${el.offsetWidth}px`;
   indicator.style.left = `${el.offsetLeft}px`;
   indicator.style.backgroundColor = el.getAttribute("active-color");

   el.classList.add("is-active");
   el.style.color = el.getAttribute("active-color");
}

function getThresholdForSection(section) {
   const sectionHeight = section.offsetHeight;
   const viewportHeight = window.innerHeight;

   if (sectionHeight > viewportHeight) {
      return [0.1, 0.25, 0.5, 0.75, 0.9];
   } else {
      return 0.8;
   }
}

let observers = [];

function observeSections() {
   observers.forEach((observer) => observer.disconnect());
   observers = [];

   sections.forEach((section) => {
      const sectionThreshold = getThresholdForSection(section);

      const sectionObserver = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               const navItem = document.querySelector(
                  `a[href="#${entry.target.id}"]`
               );
               if (entry.isIntersecting) {
                  navItem.classList.add("reach");
                  handleIndicator(navItem);
               } else {
                  navItem.classList.remove("reach");
               }
            });
         },
         {
            root: null,
            rootMargin: "0px",
            threshold: sectionThreshold,
         }
      );

      sectionObserver.observe(section);
      observers.push(sectionObserver);
   });
}

observeSections();

items.forEach((item) => {
   item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      // Smooth scroll to the section
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
   });
});

const resizeObserver = new ResizeObserver(() => {
   observeSections();
});

sections.forEach((section) => {
   resizeObserver.observe(section);
});

// nav position
const nav = document.querySelector("nav");
const start = 0;
const end = 100;
const startTop = 60;
const endTop = 15;

window.addEventListener("scroll", () => {
   const scrollY = window.scrollY;
   const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
   const newTop = startTop - (startTop - endTop) * progress;
   nav.style.top = `${newTop}px`;
});
/*
   skill bar
*/
let reveals = document.querySelectorAll(".skill-per");
let lastScrollY = window.scrollY;

let observer = new IntersectionObserver(
   (entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting && window.scrollY > lastScrollY) {
            entry.target.classList.add("active");
         } else if (!entry.isIntersecting) {
            entry.target.classList.remove("active");
         }
      });
      lastScrollY = window.scrollY;
   },
   { threshold: 0.5 }
);

reveals.forEach((reveal) => observer.observe(reveal));

/*
   education
*/

// new date & odd location

function edu() {
   let namArr = [];
   document.querySelectorAll(".date").forEach((d, i) => {
      namArr.push(d.textContent);
      if (i % 2 == 1) {
         c = getComputedStyle(d);
         w = c.width.replace(/[^0-9.]/g, "");
         d.style.left = `${Number(w) + -320}px`;
      }
   });

   eduArr = []
   document.querySelectorAll(".educateContent").forEach((d) => {
      eduArr.push(d)
   });

   for (let i = 0; i < eduArr.length; i++) {
      eduArr[i].insertAdjacentHTML("beforeend", `<span class="dat">${namArr[i]}</span>`)
   }
}
edu()


const mediaQuery = window.matchMedia("(max-width: 600px)");

// Function to handle scroll behavior
function handleScroll() {
   const messages = document.querySelectorAll(".educateContent");

   messages.forEach((message) => {
      const image = message.querySelector(".demo");
      const messageRect = message.getBoundingClientRect();

      if (
         messageRect.top <= 70 &&
         messageRect.bottom > 70 + image.offsetHeight
      ) {
         image.classList.add("sticky");
         image.style.position = "fixed";
         image.style.top = "70px";
      } else if (messageRect.bottom <= 70 + image.offsetHeight) {
         image.classList.remove("sticky");
         image.style.position = "absolute";
         image.style.top = `${message.offsetHeight - image.offsetHeight}px`;
      } else {
         image.classList.remove("sticky");
         image.style.position = "absolute";
         image.style.top = "0";
      }
   });
}

// Function to remove sticky styles on smaller screens
function resetStickyStyles() {
   const images = document.querySelectorAll(".demo");

   images.forEach((image) => {
      image.classList.remove("sticky");
      image.style.position = "";
      image.style.top = "";
   });
}

// Function to toggle scroll listener and reset styles based on media query
function toggleScrollListener() {
   if (!mediaQuery.matches) {
      window.addEventListener("scroll", handleScroll);
   } else {
      window.removeEventListener("scroll", handleScroll);
      resetStickyStyles();
   }
}

// Initial check and setup
toggleScrollListener();
mediaQuery.addEventListener("change", toggleScrollListener);

/*
    projects
*/

const images = document.querySelectorAll(".projectsImg img");

images.forEach((image) => {
   image.addEventListener("mousemove", (e) => {
      const rect = image.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 40;
      const rotateY = (x - centerX) / 40;

      image.style.transform = `rotateX(${+rotateX}deg) rotateY(${-rotateY}deg)`;
   });

   image.addEventListener("mouseleave", () => {
      image.style.transform = "rotateX(0deg) rotateY(0deg)";
   });
});

/*
    form
*/

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
   e.preventDefault();

   var fullName = document.getElementById("fullName").value;
   var email = document.getElementById("email").value;
   var message = document.getElementById("message").value;

   var token = "7438120045:AAH3APfum2yA2jWFj24ye4yteH3IDxy67RQ";
   var chat_id = "-1002395572306";

   var my_text = `Full Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`;

   var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(
      my_text
   )}`;

   let api = new XMLHttpRequest();
   api.open("GET", url, true);

   api.onload = function () {
      if (api.status >= 200 && api.status < 300) {
         alert("Message sent successfully!");
      } else {
         alert("Failed to send message. Please try again.");
      }
   };

   api.onerror = function () {
      alert(
         "Failed to send message. Please check your internet connection and try again."
      );
   };

   api.send();

   form.reset();
});


/*
    footer links
*/

const links = document.querySelectorAll('#rellinks > a')
const linksParent = document.getElementById('rellinks')
const highlighter = document.getElementById('highlighter')

linksParent.addEventListener('mouseleave', () => {
   highlighter.style.opacity = '0';
   highlighter.style.width = '0px'
})

links.forEach(link => {
   link.addEventListener('mouseenter', (e) => {
      const rect = e.target.getBoundingClientRect();
      const firstRect = document.querySelector('#rellinks > a:first-of-type').getBoundingClientRect();
      highlighter.style.opacity = '1';
      highlighter.style.width = `${rect.width}px`;
      highlighter.style.height = `${rect.height}px`;
      highlighter.style.transform = `translate(0px, ${rect.top - firstRect.top}px)`
   })
})