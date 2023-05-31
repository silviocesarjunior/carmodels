import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import api from "../../services/api";
import { CarList } from "../../components/carlist";

export function Search() {
  const route = useRoute();
  const [models, setModels] = useState([]);

  useEffect(() => {
    async function fetchModels() {
      const response = await api.get(`/car?name_like=${route.params?.name}`);
      setModels(response.data);
    }

    fetchModels();
  }, [route.params?.name]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={models}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CarList data={item} />}
        ListEmptyComponent={()=> <Text style={styles.text}>Não encontramos o que procura...</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9FF",
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
  },
  text: {
    fontSize: 16
  }
});
