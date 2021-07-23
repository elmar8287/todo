const form = document.querySelector('.inputs');
let todoList = [];

//check local storage
if (localStorage.getItem('todo')!=undefined) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  out();
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

// render to div
function out() {
  let out = '';
  for (let key in todoList) {
    if (todoList[key].complited == true) {
      out += `<input type="checkbox" checked id="check-b"`;
    } else {
      out += `<input type="checkbox">`;
      
    }

    out += todoList[key].description;
    out += `<p id="ppp">sdfsdf</p><br>`;
    
  }
  const xxx = document.querySelector('.js-todo-list');
  xxx.innerHTML = out;
}