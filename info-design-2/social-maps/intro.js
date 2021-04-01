function myFunction() {
  var intro = document.getElementById("hed-content");
  var sketch = document.getElementById("total-content");

  if (intro.style.display === "none") {
    intro.style.display = "block";
    sketch.style.display = "none";

  } else {
    intro.style.display = "none";
    // alert("hello");
    sketch.style.display = "flex";




  }
}
