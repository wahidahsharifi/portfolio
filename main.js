class ThemeManager {
   constructor() {
      this.rootTheme = document.querySelector(":root");
      this.themeBtn = document.querySelector("#themeToggle");
      this.isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.init();
   }

   updateThemeProperties(properties) {
      Object.keys(properties).forEach((key) => {
         this.rootTheme.style.setProperty(key, properties[key]);
      });
   }

   setTheme() {
      const themeProperties = this.isDarkTheme
         ? {
              "--bgColor": "#050816",
              "--textColor": "#fff",
              "--aHover": "#332d51cf",
              "--link": "#ff0",
              "--invert": "0",
              "--inverti": "1",
              "--brightness": "1",
              "--brighten": "0.9",
              "--myImgFilter": "grayscale(0.6)",
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
              "--myImgFilter": "sepia(0.6)",
           };

      this.updateThemeProperties(themeProperties);
      this.themeBtn.checked = this.isDarkTheme;
   }

   init() {
      this.themeBtn.addEventListener("change", () => {
         this.isDarkTheme = !this.isDarkTheme;
         this.setTheme();
      });

      this.setTheme();
   }
}

class HeaderManager {
   constructor() {
      this.indicator = document.querySelector(".nav-indicator");
      this.items = document.querySelectorAll(".nav-item");
      this.sections = document.querySelectorAll(".section");
      this.observers = [];
      this.init();
   }

   handleIndicator(el) {
      this.items.forEach((item) => {
         item.classList.remove("is-active", "reach");
         item.removeAttribute("style");
      });

      this.indicator.style.width = `${el.offsetWidth}px`;
      this.indicator.style.left = `${el.offsetLeft}px`;
      this.indicator.style.backgroundColor = el.getAttribute("active-color");

      el.classList.add("is-active");
      el.style.color = el.getAttribute("active-color");
   }

   getThresholdForSection(section) {
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      return sectionHeight > viewportHeight ? [0.1, 0.25, 0.5, 0.75, 0.9] : 0.8;
   }

   observeSections() {
      this.observers.forEach((observer) => observer.disconnect());
      this.observers = [];

      this.sections.forEach((section) => {
         const sectionThreshold = this.getThresholdForSection(section);

         const sectionObserver = new IntersectionObserver(
            (entries) => {
               entries.forEach((entry) => {
                  const navItem = document.querySelector(
                     `a[href="#${entry.target.id}"]`
                  );
                  if (entry.isIntersecting) {
                     navItem.classList.add("reach");
                     this.handleIndicator(navItem);
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
         this.observers.push(sectionObserver);
      });
   }

   init() {
      this.observeSections();

      this.items.forEach((item) => {
         item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
         });
      });

      const resizeObserver = new ResizeObserver(() => {
         this.observeSections();
      });

      this.sections.forEach((section) => {
         resizeObserver.observe(section);
      });

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
   }
}

class SkillBarManager {
   constructor() {
      this.reveals = document.querySelectorAll(".skill-per");
      this.lastScrollY = window.scrollY;
      this.init();
   }

   init() {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting && window.scrollY > this.lastScrollY) {
                  entry.target.classList.add("active");
               } else if (!entry.isIntersecting) {
                  entry.target.classList.remove("active");
               }
            });
            this.lastScrollY = window.scrollY;
         },
         { threshold: 0.5 }
      );

      this.reveals.forEach((reveal) => observer.observe(reveal));
   }
}

class EducationManager {
   constructor() {
      this.mediaQuery = window.matchMedia("(max-width: 600px)");
      this.init();
   }

   edu() {
      let namArr = [];
      document.querySelectorAll(".date").forEach((d, i) => {
         namArr.push(d.textContent);
         if (i % 2 == 1) {
            const c = getComputedStyle(d);
            const w = c.width.replace(/[^0-9.]/g, "");
            d.style.left = `${Number(w) + -320}px`;
         }
      });

      const eduArr = [];
      document.querySelectorAll(".educateContent").forEach((d) => {
         eduArr.push(d);
      });

      for (let i = 0; i < eduArr.length; i++) {
         eduArr[i].insertAdjacentHTML("beforeend", `<span class="dat">${namArr[i]}</span>`);
      }
   }

   handleScroll() {
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

   resetStickyStyles() {
      const images = document.querySelectorAll(".demo");

      images.forEach((image) => {
         image.classList.remove("sticky");
         image.style.position = "";
         image.style.top = "";
      });
   }

   toggleScrollListener() {
      if (!this.mediaQuery.matches) {
         window.addEventListener("scroll", this.handleScroll);
      } else {
         window.removeEventListener("scroll", this.handleScroll);
         this.resetStickyStyles();
      }
   }

   init() {
      this.edu();
      this.toggleScrollListener();
      this.mediaQuery.addEventListener("change", this.toggleScrollListener.bind(this));
   }
}

class ProjectManager {
   constructor() {
      this.images = document.querySelectorAll(".projectsImg img");
      this.init();
   }

   init() {
      this.images.forEach((image) => {
         image.addEventListener("mousemove", (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerX) / 40;
            const rotateY = (x - centerX) / 40;

            image.style.transform = `rotateX(${+rotateX}deg) rotateY(${-rotateY}deg)`;
         });

         image.addEventListener("mouseleave", () => {
            image.style.transform = "rotateX(0deg) rotateY(0deg)";
         });
      });
   }
}

class FormManager {
   constructor() {
      this.form = document.getElementById("form");
      this.init();
   }

   init() {
      this.form.addEventListener("submit", (e) => {
         e.preventDefault();

         const fullName = document.getElementById("fullName").value;
         const email = document.getElementById("email").value;
         const message = document.getElementById("message").value;

         const token = "7438120045:AAH3APfum2yA2jWFj24ye4yteH3IDxy67RQ";
         const chat_id = "-1002395572306";

         const my_text = `Full Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`;

         const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(
            my_text
         )}`;

         const api = new XMLHttpRequest();
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

         this.form.reset();
      });
   }
}

class FooterLinksManager {
   constructor() {
      this.links = document.querySelectorAll('#rellinks > a');
      this.linksParent = document.getElementById('rellinks');
      this.highlighter = document.getElementById('highlighter');
      this.init();
   }

   init() {
      this.linksParent.addEventListener('mouseleave', () => {
         this.highlighter.style.opacity = '0';
         this.highlighter.style.width = '0px';
      });

      this.links.forEach(link => {
         link.addEventListener('mouseenter', (e) => {
            const rect = e.target.getBoundingClientRect();
            const firstRect = document.querySelector('#rellinks > a:first-of-type').getBoundingClientRect();
            this.highlighter.style.opacity = '1';
            this.highlighter.style.width = `${rect.width}px`;
            this.highlighter.style.height = `${rect.height}px`;
            this.highlighter.style.transform = `translate(0px, ${rect.top - firstRect.top}px)`;
         });
      });
   }
}

// Initialize all managers
document.addEventListener("DOMContentLoaded", () => {
   new ThemeManager();
   new HeaderManager();
   new SkillBarManager();
   new EducationManager();
   new ProjectManager();
   new FormManager();
   new FooterLinksManager();
});