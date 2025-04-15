const tasks = [];

function addTask() {
  const newTask = $('#new-task').val();
  if (newTask.trim() !== '') {
    tasks.push({ text: newTask, completed: false });
    renderTasks();
    $('#new-task').val('');
  }
}

function renderTasks() {
  $('#todo-list').empty();
  tasks.forEach((task, index) => {
    const listItem = $(`
      <li class="todo-item ${task.completed ? 'completed' : ''}">
        <span class="task-text">${task.text}</span>
        <div class="task-actions">
          <button class="edit-btn">✏️</button>
          <button class="delete-btn">❌</button>
        </div>
      </li>
    `);

    listItem.on('click', function (e) {
      if (!$(e.target).hasClass('edit-btn') && !$(e.target).hasClass('delete-btn')) {
        tasks[index].completed = !tasks[index].completed;
        $(this).toggleClass('completed');
      }
    });

    listItem.find('.delete-btn').on('click', function (e) {
      e.stopPropagation();
      tasks.splice(index, 1);
      renderTasks();
    });

    listItem.find('.edit-btn').on('click', function (e) {
      e.stopPropagation();
      const newText = prompt('Введите новое название задачи:', task.text);
      if (newText && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        renderTasks();
      }
    });

    $('#todo-list').append(listItem);
  });
}

$('form').on('submit', function (e) {
  e.preventDefault();
  addTask();
});