import { Modal } from "react-native";
import { Button, ButtonSecundario } from "../Button/Style";
import { ButtonSecundarioTitleBlue, ButtonTitle } from "../ButtonTitle/Style";
import { BoxInput } from "../InputAndLabel/Index";
import { ModalContent, PatientModal } from "../CancelattionModal/Style";
import { TitleGray } from "../Title/Style";
import {
  ButtonNivelModal,
  ContainerButtonsModal,
  LabelModal,
  ModalContentAgendar,
  PatientModalAgendar,
  TitleBtnModal,
} from "./Style";
import { useState } from "react";

export const AgendarModal = ({
  visible,
  setShowModalAgendar,
  navigation,
  styleButton,
  setStyleButton,
  clickButton,
  onPress,
  ...rest
}) => {
  const [agendamento, setAgendamento] = useState(null);

  async function handleContinue() {
    await setShowModalAgendar(false);

    navigation.replace("SelecionarClinica", { agendamento: agendamento });
  }

  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      <PatientModalAgendar>
        <ModalContentAgendar>
          <TitleGray>Agendar consulta</TitleGray>
          <LabelModal>Qual o nível da consulta</LabelModal>
          <ContainerButtonsModal>
            <ButtonNivelModal
              onPress={() =>
                setAgendamento({
                  ...agendamento, //manter as informacoes que ja existem dentro desse state
                  prioridadeId: "77A7F201-D945-4139-8431-1CF55A3B10B8",
                  prioridadeLabel: "Rotina",
                }) || setStyleButton("1")
              }
              clickButton={styleButton === "1"}
            >
              <TitleBtnModal clickButton={styleButton === "1"}>
                Rotina
              </TitleBtnModal>
            </ButtonNivelModal>
            <ButtonNivelModal
              onPress={() =>
                setAgendamento({
                  ...agendamento, //manter as informacoes que ja existem dentro desse state
                  prioridadeId: "D19DF538-56C7-424D-BFD2-35EEC044C63D",
                  prioridadeLabel: "Exame",
                }) || setStyleButton("2")
              }
              clickButton={styleButton === "2"}
            >
              <TitleBtnModal clickButton={styleButton === "2"}>
                Exame
              </TitleBtnModal>
            </ButtonNivelModal>
            <ButtonNivelModal
              onPress={() =>
                setAgendamento({
                  ...agendamento, //manter as informacoes que ja existem dentro desse state
                  prioridadeId: "BEFEA5B1-B461-4786-A903-B1BF06CE097C",
                  prioridadeLabel: "Urgência",
                }) || setStyleButton("3")
              }
              clickButton={styleButton === "3"}
            >
              <TitleBtnModal clickButton={styleButton === "3"}>
                Urgência
              </TitleBtnModal>
            </ButtonNivelModal>
          </ContainerButtonsModal>

          <BoxInput
            onChangeText={(txt) =>
              setAgendamento({
                ...agendamento,
                localizacao: txt,
              })
            }
            value={agendamento ? agendamento.localizacao : null}
            placeholder="Informe a localização"
            textLabel="Informe a localização desejada"
            editable={true}
          />

          <Button onPress={() => handleContinue()}>
            <ButtonTitle>Continuar</ButtonTitle>
          </Button>

          <ButtonSecundario onPress={() => setShowModalAgendar(false)}>
            <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
          </ButtonSecundario>
        </ModalContentAgendar>
      </PatientModalAgendar>
    </Modal>
  );
};
