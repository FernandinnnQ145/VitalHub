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

export const RecuperarSenha = ({
    navigation
}) => {
    const [email, setEmail] = useState('fernandinnn145@gmail.com')

    async function EnviarEmail() {
        await api.post(`/RecuperarSenha?email=${email}`)
        .then( () =>{
            navigation.replace("VerificarConta", { emailRecuperacao : email })

        }).catch(error =>{
            console.log(error);
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
                <Button onPress={()=> EnviarEmail()}>
                    <ButtonTitle>Continuar</ButtonTitle>
                </Button>
            </Box>
            





        </Container>
    )
}