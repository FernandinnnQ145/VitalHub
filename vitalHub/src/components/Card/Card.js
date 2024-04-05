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

export const Card = ({
  situacao = "pendente",
  onPressCancel,
  onPressAppointment,
  onPressMedico,
  consultas,
  name,
}) => {
  return (
    <CardPacienteAgendadas>
      <TouchableOpacity onPress={onPressMedico}>
        <ImagePaciente
          source={require("../../assets/image/Image_Paciente1.png")}
          onPress={onPressMedico}
        />
      </TouchableOpacity>
      {/* {consultas.medicoClinica.medico.crm} */}
      <BoxInfoPaciente>
        <DataProfilleCard>
          <NamePacient>
            {consultas.medicoClinica.medico.idNavigation.nome}
          </NamePacient>

          <BoxRow>
            <IdadePaciente>
              CRM-{consultas.medicoClinica.medico.crm}
            </IdadePaciente>
            <TextBold situacao={situacao}>
              {consultas.prioridade.prioridade}
            </TextBold>
          </BoxRow>
        </DataProfilleCard>

        <ViewRow>
          <HoraConsulta situacao={situacao}>
            <AntDesign
              name="clockcircle"
              size={14}
              color={situacao === "pendente" ? "#49B3BA" : "#4E4B59"}
            />
            <TextBoldClock situacao={situacao}>14:00</TextBoldClock>
          </HoraConsulta>

          {situacao == "cancelado" ? (
            <></>
          ) : situacao == "pendente" ? (
            <ButtonCard onPress={onPressCancel}>
              <ButtonText situacao={situacao}>Cancelar</ButtonText>
            </ButtonCard>
          ) : (
            <ButtonCard onPress={onPressAppointment}>
              <ButtonText situacao={situacao}>Ver prontuario</ButtonText>
            </ButtonCard>
          )}
        </ViewRow>
      </BoxInfoPaciente>
    </CardPacienteAgendadas>
  );
};
