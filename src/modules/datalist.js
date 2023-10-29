// Модуль для сбора данных из полей imput

class DataList {
    constructor(formclassname) {
      this.form = document.querySelector(`.${formclassname}`);
      this.inputs = document.querySelectorAll(`.${formclassname} input`);
    }
  
    init = () => {
        const inputs = this.inputs;
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            inputs.forEach(function (element) {
                let datalog = {class: element.className,
                               id: element.id,   
                               value: element.value   
                              }
                console.log(datalog);
            });
            
        });

    }
}

const list = new DataList("data__form");

list.init();

  