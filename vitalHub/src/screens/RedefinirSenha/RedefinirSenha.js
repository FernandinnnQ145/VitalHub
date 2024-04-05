import { FontAwesome6 } from '@expo/vector-icons';
import { IconVoltar } from '../../components/IconVoltar/Style';
import { Container } from '../../components/Container/Style';
import { Logo } from '../../components/Logo/Style';
import { TextSubRedefinir, Title } from '../../components/Title/Style';
import { Box } from '../../components/BoxCadastrar/Style';
import { InputSenha } from '../../components/Input/Style';
import { Button } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';


export const RedefinirSenha = ({
    navigation
}) => {
    return (
        <Container>
            <IconVoltar>
                <FontAwesome6 name="x" size={24} color="white" onPress={() => navigation.replace("Login")}/>
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
                />
                <InputSenha
                    placeholder='Confirmar nova senha'
                    placeholderTextColor='#FFF'
                />


                <Button onPress={() => navigation.replace("Login")}>
                    <ButtonTitle>Confirmar nova senha</ButtonTitle>
                </Button>
            </Box>

        </Container>


    )
}