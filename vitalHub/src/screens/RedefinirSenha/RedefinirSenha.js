import { FontAwesome6 } from '@expo/vector-icons';
import { IconVoltar } from '../../components/IconVoltar/Style';
import { Container } from '../../components/Container/Style';
import { Logo } from '../../components/Logo/Style';
import { TextSubRedefinir, Title } from '../../components/Title/Style';
import { Box } from '../../components/BoxCadastrar/Style';
import { InputSenha } from '../../components/Input/Style';
import { Button } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { useState } from 'react';
import api from '../../services/service';
import { AlertModal } from '../../components/AlertModal/AlertModal';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();


export const RedefinirSenha = ({
    navigation,
    route
}) => {
    const [senha, setSenha] = useState("")
    const [confirmar, setConfirmar] = useState("")

    //Alert de erro
    const [showModalAlert, setShowModalAlert] = useState(false)
    const [alert, setAlert] = useState("")


    async function AlterarSenha() {
        if (senha === confirmar) {
            await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
                senhaNova: senha
            }).then(() => {
                navigation.replace("Login")
            }).catch(error => {
                console.log(error);
            })
        } else {
            setAlert("Senhas incompativeis")
            setShowModalAlert(true)
        }


    }

    return (
        <Container>
            <IconVoltar>
                <FontAwesome6 name="x" size={24} color="white" onPress={() => navigation.replace("Login")} />
            </IconVoltar>


            <Logo
                source={require('../../assets/image/VitalHub_Logo_branco.png')}
            />
            <Title>Redefinir senha</Title>
            <TextSubRedefinir>Insira e confirme a sua nova senha</TextSubRedefinir>

            <Box>
                <InputSenha
                    placeholder='Nova senha'
                    placeholderTextColor='#FFF'

                    value={senha}
                    onChangeText={(txt) => setSenha(txt)}
                />
                <InputSenha
                    placeholder='Confirmar nova senha'
                    placeholderTextColor='#FFF'

                    value={confirmar}
                    onChangeText={(txt) => setConfirmar(txt)}
                />


                <Button onPress={() => AlterarSenha()}>
                    <ButtonTitle>Confirmar nova senha</ButtonTitle>
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