window.addEventListener("load", function(){

  console.log("links/scripts.js loaded");

  // created link row
  var createdLink;

  // where the links will go
  var linksContainer = document.querySelector("[data-links-container]");

  // link template
  var itemTemplate = document.getElementById("link-template");
  var itemTemplateElem = itemTemplate.content.querySelector("[data-link-row]");

  // get JSON data
  fetch("links.json")
    .then(response => response.json())
      .then(data => {

        for(let x = 0; x < data.linkItems.length; x++){

          createdLink = document.importNode(itemTemplateElem, true);

          // set innerHTML of label
          createdLink.querySelector("[data-link-label]").innerHTML = data.linkItems[x].label;

          // set href of a tag
          createdLink.href = data.linkItems[x].href;

          // append to link container
          linksContainer.appendChild(createdLink);
        }
      })

  ///////////////
  
}, false);