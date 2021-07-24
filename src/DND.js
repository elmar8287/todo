/* eslint-disable */

function dragFunction() {
  const draggables = document.querySelectorAll('.item');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });

  const container = document.getElementById('show');
  container.addEventListener('dragover', (e) => {
    e.preventDefault();

    const afterElement = getDragAfterElement(container, e.clientY);
    const currentDragging = document.querySelector('.dragging');
    if (afterElement == null) {
      container.appendChild(currentDragging);
    } else {
      container.insertBefore(currentDragging, afterElement);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    },
  ).element;
}

function statusUpdate(theItem) {
  const theId = parseInt(theItem.id.match(/\d+/g)[0], 10);

  if (list[theId - 1].completed === false) {
    list[theId - 1].completed = true;
  } else {
    list[theId - 1].completed = false;
  }

  localStorage.setItem(theId, JSON.stringify(list[theId - 1]));
}
  
function sorting(source, target) {
  const savedList = JSON.parse(localStorage.getItem('savedList'));
  if (savedList.length < 2) return;

  const sourceObj = savedList[source];
  const souceIndex = savedList[source].index;
  let targetIndex;
  savedList.forEach((obj) => {
    if (obj.index === Number(target)) {
      targetIndex = savedList.indexOf(obj);
    }
  });

  savedList[source].index = savedList[targetIndex].index;
  savedList[targetIndex].index = souceIndex;

  savedList[source] = savedList[targetIndex];
  savedList[targetIndex] = sourceObj;
  localStorage.setItem('savedList', JSON.stringify(savedList));
}

export default function dragAndDrop(event, index) {
  const newEvent = event.type;
  const source = index;
  switch (newEvent) {
    case 'dragstart':
      event.target.classList.add('dragging');
      break;
    case 'dragend':
      event.target.classList.remove('dragging');
      sorting(source, target);
      break;
    case 'dragover':
      if (event.target.className === 'list-item') {
        target = event.target.children[2].innerHTML;
      }
      break;
    default:
      break;
  }
}