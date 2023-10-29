// Модуль компанента Таб
class DocumentTab {
    constructor() {
      this.Buttons = document.querySelectorAll(".tabpage__sheets-btn");
      this.Tabs = document.querySelectorAll(".tabpage__container-block");
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
    const Butoonlist = this.doc.Buttons;
    const TabsList   = this.doc.Tabs;
    Butoonlist.forEach(function (button) {
        button.addEventListener("click", function() {
            let tabId = button.id;
            Butoonlist.forEach(function (element) {
                switchActive(element,tabId);
                TabsList.forEach(function (tabelement) {
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