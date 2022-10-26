window.addEventListener("load", function(){


  //change copyright date  
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  
  var copyrightSpan = document.getElementById("current-year-text");
  copyrightSpan.appendChild(document.createTextNode(currentYear));
  // 
  
  }, false);