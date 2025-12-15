import { fetchData } from '../api.js';

export async function renderPosts(container) {
  const posts = await fetchData('posts');

  const controlContainer = document.createElement('div');
  const listContainer = document.createElement('div');

  const input = document.createElement('input');
  input.placeholder = 'Поиск по заголовку или содержимому';

  input.addEventListener('input', () => {
    const value = input.value.toLowerCase();
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(value) ||
      post.body.toLowerCase().includes(value)
    );
    renderList(filtered);
  });

  controlContainer.appendChild(input);
  container.appendChild(controlContainer);
  container.appendChild(listContainer);

  function renderList(list) {
    listContainer.innerHTML = ''; // очищаем только список

    const ul = document.createElement('ul');
    list.forEach(post => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${post.title}</strong><br>${post.body}`;
      ul.appendChild(li);
    });

    listContainer.appendChild(ul);
  }

  renderList(posts);
}
