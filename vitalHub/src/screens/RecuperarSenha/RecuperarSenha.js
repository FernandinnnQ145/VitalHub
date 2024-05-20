import { Container } from "../../components/Container/Style"
import { Ionicons } from '@expo/vector-icons';
import { Logo } from "../../components/Logo/Style"
import { TextSubRecuperar, Title } from "../../components/Title/Style"
import { Box } from "../../components/BoxCadastrar/Style";
import { IconVoltar } from "../../components/IconVoltar/Style";
import { Input } from "../../components/Input/Style";
import { Button } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { LinkMediumCancelar } from "../../components/LinkMedium/Style";
import { useState } from "react";
import api from "../../services/service";
import { AlertModal } from "../../components/AlertModal/AlertModal";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export const RecuperarSenha = ({
    navigation
}) => {
    const [email, setEmail] = useState('')
    //Alert de erro
    const [showModalAlert, setShowModalAlert] = useState(false)
    const [alert, setAlert] = useState("")

    async function EnviarEmail() {
        await api.post(`/RecuperarSenha?email=${email}`)
            .then(() => {
                navigation.replace("VerificarConta", { emailRecuperacao: email })

            }).catch((error) => {
                setAlert("Email invalido")
                setShowModalAlert(true)
                
            })
    }


    return (
        <Container>

            <IconVoltar>
                <Ionicons name="arrow-back-sharp" size={24} color="white" onPress={() => navigation.replace("Login")} />
            </IconVoltar>

            <Logo
                source={require('../../assets/image/VitalHub_Logo_branco.png')}
            />
            <Title>Recuperar sua senha</Title>

            <Box>
                <TextSubRecuperar>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</TextSubRecuperar>
                <Input
                    placeholder='Usuario ou E-mail'
                    placeholderTextColor='#FFF'
                    value={email}
                    onChangeText={(txt) => setEmail(txt)}
                />
                <Button onPress={() => EnviarEmail()}>
                    <ButtonTitle>Continuar</ButtonTitle>
                </Button>
            </Box>


            <AlertModal
                visible={showModalAlert}
                setShowModalAlert={setShowModalAlert}
                alert={alert}
            />



        </Container>
    )
}