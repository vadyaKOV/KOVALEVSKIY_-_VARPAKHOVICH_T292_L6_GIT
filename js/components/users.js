import { fetchData } from '../api.js';

export async function renderUsers(container) {
  let usersFromServer = await fetchData('users');
  let localUsers = JSON.parse(localStorage.getItem('users') || '[]');
  let allUsers = [...usersFromServer, ...localUsers];

  const input = document.createElement('input');
  input.placeholder = 'Поиск по имени или email';

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Добавить пользователя';

  const listContainer = document.createElement('div');

  input.addEventListener('input', () => {
    const value = input.value.toLowerCase();
    const filtered = allUsers.filter(u =>
      u.name.toLowerCase().includes(value) || u.email.toLowerCase().includes(value)
    );
    renderList(filtered);
  });

  addBtn.onclick = () => {
    const name = prompt('Имя пользователя');
    const email = prompt('Email');
    if (!name || !email) return;

    const newUser = { id: Date.now(), name, email };
    localUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(localUsers));
    allUsers.push(newUser);
    renderList(allUsers);
  };

  container.appendChild(input);
  container.appendChild(addBtn);
  container.appendChild(listContainer);

  function renderList(list) {
    listContainer.innerHTML = '';

    const ul = document.createElement('ul');
    list.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name} (${user.email})`;

      if (user.id >= 1000) {
        const del = document.createElement('button');
        del.textContent = 'Удалить';
        del.onclick = () => {
          localUsers = localUsers.filter(u => u.id !== user.id);
          localStorage.setItem('users', JSON.stringify(localUsers));
          allUsers = [...usersFromServer, ...localUsers];

          renderList(allUsers);
        };
        li.appendChild(del);
      }

      ul.appendChild(li);
    });

    listContainer.appendChild(ul);
  }

  renderList(allUsers);
}
