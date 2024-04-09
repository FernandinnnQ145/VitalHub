import { ActivityIndicator, Text } from "react-native";
import { Container } from "../../components/Container/Style";
import { Logo } from "../../components/Logo/Style";
import { Title } from "../../components/Title/Style";
import { Input, InputSenha } from "../../components/Input/Style";
import { Box } from "../../components/BoxCadastrar/Style";
import { LinkMedium } from "../../components/LinkMedium/Style";
import { Button, ButtonGoogle } from "../../components/Button/Style";
import { ButtonTitle, TitleGoogle } from "../../components/ButtonTitle/Style";
import {
  ContentAcount,
  ContentDuvida,
  ContentLink,
} from "../../components/ContentAcount/Style";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
// import { InputSenha } from "../../components/Input/Index";

import api from "../../services/service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("Fernando@Paciente.com");
  const [senha, setSenha] = useState("1234");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const Entrar = "Entrar";

  async function Login() {
    setIsLoaded(true);
    await api
      .post("/Login", {
        email: email,
        senha: senha,
      })
      .then(async (response) => {
        // console.log("RESPOSTA:::::::::::::::::");
        // console.log(response);

        await AsyncStorage.setItem("token", JSON.stringify(response.data));
        const token = await AsyncStorage.getItem("token")

        // console.log("TOKEN DO LOGIN::::::::::");
        // console.log(token);

        navigation.replace("Main");

        setIsLoaded(false);
      })
      .catch((error) => console.log(error));

    //navigation.navigate("Main");
  }

  return (
    <Container>
      <Logo source={require("../../assets/image/VitalHub_Logo_branco.png")} />
      <Title>Entrar ou criar conta</Title>

      <Box>
        <Input
          placeholder="Usuario ou E-mail"
          placeholderTextColor="#FFF"
          onChangeText={(txt) => setEmail(txt)}
          value={email}
        />
        <InputSenha
          placeholder="Senha"
          placeholderTextColor="#FFF"
          valueColor="#FFFFF"
          value={senha}
          onChangeText={(txt) => setSenha(txt)}
        />
        <LinkMedium onPress={() => navigation.replace("RecuperarSenha")}>
          Esqueceu sua senha?
        </LinkMedium>
        <Button
          onPress={() => Login() && setIsDisabled(true)}
          disabled={isDisabled}
        >
          <ButtonTitle>
            {isLoaded ? <ActivityIndicator color={"#FFF"} /> : Entrar}
          </ButtonTitle>
        </Button>
        <ButtonGoogle>
          <AntDesign name="google" size={14} color="#496BBA" />

          <TitleGoogle>Entrar com google</TitleGoogle>
        </ButtonGoogle>

        <ContentAcount>
          <ContentDuvida>Nao tem conta? </ContentDuvida>
          <ContentLink onPress={() => navigation.replace("CriarConta")}>
            Crie uma agora
          </ContentLink>
        </ContentAcount>
      </Box>
    </Container>
  );
};
