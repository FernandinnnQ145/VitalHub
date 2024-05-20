import { Image, LogBox, View } from "react-native";
import {
  ContainerScrollView,
  Containerwhite,
} from "../../components/Container/Style";
import { ImagemPerfil } from "../../components/ImagemPerfil/Style";
import { InfoPerfil } from "../../components/InfoPerfil/Style";
import {
  EmailPerfil,
  NamePerfil,
  TextPrescricao,
  TitleEnviaFoto,
} from "../../components/Title/Style";
import { BoxInputPreenchido } from "../../components/InputAndLabel/Index";
import {
  Box,
  BoxEspacoButtons,
  Linha,
} from "../../components/BoxCadastrar/Style";
import { ColocarImagemBox } from "../../components/ColocarImagemBox/ColocarImagemBox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ButtonSecundario,
  ButtonSecundarioRed,
  FotoEnviar,
} from "../../components/Button/Style";
import {
  ButtonSecundarioTitleBlue,
  ButtonSecundarioTitleRed,
} from "../../components/ButtonTitle/Style";
import { Label } from "../../components/Label";
import { InputPreenchido } from "../../components/Input/Style";
import { useEffect, useState } from "react";
import api from "../../services/service";
import { ImageOcr } from "./Style";
// import { MaterialCommunityIcons } from '@expo/vector-icons';

LogBox.ignoreAllLogs();

