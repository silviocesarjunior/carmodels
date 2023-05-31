import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { getFavorites } from "../../utils/storage";
import { useIsFocused } from "@react-navigation/native";
import { CarList } from "../../components/carlist";

export function Favorites() {
  const [models, setModels] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;
    async function getCarModels() {
      const result = await getFavorites("@appmodelscar");
      if (isActive) {
        setModels(result);
      }
    }
    if (isActive) {
      getCarModels();
    }
    return () => {
        isActive = false;
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Página de favoritos</Text>
      {models.length === 0 && (
        <Text>Você ainda não tem nenhum modelo favorito</Text>
      )}
      
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginTop: 14}}
        data={models}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <CarList data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9FF",
    paddingTop: 50,
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 24,
  },
});
