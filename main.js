async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

async function getChefBirthday(id) {
  const recipes = await fetchJson(`https://dummyjson.com/recipes/${id}`);
  const user = await fetchJson(`https://dummyjson.com/users/${recipes.userId}`);
  return { birthDate: user.birthDate };
}

getChefBirthday(1)
  .then(birthDate => console.log(birthDate))
  .catch(error => console.error('Error fetching data:', error));
