import './style.css';

const todos = document.querySelector('.todos');
const todo = [
  {
    index: 1,
    desc: '1st task',
    completed: true,
  },
  {
    index: 2,
    desc: '2nd task',
    completed: false,
  },
  {
    index: 3,
    desc: '3d task',
    completed: false,
  },
];

const showTodo = (todo) => {
  todo.forEach((e) => {
    const task = document.createElement('div');
    task.innerHTML = `
  
    <div class="points">
    <input class="check" type="checkbox" id="desc" name="desc" value="${e.index}">${e.desc}
    <i class="fas fa-ellipsis-v" style="color: gray; float: right;"></i>
    </div>
    `;

    todos.appendChild(task);
  });
};

showTodo(todo);