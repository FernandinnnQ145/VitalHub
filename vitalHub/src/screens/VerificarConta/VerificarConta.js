import { Container } from "../../components/Container/Style";
import { TextSubVerificar, Title } from "../../components/Title/Style";
import { Logo } from "../../components/Logo/Style";
import { Box, BoxRow } from "../../components/BoxCadastrar/Style";
import { ExemploEmail } from "../../components/ContentAcount/Style";
import { InputCodVerfivica } from "../../components/Input/Style";
import { Button } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { LinkMediumCancelar } from "../../components/LinkMedium/Style";
import { FontAwesome6 } from "@expo/vector-icons";
import { IconVoltar } from "../../components/IconVoltar/Style";
import { useRef, useState } from "react";
import api from "../../services/service";
import { AlertModal } from "../../components/AlertModal/AlertModal";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export const VerificarConta = ({ navigation, route }) => {
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [codigo, setCodigo] = useState("");
  //Alert de erro
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [alert, setAlert] = useState("");

  function focusNextInput(index) {
    //Verificar se o index e menor que a quantidade de campos
    if (index < inputs.length - 1) {
      inputs[index + 1].current.focus();
    }
  }

  function focusPrevInput(index) {
    if (index > 0) {
      inputs[index - 1].current.focus();
    }
  }

  async function ValidarCodigo() {
    await api
      .post(
        `/RecuperarSenha/ValidarCodigo?email=${route.params.emailRecuperacao}&codigo=${codigo}`
      )
      .then(() => {
        navigation.replace("RedefinirSenha", {
          emailRecuperacao: route.params.emailRecuperacao,
        });
      })
      .catch((error) => {
        setAlert("Codigo invalido");
        setShowModalAlert(true);
        console.log(error);
      });
  }
  return (
    <Container>
      <IconVoltar>
        <FontAwesome6
          name="x"
          size={24}
          color="white"
          onPress={() => navigation.replace("Login")}
        />
      </IconVoltar>

      <Logo source={require("../../assets/image/VitalHub_Logo_branco.png")} />
      <Title>Verifique seu e-mail</Title>
      <Box>
        <TextSubVerificar>
          Digite o código de 4 dígitos enviado para o e-mail
        </TextSubVerificar>
      </Box>
      <ExemploEmail>{route.params.emailRecuperacao}</ExemploEmail>

      <BoxRow>
        {[0, 1, 2, 3].map((index) => (
          <InputCodVerfivica
            key={index}
            ref={inputs[index]}
            placeholder="0"
            placeholderTextColor="#FFF"
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(txt) => {
              //Verificar se o campo e vazio
              if (txt === "") {
                focusPrevInput(index);
              } else {
                //Verificar se o campo foi preenchido
                const codigoInformado = [...codigo];
                codigoInformado[index] = txt;
                setCodigo(codigoInformado.join(""));

                focusNextInput(index);
              }
            }}
          />
        ))}
      </BoxRow>
      <Box>
        <Button onPress={() => ValidarCodigo()}>
          <ButtonTitle>Entrar</ButtonTitle>
        </Button>
      </Box>
      <LinkMediumCancelar>Reenviar codigo</LinkMediumCancelar>

      <AlertModal
        visible={showModalAlert}
        setShowModalAlert={setShowModalAlert}
        alert={alert}
      />
    </Container>
  );
};
