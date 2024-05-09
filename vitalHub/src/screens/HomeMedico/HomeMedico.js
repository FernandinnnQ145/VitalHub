import { Containerwhite } from "../../components/Container/Style";
import { HeaderHome } from "../../components/HeaderHome/Style";
import { Ionicons } from "@expo/vector-icons";
import { ImagemPerfilHome } from "../../components/ImagemPerfil/Style";
import {
  BoxMensagemHome,
  BoxTitleAndImage,
} from "../../components/BoxCadastrar/Style";
import { TextSubCriar, Title } from "../../components/Title/Style";
import { CalendarHome } from "../../components/CalendarHome/CalendarHome";
import { ButtonsHome } from "../../components/Button/Style";
import { BtnListAppointment } from "../../components/BtnListAppointment/BtnListAppointment";
import { useEffect, useState } from "react";
import { ListComponent } from "../../components/List/List";
import { Card } from "../../components/Card/Card";
import { CancelattionModal } from "../../components/CancelattionModal/CancelationModal";
import { AppointmentModal } from "../../components/AppointmentModal/AppointmentModal";
import { UserDecodeToken, idadeCalc } from "../../utils/Auth";
import { ActivityIndicator } from "react-native";
import { CardConsultaMedico } from "../../components/CardConsultaMedico/CardConsultaMedico";
import api from "../../services/service";

export const HomeMedico = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");
  const [consultas, setConsultas] = useState([]);

  //state para o estado da lista(cards)
  const [statusLista, setStatusLista] = useState("Agendadas");

  //state para exibicao dos modals
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  const [situacao, setSituacao] = useState("")




  async function profileLoad() {
    const token = await UserDecodeToken();

    if (token) {
      console.log(token);

      setNome(token.name);
    } else {
    }
  }

  async function getConsultas() {
    const token = await UserDecodeToken();
    // console.log("CONSULTASSSSSSSSSSSSSSSSS"${dataConsulta});
    const promise = await api.get(
      `/Medicos/BuscarPorData?data=${dataConsulta}&id=${token.id}`
    );

    const data = await promise.data;
    console.log(data);

    setConsultas(data);
    setStatusLista(data.situacao.situacao);
  }

  //Funcao para os modais
  function MostrarModal(modal, consulta) {
    setConsultaSelecionada(consulta);

    if (modal == "cancelar") {
      setShowModalCancel(true);
      setSituacao(consulta.situacao.situacao)
    } else {
      setShowModalAppointment(true);
    }
  }

  useEffect(() => {
    profileLoad();
    // getConsultas();
  }, []);

  useEffect(() => {
    console.log(dataConsulta);
    getConsultas();
  }, [dataConsulta, situacao]);

  return (
    <Containerwhite>
      <HeaderHome>
        <BoxTitleAndImage>
          <ImagemPerfilHome
            source={require("../../assets/image/Mask_group.png")}
          />

          <BoxMensagemHome>
            <TextSubCriar>Bem vindo</TextSubCriar>
            <Title>
              {nome}
            </Title>
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

      {/* Secao Card
      {/* Lista */}
      <ListComponent
        data={consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          statusLista == item.situacao.situacao && (
            <CardConsultaMedico
              situacao={item.situacao.situacao}
              consultas={item}
              onPressCancel={() => MostrarModal("cancelar", item)}
              onPressAppointment={() => MostrarModal("appointment", item)}
            />
          )
        }
        showsVerticalScrollIndicator={false}
      />
      {/* modal cancelar */}
      <CancelattionModal
        consulta={consultaSelecionada}
        setSituacao={setSituacao}
        visible={showModalCancel}
        setShowModalCancel={setShowModalCancel}
      />

      {/* modal ver prontuario */}

      <AppointmentModal
        consulta={consultaSelecionada}
        visible={showModalAppointment}
        setShowModalAppointment={setShowModalAppointment}
        navigation={navigation}
      />
    </Containerwhite>
  );
};
