import { Container } from "../../components/Container/Style"
import { TextSubVerificar, Title } from "../../components/Title/Style";
import { Logo } from "../../components/Logo/Style";
import { Box, BoxRow } from "../../components/BoxCadastrar/Style";
import { ExemploEmail } from "../../components/ContentAcount/Style";
import { InputCodVerfivica } from "../../components/Input/Style";
import { Button } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { LinkMediumCancelar } from "../../components/LinkMedium/Style";
import { FontAwesome6 } from '@expo/vector-icons';
import { IconVoltar } from '../../components/IconVoltar/Style';


export const VerificarConta = ({
    navigation
}) => {
    return (
        <Container>
            <IconVoltar>
                <FontAwesome6 name="x" size={24} color="white" onPress={() => navigation.replace("Login")} />
            </IconVoltar>


            <Logo
                source={require('../../assets/image/VitalHub_Logo_branco.png')}
            />
            <Title>Verifique seu e-mail</Title>
            <Box>
                <TextSubVerificar>Digite o código de 4 dígitos enviado para o e-mail</TextSubVerificar>
            </Box>
            <ExemploEmail>username@email.com</ExemploEmail>

            <BoxRow>
                <InputCodVerfivica
                    placeholder='0'
                    placeholderTextColor='#FFF'
                    

                />
                <InputCodVerfivica
                    placeholder='0'
                    placeholderTextColor='#FFF'
                />
                <InputCodVerfivica
                    placeholder='0'
                    placeholderTextColor='#FFF'
                />
                <InputCodVerfivica
                    placeholder='0'
                    placeholderTextColor='#FFF'
                />
            </BoxRow>
            <Box>
                <Button onPress={() => navigation.replace("RedefinirSenha")}>
                    <ButtonTitle>Entrar</ButtonTitle>
                </Button>
            </Box>
            <LinkMediumCancelar>Reenviar codigo</LinkMediumCancelar>




        </Container>
    )
}