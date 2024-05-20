import { useEffect, useState } from "react";
import { Box } from "../../components/BoxCadastrar/Style";
import {
  Button,
  ButtonSecundario,
  ButtonSecundarioPag,
} from "../../components/Button/Style";
import {
  ButtonSecundarioTitleBlue,
  ButtonTitle,
  TitleGoogle,
} from "../../components/ButtonTitle/Style";
import { CardClinicas } from "../../components/CardClinicas/CardClinicas";
import { Containerwhite } from "../../components/Container/Style";
import { ListComponent } from "../../components/List/List";
import { TitleGrayMargin } from "../../components/Title/Style";
import api from "../../services/service";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export const SelecionarClinica = ({ navigation, route }) => {
  const { setShowModalAgendar } = route.params;

  async function Login() {
    navigation.navigate("Main");

    setShowModalAgendar(true);
  }
  // const Clinicas = [
  //     { id: 1, nome: "Fernando", },
  //     { id: 2, nome: "Fernando",},
  //     { id: 3, nome: "Fernando", },
  // ]
  const [styleCard, setStyleCard] = useState(false);

  const [selectClinicaId, setSelectClinicaId] = useState(0);

  //criar o state para receber a lista de medicos (array)
  const [clinicas, setClinicas] = useState([]);
  const [clinica, setClinica] = useState(null);

  //criar a funcao para listar ou para obter a lista de clinicas da api e setar no state
  async function getClinicas() {
    const promise = await api.get(
      `/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`
    );
    const data = promise.data;

    setClinicas(data);
  }

  function handleContinue() {
    navigation.replace("SelecionarMedico", {
      agendamento: {
        ...route.params.agendamento,
        ...clinica,
      },
    });
  }

  //criar um effect para chamada da função
  useEffect(() => {
    getClinicas();
  }, []);

  return (
    <Containerwhite>
      <TitleGrayMargin>Selecionar clinica</TitleGrayMargin>

      {/* FlatList que sera feito mais tarde */}
      <ListComponent
        data={clinicas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardClinicas
            selected={clinica ? clinica.clinicaId == item.id : false}
            clinica={item}
            setClinica={setClinica}
            // clickButton={styleCard}
            // styleCard={styleCard}
            // setStyleCard={setStyleCard}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Box>
        <Button onPress={() => handleContinue()}>
          <ButtonTitle>Continuar</ButtonTitle>
        </Button>
      </Box>

      <ButtonSecundarioPag onPress={() => Login()}>
        <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
      </ButtonSecundarioPag>
    </Containerwhite>
  );
};
