import { useState } from "react";
import { Box } from "../../components/BoxCadastrar/Style";
import { Button } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { Container } from "../../components/Container/Style";
import { Input, InputSenha } from "../../components/Input/Style";
import { LinkMediumCancelar } from "../../components/LinkMedium/Style";
import { Logo } from "../../components/Logo/Style";
import { TextSubCriar, Title } from "../../components/Title/Style";
import api from "../../services/service";
import { AlertModal } from "../../components/AlertModal/AlertModal";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export const CriarConta = ({ navigation }) => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [verificarSenha, setVerificarSenha] = useState("");
  const [idTipoUsuario, setIdTipoUsuario] = useState(
    "CD486B7B-3204-463E-A489-9A9E648A6207"
  );

  //Alert de erro
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [alert, setAlert] = useState("");

  async function Cadastrar() {
    console.log("VIVO");
    const form = new FormData();
    form.append("nome", nomeUsuario);
    form.append("email", email);
    form.append("senha", senha);
    form.append("idTipoUsuario", idTipoUsuario);

    console.log("VIVO");

    if (email === "") {
      setAlert("Preencha todos os campos de maneira correta");
      setShowModalAlert(true);
    } else if (senha === "") {
      setAlert("Preencha todos os campos de maneira correta");
      setShowModalAlert(true);
    } else if (verificarSenha === "") {
      setAlert("Preencha todos os campos de maneira correta");
      setShowModalAlert(true);
    } else if (verificarSenha === senha) {
      console.log(form);
      try {
        await api.post("/Pacientes", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        navigation.replace("Login");
      } catch (error) {
        console.log(error);
        setAlert("Preencha todos os campos de maneira correta");
        setShowModalAlert(true);
      }
    } else {
      setAlert("Preencha todos os campos de maneira correta");
      setShowModalAlert(true);
    }
  }

  return (
    <Container>
      <Logo source={require("../../assets/image/VitalHub_Logo_branco.png")} />
      <Title>Criar conta</Title>

      <Box>
        <TextSubCriar>
          Insira seu endereço de e-mail e senha para realizar seu cadastro.
        </TextSubCriar>
        <Input
          placeholder="Nome Usuario"
          placeholderTextColor="#FFF"
          value={nomeUsuario}
          onChangeText={(txt) => setNomeUsuario(txt)}
        />
        <InputSenha
          placeholder="E-mail"
          placeholderTextColor="#FFF"
          value={email}
          onChangeText={(txt) => setEmail(txt)}
        />
        <InputSenha
          placeholder="Senha"
          placeholderTextColor="#FFF"
          valueColor="#FFFFF"
          value={senha}
          onChangeText={(txt) => setSenha(txt)}
        />
        <InputSenha
          placeholder="Confirmar senha"
          placeholderTextColor="#FFF"
          valueColor="#FFFFF"
          value={verificarSenha}
          onChangeText={(txt) => setVerificarSenha(txt)}
        />
        <Button onPress={() => Cadastrar()}>
          <ButtonTitle>Cadastrar</ButtonTitle>
        </Button>
      </Box>
      <LinkMediumCancelar onPress={() => navigation.replace("Login")}>
        Cancelar
      </LinkMediumCancelar>

      <AlertModal
        visible={showModalAlert}
        setShowModalAlert={setShowModalAlert}
        alert={alert}
      />
    </Container>
  );
};
