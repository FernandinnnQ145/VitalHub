import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, BoxInputRow } from "../../components/BoxCadastrar/Style";
import { Button, ButtonExit, ButtonSave, ButtonSecundarioPag } from "../../components/Button/Style";
import { ButtonSecundarioTitleBlue, ButtonTitle } from "../../components/ButtonTitle/Style";
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
import { dateFormatDbToView } from "../../utils/FormatDate.js";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ButtonCamera } from "./Style.js";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { faL } from "@fortawesome/free-solid-svg-icons";

export const TelaPerfil = ({ navigation, route }) => {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [id, setId] = useState("");
  const [dadosPerfil, setDadosPerfil] = useState(null);
  const [role, setRole] = useState("");

  //states para o perfil
  const [isEditable, setIsEditable] = useState(false);
  const [dataNascimento, setDataNascimento] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [crm, setCrm] = useState("");
  const [cpf, setCpf] = useState("");

  async function profileLoad() {
    const token = await UserDecodeToken();

    if (token) {
      setProfile(token);
      setRole(token.role);
      setId(token.id);

      await getProfile(token);
      // await AlterarFotoPerfil(token);
    }
  }

  // `/Pacientes/BuscarPorId?id=${token.id}`
  async function getProfile(token) {
    const promise = await api.get(
      token.role == "Médico"
        ? `/Medicos/BuscarPorId?id=${token.id}`
        : `/Pacientes/BuscarPorId?id=${token.id}`
    );
    const data = promise.data;

    setDadosPerfil({
      ...data,
      ...data.endereco,
    });
    // setCep(promise.data.cep)
    // setCidade(promise.data.cidade)
    // setDataNascimento(promise.data.dataNascimento)
    // setDataNascimento(promise.data.dataNascimento)


    console.log({
      ...data,
      ...data.endereco,
    });
    setDataNascimento(data.dataNascimento);
  }

  

  async function Logout() {
    const removeToken = await AsyncStorage.removeItem("token");

    if (removeToken == null) {
      navigation.replace("Login");
    }
  }

  //funcao para alterar a imagem do usuario
  async function AlterarFotoPerfil(token) {
    const formData = new FormData();
    formData.append("Arquivo", {
      uri: route.params.uriPhoto,
      name: `image.${route.params.uriPhoto.split(".").pop()}`,
      type: `image/${route.params.uriPhoto.split(".").pop()}`,
    });

    await api
      .put(`/Usuario/AlterarFotoPerfil?id=${token.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDadosPerfil({
          ...dadosPerfil,
          idNavigation: {
            foto: route.params.uriPhoto,
          },
        });
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }

  async function editarPerfil() {
    const token = await UserDecodeToken();
    await api.put(`/Pacientes?idUsuario=${token.id}`, {
      dataNascimento: dataNascimento,
      logradouro: logradouro,
      numero: numero,
      cep: cep,
      cidade: cidade,
      crm: crm,
      cpf: cpf,
    });
  }

  useEffect(() => {
    profileLoad();
  }, []);

  useEffect(() => {
    if (route.params != null && profile != null) {
      AlterarFotoPerfil(profile);
    }
  }, [profile]);

  return (
    <ContainerScrollView>
      {dadosPerfil != null ? (
        <Containerwhite>
          <ImagemPerfil>
            <ButtonCamera
              onPress={() =>
                navigation.navigate("CameraComponent", { userId: profile.id })
              }
            >
              <MaterialCommunityIcons
                name="camera-plus"
                size={20}
                color="#FBFBFB"
              />
            </ButtonCamera>

            <InfoPerfil>
              <NamePerfil>{profile.name}</NamePerfil>
              <EmailPerfil>{profile.email}</EmailPerfil>
            </InfoPerfil>
          </ImagemPerfil>

          <Box>
            {role == "Médico" ? (
              <></>
            ) : (
              <BoxInputPreenchido
                textLabel="Data de nascimento:"
                placeholder={dateFormatDbToView(dadosPerfil.dataNascimento)}
                editable={isEditable}
                onChangeText={(x) => setDataNascimento(x)}
              //dateFormatDbToView(dadosPerfil.dataNascimento)
              // new Date.ToLocaleDateString(profile.dataNascimento)
              />
            )}

            <BoxInputPreenchido
              textLabel={role == "Médico" ? "CRM" : "CPF"}
              placeholder={role == "Médico" ? dadosPerfil.crm : dadosPerfil.cpf}
              onChangeText={role == "Medico" ? (x) => setCrm(x) : (x) => setCpf(x)}
              editable={isEditable}
              keyboardType="numeric"
            />

           
                  <>

                    <BoxInputPreenchido
                      editable={isEditable}
                      textLabel="Logradouro"
                      placeholder={dadosPerfil.logradouro}
                      onChangeText={(x) => setLogradouro(x)}
                    />
                    <BoxInputPreenchido
                      editable={isEditable}
                      textLabel="Numero"
                      fieldWidth={45}
                      placeholder={`Nº ${dadosPerfil.numero}`}
                      onChangeText={(x) => setNumero(x)}
                      keyboardType="numeric"
                    />

                  </>
             



            <BoxInputRow>
              <BoxInputPreenchido
                editable={isEditable}
                textLabel="Cep"
                placeholder={dadosPerfil.cep}
                fieldWidth={45}
                onChangeText={(x) => setCep(x)}
                keyboardType="numeric"
              />
              {role == "Médico" ? (
                <></>
              ) : (
                <BoxInputPreenchido
                  editable={isEditable}
                  textLabel="Cidade"
                  placeholder={dadosPerfil.cidade}
                  onChangeText={(x) => setCidade(x)}
                />
              )}
            </BoxInputRow>


            {
              isEditable == false ?
                <ButtonSave disabled={true}>
                  <ButtonTitle>Salvar</ButtonTitle>
                </ButtonSave>
                :
                <Button onPress={() => editarPerfil()}>
                  <ButtonTitle>Salvar</ButtonTitle>
                </Button>

            }



            {
              isEditable == false ?
                <Button onPress={() => setIsEditable(true)}>
                  <ButtonTitle>Editar</ButtonTitle>
                </Button>

                :
                <ButtonSave disabled={true}>
                  <ButtonTitle>Editar</ButtonTitle>
                </ButtonSave>

            }

          </Box>

          {
            isEditable == false ? (
              <ButtonExit onPress={() => Logout()}>
                <ButtonTitle>Sair do app</ButtonTitle>
              </ButtonExit>
            )

              :
              (<ButtonSecundarioPag onPress={() => setIsEditable(false)}>
                <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
              </ButtonSecundarioPag>)
          }

        </Containerwhite>
      ) : (
        <ActivityIndicator />
      )
      }
    </ContainerScrollView >
  );
};
