import AsyncStorage from '@react-native-async-storage/async-storage';

// buscar os favoritos
// salvar um novo favorito
//remover um favorito da lista

export async function getFavorites(key) {
  const favorites = await AsyncStorage.getItem(key);
  return JSON.parse(favorites) || [];
}

export async function saveFavorite(key, newItem) {
  let myFavorites = await getFavorites(key);
  let hasItem = myFavorites.some((item) => item.id === newItem.id);

  if (hasItem) {
    console.log("Já temos este item na lista");
    return;
  }
  myFavorites.push(newItem);

  await AsyncStorage.setItem(key, JSON.stringify(myFavorites));
  console.log("Salvo com sucesso");
}

export async function removeItem(id) {
  let models = await getFavorites("@appmodelscar");

  let myFavorites = models.filter((item) => {
    return (item.id !== id);
  });

  await AsyncStorage.setItem("@appmodelscar", JSON.stringify(myFavorites));
  console.log("Item deletado com sucesso");
  return myFavorites;
}

export async function isFavorite(listcar) {
  let mycar = await getFavorites("@appmodelscar");
  const favorite = mycar.find((item) => item.id === listcar.id);

  if (favorite) {
    return true;
  }
  return false;
}
