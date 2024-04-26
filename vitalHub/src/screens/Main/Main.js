import {
  createBottomTabNavigator,
  reactBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomePaciente } from "../HomePaciente/HomePaciente";
import { TelaPerfil } from "../TelaPerfil/TelaPerfil";
import { ContentIcon, TextIcon } from "./Style";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { HomeMedico } from "../HomeMedico/HomeMedico";
import { UserDecodeToken } from "../../utils/Auth";
import { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const BottomTab = createBottomTabNavigator();

export const Main = () => {
  const [token, setToken] = useState("");

  async function getRole() {
    const tokendecodificado = await UserDecodeToken();
    console.log("ROLEEEEEEEE");
    console.log(tokendecodificado.role);
    setToken(tokendecodificado);
  }

  useEffect(() => {
    getRole();
  }, []);
  return (
    <BottomTab.Navigator
      initialRouteName="HomePaciente"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#FFF", height: 80, paddingTop: 10 },
        tabBarActiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          if (route.name === "HomePaciente") {
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome name="calendar" size={18} color="#4E4B59" />

                {focused && <TextIcon>Agenda</TextIcon>}
              </ContentIcon>
            );
          } else {
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome5 name="user-circle" size={18} color="#4E4B59" />

                {focused && <TextIcon>Perfil</TextIcon>}
              </ContentIcon>
            );
          }
        },
      })}
    >
      {token.role == "Paciente" ? (
        <BottomTab.Screen name="HomePaciente" component={HomePaciente} />
      ) : (
        <BottomTab.Screen name="HomeMedico" component={HomeMedico} />
      )}

      <BottomTab.Screen name="TelaPerfil" component={TelaPerfil} />
    </BottomTab.Navigator>
  );
};