async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

async function getChefBirthday(id) {

  let recipe;

  try {
    recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`);
  } catch (error) {
    throw new Error(`Non sono riuscito a recuperare la ricetta con id: ${id}`);
  }

  let user;
  try {
    user = await fetchJson(`https://dummyjson.com/users/${recipe.userId}`);
  } catch (error) {
    throw new Error(`Non sono riuscito a recuperare lo chef con id: ${recipe.userId}`);
  }

  return { birthDate: user.birthDate };
}

// Esempio di utilizzo
(async () => {
  try {
    const birthDate = await getChefBirthday(1);
    console.log(`data di nascita dello chef:`, birthDate);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    console.log('Operazione completata.');
  }
})();
