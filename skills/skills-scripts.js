window.addEventListener("load", function(){

  console.log("loaded skills-scripts");

  // populatePresentationLinks()

///////////////

// populate presentation links
function populatePresentationLinks(){
  
  // new link
  var createdLink, createdLinkRow;

  // where the links will go
  var linksContainer = document.querySelector("[data-links-container]");

  // link section template
  var linkTemplate = document.getElementById("link-template");
  var linkRowElem = linkTemplate.content.querySelector("[data-link-row]");

  fetch("./presentations.bak.json")
    .then(response => response.json())
      .then(data => {

        for(let x = 0; x < data.presentations.length; x++){

          createdLinkRow = document.importNode(linkRowElem, true);

          createdLink = createdLinkRow.querySelector("[data-link]");

          // set link label
          createdLink.innerHTML = data.presentations[x].label;

          // set href of a tag
          createdLink.href = data.presentations[x].href;

          // append to links section
          linksContainer.appendChild(createdLinkRow);

        }
      })
}

///////////////

// _____ Scripts
///////////////
}, false);