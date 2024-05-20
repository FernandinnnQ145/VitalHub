import { BoxInfoPaciente, BoxRow } from "../BoxCadastrar/Style";
import { ImagePaciente } from "../ImagemPerfil/Style";
import { AntDesign } from "@expo/vector-icons";

import {
  ButtonCard,
  ButtonText,
  CardPacienteAgendadas,
  DataProfilleCard,
  HoraConsulta,
  IdadePaciente,
  NamePacient,
  TextBold,
  TextBoldClock,
  ViewRow,
} from "./Style";
import { Button, TouchableOpacity } from "react-native";

import { format, differenceInYears } from "date-fns";
import { useEffect, useState } from "react";
import api from "../../services/service";
import { dateFormatDbToView } from "../../utils/FormatDate";
import moment from "moment";

export const CardConsultaMedico = ({
  situacao,
  onPressCancel,
  onPressAppointment,
  onPressMedico,
  consultas,
  name,
}) => {
  const calculateAge = () => {
    return differenceInYears(
      new Date(),
      new Date(consultas.paciente.dataNascimento)
    );
  };

  const [dataConsulta] = useState(
    moment(consultas.dataConsulta).format("YYYY-MM-DD")
  );
  const [dataAtual] = useState(moment().format("YYYY-MM-DD"));

  const dataConsultaValida = new Date(dataConsulta);
  const dataAtualValida = new Date(dataAtual);

  async function mudarStatus() {
    await api.put(
      `/Consultas/Status?idConsulta=${consultas.id}&status=Realizadas
      `
    );
    // console.log("foi");
  }

  useEffect(() => {
    if (dataAtualValida > dataConsultaValida) {
      mudarStatus();
    }
  }, []);

  return (
    <CardPacienteAgendadas>
      <TouchableOpacity onPress={onPressMedico}>
        <ImagePaciente
          source={{ uri: consultas.paciente.idNavigation.foto }}
          onPress={onPressMedico}
        />
      </TouchableOpacity>
      {/* {consultas.medicoClinica.medico.crm} */}
      <BoxInfoPaciente>
        <DataProfilleCard>
          <NamePacient>{consultas.paciente.idNavigation.nome}</NamePacient>

          <BoxRow>
            <IdadePaciente>{calculateAge() + " anos"}</IdadePaciente>
            <TextBold situacao={situacao}>
              {consultas.prioridade.prioridade == "2"
                ? "Exame"
                : consultas.prioridade.prioridade == "1"
                ? "Rotina"
                : "Urgência"}
            </TextBold>
          </BoxRow>
        </DataProfilleCard>

        <ViewRow>
          <HoraConsulta situacao={situacao}>
            <AntDesign
              name="clockcircle"
              size={14}
              color={situacao === "Agendadas" ? "#49B3BA" : "#4E4B59"}
            />
            <TextBoldClock situacao={situacao}>14:00</TextBoldClock>
          </HoraConsulta>

          {situacao == "Canceladas" ? (
            <></>
          ) : situacao == "Agendadas" ? (
            <ButtonCard onPress={onPressCancel}>
              <ButtonText situacao={situacao}>Cancelar</ButtonText>
            </ButtonCard>
          ) : (
            <ButtonCard onPress={onPressAppointment}>
              <ButtonText situacao={situacao}>
                {consultas.diagnostico && consultas.descricao
                  ? "Ver prontuario"
                  : "Inserir prontuario"}
              </ButtonText>
            </ButtonCard>
          )}
        </ViewRow>
      </BoxInfoPaciente>
    </CardPacienteAgendadas>
  );
};
