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
import api from "../../services/service";
import { ActivityIndicator } from "react-native";
import { dateFormatDbToView } from "../../utils/FormatDate";

export const TelaPerfil = ({ navigation }) => {
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [id, setId] = useState("");
  const [dadosPerfil, setDadosPerfil] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [isEditable, setIsEditable] = useState(true);

  async function profileLoad() {
    const token = await UserDecodeToken();

    if (token) {
      console.log(`token`);
      console.log(token);
      await getProfile(token);
      setProfile(token);
    }
  }

  async function getProfile(token) {
    console.log(`Pacientes/BuscarPorId?id=${token.id}`);
    const promise = await api.get(`Pacientes/BuscarPorId?id=${token.id}`);
    const data = promise.data;

    setDadosPerfil({
      ...data,
      ...data.endereco,
    });

    console.log({
      ...data,
      ...data.endereco,
    });

    setDataNascimento(dateFormatDbToView(data.dataNascimento));
  }

  async function Logout() {
    const removeToken = await AsyncStorage.removeItem("token");

    if (removeToken == null) {
      console.log("token apagado");

      navigation.replace("Login");
    } else {
      console.log("token nao apagado");
    }
  }

  useEffect(() => {
    profileLoad();
    // getProfile();
  }, []);

  return (
    <ContainerScrollView>
      {dadosPerfil != null ? (
        <Containerwhite>
          <ImagemPerfil
            source={require("../../assets/image/Imagem_exemplo_perfil.png")}
          >
            <InfoPerfil>
              <NamePerfil>{profile.name}</NamePerfil>
              <EmailPerfil>{profile.email}</EmailPerfil>
            </InfoPerfil>
          </ImagemPerfil>

          <Box>
            <BoxInputPreenchido
              textLabel="Data de nascimento:"
              value={dataNascimento}
              editable={isEditable}
              //dateFormatDbToView(dadosPerfil.dataNascimento)
              // new Date.ToLocaleDateString(profile.dataNascimento)
            />
            <BoxInputPreenchido
              textLabel="CPF"
              value={dadosPerfil.cpf}
              editable={isEditable}
            />
            <BoxInputPreenchido
              editable={isEditable}
              textLabel="Endereço"
              value={`${dadosPerfil.logradouro}, ${dadosPerfil.numero}`}
            />
            <BoxInputRow>
              <BoxInputPreenchido
                editable={isEditable}
                textLabel="Cep"
                value={dadosPerfil.cep}
                fieldWidth={45}
              />
              <BoxInputPreenchido
                editable={isEditable}
                textLabel="Cidade"
                value={dadosPerfil.cidade}
              />
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
      ) : (
        <ActivityIndicator />
      )}
    </ContainerScrollView>
  );
};
