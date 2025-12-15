import { fetchData } from '../api.js';

export async function renderComments(container) {
  const comments = await fetchData('comments');

  const controlContainer = document.createElement('div');
  const listContainer = document.createElement('div');

  const input = document.createElement('input');
  input.placeholder = 'Поиск по имени или тексту комментария';

  input.addEventListener('input', () => {
    const value = input.value.toLowerCase();
    const filtered = comments.filter(comment =>
      comment.name.toLowerCase().includes(value) ||
      comment.body.toLowerCase().includes(value)
    );
    renderList(filtered);
  });

  controlContainer.appendChild(input);
  container.appendChild(controlContainer);
  container.appendChild(listContainer);

  function renderList(list) {
    listContainer.innerHTML = ''; // очищаем только список

    const ul = document.createElement('ul');
    list.forEach(comment => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${comment.name}</strong><br>${comment.body}`;
      ul.appendChild(li);
    });

    listContainer.appendChild(ul);
  }

  renderList(comments);
}
