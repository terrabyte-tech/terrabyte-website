window.addEventListener("load", function(){

  console.log("header-scripts.js loaded");
  
///////////////
// nav bar scripts
createNavSelectBar();
function createNavSelectBar(){
  var navSelectBar = document.createElement("div");
  navSelectBar.classList.add("nav-select-bar");
  navSelectBar.classList.add("hide-on-mobile");

  var navElement = document.querySelector("nav");

  navElement.appendChild(navSelectBar);

  navSelectBarDefault();
}

function navSelectBarDefault(){
  var selectedNavItem = document.querySelector("nav .nav-item-container.selected");
  // get/set width
  navSelectBarWidth(selectedNavItem);
  // get/set position
  navSelectBarPosition(selectedNavItem);
}

// get/set width of bar
function navSelectBarWidth(elem){
  var navSelectBar = document.querySelector(".nav-select-bar");
  // get width
  if(elem == null){
    var navItemWidth = 0;
  }
  else{
    var navItemWidth = elem.offsetWidth;
  }
  
  // set width
  navSelectBar.style.width = navItemWidth + "px";
}

// get/set position of bar
function navSelectBarPosition(elem){
  var navElement = document.querySelector("nav");
  var navSelectBar = document.querySelector(".nav-select-bar");
  // nav elements coords
  var navRect = navElement.getBoundingClientRect();
  // parameter element's coords
  var newRect, offset;
  if(elem == null){
    offset = 0;
  }
  else{
    newRect = elem.getBoundingClientRect();
    // difference between the two
    offset = newRect.left - navRect.left;
  }

  // move nav bar accordingly
  navSelectBar.style.left = offset + "px";
}

// change nav bar location to what is being hovered on
var navItems = document.querySelectorAll(".nav-item-container");
for(let x = 0; x < navItems.length; x++){
  navItems[x].addEventListener("mouseover", function(){
    // change position
    navSelectBarPosition(this);
    // change width accordingly
    navSelectBarWidth(this);
  })
}

// change nav bar to default when hover states are over
var navElement = document.querySelector("nav");
navElement.addEventListener("mouseleave", function(){
  navSelectBarDefault();
})
///////////////

  
}, false);