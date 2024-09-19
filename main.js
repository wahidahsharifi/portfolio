/*
   theme
*/
const rootTheme = document.querySelector(":root");
const themeBtn = document.querySelector("#theme");
const relImg = document.querySelectorAll(".photo");
const projectImg = document.querySelectorAll(".projectsImg img");
let isDarkTheme = false;

const updateThemeProperties = (properties, imgFilter, imageFilter) => {
   Object.keys(properties).forEach((key) => {
      rootTheme.style.setProperty(key, properties[key]);
   });
   relImg.forEach((img) => {
      img.style.filter = imgFilter;
   });
   projectImg.forEach((image) => {
      image.style.filter = imageFilter;
   });
};

themeBtn.addEventListener("click", () => {
   const themeProperties = isDarkTheme
      ? {
           "--bgColorTop":
              "radial-gradient(circle at 25% 50%, rgb(253 255 0) 0%, rgb(255 206 69) 50%)",
           "--bgColor": "#fff",
           "--textColor": "#000",
           "--aHover": "#f0ecec",
           "--link": "#00f",
        }
      : {
           "--bgColorTop":
              "radial-gradient(circle at 25% 50%, rgba(96, 96, 96, 1) 14%, #1d1836 100%)",
           "--bgColor": "#000",
           "--textColor": "#fff",
           "--aHover": "#1d1836",
           "--link": "#ff0",
        };
   const imgFilter = isDarkTheme ? "brightness(0)" : "brightness(1)";
   const imageFilter = isDarkTheme ? "brightness(1)" : "brightness(0.9)";

   updateThemeProperties(themeProperties, imgFilter, imageFilter);
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

      image.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
   });

   image.addEventListener("mouseleave", () => {
      image.style.transform = "rotateX(0deg) rotateY(0deg)";
   });
});