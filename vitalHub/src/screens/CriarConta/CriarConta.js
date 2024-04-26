import { useState } from "react"
import { Box } from "../../components/BoxCadastrar/Style"
import { Button } from "../../components/Button/Style"
import { ButtonTitle } from "../../components/ButtonTitle/Style"
import { Container } from "../../components/Container/Style"
import { Input, InputSenha } from "../../components/Input/Style"
import { LinkMediumCancelar } from "../../components/LinkMedium/Style"
import { Logo } from "../../components/Logo/Style"
import { TextSubCriar, Title } from "../../components/Title/Style"
import api from "../../services/service"

export const CriarConta = ({
    navigation
}) => {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [verificarSenha, setVerificarSenha] = useState('')
    const [idTipoUsuario, setIdTipoUsuario] = useState('232CD3B3-5C9B-40BA-9AF4-5C08613BD876');

    async function Cadastrar(verificarSenha, senha) {

        const form = new FormData()
        form.append("Nome", nomeUsuario)
        form.append("Email", email)
        form.append("Senha", senha)
        form.append("idTipoUsuario", idTipoUsuario)


        if (email === "") {
            Alert.alert(
                "Erro", "Preencher o campo email"
            )

        }
        else if (senha === "") {
            Alert.alert(
                "Erro", "Preencher o campo senha"
            )

        }
        else if (verificarSenha === "") {
            Alert.alert(
                "Erro", "Preencher o campo confirmar senha"
            )

        }
        else if (verificarSenha === senha) {

            try {
                await api.post("/Pacientes", form,{
                    headers:{
                        "Content-Type" : "multipart/form-data"
                    }
                })

                navigation.replace("Login")

            } catch (error) {

                console.log(error)
            }

        }
        else {
            console.log("Senhas inválidas")

            Alert.alert(
                "Erro", "Senha inválida"
            )
        }
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
                    placeholder='Nome Usuario'
                    placeholderTextColor='#FFF'
                    value={nomeUsuario}
                    onChangeText={
                        (txt) => setNomeUsuario(txt)
                    }
                    
                />
                <InputSenha
                    placeholder='E-mail'
                    placeholderTextColor='#FFF'
                    value={email}
                    onChangeText={
                        (txt) => setEmail(txt)
                    }
                />
                <InputSenha
                    placeholder='Senha'
                    placeholderTextColor='#FFF'
                    valueColor='#FFFFF'
                    value={senha}
                    onChangeText={
                        (txt) => setSenha(txt)
                    }
                />
                <InputSenha
                    placeholder='Confirmar senha'
                    placeholderTextColor='#FFF'
                    valueColor='#FFFFF'
                    value={verificarSenha}
                onChangeText={
                    (txt) => setVerificarSenha(txt)
                }
                />
                <Button>
                    <ButtonTitle onPress={() => Cadastrar()}>Cadastrar</ButtonTitle>
                </Button>
            </Box>
            <LinkMediumCancelar onPress={() => navigation.replace("Login")}>Cancelar</LinkMediumCancelar>



        </Container>
    )
}