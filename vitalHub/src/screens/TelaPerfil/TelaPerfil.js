import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, BoxInputRow } from "../../components/BoxCadastrar/Style";
import { Button, ButtonExit } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import {
  ContainerScrollView,
  Containerwhite,
} from "../../components/Container/Style";
import { ImagemPerfil } from "../../components/ImagemPerfil/Style";
import { InfoPerfil } from "../../components/InfoPerfil/Style";

import { BoxInputPreenchido } from "../../components/InputAndLabel/Index";
import { EmailPerfil, NamePerfil } from "../../components/Title/Style";
import { useEffect, useState } from "react";
import { UserDecodeToken } from "../../utils/Auth";

export const TelaPerfil = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  async function profileLoad() {
    const token = await UserDecodeToken();
    console.log("asdasdasd");

    if (token) {
      console.log(token);
    }
    setNome(token.name);
    setEmail(token.email);

    console.log(nome);
    console.log(email);
  }
  useEffect(() => {
    profileLoad();
  }, []);

  async function Logout() {
    const removeToken = await AsyncStorage.removeItem("token");

    if (removeToken == null) {
      console.log("token apagado");

      navigation.replace("Login");
    } else {
      console.log("token nao apagado");
    }
  }

  return (
    <ContainerScrollView>
      <Containerwhite>
        <ImagemPerfil
          source={require("../../assets/image/Imagem_exemplo_perfil.png")}
        >
          <InfoPerfil>
            <NamePerfil>{nome}</NamePerfil>
            <EmailPerfil>{email}</EmailPerfil>
          </InfoPerfil>
        </ImagemPerfil>

        <Box>
          <BoxInputPreenchido
            textLabel="Data de nascimento:"
            value="04/05/1999"
          />
          <BoxInputPreenchido textLabel="CPF" value="859********" />
          <BoxInputPreenchido
            textLabel="Endereço"
            value="Rua Vicenso Silva, 987"
          />
          <BoxInputRow>
            <BoxInputPreenchido
              textLabel="Cep"
              value="06548-909"
              fieldWidth={45}
            />
            <BoxInputPreenchido textLabel="Cidade" value="Moema-SP" />
          </BoxInputRow>

          <Button>
            <ButtonTitle>Salvar</ButtonTitle>
          </Button>
          <Button>
            <ButtonTitle>Editar</ButtonTitle>
          </Button>
        </Box>
        <ButtonExit onPress={() => Logout()}>
          <ButtonTitle>Sair do app</ButtonTitle>
        </ButtonExit>
      </Containerwhite>
    </ContainerScrollView>
  );
};
