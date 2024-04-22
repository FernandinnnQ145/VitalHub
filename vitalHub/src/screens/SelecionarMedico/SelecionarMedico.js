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

export const SelecionarMedico = ({ navigation }) => {
  async function Login() {
    navigation.navigate("Main");
  }

  //   const Medicos = [
  //     { id: 1, nome: "Fernando" },
  //     { id: 2, nome: "Fernando" },
  //     { id: 3, nome: "Fernando" },
  //   ];

  //fora do componente

  //criar o state para receber a lista de medicos (array)
  const [medicos, setMedicos] = useState([]);

  //criar a funcao para listar ou para obter a lista de médicos da api e setar no state
  async function getMedicos() {
    const promise = await api.get("/Medicos");
    const data = promise.data;

    setMedicos(data);
  }
  //criar um effect para chamada da função
  useEffect(() => {
    getMedicos();
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
            medicos={item}
            onPress={() => setMedicoSelect(item.id)}
            clickButton={item.id === medicoSelectId}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Box>
        <Button onPress={() => navigation.replace("SelecionarData")}>
          <ButtonTitle>Continuar</ButtonTitle>
        </Button>
      </Box>

      <ButtonSecundarioPag onPress={() => navigation.replace("Main")}>
        <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
      </ButtonSecundarioPag>
    </Containerwhite>
  );
};
