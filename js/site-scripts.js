window.addEventListener("load", function(){

  // localStorage.clear();
  console.log("loaded");


///////////////
// Cookie Banner Scripts
  
  var cookieBanner = document.getElementById("cookie-banner");

  // hide if already accepted/understood
  if (localStorage.getItem("storeData") == "accept-all" || localStorage.getItem("storeData") == "accept-min"){
    console.log("previously acknowledged data policy");
    cookieBanner.classList.add("hide");
  }

  // set correct position on page load
  if(cookieBanner !== null && !cookieBanner.classList.contains("minimize") && !cookieBanner.classList.contains("hide")){
    stickNav(cookieBanner);
  }


  // on click, set policy acknowledgement (if not minimized)
  if(cookieBanner != null && !cookieBanner.classList.contains("hide")){
    var cookieButtons = document.querySelectorAll("[data-cookie-button]");

    for(let x = 0; x < cookieButtons.length; x++){
      cookieButtons[x].addEventListener("click", function(){
        var cookieButtonAction = this.getAttribute("data-cookie-button");
        if(cookieButtonAction == "accept-all"){
          closeCookieBanner(cookieBanner);
          localStorage.setItem("storeData", "accept-all");
          console.log("data policy acknowledged, accepted all");
        }else if(cookieButtonAction == "accept-min"){
          closeCookieBanner(cookieBanner);
          localStorage.setItem("storeData", "accept-min");
          console.log("data policy acknowledged, accepted essential");
        }else{
          closeCookieBanner(cookieBanner);
          localStorage.setItem("storeData", "declined");
          console.log("ERROR: nothing to decline");
        }
      })
    }
  }

  function closeCookieBanner(cookieBanner){
    cookieBanner.classList.add("minimize");
    cookieBanner.style.bottom = (cookieBanner.offsetHeight * -1) + "px";

    var pageFooter = document.querySelector("[data-footer]");
    pageFooter.style.paddingTop = 0 + "px";
  }

  // sticky banner
  function stickNav(cookieBanner){

    var pageFooter = document.querySelector("[data-footer]");
    var footerTop = pageFooter.offsetTop;

    var windowBottom = window.scrollY + window.innerHeight;
        
    if(windowBottom >= footerTop + cookieBanner.offsetHeight){
      cookieBanner.classList.add("stick");
      pageFooter.style.paddingTop = 0 + "px";
    }
    else{
      cookieBanner.classList.remove("stick");
      pageFooter.style.paddingTop = cookieBanner.offsetHeight + "px";
    }
    
  }

  this.addEventListener("scroll", function(){
    
    var cookieBanner = document.getElementById("cookie-banner");

    if(cookieBanner !== null && !cookieBanner.classList.contains("minimize") && !cookieBanner.classList.contains("hide")){
      stickNav(cookieBanner);
    }
  });
///////////////


///////////////
// nav bar scripts
  createNavSelectBar();
  function createNavSelectBar(){
    var navSelectBar = document.createElement("div");
    navSelectBar.classList.add("nav-select-bar");

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
    var navItemWidth = elem.offsetWidth;
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
    var newRect = elem.getBoundingClientRect();
    // difference between the two
    var offset = newRect.left - navRect.left;
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


///////////////
// faq accordion
  var accordionTriggers = document.querySelectorAll("[data-accordion-trigger]");
  for(let x = 0; x < accordionTriggers.length; x++){
    accordionTriggers[x].addEventListener("click", function(){
      
      var closestContainer = this.closest("[data-accordion-container");

      var closestContentContainer = closestContainer.querySelector("[data-accordion-content-container]");
      var closestContent = closestContainer.querySelector("[data-accordion-content]");
      if(closestContainer.classList.contains("show")){
        closestContainer.classList.remove("show");

        closestContentContainer.style.height = "0px";
        
      }
      else{
        resetAccordions();
        closestContainer.classList.add("show");

        closestContentContainer.style.height = closestContent.offsetHeight + "px";
      }
    })
  }
  function resetAccordions(){
    var accordions = document.querySelectorAll("[data-accordion-container]");
    for(let x = 0; x < accordions.length; x++){
      accordions[x].classList.remove("show");

      accordions[x].querySelector("[data-accordion-content-container]").style.height = "0px";;
    }
  }
///////////////
  
}, false);