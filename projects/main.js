const projects = document.querySelectorAll(".project");

projects.forEach((project) => {
   project.addEventListener("click", (e) => {
      const image = project.querySelector(".projectImage");
      const paragraph = project.querySelector(".projectP");
      const plus = project.querySelector(".plus");
      const img = project.querySelector("img");
      const github = project.querySelector(".github");
      const vercel = project.querySelector(".vercel");
      const preview = document.getElementById("preview");
      const links = document.getElementById("plinks");

      document.querySelector("#preview img").src = img.src;
      document.querySelector("#plinks a:nth-child(1)").href = github.href;
      document.querySelector("#plinks a:nth-child(2)").href = vercel.href;

      projects.forEach((otherProject) => {
         if (otherProject !== project) {
            otherProject
               .querySelector(".projectImage")
               .classList.remove("fullShow");
            otherProject
               .querySelector(".projectP")
               .classList.remove("fullShow");
            otherProject.querySelector(".plus").classList.remove("rotate");
            otherProject.classList.remove("pexpand");
         }
      });

      image.classList.add("fullShow");
      paragraph.classList.add("fullShow");
      plus.classList.add("rotate");
      project.classList.add("pexpand");

      let projectTop = project.offsetTop - 200;
      preview.style.paddingTop = `${projectTop}px`;
      if (projectTop < 0) {
         preview.style.paddingTop = "0px";
      }
      links.style.marginTop = preview.style.paddingTop;
   });
});