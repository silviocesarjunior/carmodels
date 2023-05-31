import { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Modal,
  Share,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { FichaTecnica } from "../../components/fichatecnica";
import { Instructions } from "../../components/instructions";
import { VideoView } from "../../components/video";
import { isFavorite, saveFavorite, removeItem } from "../../utils/storage";

export function Details() {
  let site = "https://silviocesarjunior.netlify.app/";
  const route = useRoute();
  const navigation = useNavigation();
  const [showVideo, setShowVideo] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useLayoutEffect(() => {
    async function getStatusFavorites() {
      const carFavorite = await isFavorite(route.params?.data);
      setFavorite(carFavorite);
    }

    getStatusFavorites();

    navigation.setOptions({
      title: route.params?.data
        ? route.params?.data.name
        : "Detalhes do modelo",
      headerRight: () => (
        <Pressable onPress={() => handleFavoriteCarmodels(route.params?.data)}>
          {favorite ? (
            <Entypo name="heart" size={28} color="#FF4141" />
          ) : (
            <Entypo name="heart-outlined" size={28} color="#FF4141" />
          )}
        </Pressable>
      ),
    });
  }, [navigation, route.params?.data, favorite]);

  async function handleFavoriteCarmodels(listcar) {
    if (favorite) {
      await removeItem(listcar.id);
      setFavorite(false);
    } else {
      await saveFavorite("@appmodelscar", listcar);
      setFavorite(true);
    }
  }

  function handleOpenvideo() {
    setShowVideo(true);
  }

  async function shareCar() {
    try {
      await Share.share({
        message: `Carro: ${route.params?.data.name}\n ${site} `,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 14 }}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={handleOpenvideo}>
        <View style={styles.playicon}>
          <AntDesign name="playcircleo" size={50} color="#FAFAFA" />
        </View>
        <Image
          source={{ uri: route.params?.data.cover }}
          style={styles.cover}
        />
      </Pressable>
      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.title}>{route.params?.data.name}</Text>
          <Text style={styles.fichatecnicaText}>
            Ficha técnica contém {route.params?.data.total_fichatecnica} - itens
          </Text>
        </View>
        <Pressable onPress={shareCar}>
          <Feather name="share-2" size={24} color="#121212" />
        </Pressable>
      </View>
      {route.params?.data.fichatecnica.map((item) => (
        <FichaTecnica key={item.id} data={item} />
      ))}

      <View style={styles.informationsArea}>
        <Text style={styles.informationsText}>Informações adicionais</Text>
        <Feather name="arrow-down" size={24} color="#FFF" />
      </View>
      {route.params?.data.instructions.map((item, index) => (
        <Instructions key={item.id} data={item} index={index} />
      ))}

      <Modal visible={showVideo} animationType="slide">
        <VideoView
          handleClose={() => setShowVideo(false)}
          videoUrl={route.params?.data.video}
        />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F9FF",
    paddingTop: 14,
    paddingEnd: 14,
    paddingStart: 14,
  },
  cover: {
    height: 200,
    borderRadius: 14,
    width: "100%",
  },
  playicon: {
    position: "absolute",
    zIndex: 9,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginTop: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  fichatecnicaText: {
    marginBottom: 14,
    fontSize: 16,
  },
  headerDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  informationsArea: {
    backgroundColor: "#5f512d",
    flexDirection: "row",
    padding: 8,
    borderRadius: 4,
    marginBottom: 14,
  },
  informationsText: {
    fontSize: 18,
    fontWeight: 500,
    color: "#FFF",
    marginRight: 8,
  },
});