export const PrescricaoConsulta = ({ navigation, route }) => {
  const [consulta, setConsulta] = useState(null);
  const [descricaoExame, setDescricaoExame] = useState("");
  // const [textoOcr, setTextoOcr] = useState("");

  async function BuscarConsulta() {
    // console.log("Infooooo consultaaaaa");
    await api
      .get(`/Consultas/BuscarPorId?id=${route.params.consultaId}`)
      .then((response) => {
        setConsulta(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    await getExame();
  }

  // async function InserirExame() {
  //   try{
  //   console.log("_____________________");

  //   const formData = new FormData();

  //   formData.append("ConsultaId", route.params.consultaId);
  //   formData.append("Imagem", {
  //     uri: route.params.uriPhoto,
  //     name: `image.${route.params.uriPhoto.split(".").pop()}`,
  //     type: `image/${route.params.uriPhoto.split(".").pop()}`,
  //   });

  //   console.log(route.params.consultaId)

  //   console.log({
  //     uri: route.params.uriPhoto,
  //     name: `image.${route.params.uriPhoto.split(".").pop()}`,
  //     type: `image/${route.params.uriPhoto.split(".").pop()}`
  //   });

  //   // await api
  //   //   .post(`/Exame/Cadastrar`, formData, {
  //   //     headers: {
  //   //       "Content-Type": "multipart/form-data",
  //   //     },
  //   //   })
  //   //   .then((response) => {
  //   //     setDescricaoExame(descricaoExame + "\n" + response.data.descricao);
  //   //   }atch((error) => {
  //   //     console.log(error);
  //   //   });
  //   //   .c
  //       const response = await api
  //       .post("/Exame/Cadastrar", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })

  //       setDescricaoExame(response.data)

  //       console.log(response)

  //       console.log(descricaoExame);

  //     }catch(error){
  //       console.log(error)
  //       console.log(error)
  //     }
  // }

  async function InserirExame() {
    try {
      console.log("Iniciando inserção de exame...");

      const formData = new FormData();
      formData.append("ConsultaId", route.params.consultaId);
      formData.append("Imagem", {
        uri: route.params.uriPhoto,
        name: `image.${route.params.uriPhoto.split(".").pop()}`,
        type: `image/${route.params.uriPhoto.split(".").pop()}`,
      });
      formData.append("Descricao", response);

      console.log("FormData criado:");
      console.log(formData);

      console.log("Enviando requisição para a API...");

      const response = await api.post(`/Exame/Cadastrar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Requisição bem-sucedida. Resposta da API:");
      console.log(response.data);

      // setDescricaoExame(descricaoExame + "\n" + response.data.descricao);
      if (
        response.data.descricao !=
        "Erro ao reconhecer o texto: Operation returned an invalid status code 'BadRequest'"
      ) {
        setDescricaoExame(descricaoExame + "\n" + response.data.descricao);
      }
    } catch (error) {
      console.log("Erro ao enviar requisição para a API. Detalhes do erro:");
      console.log(error);

      if (error.response) {
        console.log("Resposta de erro da API:");
        console.log(error.response.data);
      }
    }
  }

  async function getExame() {
    const response = await api.get(
      `Exame/BuscarPorIdConsulta?idConsulta=${consulta.id}`
    );
    console.log("aaaa");
    console.log(response.data);
    response.data.map((item) => {
      console.log("AQUIIIIIIIIIIII");
      console.log(item.descricao);
      console.log(descricaoExame + "\n" + item.descricao);
      setDescricaoExame(descricaoExame + "\n" + item.descricao);
    });
  }

  useEffect(() => {
    BuscarConsulta();
  }, []);

  useEffect(() => {
    if (route.params != null) {
      InserirExame();
    }
  }, [route.params]);

  return (
    <ContainerScrollView>
      <Containerwhite>
        {consulta != null ? (
          <>
            <ImagemPerfil
              source={{ uri: consulta.medicoClinica.medico.idNavigation.foto }}
            >
              <InfoPerfil>
                <NamePerfil>
                  {consulta.medicoClinica.medico.idNavigation.nome}
                </NamePerfil>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <EmailPerfil>
                    {consulta.medicoClinica.medico.especialidade.especialidade1}
                  </EmailPerfil>
                  <EmailPerfil>
                    CRM-{consulta.medicoClinica.medico.crm}
                  </EmailPerfil>
                </View>
              </InfoPerfil>
            </ImagemPerfil>

            <Box>
              <BoxInputPreenchido
                textLabel="Descrição da consulta"
                value={consulta.descricao}
                paddingBottom={60}
                height={120}
                multiline={true}
                editable={false}
              />

              <BoxInputPreenchido
                textLabel="Diagnóstico do paciente"
                value={consulta.diagnostico}
                editable={false}
              />

              <BoxInputPreenchido
                textLabel="Prescrição médica"
                value={consulta.receita.medicamento}
                editable={false}
                paddingBottom={60}
                height={133}
                multiline={true}
                numberOfLines={4}
              />
            </Box>

            <Box>
              <Label textLabel="Exames médicos" />
            </Box>

            <ColocarImagemBox>
              {route.params.uriPhoto == undefined ? (
                <>
                  <MaterialCommunityIcons
                    name="file-alert-outline"
                    size={24}
                    color="#4E4B59"
                  />
                  <TextPrescricao>Nenhuma foto informada</TextPrescricao>
                </>
              ) : (
                <ImageOcr source={{ uri: route.params.uriPhoto }} />
              )}
            </ColocarImagemBox>

            <Box>
              <BoxEspacoButtons>
                <FotoEnviar
                  onPress={() =>
                    navigation.navigate("CameraComponent", {
                      screen: "PrescricaoConsulta",
                      idConsulta: consulta.id,
                    })
                  }
                >
                  <MaterialCommunityIcons
                    name="camera-plus-outline"
                    size={24}
                    color="#FFFFFF"
                  />
                  <TitleEnviaFoto>Enviar</TitleEnviaFoto>
                </FotoEnviar>

                <ButtonSecundarioRed>
                  <ButtonSecundarioTitleRed>Cancelar</ButtonSecundarioTitleRed>
                </ButtonSecundarioRed>
              </BoxEspacoButtons>
            </Box>

            <Linha />

            <ColocarImagemBox>
              <TextPrescricao>{descricaoExame}</TextPrescricao>
            </ColocarImagemBox>

            <ButtonSecundario onPress={() => navigation.replace("Main")}>
              <ButtonSecundarioTitleBlue>Voltar</ButtonSecundarioTitleBlue>
            </ButtonSecundario>
          </>
        ) : (
          <></>
        )}
      </Containerwhite>
    </ContainerScrollView>
  );
};
