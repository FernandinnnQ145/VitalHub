import { Modal } from "react-native";
import { ButtonModal, ButtonSecundario } from "../Button/Style";
import { ModalContent, ModalText, PatientModal } from "./Style";
import { Title, TitleGray } from "../Title/Style";
import { ButtonSecundarioTitleBlue, ButtonTitle } from "../ButtonTitle/Style";
import * as Notifications from "expo-notifications";
import api from "../../services/service";

//Solicita permissoes de notificacao ao iniciar o app
Notifications.requestPermissionsAsync();

//Define como as notificacoes devem ser tratadas quando recebidas
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    //Mostrar o alerta quando a notificacao for recebida
    shouldShowAlert: true,

    //Reproduz som ao receber notificacao
    shouldPlaySound: true,

    //numero de notificacoes no icone do app
    shouldSetBadge: false,
  }),
});

export const CancelattionModal = ({
  consulta,
  visible,
  setSituacao,
  setShowModalCancel,
  ...rest
}) => {
  //Funcao para lidar com a chamada de notificacao
  const HandleCallNotifications = async () => {
    // console.log("Consulta id aqui");
    // console.log(consulta.id);
    await api
      .put(`Consultas/Status?idConsulta=${consulta.id}&status=Canceladas`)
      .then(() => {
        setSituacao("Canceladas");
      })
      .catch((error) => {
        console.log(error);
      });

    //Obtem status da permissao
    const { status } = await Notifications.getPermissionsAsync();
    setShowModalCancel(false);

    //Verifica se o usuario concedeu permissao
    if (status !== "granted") {
      alert("Voce nao deixou as notificacoes ativas");
      return;
    }

    //Agenda uma notificacao
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Cancelada",
        body: "Consulta cancelada com sucesso",
      },
      trigger: null,
    });
  };

  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      <PatientModal>
        <ModalContent>
          <TitleGray>Cancelar consulta</TitleGray>
          <ModalText>
            Ao cancelar essa consulta, abrirá uma possível disponibilidade no
            seu horário, deseja mesmo cancelar essa consulta?
          </ModalText>

          <ButtonModal onPress={HandleCallNotifications}>
            <ButtonTitle>Confirmar</ButtonTitle>
          </ButtonModal>

          <ButtonSecundario onPress={() => setShowModalCancel(false)}>
            <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
          </ButtonSecundario>
        </ModalContent>
      </PatientModal>
    </Modal>
  );
};
