export function renderBreadcrumbs(hash, container) {
  const crumbs = hash.split('#').filter(Boolean);
  const nav = document.createElement('nav');
  nav.className = 'breadcrumbs';

  crumbs.forEach((crumb, i) => {
    const span = document.createElement('span');
    span.textContent = crumb;
    nav.appendChild(span);
    if (i < crumbs.length - 1) nav.appendChild(document.createTextNode(' > '));
  });

  container.appendChild(nav);
}
