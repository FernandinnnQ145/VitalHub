import { Box } from "../../components/BoxCadastrar/Style"
import { Button } from "../../components/Button/Style"
import { ButtonTitle } from "../../components/ButtonTitle/Style"
import { Container } from "../../components/Container/Style"
import { Input, InputSenha } from "../../components/Input/Style"
import { LinkMediumCancelar } from "../../components/LinkMedium/Style"
import { Logo } from "../../components/Logo/Style"
import { TextSubCriar, Title } from "../../components/Title/Style"

export const CriarConta = ({
    navigation
}) => {

    async function Login() {
        navigation.navigate("Main")
    }
    return (
        <Container>
            <Logo
                source={require('../../assets/image/VitalHub_Logo_branco.png')}
            />
            <Title>Criar conta</Title>

            <Box>
                <TextSubCriar>Insira seu endereço de e-mail e senha para realizar seu cadastro.</TextSubCriar>
                <Input
                    placeholder='Usuario ou E-mail'
                    placeholderTextColor='#FFF'
                />
                <InputSenha
                    placeholder='Senha'
                    placeholderTextColor='#FFF'
                    valueColor='#FFFFF'
                />
                <InputSenha
                    placeholder='Confirmar senha'
                    placeholderTextColor='#FFF'
                    valueColor='#FFFFF'
                />
                <Button>
                    <ButtonTitle onPress={() => Login()}>Cadastrar</ButtonTitle>
                </Button>
            </Box>
            <LinkMediumCancelar onPress={() => navigation.replace("Login")}>Cancelar</LinkMediumCancelar>



        </Container>
    )
}