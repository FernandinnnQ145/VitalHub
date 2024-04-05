import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navegacao } from "./src/screens/Navegacao/Navegacao";
import { Login } from "./src/screens/Login/Login";
import { RecuperarSenha } from "./src/screens/RecuperarSenha/RecuperarSenha";
import {
  useFonts,
  MontserratAlternates_600SemiBold,
  MontserratAlternates_500Medium,
  MontserratAlternates_700Bold,
} from "@expo-google-fonts/montserrat-alternates";
import {
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_400Regular,
} from "@expo-google-fonts/quicksand";
import { RedefinirSenha } from "./src/screens/RedefinirSenha/RedefinirSenha";
import { CriarConta } from "./src/screens/CriarConta/CriarConta";
import { VerificarConta } from "./src/screens/VerificarConta/VerificarConta";
import { TelaPerfil } from "./src/screens/TelaPerfil/TelaPerfil";
import { Prontuario } from "./src/screens/Prontuario/Prontuario";
import { HomeMedico } from "./src/screens/HomeMedico/HomeMedico";
import { HomePaciente } from "./src/screens/HomePaciente/HomePaciente";
import { SelecionarClinica } from "./src/screens/SelecionarClinica/SelecionarClinica";
import { SelecionarMedico } from "./src/screens/SelecionarMedico/SelecionarMedico";
import { SelecionarData } from "./src/screens/SelecionarData/SelecionarData";
import { LocalConsulta } from "./src/screens/LocalConsulta/LocalConsulta";
import { PrescricaoConsulta } from "./src/screens/PrescricaoConsulta/PrescricaoConsulta";
import { Main } from "./src/screens/Main/Main";
import Camera2, { CameraComponent } from "./src/screens/Camera/Camera";
import Camera from "./src/screens/Camera/Camera";
import { TextInput } from "react-native";
import { UserDecodeToken } from "./src/utils/Auth";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_700Bold,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    //Container-
    //Navigator-Componente
    //Screen-tela
    //name: Nome da tela
    //component: Component que sera chamado
    //options: title da tela

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />

        <Stack.Screen name="Main" component={Main} />

        {/* <Stack.Screen
        name='Navegacao'
        component={Navegacao}
        options={{title: "Navegacao"}}
        
        /> */}

        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenha}
          options={{ title: "RecuperarSenha" }}
        />
        <Stack.Screen
          name="RedefinirSenha"
          component={RedefinirSenha}
          options={{ title: "RedefinirSenha" }}
        />
        <Stack.Screen
          name="CriarConta"
          component={CriarConta}
          options={{ title: "CriarConta" }}
        />
        <Stack.Screen
          name="VerificarConta"
          component={VerificarConta}
          options={{ title: "VerificarConta" }}
        />
        <Stack.Screen
          name="TelaPerfil"
          component={TelaPerfil}
          options={{ title: "TelaPerfil" }}
        />
        <Stack.Screen
          name="Prontuario"
          component={Prontuario}
          options={{ title: "Prontuario" }}
        />
        <Stack.Screen
          name="HomeMedico"
          component={HomeMedico}
          options={{ title: "HomeMedico" }}
        />
        <Stack.Screen
          name="HomePaciente"
          component={HomePaciente}
          options={{ title: "HomePaciente" }}
        />
        <Stack.Screen
          name="SelecionarClinica"
          component={SelecionarClinica}
          options={{ title: "SelecionarClinica" }}
        />
        <Stack.Screen
          name="SelecionarMedico"
          component={SelecionarMedico}
          options={{ title: "SelecionarMedico" }}
        />
        <Stack.Screen
          name="SelecionarData"
          component={SelecionarData}
          options={{ title: "SelecionarData" }}
        />
        <Stack.Screen
          name="LocalConsulta"
          component={LocalConsulta}
          options={{ title: "LocalConsulta" }}
        />
        <Stack.Screen
          name="PrescricaoConsulta"
          component={PrescricaoConsulta}
          options={{ title: "PrescricaoConsulta" }}
        />
        <Stack.Screen
          name="CameraComponent"
          component={CameraComponent}
          options={{ title: "CameraComponent" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
