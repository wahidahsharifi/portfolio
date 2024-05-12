/*
   theme
*/
const rootTheme = document.querySelector(":root");
const themeBtn = document.querySelector("#theme");
const relImg = document.querySelectorAll(".photo")
let isDarkTheme = false;

const updateThemeProperties = (properties, imgFilter) => {
    Object.keys(properties).forEach((key) => {
        rootTheme.style.setProperty(key, properties[key]);
    });
    relImg.forEach((img) => {
        img.style.filter = imgFilter;
    });
};

themeBtn.addEventListener("click", () => {
    const themeProperties = isDarkTheme ? {
        "--bgColorTop": "radial-gradient(circle at 25% 50%, rgb(253 255 0) 0%, rgb(255 206 69) 50%)",
        "--bgColor": "#fff",
        "--textColor": "#000",
        "--aHover": "#dcdcdc",
    } : {
        "--bgColorTop": "radial-gradient(circle at 25% 50%, rgba(96, 96, 96, 1) 14%, rgba(24, 32, 49, 1) 100%)",
        "--bgColor": "#000",
        "--textColor": "#fff",
        "--aHover": "#555050",
    };
    const imgFilter = isDarkTheme ? "brightness(0)" : "brightness(1)";

    updateThemeProperties(themeProperties, imgFilter);
    isDarkTheme = !isDarkTheme;
});
/*
   skill bar
*/
let reveals = document.querySelectorAll(".skill-per");

let observer = new IntersectionObserver(function (entries) {
   for (let entry of entries) {
      if (entry.isIntersecting) {
         entry.target.classList.add("active");
      } else {
         entry.target.classList.remove("active");
      }
   }
});

for (let reveal of reveals) {
   observer.observe(reveal);
}
