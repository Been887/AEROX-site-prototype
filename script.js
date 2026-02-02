/*idea is to use only one html file for the whole website to save code,
then use js to select which div is open*/
let curID = 2;
let logPage = 0;
let sidebarOpen = false, sidebarExists;
let lastScrollTop = window.scrollY;

let logsTitle ="";
let logsBannerIMG ="";
let logsHTML ="";

const searchbarInput = document.getElementById("searchbarInput");
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

async function loadLogs(page) {
  const res = await fetch("logs.txt");
  const rawText = await res.text();
  const lines = rawText.split("\n");

  const pages = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("##title "+page+" -")) {
      logsTitle = lines[i].slice(11).trim();
      i++;
      logsBannerIMG = lines[i].trim();
      i++;
      logsHTML = "";
      while(!lines[i].startsWith("#~#")) {
        logsHTML = logsHTML+lines[i]+"\n";
        i++;
      }
      break;
    }
  }//this part loads the logs into global variables.

  document.getElementById("addTitle").innerHTML = logsTitle;
  document.getElementById("bannerIMG").src = logsBannerIMG;
  document.getElementById("addContent").innerHTML = logsHTML;

  return;
}

function sidebarRefresh() {
  sidebarOpen ? sidebar.style.left = "0" : sidebar.style.left = "-10.55vw";
  sidebarExists ? sidebar.style.display = "block" : sidebar.style.display = "none";
  loadLogs(logPage);
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