const form = document.querySelector('.inputs');

let todoList = [{
    index: 1,
    description: 'Create a todo list website',
    completed: false,
  },
  {
    index: 2,
    description: 'Submit all week activities',
    completed: false,
  },
  {
    index: 3,
    description: 'Spend week-end with family',
    completed: false,
  },
];
out();

//check local storage

if (localStorage.getItem('todo') != undefined) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  out();
}

// render to div

function out() {
  let out = '';
  for (const key in todoList) {
    if (todoList[key].complited === true) {
      out += `<input type='checkbox' checked `;
    } else {
      out += `<input type='checkbox'>`;
    }

    out += todoList[key].description;
    out += `<p id='ppp'></p><br>`;
  }

  const xxx = document.querySelector('.js-todo-list');
  xxx.innerHTML = out;
}

//event when submit form

form.addEventListener('submit', event => {

  // prevent page refresh on form submission

  event.preventDefault();
  const aaa = document.querySelector('.input').value;
  // {description : Add task, complited: false, index: 1}
  const bbb = {};
  bbb.description = aaa;
  bbb.complited = false;
  bbb.index = Date.now();
  const i = todoList.length;
  todoList[i] = bbb;
  console.log(todoList);
  out();

  //local storage

  localStorage.setItem('todo', JSON.stringify(todoList));
});