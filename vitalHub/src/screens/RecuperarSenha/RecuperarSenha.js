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

export const RecuperarSenha = ({
    navigation
}) => {
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
                />
                <Button onPress={()=> navigation.replace("VerificarConta")}>
                    <ButtonTitle>Continuar</ButtonTitle>
                </Button>
            </Box>
            





        </Container>
    )
}