import { View } from "react-native"
import { ContainerScrollView, Containerwhite } from "../../components/Container/Style"
import { ImagemPerfil } from "../../components/ImagemPerfil/Style"
import { InfoPerfil } from "../../components/InfoPerfil/Style"
import { EmailPerfil, NamePerfil } from "../../components/Title/Style"
import { Box } from "../../components/BoxCadastrar/Style"
import { BoxInput } from "../../components/InputAndLabel/Index"
import { Button, ButtonBlock, ButtonSecundario } from "../../components/Button/Style"
import { ButtonSecundarioTitleBlue, ButtonTitle } from "../../components/ButtonTitle/Style"
import api from "../../services/service"
import { useEffect, useState } from "react"
import { format, differenceInYears } from "date-fns";


export const Prontuario = ({
    navigation,
    route,
}) => {
    const [consulta, setConsulta] = useState(null)
    const [descricaoNova, setDescricaoNova] = useState("")
    const [medicamentoNovo, setMedicamentoNovo] = useState("")
    const [diagnosticoNovo, setDiagnosticoNovo] = useState("")



    async function NovoProntuario() {
        const promise = await api.put(`/Consultas/Prontuario`, {
            consultaId: route.params.consultaId,
            medicamento: medicamentoNovo,
            descricao: descricaoNova,
            diagnostico: diagnosticoNovo
        }).then(() => {
            navigation.replace("Main")
        }).catch((error => {
            console.log(error);
        }))
    }

    async function BuscarConsulta() {
        console.log("Coiso q ta vindo da home");
        const promise = await api.get(`/Consultas/BuscarPorId?id=${route.params.consultaId}`)
        setConsulta(promise.data)
        setDescricaoNova(promise.data.descricao)
        setDiagnosticoNovo(promise.data.diagnostico)
        setMedicamentoNovo(promise.data.receita.medicamento)
       ;
    }





    const calculateAge = (dataNascimento) => {
        return differenceInYears(new Date(), new Date(dataNascimento));
    };

    


    useEffect(() => {
        BuscarConsulta()

    }, [])

    return (

        <ContainerScrollView showsVerticalScrollIndicator={false}>
            <Containerwhite>

                {
                    consulta != null ?
                        <>
                            <ImagemPerfil
                                source={require('../../assets/image/Imagem_exemplo_perfil.png')}>
                                <InfoPerfil>
                                    <NamePerfil>{consulta.paciente.idNavigation.nome}</NamePerfil>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <EmailPerfil>{calculateAge(consulta.paciente.dataNascimento) + " anos"}</EmailPerfil>
                                        <EmailPerfil>{consulta.paciente.idNavigation.email}</EmailPerfil>
                                    </View>
                                </InfoPerfil>
                            </ImagemPerfil>


                            <Box>
                                <BoxInput
                                    textLabel='Descricao da consulta:'
                                    placeholder='Descrição'
                                    value={descricaoNova}
                                    onChangeText={
                                        (txt) => setDescricaoNova(txt)
                                    }
                                    height={120}
                                    paddingBottom={60}
                                    editable={true}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                <BoxInput
                                    textLabel='Diagnóstico do paciente:'
                                    placeholder='Diagnóstico'
                                    value={diagnosticoNovo}
                                    onChangeText={
                                        (txt) => setDiagnosticoNovo(txt)
                                    }
                                    editable={true}

                                />
                                <BoxInput
                                    textLabel='Prescrição médica:'
                                    placeholder='Prescrição medica'
                                    value={medicamentoNovo}
                                    onChangeText={
                                        (txt) => setMedicamentoNovo(txt)
                                    }
                                    height={120}
                                    paddingBottom={60}
                                    editable={true}
                                    multiline={true}
                                    numberOfLines={4}

                                />




                                <Button onPress={() => NovoProntuario()}>
                                    <ButtonTitle>Salvar</ButtonTitle>
                                </Button>

                                <ButtonBlock>
                                    <ButtonTitle>Editar</ButtonTitle>
                                </ButtonBlock>
                            </Box>
                            <ButtonSecundario>
                                <ButtonSecundarioTitleBlue onPress={() => navigation.replace("Main")}>Cancelar</ButtonSecundarioTitleBlue>
                            </ButtonSecundario>
                        </>


                        :
                        <>
                        </>
                }






            </Containerwhite>

        </ContainerScrollView>


    )
}