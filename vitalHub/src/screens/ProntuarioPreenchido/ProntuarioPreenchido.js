import { View } from "react-native"
import { ContainerScrollView, Containerwhite } from "../../components/Container/Style"
import { ImagemPerfil } from "../../components/ImagemPerfil/Style"
import { InfoPerfil } from "../../components/InfoPerfil/Style"
import { EmailPerfil, NamePerfil } from "../../components/Title/Style"
import { Box } from "../../components/BoxCadastrar/Style"
import { BoxInput, BoxInputPreenchido } from "../../components/InputAndLabel/Index"
import { Button, ButtonBlock, ButtonSecundario } from "../../components/Button/Style"
import { ButtonSecundarioTitleBlue, ButtonTitle } from "../../components/ButtonTitle/Style"
import api from "../../services/service"
import { useEffect, useState } from "react"
import { format, differenceInYears } from "date-fns";


export const ProntuarioPreenchido = ({
    navigation,
    route,
}) => {
    const [consulta, setConsulta] = useState(null)





    async function BuscarConsulta() {
        console.log("Infooooo consultaaaaa");
        const promise = await api.get(`/Consultas/BuscarPorId?id=${route.params.consultaId}`)
        console.log(promise.data);
        setConsulta(promise.data)
    }


    const calculateAge = (dataNascimento) => {
        return differenceInYears(new Date(), new Date(dataNascimento));
    };



    function HandlePressConsuta(item) {
        
            console.log("Tentando");
            navigation.replace("Prontuario", { consultaId : item })
            console.log("????");
        
    }



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
                                <BoxInputPreenchido
                                    textLabel='Descricao da consulta:'
                                    placeholder='Descrição'
                                    value={consulta.descricao}
                                    height={120}
                                    paddingBottom={60}
                                    editable={false}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                <BoxInputPreenchido
                                    textLabel='Diagnóstico do paciente:'
                                    placeholder='Diagnóstico'
                                    value={consulta.diagnostico}
                                    editable={false}

                                />
                                <BoxInputPreenchido
                                    textLabel='Prescrição médica:'
                                    placeholder='Prescrição medica'
                                    value={consulta.receita.medicamento}
                                    height={120}
                                    paddingBottom={60}
                                    editable={false}
                                    multiline={true}
                                    numberOfLines={4}

                                />



                                <Button onPress={() => HandlePressConsuta(consulta.id)}> 
                                    <ButtonTitle>Editar</ButtonTitle>
                                </Button>
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