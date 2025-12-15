export async function fetchData(endpoint) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
    return await res.json();
  } catch (e) {
    console.error('Ошибка API:', e);
    return [];
  }
}
