import { fetchData } from '../api.js';

export async function renderTodos(container) {
  const todos = await fetchData('todos');

  const controlContainer = document.createElement('div');
  const listContainer = document.createElement('div');

  const input = document.createElement('input');
  input.placeholder = 'Поиск по названию задачи';

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Добавить TODO';

  controlContainer.appendChild(input);
  controlContainer.appendChild(addBtn);
  container.appendChild(controlContainer);
  container.appendChild(listContainer);

  let allTodos = [...todos];

  input.addEventListener('input', () => {
    const value = input.value.toLowerCase();
    const filtered = allTodos.filter(todo =>
      todo.title.toLowerCase().includes(value)
    );
    renderList(filtered);
  });

  addBtn.onclick = () => {
    const title = prompt('Название задачи');
    const userId = parseInt(prompt('ID пользователя'), 10);
    if (!title || isNaN(userId)) return;

    const newTodo = { id: Date.now(), title, userId, completed: false };
    allTodos.push(newTodo);
    renderList(allTodos);
  };

  function renderList(list) {
    listContainer.innerHTML = '';

    const ul = document.createElement('ul');
    list.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = `${todo.title} [${todo.completed ? '✔' : '✘'}]`;
      ul.appendChild(li);
    });

    listContainer.appendChild(ul);
  }

  renderList(allTodos);
}
