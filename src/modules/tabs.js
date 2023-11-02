// Модуль компанента Таб
class DocumentTab {
    constructor() {
      this.buttons = document.querySelectorAll(".tabpage__sheets-btn");
      this.tabs = document.querySelectorAll(".tabpage__container-block");
    }
  }  

function switchActive(element, id) {
    if (element.id === id ) {
        element.classList.add("active"); 
    } else {
        element.classList.remove("active"); 
    }
}  
  

class TabPages {
  constructor(doc) {
    this.doc = doc;
  }

  init = () => {
    const butoonList = this.doc.buttons;
    const tabsList   = this.doc.tabs;
    butoonList.forEach(function (button) {
        button.addEventListener("click", function() {
            let tabId = button.id;
            butoonList.forEach(function (element) {
                switchActive(element,tabId);
                tabsList.forEach(function (tabelement) {
                    switchActive(tabelement,`page_${tabId}`);
                });    
            });

        });
    })
  }
}  


const doc  = new DocumentTab();
const tapPages = new TabPages(doc);

tapPages.init();