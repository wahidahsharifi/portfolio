// select the elements you want to observe
var reveals = document.querySelectorAll(".skill-per");

// create an observer with a callback function
var observer = new IntersectionObserver(function (entries) {
   // loop through the entries
   for (var entry of entries) {
      // check if the entry is intersecting
      if (entry.isIntersecting) {
         // add the active class to the target element
         entry.target.classList.add("active");
      } else {
         // remove the active class from the target element
         entry.target.classList.remove("active");
      }
   }
});

// loop through the elements and observe them
for (var reveal of reveals) {
   observer.observe(reveal);
}
