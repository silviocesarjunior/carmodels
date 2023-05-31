import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../pages/home";
import { Details } from "../pages/detail";
import { Search } from "../pages/search";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: "Detalhes do modelo selecionado",
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: "Veja o resultado da nossa pesquisa",
        }}
      />
    </Stack.Navigator>
  );
}
