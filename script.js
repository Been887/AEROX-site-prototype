/*idea is to use only one html file for the whole website to save code,
then use js to select which div is open*/
let curID = 2;
let sidebarOpen = false, sidebarExists;
let lastScrollTop = window.scrollY;

//const fs = require("fs");

const content = document.getElementById("content");
const pgs = content.children;
const topbar = document.getElementById("topbar");
const sidebar = document.getElementById("sidebar");

document.addEventListener('scroll', () => {
  let currentScrollTop = window.scrollY;

  if (currentScrollTop > lastScrollTop) {
    // hide topbar with animation
    topbar.style.top = "-10%";
  } else if (currentScrollTop < lastScrollTop) {
    //show topbar via animation
    topbar.style.top = "0";
  }

  lastScrollTop = currentScrollTop; // Update for next event
});

function sidebarRefresh() {
  sidebarOpen ? sidebar.style.left = "0" : sidebar.style.left = "-10.1vw";
  sidebarExists ? sidebar.style.display = "block" : sidebar.style.display = "none";
}

//function for when user clicks a local link
function refresh() {
  for(let i = 0; i<pgs.length; i++) {
    if(i==curID) {
      pgs[i].style.display = "block";
      
      i>4 || i==2 ? sidebarExists = true : sidebarExists = false;
      sidebarRefresh();
      
    } else {
      pgs[i].style.display = "none";
    }
  }
}

refresh();