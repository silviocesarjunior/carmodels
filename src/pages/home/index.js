import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Logo } from "../../components/logo";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import { CarList } from "../../components/carlist";
import { useNavigation } from "@react-navigation/native";
import { Text as MotiText } from "moti";

export function Home() {
  const [inputValue, setInputValue] = useState("");
  const [car, setCar] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchApi() {
      const response = await api.get("/car");
      setCar(response.data);
    }
    fetchApi();
  }, []);
  function handleSearch() {
    if (!inputValue) return;

    let input = inputValue;
    setInputValue("");
    navigation.navigate("Search", { name: input });

    console.log("voce digitou");
    console.log(inputValue);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 15,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          delay: 100,
          type: "timing",
          duration: 650,
        }}
      >
        Encontre o modelo desejado
      </MotiText>
      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 15,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          delay: 200,
          type: "timing",
          duration: 850,
        }}
      >
        que combina com você
      </MotiText>

      <View style={styles.form}>
        <TextInput
          placeholder="Digite o modelo do carro..."
          style={styles.input}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={28} color="#5f512d" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={car}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CarList data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9FF",
    paddingTop: 36,
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0e0e0e",
  },
  form: {
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "ECECEC",
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
    maxWidth: "90%",
    height: 54,
  },
});
