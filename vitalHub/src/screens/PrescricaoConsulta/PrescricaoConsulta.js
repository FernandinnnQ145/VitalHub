import { View } from "react-native"
import { ContainerScrollView, Containerwhite } from "../../components/Container/Style"
import { ImagemPerfil } from "../../components/ImagemPerfil/Style"
import { InfoPerfil } from "../../components/InfoPerfil/Style"
import { EmailPerfil, NamePerfil, TextPrescricao, TitleEnviaFoto } from "../../components/Title/Style"
import { BoxInputPreenchido } from "../../components/InputAndLabel/Index"
import { Box, BoxEspacoButtons, Linha } from "../../components/BoxCadastrar/Style"
import { ColocarImagemBox } from "../../components/ColocarImagemBox/ColocarImagemBox"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ButtonSecundario, ButtonSecundarioRed, FotoEnviar } from "../../components/Button/Style"
import { ButtonSecundarioTitleBlue, ButtonSecundarioTitleRed } from "../../components/ButtonTitle/Style"
import { Label } from "../../components/Label"
import { InputPreenchido } from "../../components/Input/Style"
import { useEffect, useState } from "react"
import api from "../../services/service"
// import { MaterialCommunityIcons } from '@expo/vector-icons';

export const PrescricaoConsulta = ({
    navigation,
    route,
}) => {

    const [consulta, setConsulta] = useState(null)

    async function BuscarConsulta() {
        console.log("Infooooo consultaaaaa");
        const promise = await api.get(`/Consultas/BuscarPorId?id=${route.params.consultaId}`)


        setConsulta(promise.data)




    }

    useEffect(() => {
        BuscarConsulta()

    }, [])



    return (

        <ContainerScrollView>
            <Containerwhite>
                {
                    consulta != null && (
                        <>
                            <ImagemPerfil
                                source={require('../../assets/image/Imagem_medico_prescricao.png')}>
                                <InfoPerfil>
                                    <NamePerfil>{consulta.medicoClinica.medico.idNavigation.nome}</NamePerfil>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <EmailPerfil>{consulta.medicoClinica.medico.especialidade.especialidade1}</EmailPerfil>
                                        <EmailPerfil>CRM-{consulta.medicoClinica.medico.crm}</EmailPerfil>

                                    </View>

                                </InfoPerfil>
                            </ImagemPerfil>




                            <Box>
                                <BoxInputPreenchido
                                    textLabel='Descrição da consulta'
                                    value={consulta.descricao}
                                    paddingBottom={60}
                                    height={120}
                                    multiline={true}
                                    editable={false}
                                />

                                <BoxInputPreenchido
                                    textLabel='Diagnóstico do paciente'
                                    value={consulta.diagnostico}
                                    editable={false}
                                />

                                <BoxInputPreenchido
                                    textLabel='Prescrição médica'
                                    value={consulta.receita.medicamento}
                                    editable={false}
                                    paddingBottom={60}
                                    height={133}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                            </Box>

                            <Box>
                                <Label
                                    textLabel='Exames médicos'
                                />
                            </Box>

                            <ColocarImagemBox>
                                <MaterialCommunityIcons name="file-alert-outline" size={24} color="#4E4B59" />
                                <TextPrescricao>Nenhuma foto informada</TextPrescricao>
                            </ColocarImagemBox>

                            <Box>


                                <BoxEspacoButtons>
                                    <FotoEnviar onPress={() => navigation.replace("CameraComponent")}>
                                        <MaterialCommunityIcons name="camera-plus-outline" size={24} color="#FFFFFF" />
                                        <TitleEnviaFoto>Enviar</TitleEnviaFoto>
                                    </FotoEnviar>

                                    <ButtonSecundarioRed>
                                        <ButtonSecundarioTitleRed>Cancelar</ButtonSecundarioTitleRed>
                                    </ButtonSecundarioRed>
                                </BoxEspacoButtons>
                            </Box>

                            <Linha />


                            <ColocarImagemBox>
                                {consulta.exames.map((exame, index) => (

                                <TextPrescricao key={index}>{exame.titulo}</TextPrescricao>
                                ))}
                                {/* Arrua=mar mais tarde esse map, mais de um exame vai dar ruim */}
                                {consulta.exames.map((exame, index) => (

                                <TextPrescricao key={index} >{exame.descricao}</TextPrescricao>
                               
                                ))}
                            </ColocarImagemBox>



                            <ButtonSecundario onPress={() => navigation.replace("Main")}>
                                <ButtonSecundarioTitleBlue>Voltar</ButtonSecundarioTitleBlue>
                            </ButtonSecundario>
                        </>
                    )
                }


            </Containerwhite>
        </ContainerScrollView>




    )
}