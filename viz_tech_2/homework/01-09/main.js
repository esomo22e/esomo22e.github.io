var button = document.getElementById('button');
var image = document.getElementById('philly');

button.addEventListener('click', function () {
  console.log("Clickity Click");

  image.src = "assets/eunice_bay.jpg";
  image.style.transform = "rotate(-90deg)";

});
