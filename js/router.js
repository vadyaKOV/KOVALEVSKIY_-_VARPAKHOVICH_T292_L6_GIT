import { renderUsers } from './components/users.js';
import { renderTodos } from './components/todos.js';
import { renderPosts } from './components/posts.js';
import { renderComments } from './components/comments.js';
import { renderBreadcrumbs } from './components/breadcrumbs.js';

export function router() {
  const hash = location.hash;
  const app = document.getElementById('app');
  app.innerHTML = '';

  renderBreadcrumbs(hash, app);

  if (hash === '#users') renderUsers(app);
  else if (hash === '#users#todos') renderTodos(app);
  else if (hash === '#users#posts') renderPosts(app);
  else if (hash === '#users#posts#comments') renderComments(app);
  else app.innerHTML = '<h2>Выберите раздел</h2>';
}
