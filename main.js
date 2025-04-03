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


  if (!recipe || !recipe.userId) {
    throw new Error(`Ricetta non trovata con id: ${id}`);
  }


  let user;
  try {
    user = await fetchJson(`https://dummyjson.com/users/${recipe.userId}`);
  } catch (error) {
    throw new Error(`Non sono riuscito a recuperare lo chef con id: ${recipe.userId}`);
  }

  //Formattazione data
  const formattedDate = dayjs(user.birthDate).format('DD/MM/YYYY');
  return formattedDate;
}

// Esempio di utilizzo
(async () => {
  try {
    const formattedDate = await getChefBirthday(1);
    console.log(`data di nascita dello chef:`, formattedDate);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    console.log('Operazione completata.');
  }
})();
