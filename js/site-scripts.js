window.addEventListener("load", function(){

  // localStorage.clear();
  console.log("site-scripts.js loaded");


///////////////
// Cookie Banner Scripts
  
// on startup
  var cookieBanner = document.getElementById("cookie-banner");

  // hide banner if already accepted/understood
  if (localStorage.getItem("storeData") == "accept-all" || localStorage.getItem("storeData") == "accept-min"){
    console.log("previously acknowledged data policy");
  }
  // or show it if it hasn't
  else{
    cookieBanner.classList.add("show");
  }

  // update the agreed-to text accordingly
  updateAgreedToText();

  // set correct position of cookie banner
  if(cookieBanner !== null && cookieBanner.classList.contains("show")){
    stickNav(cookieBanner);
  }

  // on click, set policy acknowledgement (if not minimized)
  if(cookieBanner){
    var cookieButtons = document.querySelectorAll("[data-cookie-button]");

    for(let x = 0; x < cookieButtons.length; x++){
      cookieButtons[x].addEventListener("click", function(){clickedCookieButton(this)});
    }
  }

  function clickedCookieButton(buttonClicked){
    var cookieButtonAction = buttonClicked.getAttribute("data-cookie-button");
    if(cookieButtonAction == "accept-all"){
      localStorage.setItem("storeData", "accept-all");
      console.log("data policy acknowledged, accepted all");
    }else if(cookieButtonAction == "accept-min"){
      localStorage.setItem("storeData", "accept-min");
      console.log("data policy acknowledged, accepted essential");
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
  function stickNav(cookieBanner, windowBottom){

    var pageFooter = document.querySelector("[data-footer]");
    var footerTop = pageFooter.offsetTop;

    if(windowBottom >= footerTop + cookieBanner.offsetHeight){
      cookieBanner.classList.add("stick");
      pageFooter.style.paddingTop = 0 + "px";
    }
    else{
      cookieBanner.classList.remove("stick");
      pageFooter.style.paddingTop = cookieBanner.offsetHeight + "px";
    }
    
  }

  let loadFeed = false;
  this.addEventListener("scroll", function(){

    // get the bottom of the screen
    var windowBottom = window.scrollY + window.innerHeight;
    
    // get the cookie banner area (make sure it exists)
    var cookieBanner = document.getElementById("cookie-banner");

    if(cookieBanner !== null && cookieBanner.classList.contains("show")){
      stickNav(cookieBanner, windowBottom);
    }

    // get mastofeed iframe (make sure it exists)
    if(!loadFeed){
      var mastofeedFrame = document.querySelector("[data-mastofeed-frame]");

      // if user scrolls down close to the feed, load frame
      if(mastofeedFrame !== null && (windowBottom + window.innerHeight) > mastofeedFrame.offsetTop){
        fillMastofeed(mastofeedFrame);
      }
    }
  });

  // only called when scrolling down to a certain part of the page
  function fillMastofeed(mastofeedFrame){
    loadFeed = true;
    mastofeedFrame.src = "https://mastofeed.com/apiv2/feed?userurl=https%3A%2F%2Fmastodon.eco%2Fusers%2Fterrabyte&theme=dark&size=100&header=false&replies=false&boosts=false";
  }


  // reset when revisiting
  var revisitCookiePolicyLink = document.querySelectorAll("[data-revisit-cookie-policy]");

  if(revisitCookiePolicyLink.length > 0){
    revisitCookiePolicyLink[0].addEventListener("click", function(){

      // reset saved value
      localStorage.removeItem("storeData");

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
        agreedToText.innerHTML = "You previously accepted all cookies.";

        revisitCookiePolicyLink.classList.remove("hide");
      }else if(localStorage.getItem("storeData") == "accept-min"){
        agreedToText.innerHTML = "You previously accepted only essential cookies.";

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

///////////////
// build press cards
// created card
var createdCard;

// where the cards will go
var cardsContainer = document.querySelector("[data-press-cards-container]");

// if press container exists
if(cardsContainer !== null){
  // card template
  var itemTemplate = document.getElementById("press-card-template");
  var itemTemplateElem = itemTemplate.content.querySelector("[data-press-card]");

  // get JSON data
  fetch("/js/press.json")
    .then(response => response.json())
      .then(data => {

        for(let x = 0; x < data.pressItems.length; x++){

          createdCard = document.importNode(itemTemplateElem, true);

          // set innerHTML of title
          createdCard.querySelector("[data-press-title]").innerHTML = data.pressItems[x].label;

          createdCard.querySelector("[data-press-caption]").innerHTML = data.pressItems[x].caption;

          // set href of card
          createdCard.href = data.pressItems[x].linkHref;

          // set link
          createdCard.querySelector("[data-press-link]").innerHTML = data.pressItems[x].linkLabel;

          // append to card container
          cardsContainer.appendChild(createdCard);
        }
      })
}
///////////////

  
}, false);