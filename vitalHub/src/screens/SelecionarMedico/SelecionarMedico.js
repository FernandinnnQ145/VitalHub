import { useEffect, useState } from "react";
import { Box } from "../../components/BoxCadastrar/Style";
import { Button, ButtonSecundarioPag } from "../../components/Button/Style";
import {
  ButtonSecundarioTitleBlue,
  ButtonTitle,
} from "../../components/ButtonTitle/Style";
import { CardMedico } from "../../components/CardMedico/CardMedico";
import { Containerwhite } from "../../components/Container/Style";
import { ListComponent } from "../../components/List/List";
import { TitleGrayMargin } from "../../components/Title/Style";
import api from "../../services/service";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export const SelecionarMedico = ({ navigation, route }) => {
  async function Login() {
    navigation.navigate("Main");
  }

  function handleContinue() {
    navigation.replace("SelecionarData", {
      agendamento: {
        ...route.params.agendamento,
        ...medico,
      },
    });
  }

  //   const Medicos = [
  //     { id: 1, nome: "Fernando" },
  //     { id: 2, nome: "Fernando" },
  //     { id: 3, nome: "Fernando" },
  //   ];

  //fora do componente

  //criar o state para receber a lista de medicos (array)
  const [medico, setMedico] = useState(null);
  const [medicos, setMedicos] = useState([]);

  //criar a funcao para listar ou para obter a lista de médicos da api e setar no state
  async function getMedico() {
    const promise = await api.get(
      `/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`
    );
    const data = promise.data;

    setMedicos(data);
  }
  //criar um effect para chamada da função
  useEffect(() => {
    getMedico();
    // console.log(medico);
  }, []);

  // crie uma funcao para verificar se o card esta selecionado
  const [medicoSelectId, setMedicoSelect] = useState(0);

  return (
    //passar os dados do state(array) para o flatlist

    //passar o medico como prop no CardMedico
    <Containerwhite>
      <TitleGrayMargin>Selecionar medico</TitleGrayMargin>

      <ListComponent
        data={medicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardMedico
            medico={item}
            selected={medico ? medico.medicoClinicaId == item.id : false}
            setMedico={setMedico}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Box>
        <Button onPress={() => handleContinue()}>
          <ButtonTitle>Continuar</ButtonTitle>
        </Button>
      </Box>

      <ButtonSecundarioPag onPress={() => navigation.replace("Main")}>
        <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
      </ButtonSecundarioPag>
    </Containerwhite>
  );
};
