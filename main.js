/*
   theme
*/
const rootTheme = document.querySelector(":root");
const themeBtn = document.querySelector("#theme");
let isDarkTheme = false;

const updateThemeProperties = (properties) => {
   Object.keys(properties).forEach((key) => {
      rootTheme.style.setProperty(key, properties[key]);
   });
};

themeBtn.addEventListener("click", () => {
   const themeProperties = isDarkTheme
      ? {
           "--bgColor": "#faf7e9",
           "--textColor": "#000",
           "--aHover": "#ebebebcc",
           "--link": "#00f",
           "--invert": "1",
           "--brightness": "0",
           "--brighten": "1",
        }
      : {
           "--bgColor": "#050816",
           "--textColor": "#fff",
           "--aHover": "#332d51cf",
           "--link": "#ff0",
           "--invert": "0",
           "--brightness": "1",
           "--brighten": "0.9",
        };

   updateThemeProperties(themeProperties);
   isDarkTheme = !isDarkTheme;
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

window.addEventListener("scroll", function () {
   const messages = document.querySelectorAll(".educateContent");

   messages.forEach((message) => {
      const image = message.querySelector(".demo");

      // Get the top position of the message relative to the viewport
      const messageTop = message.getBoundingClientRect().top;

      // Check if the message is 100px away from leaving the viewport
      if (messageTop <= 10 && messageTop >= -message.offsetHeight + 60) {
         image.classList.add("sticky");
      } else {
         image.classList.remove("sticky");
      }
   });
});

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
