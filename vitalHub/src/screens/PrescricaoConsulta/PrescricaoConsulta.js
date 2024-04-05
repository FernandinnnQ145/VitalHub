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
// import { MaterialCommunityIcons } from '@expo/vector-icons';

export const PrescricaoConsulta = ({
    navigation
}) => {


    
    return (
        
        <ContainerScrollView>
            <Containerwhite>

                <ImagemPerfil
                    source={require('../../assets/image/Imagem_medico_prescricao.png')}>
                    <InfoPerfil>
                        <NamePerfil>Richard Kosta</NamePerfil>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <EmailPerfil>Cliníco geral</EmailPerfil>
                            <EmailPerfil>CRM-15286</EmailPerfil>

                        </View>

                    </InfoPerfil>
                </ImagemPerfil>




                <Box>
                    <BoxInputPreenchido
                        textLabel='Descrição da consulta'
                        placeholder='O paciente possuí uma infecção no
                        ouvido. Necessário repouse de 2 dias
                        e acompanhamento médico constante'
                        paddingBottom={60}
                        height={120}
                        multiline={true}
                        editable={true}
                    />

                    <BoxInputPreenchido
                        textLabel='Diagnóstico do paciente'
                        value='Infecção no ouvido'
                    />

                    <BoxInputPreenchido
                        textLabel='Prescrição médica'
                        placeholder='
                        Medicamento: Advil
                        Dosagem: 50 mg
                        Frequência: 3 vezes ao dia
                        Duração: 3 dias'
                        editable={true}
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
                        <FotoEnviar onPress={()=> navigation.replace("CameraComponent")}>
                            <MaterialCommunityIcons name="camera-plus-outline" size={24} color="#FFFFFF" />
                            <TitleEnviaFoto>Enviar</TitleEnviaFoto>
                        </FotoEnviar>

                        <ButtonSecundarioRed>
                            <ButtonSecundarioTitleRed>Cancelar</ButtonSecundarioTitleRed>
                        </ButtonSecundarioRed>
                    </BoxEspacoButtons>
                </Box>

                <Linha />

                <Box>
                    <InputPreenchido
                        value="Resultado do exame de sangue: 
                        
                        
                        normal"
                        multiline={true}
                        numberOfLines={2}
                        height={103}
                    />

                </Box>




                <ButtonSecundario onPress={()=> navigation.replace("Main")}>
                    <ButtonSecundarioTitleBlue>Voltar</ButtonSecundarioTitleBlue>
                </ButtonSecundario>
            </Containerwhite>
        </ContainerScrollView>




    )
}