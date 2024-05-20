import { ActivityIndicator, Modal } from "react-native";
import { ModalContent, PatientModal } from "../CancelattionModal/Style";
import { TitleGray } from "../Title/Style";
import {
  BoxConfirmModal,
  QuestionModal,
  ResponseModal,
  SubTitleModal,
} from "./Style";
import { Button, ButtonModal, ButtonSecundario } from "../Button/Style";
import { ButtonSecundarioTitleBlue, ButtonTitle } from "../ButtonTitle/Style";
import { useEffect, useState } from "react";
import api from "../../services/service";
import { UserDecodeToken } from "../../utils/Auth";

export const ConfirmarModal = ({
  visible,
  setModalConfirmar,
  navigation,
  agendamento,
  route,
  ...rest
}) => {
  const [profile, setProfile] = useState(null);

  async function Login() {
    navigation.navigate("Main");
  }

  async function profileLoad() {
    const token = await UserDecodeToken();

    if (token) {
      setProfile(token);
    }
  }

  async function handleConfirm() {
    await api
      .post("/Consultas/Cadastrar", {
        ...agendamento,
        pacienteId: profile.id,
        situacaoId: "726FF16C-2FAE-4674-A286-C4FD06BFB077",
      })
      .then(async () => {
        await setModalConfirmar(false);

        navigation.replace("Main");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    profileLoad();
  }, []);

  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      <PatientModal>
        {agendamento ? (
          <ModalContent>
            <TitleGray>Agendar consulta</TitleGray>

            <SubTitleModal>
              Consulte os dados selecionados para a sua consulta
            </SubTitleModal>

            <BoxConfirmModal>
              <QuestionModal>Data da consulta</QuestionModal>
              <ResponseModal>{agendamento.dataConsulta}</ResponseModal>
            </BoxConfirmModal>

            <BoxConfirmModal>
              <QuestionModal>Médico(a) da consulta</QuestionModal>
              <ResponseModal>{agendamento.medicoLabel}</ResponseModal>
              <ResponseModal>{agendamento.medicoEspecialidade}</ResponseModal>
            </BoxConfirmModal>

            <BoxConfirmModal>
              <QuestionModal>Clínica da consulta</QuestionModal>
              <ResponseModal>{agendamento.clinicaLabel}</ResponseModal>
            </BoxConfirmModal>

            <BoxConfirmModal>
              <QuestionModal>Local da consulta</QuestionModal>
              <ResponseModal>{agendamento.localizacao}</ResponseModal>
            </BoxConfirmModal>

            <BoxConfirmModal>
              <QuestionModal>Tipo da consulta</QuestionModal>
              <ResponseModal>{agendamento.prioridadeLabel}</ResponseModal>
            </BoxConfirmModal>

            <ButtonModal onPress={() => handleConfirm()}>
              <ButtonTitle>Continuar</ButtonTitle>
            </ButtonModal>

            <ButtonSecundario onPress={() => setModalConfirmar(false)}>
              <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
            </ButtonSecundario>
          </ModalContent>
        ) : (
          <ActivityIndicator />
        )}
      </PatientModal>
    </Modal>
  );
};
