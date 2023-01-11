window.addEventListener("load", function(){

  // localStorage.clear();
  // console.log("cleared local storage")
  console.log("site-scripts.js loaded");


///////////////
// Cookie Banner Scripts
  
  var cookieBanner = document.getElementById("cookie-banner");

  // hide if already accepted/understood
  if (localStorage.getItem("storeData") == "accept-all" || localStorage.getItem("storeData") == "accept-min"){
    console.log("previously acknowledged data policy");
    // cookieBanner.classList.add("hide");
  }
  else{
    cookieBanner.classList.add("show");
  }

  // set correct position on page load
  if(cookieBanner !== null && cookieBanner.classList.contains("show")){
    stickNav(cookieBanner);
  }


  // on click, set policy acknowledgement (if not minimized)
  if(cookieBanner != null && cookieBanner.classList.contains("show")){
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
    cookieBanner.classList.remove("show");
    cookieBanner.classList.remove("stick");
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

    if(cookieBanner !== null && cookieBanner.classList.contains("show")){
      stickNav(cookieBanner);
    }
  });
///////////////


///////////////
// nav bar scripts
var navTriggers = document.querySelectorAll("[data-nav-toggle]");
// var navElement = document.querySelector("nav");

if(navTriggers.length > 0){
  navTriggers[0].addEventListener("click", function(){

    this.classList.toggle("show");
    // var triggeredNav = this.closest("[data-nav]");
    // console.log(triggeredNav);

    // triggeredNav.classList.add("show");

  })
}

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

///////////////
// read more of our story (on mobile)
  var readMoreTrigger = document.querySelectorAll("[data-read-more-trigger]");
  if(readMoreTrigger.length > 0){
    readMoreTrigger[0].addEventListener("click", function(){
      this.classList.add("hide");
      
      var readMoreContent = document.querySelectorAll("[data-read-more-content]");

      for(let x = 0; x < readMoreContent.length; x++){
        readMoreContent[x].classList.add("show");
      }
    })
  }
///////////////
  
}, false);