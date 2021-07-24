/* eslint-disable */

(function () {
  let todoItemsDefault = JSON.parse(localStorage.getItem("todoItems"));

  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Add to your list...";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Add";
    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    input.addEventListener("input", function (e) {
      e.preventDefault();
      if (input.value.length > 0) {
        button.disabled = false;
      } else if (input.value.length == 0) {
        button.disabled = true;
      }
    });

    return {
      form,
      input,
      button,
    };
  }

  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function setItLocal(newState) {
    localStorage.setItem("todoItems", JSON.stringify(newState));
  }

  function createTodoItem(description, complete) {
    let item = document.createElement("li");
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    

    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );    
    item.textContent = description;
    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Done";
    doneButton.dataset.description = description;
    
    deleteButton.classList.add("btn", "btn-secondary");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.description = description;
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    if (complete == true) {
      item.classList.add("list-group-item-success");
    }

    for (let todoItem of todoItemsDefault) {
      doneButton.addEventListener("click", function () {
        if (todoItem.description == this.dataset.description) {
          item.classList.toggle("list-group-item-success");
          let index = todoItemsDefault.indexOf(todoItem);
          todoItemsDefault[index].complete = todoItem.complete ? false : true;
          setItLocal(todoItemsDefault);
        }
      });

      deleteButton.addEventListener("click", function () {
        if (todoItem.description == this.dataset.description) {
          item.remove();
          todoItemsDefault.splice(todoItemsDefault.indexOf(todoItem), 1);
          setItLocal(todoItemsDefault);
        }
      });
    }

    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function createTodoApp(container, title = "Tasks", arrayCases) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    if (localStorage.getItem("todoItems") == null) {
      setItLocal(arrayCases);
    }

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    for (let todoItem of todoItemsDefault) {
      let todoItemElem = createTodoItem(todoItem.description, todoItem.complete);

      todoList.append(todoItemElem.item);
    }

    todoItemForm.form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!todoItemForm.input.value) {
        return;
      }
      todoItemsDefault.push({
        description: todoItemForm.input.value,
        complete: false,
        index: todoItemsDefault.length+1
      });
      setItLocal(todoItemsDefault);

      let todoItem = createTodoItem(todoItemForm.input.value);
      todoList.append(todoItem.item);
      todoItemForm.input.value = "";
    });
  }
  window.createTodoApp = createTodoApp;
})();

let defaultTasks = [
  {description: 'Create Todo project', complete: true, index: 1},
  {description: 'Give feedback to partners', complete: false, index: 2},
  {description: 'Spend week-end with family', complete: false, index: 3}
];

document.addEventListener('DOMContentLoaded', function() {
  createTodoApp(document.getElementById('todo-app'), 'Today`s To Do', defaultTasks);
});