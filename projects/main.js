const projects = document.querySelectorAll(".project");
const preview = document.getElementById("preview");
const links = document.getElementById("plinks");

// Center preview vertically within the viewport
function centerPreview() {
    const viewportHeight = window.innerHeight;
    const previewHeight = preview.offsetHeight;
    const centerOffset = (viewportHeight - previewHeight) / 2;
    preview.style.top = `${centerOffset}px`;
}

// Function to handle project click events
function handleProjectClick(project) {
    const image = project.querySelector(".projectImage");
    const paragraph = project.querySelector(".projectP");
    const plus = project.querySelector(".plus");
    const img = project.querySelector("img");
    const github = project.querySelector(".github");
    const vercel = project.querySelector(".vercel");

    // Update preview content with project details
    preview.querySelector("img").src = img.src;
    links.querySelector("a:nth-child(1)").href = github.href;
    links.querySelector("a:nth-child(2)").href = vercel.href;

    // Reset other projects' styles
    projects.forEach((otherProject) => {
        if (otherProject !== project) {
            otherProject.querySelector(".projectImage").classList.remove("fullShow");
            otherProject.querySelector(".projectP").classList.remove("fullShow");
            otherProject.querySelector(".plus").classList.remove("rotate");
            otherProject.classList.remove("pexpand");
        }
    });

    // Apply styles to the selected project
    image.classList.add("fullShow");
    paragraph.classList.add("fullShow");
    plus.classList.add("rotate");
    project.classList.add("pexpand");
}

// Add click event listeners to all projects
projects.forEach((project) => {
    project.addEventListener("click", () => handleProjectClick(project));
});

// Center preview on load and resize
window.addEventListener("load", centerPreview);
window.addEventListener("resize", centerPreview);
preview.style.position = "sticky";