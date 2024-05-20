import { useEffect, useState } from "react";
import { LabelModal } from "../../components/AgendarModal/Style";
import { Box } from "../../components/BoxCadastrar/Style";
import { Button, ButtonSecundarioPag } from "../../components/Button/Style";
import {
  ButtonSecundarioTitleBlue,
  ButtonTitle,
} from "../../components/ButtonTitle/Style";
import CalendarComponent from "../../components/CallendarList/CallendarList";
import {
  ContainerScrollView,
  Containerwhite,
} from "../../components/Container/Style";
import {
  InputSelect,
  SelectDate,
} from "../../components/InputSelect/InputSelect";
import { TitleGrayMargin } from "../../components/Title/Style";
import { ConfirmarModal } from "../../components/ConfirmarModal/ConfirmarModal";
import { logProfileData } from "react-native-calendars/src/Profiler";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export const SelecionarData = ({ navigation, route }) => {
  async function Login() {
    navigation.navigate("Main");
  }

  const [agendamento, setAgendamento] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horaSelecionada, setHoraSelecionada] = useState("");
  const [showModalConfirmar, setShowModalConfirmar] = useState(false);

  function handleContinue() {
    setAgendamento({
      ...route.params.agendamento,
      dataConsulta: `${dataSelecionada} ${horaSelecionada}`,
    });
    setShowModalConfirmar(true);
  }

  return (
    <ContainerScrollView>
      <Containerwhite>
        <TitleGrayMargin>Selecionar data</TitleGrayMargin>

        <CalendarComponent
          setDataSelecionada={setDataSelecionada}
          datSelecionada={dataSelecionada}
        />

        <Box>
          <LabelModal>Selecione um horário disponível</LabelModal>
        </Box>

        <SelectDate
          setHoraSelecionada={setHoraSelecionada}
          horaSelecionada={horaSelecionada}
        />

        <Box>
          <Button
            onPress={() =>
              handleContinue()
            } /*onPress={() => setShowModalConfirmar(true)}*/
          >
            <ButtonTitle>Continuar</ButtonTitle>
          </Button>
        </Box>

        <ButtonSecundarioPag onPress={() => navigation.replace("Main")}>
          <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
        </ButtonSecundarioPag>

        <ConfirmarModal
          agendamento={agendamento}
          visible={showModalConfirmar}
          setModalConfirmar={setShowModalConfirmar}
          navigation={navigation}
          route={route}
        />
      </Containerwhite>
    </ContainerScrollView>
  );
};
