import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, BoxInputRow } from "../../components/BoxCadastrar/Style";
import {
  Button,
  ButtonExit,
  ButtonFakeInput,
  ButtonSave,
  ButtonSecundarioPag,
} from "../../components/Button/Style";
import {
  ButtonSecundarioTitleBlue,
  ButtonTitle,
  ButtonTitleBlack,
} from "../../components/ButtonTitle/Style";
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
import { ActivityIndicator, LogBox } from "react-native";
import { dateFormatDbToView } from "../../utils/FormatDate";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { ButtonCamera } from "./Style.js";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Label } from "../../components/Label/index.js";
import moment from "moment/moment.js";

LogBox.ignoreAllLogs();

export const TelaPerfil = ({ navigation, route }) => {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [id, setId] = useState("");
  const [dadosPerfil, setDadosPerfil] = useState(null);
  const [role, setRole] = useState("");

  //states para o perfil
  const [isEditable, setIsEditable] = useState(false);
  const [dataNascimento, setDataNascimento] = useState(null);
  const [dataNascimentoExibicao, setDataNascimentoExibicao] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [crm, setCrm] = useState("");
  const [cpf, setCpf] = useState("");
  const [foto, setFoto] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

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

  async function handleConfirmDate(date) {
    const dataString = await moment(date).format("YYYY-MM-DD");
    setDataNascimento(dataString);

    const dataStringExibicao = await moment(date).format("DD/MM/YYYY");
    setDataNascimentoExibicao(dataStringExibicao);

    await setDatePickerVisibility(false);
  }

  // `/Pacientes/BuscarPorId?id=${token.id}`
  async function getProfile(token) {
    const promise = await api.get(
      token.role == "Médico"
        ? `/Medicos/BuscarPorId?id=${token.id}`
        : `/Pacientes/BuscarPorId?id=${token.id}`
    );
    setDadosPerfil({
      ...promise.data,
      ...promise.data.endereco,
    });

    console.log("aaa");

    {
      role == "Médico" ? <></> : setDataNascimento(promise.data.dataNascimento);
      setDataNascimentoExibicao(
        moment(promise.data.dataNascimento).format("DD/MM/YYYY")
      );
    }

    setCpf(promise.data.cpf);
    setLogradouro(promise.data.endereco.logradouro);
    setNumero(promise.data.endereco.numero);
    setCep(promise.data.endereco.cep);
    setFoto(promise.data.idNavigation.foto);
    setCidade(promise.data.endereco.cidade);
    setCrm(promise.data.crm);
    console.log("AA");

    console.log(dadosPerfil);

    console.log("aqioooooooooooooooooooo");
    console.log({
      ...promise.data,
      ...promise.data.endereco,
    });
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

        setFoto(route.params.uriPhoto);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }

  async function editarPerfil() {
    const token = await UserDecodeToken();
    token.role == "Médico"
      ? await api
          .put(`/Medicos?idUsuario=${token.id}`, {
            dataNascimento: dataNascimento,
            logradouro: logradouro,
            numero: numero,
            cep: cep,
            cidade: cidade,
            crm: crm,
          })
          .then(() => setIsEditable(false))
          .catch((error) => {
            console.log(error);
          })
      : await api
          .put(`/Pacientes?idUsuario=${token.id}`, {
            dataNascimento: dataNascimento,
            logradouro: logradouro,
            numero: numero,
            cep: cep,
            cidade: cidade,
            cpf: cpf,
          })
          .then(() => setIsEditable(false))
          .catch((error) => {
            console.log(error);
          });
  }

  useEffect(() => {
    profileLoad();

    // console.log(`route`)
    // console.log(route)
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
          <ImagemPerfil source={{ uri: foto }}>
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
              <>
                <Label textLabel="Data de nascimento" />
                <ButtonFakeInput
                  disabled={isEditable == false ? true : false}
                  onPress={() => setDatePickerVisibility(true)}
                >
                  <ButtonTitleBlack>{dataNascimentoExibicao}</ButtonTitleBlack>
                </ButtonFakeInput>
              </>
            )}

            <BoxInputPreenchido
              textLabel={role == "Médico" ? "CRM" : "CPF"}
              value={role == "Médico" ? crm : cpf}
              onChangeText={
                role == "Medico" ? (x) => setCrm(x) : (x) => setCpf(x)
              }
              editable={isEditable}
              keyboardType="numeric"
              maxLength={11}
            />

            <>
              <BoxInputPreenchido
                editable={isEditable}
                textLabel="Logradouro"
                value={logradouro}
                onChangeText={(x) => setLogradouro(x)}
              />
              <BoxInputPreenchido
                editable={isEditable}
                textLabel="Numero"
                fieldWidth={45}
                value={`${numero}`}
                onChangeText={(x) => setNumero(x)}
                keyboardType="numeric"
              />
            </>

            <BoxInputRow>
              <BoxInputPreenchido
                editable={isEditable}
                textLabel="Cep"
                value={cep}
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
                  value={cidade}
                  onChangeText={(x) => setCidade(x)}
                />
              )}
            </BoxInputRow>

            {role == "Médico" ? (
              <></>
            ) : (
              <>
                {isEditable == false ? (
                  <ButtonSave disabled={true}>
                    <ButtonTitle>Salvar</ButtonTitle>
                  </ButtonSave>
                ) : (
                  <Button onPress={() => editarPerfil()}>
                    <ButtonTitle>Salvar</ButtonTitle>
                  </Button>
                )}
                {isEditable == false ? (
                  <Button onPress={() => setIsEditable(true)}>
                    <ButtonTitle>Editar</ButtonTitle>
                  </Button>
                ) : (
                  <ButtonSave disabled={true}>
                    <ButtonTitle>Editar</ButtonTitle>
                  </ButtonSave>
                )}
              </>
            )}
          </Box>

          {isEditable == false ? (
            <ButtonExit onPress={() => Logout()}>
              <ButtonTitle>Sair do app</ButtonTitle>
            </ButtonExit>
          ) : (
            <ButtonSecundarioPag onPress={() => setIsEditable(false)}>
              <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
            </ButtonSecundarioPag>
          )}

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => handleConfirmDate(date)}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </Containerwhite>
      ) : (
        <ActivityIndicator />
      )}
    </ContainerScrollView>
  );
};
