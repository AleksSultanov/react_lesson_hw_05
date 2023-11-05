/*
  1. Todo list с массивом даных todos: []
  2. Реализуем параметр done у объекта todo
  3. Удаляем todo через метод filter
  4. Добавим время выполнения задачи
  5. Сортировка asc, desc
  6. Общее время открытых задач с помощью reduce
  7. Объекты keys, values, entries
  8. Прототипы
  9. this и методы объектов
  10. Переписываем todolist на классы

  ДЗ десь осталось вынести сортировку в конкретный класс и потенциально вынести в отдельный класс работу с document.  
*/


let todos = [];

class LStorage {
  getTodos() {
    const todos = localStorage.getItem("todos");
    const parsedTodos = JSON.parse(todos);

    return parsedTodos;
  }

  setTodos(todos) {
    const todosString = JSON.stringify(todos);

    localStorage.setItem("todos", todosString);
  }
}

class TodoList {
  constructor(storage,doc) {
    this.storage = storage;
    this.todos = this.storage.getTodos() || [];
    this.doc = doc;
  }

  init = () => {
    this.render();

    this.doc.todoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const todoText = this.doc.todoTextInput.value;
      const todoTime = this.doc.todoTimeInput.value;
      const trimmedText = todoText.trim();

      const todo = {
        id: Date.now(),
        text: trimmedText,
        done: false,
        time: todoTime,
      };

      if (trimmedText) {
        this.todos.push(todo);

        this.doc.todoTextInput.value = "";
        this.doc.todoTimeInput.value = "";
        this.doc.todoTextInput.focus();
      }

      this.render();
    });
  };

  render = () => {
    const todosNodes = this.todos.map(this.createTodo);

    this.doc.todoList.innerHTML = "";
    
    const todoList = this.doc.todoList;
    todosNodes.forEach(function (todoNode) {
      todoList.appendChild(todoNode);
    });

    const timeSumNonCompletedTodos = this.todos.reduce(function (acc, curr, idx) {
      if (!curr.done) {
        acc += Number(curr.time);
      }

      return acc;
    }, 0);

    this.storage.setTodos(this.todos);

    this.doc.timeValue.textContent = timeSumNonCompletedTodos;
  };

  todoItemListener = (event) => {
    const current = event.target;
    const parentNode = current.closest("li");
    const isDeleteButton = event.target.closest(".todo__remove-button");
    const isDoneButton = event.target.closest(".todo__done-button");
    const parentNodeId = parentNode.id;

    if (isDeleteButton) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== Number(parentNodeId);
      });

      this.render();
    } else if (isDoneButton) {
      this.todos.forEach((todo) => {
        if (todo.id === Number(parentNodeId)) {
          todo.done = !todo.done;
        }
      });

      this.render();
    }
  };

  createTodo = (todo) => {
    const liElement = this.doc.getliElement();

    liElement.id = todo.id;
    liElement.classList.add("todo__item");

    if (todo.done) {
      liElement.classList.add("done");
    }

    const todoTemplate = `
      <span class="todo__item-text">${todo.text}</span>
      ${todo.time ? `<span class="todo__item-time">${todo.time}</span>` : ""}
      <div class="todo__controls">
        <button class="todo__done-button">Выполнено</button>
        <button class="todo__remove-button">Удалить</button>
      </div>
    `;

    liElement.innerHTML = todoTemplate;

    liElement.addEventListener("click", this.todoItemListener);

    return liElement;
  };
}

// Код ДЗ - осталось вынести сортировку в конкретный класс и потенциально вынести в отдельный класс работу с document.  

class DocumentTodo {
  constructor() {
    this.sortByDoneButton = document.querySelector(".todo__sort-button.done");
    this.sortByTimeButton = document.querySelector(".todo__sort-button.time");
    this.todoTextInput = document.querySelector(".todo__text-input");
    this.todoTimeInput = document.querySelector(".todo__time-input");
    this.todoList = document.querySelector(".todo__list");
    this.todoForm = document.querySelector(".todo__form");
    this.timeValue = document.querySelector(".todo__time-value");
  }
  getliElement() {
    const liElement = document.createElement("li");
    return liElement;
  }
  
}  


class SortTodoList {
  constructor(todoslist, doc) {
    this.todoslist = todoslist;
    this.sortType = null;
    this.doc = doc;
    this.SORT_TYPES = { asc: "asc",
                        desc: "desc",
                      };
  
  }
  
  sortByKey = (key) => {
    let todos = this.todoslist.todos;
    if (!this.sortType || this.sortType === this.SORT_TYPES.desc) {
      todos.sort(function (a, b) {
        return Number(a[key]) - Number(b[key]);
      });
  
      this.sortType = this.SORT_TYPES.asc;
    } else {
      todos.sort(function (a, b) {
        return Number(b[key]) - Number(a[key]);
      });
  
      this.sortType = this.SORT_TYPES.desc;
    }
  
    this.todoslist.render();
  }

  init = () => {
    const loc_sortByKey =  this.sortByKey;
    const sortByTimeButton = this.doc.sortByTimeButton;
    const sortByDoneButton = this.doc.sortByDoneButton;

    sortByTimeButton.addEventListener("click", function () {
    // this.sortByKey('time');  ругается this.sortByKey is not a function
      loc_sortByKey.call({ todoslist : this.todoslist,
                          }, 'time');
      });
    sortByDoneButton.addEventListener("click", function () {
      loc_sortByKey.call({ todoslist : this.todoslist,
                         }, 'done');
      });
  }

}  

const doc  = new DocumentTodo();
const storage = new LStorage();

const list = new TodoList(storage,doc);
const sortList = new SortTodoList(list,doc);

list.init();
sortList.init();
