const tasks = [];

function addTask() {
  const newTask = document.getElementById('new-task').value;
  if (newTask.trim() !== '') {
    tasks.push({ task: newTask, completed: false });
    const taskIndex = tasks.length - 1;

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-container';

    const taskNameElement = document.createElement('span');
    taskNameElement.innerText = newTask;

    const editButton = document.createElement('button');
    editButton.innerHTML = '✏';
    editButton.className = 'edit-btn';

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '❌';
    deleteButton.className = 'delete-btn';

    taskContainer.appendChild(taskNameElement);
    taskContainer.appendChild(editButton);
    taskContainer.appendChild(deleteButton);
    listItem.appendChild(taskContainer);

    listItem.addEventListener('click', function (e) {
      // Проверяем, что клик был не по кнопкам
      if (e.target === taskNameElement || e.target === taskContainer || e.target === listItem) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        listItem.classList.toggle('completed');
      }
    });

    editButton.addEventListener('click', function (e) {
      e.stopPropagation(); // Останавливаем всплытие события
      const newName = prompt('Введите новое название задачи:', tasks[taskIndex].task);
      if (newName && newName.trim() !== '') {
        tasks[taskIndex].task = newName;
        taskNameElement.innerText = newName;
      }
    });

    deleteButton.addEventListener('click', function (e) {
      e.stopPropagation(); // Останавливаем всплытие события
      tasks.splice(taskIndex, 1);
      listItem.remove();
    });

    document.getElementById('todo-list').appendChild(listItem);
    document.getElementById('new-task').value = '';
  }
}

document.getElementById('add-button').onclick = addTask;