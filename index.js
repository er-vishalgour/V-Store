
// <!-- js for toggle menu  -->

let MenuItems = document.getElementById("menuItems");
MenuItems.style.maxHeight = "0px";
function menuToggle() {
  if (MenuItems.style.maxHeight == "0px") {
    MenuItems.style.maxHeight = "200px";
  }
  else {
    MenuItems.style.maxHeight = "0px";
  }
}

// js for product gallery

let ProductImg = document.getElementById("ProductImg");
let smallImg = document.getElementsByClassName("small-image");

smallImg[0].onclick = function(){
    ProductImg.src = smallImg[0].src;
}

smallImg[1].onclick = function(){
  ProductImg.src = smallImg[1].src;
}

smallImg[2].onclick = function(){
  ProductImg.src = smallImg[2].src;
}

smallImg[3].onclick = function(){
  ProductImg.src = smallImg[3].src;
}

