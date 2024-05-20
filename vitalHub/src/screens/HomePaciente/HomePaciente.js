import React, { useEffect, useState } from "react";
import {
  BoxMensagemHome,
  BoxTitleAndImage,
} from "../../components/BoxCadastrar/Style";
import CalendarHome from "../../components/CalendarHome/CalendarHome";
import { Containerwhite } from "../../components/Container/Style";
import { HeaderHome } from "../../components/HeaderHome/Style";
import { ImagemPerfilHome } from "../../components/ImagemPerfil/Style";
import { TextSubCriar, Title } from "../../components/Title/Style";
import { Ionicons } from "@expo/vector-icons";
import { ButtonAgendar, ButtonsHome } from "../../components/Button/Style";
import { BtnListAppointment } from "../../components/BtnListAppointment/BtnListAppointment";
import { CancelattionModal } from "../../components/CancelattionModal/CancelationModal";
import { AppointmentModal } from "../../components/AppointmentModal/AppointmentModal";
import { Card } from "../../components/Card/Card";
import { ListComponent } from "../../components/List/List";
import { AgendarModal } from "../../components/AgendarModal/AgendarModal";
import { FontAwesome6 } from "@expo/vector-icons";
import { MedicoModal } from "../../components/MedicoModal/MedicoModal";

import { UserDecodeToken } from "../../utils/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/service";
import { CancelattionModalPaciente } from "../../components/CancelattionModalPaciente/CancelationModalPaciente";
import { LogBox } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

LogBox.ignoreAllLogs();

export const HomePaciente = ({ navigation }) => {
  const [nome, setNome] = useState("");

  //state para o estado da lista(cards)
  const [statusLista, setStatusLista] = useState("Agendadas");
  const [dataConsulta, setDataConsulta] = useState("");

  const [consultas, setConsultas] = useState([]);
  //state para exibicao dos modals
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAgendar, setShowModalAgendar] = useState(false);
  const [showModalMedico, setShowModalMedico] = useState(false);

  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  const [foto, setFoto] = useState(null);

  const [styleButton, setStyleButton] = useState(true);

  const [situacao, setSituacao] = useState("");

  async function profileLoad() {
    const token = await UserDecodeToken();

    if (token) {
      setNome(token.name);
    }
  }

  async function getConsultas() {
    const token = await UserDecodeToken();

    const promise = await api.get(
      `/Pacientes/BuscarPorData?data=${dataConsulta}&id=${token.id}`
    );
    const data = await promise.data;
    setConsultas(data);
    setStatusLista(data.situacao.situacao);
  }

  function HandlePressConsuta(rota, consulta) {
    navigation.replace(rota, { consultaId: consulta.id });
  }

  //Funcao para os modais
  function MostrarModal(modal, consulta) {
    setConsultaSelecionada(consulta);

    if (modal == "cancelar") {
      setShowModalCancel(true);
      setSituacao(consulta.situacao.situacao);
    } else {
      setShowModalMedico(true);
    }
  }

  async function getPhoto() {
    const token = await UserDecodeToken();
    const promise = await api.get(
      token.role == "Médico"
        ? `/Medicos/BuscarPorId?id=${token.id}`
        : `/Pacientes/BuscarPorId?id=${token.id}`
    );
    const data = promise.data;

    setFoto(data.idNavigation.foto);

    // console.log("aqioooooooooooooooooooo");
    // console.log(data);
  }

  useEffect(() => {
    profileLoad();
    getPhoto();
    // getConsultas();
  }, []);

  useEffect(() => {
    getConsultas();
  }, [dataConsulta, situacao]);

  return (
    <Containerwhite>
      <HeaderHome>
        <BoxTitleAndImage>
          <ImagemPerfilHome source={{ uri: foto }} />

          <BoxMensagemHome>
            <TextSubCriar>Bem vindo</TextSubCriar>
            <Title>{nome}</Title>
          </BoxMensagemHome>
        </BoxTitleAndImage>
        <Ionicons name="notifications" size={24} color="white" />
      </HeaderHome>

      <CalendarHome setDataConsulta={setDataConsulta} />

      <ButtonsHome>
        <BtnListAppointment
          textButton="Agendadas"
          clickButton={statusLista === "Agendadas"}
          onPress={() => setStatusLista("Agendadas")}
        />
        <BtnListAppointment
          textButton="Realizadas"
          clickButton={statusLista === "Realizadas"}
          onPress={() => setStatusLista("Realizadas")}
        />
        <BtnListAppointment
          textButton="Canceladas"
          clickButton={statusLista === "Canceladas"}
          onPress={() => setStatusLista("Canceladas")}
        />
      </ButtonsHome>

      {/* Secao Card */}
      {/* Lista */}
      <ListComponent
        data={consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          statusLista == item.situacao.situacao && (
            <Card
              situacao={item.situacao.situacao}
              consultas={item}
              // situacao={item.situacao}
              onPressCancel={() => MostrarModal("cancelar", item)}
              onPressAppointment={() =>
                HandlePressConsuta("PrescricaoConsulta", item)
              }
              onPressMedico={() => MostrarModal("local", item)}
            />
          )
        }
        showsVerticalScrollIndicator={false}
      />

      <ButtonAgendar onPress={() => setShowModalAgendar(true)}>
        <FontAwesome6 name="stethoscope" size={26} color="white" />
      </ButtonAgendar>

      {/* modal cancelar */}
      <CancelattionModalPaciente
        consulta={consultaSelecionada}
        visible={showModalCancel}
        setShowModalCancel={setShowModalCancel}
        setSituacao={setSituacao}
      />

      {/* modal ver prontuario */}

      <AgendarModal
        visible={showModalAgendar}
        setShowModalAgendar={setShowModalAgendar}
        navigation={navigation}
        // clickButton={styleButton}
        styleButton={styleButton}
        setStyleButton={setStyleButton}
      />

      <MedicoModal
        consulta={consultaSelecionada}
        visible={showModalMedico}
        setShowModalMedico={setShowModalMedico}
        navigation={navigation}
      />
    </Containerwhite>
  );
};
