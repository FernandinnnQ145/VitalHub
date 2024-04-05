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
import { UserDecodeToken } from "../../utils/Auth";
import { ActivityIndicator } from "react-native";

export const HomeMedico = ({ navigation }) => {
  const [nome, setNome] = useState("");

  //state para o estado da lista(cards)
  const [statusLista, setStatusLista] = useState("pendente");

  //state para exibicao dos modals
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);

  const Consultas = [
    { id: 1, nome: "Fernando", situacao: "pendente" },
    { id: 2, nome: "Fernando", situacao: "cancelado" },
    { id: 3, nome: "Fernando", situacao: "realizado" },
    { id: 4, nome: "Fernando", situacao: "pendente" },
    { id: 5, nome: "Fernando", situacao: "cancelado" },
  ];

  async function profileLoad() {
    const token = await UserDecodeToken();
    console.log("asdasdasd");

    if (token) {
      console.log(token);

      setNome(token.name);
    } else {
    }
  }

  useEffect(() => {
    profileLoad();
  }, []);

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

      <CalendarHome />

      <ButtonsHome>
        <BtnListAppointment
          textButton="Agendadas"
          clickButton={statusLista === "pendente"}
          onPress={() => setStatusLista("pendente")}
        />
        <BtnListAppointment
          textButton="Realizadas"
          clickButton={statusLista === "realizado"}
          onPress={() => setStatusLista("realizado")}
        />
        <BtnListAppointment
          textButton="Canceladas"
          clickButton={statusLista === "cancelado"}
          onPress={() => setStatusLista("cancelado")}
        />
      </ButtonsHome>

      {/* Secao Card */}
      {/* Lista */}
      <ListComponent
        data={Consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          statusLista == item.situacao && (
            <Card
              situacao={item.situacao}
              onPressCancel={() => setShowModalCancel(true)}
              onPressMedico={() => navigation.replace("Prontuario")}
              onPressAppointment={() => setShowModalAppointment(true)}
            />
          )
        }
        showsVerticalScrollIndicator={false}
      />

      {/* modal cancelar */}
      <CancelattionModal
        visible={showModalCancel}
        setShowModalCancel={setShowModalCancel}
      />

      {/* modal ver prontuario */}

      <AppointmentModal
        visible={showModalAppointment}
        setShowModalAppointment={setShowModalAppointment}
        navigation={navigation}
      />
    </Containerwhite>
  );
};
