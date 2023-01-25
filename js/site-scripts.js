window.addEventListener("load", function(){

  localStorage.clear();
  console.log("site-scripts.js loaded");


///////////////
// Cookie Banner Scripts
  
  var cookieBanner = document.getElementById("cookie-banner");

  // hide if already accepted/understood
  if (localStorage.getItem("storeData") == "accept-all" || localStorage.getItem("storeData") == "accept-min"){
    console.log("previously acknowledged data policy");
  }
  else{
    cookieBanner.classList.add("show");
  }

  updateAgreedToText();

  // set correct position on page load
  if(cookieBanner !== null && cookieBanner.classList.contains("show")){
    stickNav(cookieBanner);
  }

  // on click, set policy acknowledgement (if not minimized)
  if(cookieBanner != null && cookieBanner.classList.contains("show")){
    var cookieButtons = document.querySelectorAll("[data-cookie-button]");

    for(let x = 0; x < cookieButtons.length; x++){
      cookieButtons[x].addEventListener("click", function(){clickedCookieButton(this)});
    }
  }

  function clickedCookieButton(buttonClicked){
    var cookieButtonAction = buttonClicked.getAttribute("data-cookie-button");
    if(cookieButtonAction == "accept-all"){
      // closeCookieBanner(cookieBanner);
      localStorage.setItem("storeData", "accept-all");
      console.log("data policy acknowledged, accepted all");
      // updateAgreedToText();
    }else if(cookieButtonAction == "accept-min"){
      // closeCookieBanner(cookieBanner);
      localStorage.setItem("storeData", "accept-min");
      console.log("data policy acknowledged, accepted essential");
      // updateAgreedToText();
    }else{
      localStorage.setItem("storeData", "declined");
      console.log("ERROR: nothing to decline");
    }
    closeCookieBanner(cookieBanner);
    updateAgreedToText();
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


  // reset when revisiting
  var revisitCookiePolicyLink = document.querySelectorAll("[data-revisit-cookie-policy]");

  if(revisitCookiePolicyLink.length > 0){
    revisitCookiePolicyLink[0].addEventListener("click", function(){

      var cookieBanner = document.getElementById("cookie-banner");

      // reset cookiebanner
      cookieBanner.classList.add("show");
      cookieBanner.style.bottom = "0px";
      // listen for scrolling again
      stickNav(cookieBanner);

    })
  }

  // update text on the Privacy Policy page
  function updateAgreedToText(){
    var agreedToText = document.querySelector("[data-cookie-agreed-text]");

    if(agreedToText != null){
      var revisitCookiePolicyLink = document.querySelector("[data-revisit-cookie-policy]");

      if(localStorage.getItem("storeData") == "accept-all"){
        agreedToText.innerHTML = "You previously selected to accept all cookies.";

        revisitCookiePolicyLink.classList.remove("hide");
      }else if(localStorage.getItem("storeData") == "accept-min"){
        agreedToText.innerHTML = "You previously selected to accept only essential cookies.";

        revisitCookiePolicyLink.classList.remove("hide");
      }else{
        agreedToText.innerHTML = "You have yet to select which cookies you would like to accept. You can make this selection on the banner below.";

        revisitCookiePolicyLink.classList.add("hide");
      }
    }
  }
///////////////


///////////////
// nav bar scripts
var navTriggers = document.querySelectorAll("[data-nav-toggle]");

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