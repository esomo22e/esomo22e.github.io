function myFunction() {
  var intro = document.getElementById("intro-page");
  var sketch = document.getElementById("total-sketches");

  if (intro.style.display === "none") {
    intro.style.display = "block";
    sketch.style.display = "none";

  } else {
    intro.style.display = "none";
    // alert("hello");
    sketch.style.display = "flex";




  }
}
