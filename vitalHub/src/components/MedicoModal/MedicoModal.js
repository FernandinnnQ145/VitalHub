import { Modal, View } from "react-native"
import { ModalContent, PatientModal } from "../CancelattionModal/Style"
import { ImageModal } from "../AppointmentModal/Style"
import { EmailPerfil, TitleGray } from "../Title/Style"
import { ButtonModal, ButtonSecundario } from "../Button/Style"
import { ButtonSecundarioTitleBlue, ButtonTitle } from "../ButtonTitle/Style"

export const MedicoModal = ({
    consulta,
    visible,
    setShowModalMedico,
    navigation,
    ...rest
}) => {
    function HandlePress(rota){

        navigation.replace(rota, { clinicaId: consulta.medicoClinica.clinicaId })
    }


    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <PatientModal>
                <ModalContent>
                <ImageModal
                        source={require('../../assets/image/Imagem_Medico_Modal.png')}
                    />
                    <TitleGray>Dr Claudio</TitleGray>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width:172, marginTop:20 }}>
                        <EmailPerfil>Clinico geral</EmailPerfil>
                        <EmailPerfil>CRM-15286</EmailPerfil>

                    </View>


                    <ButtonModal onPress={()=> HandlePress("LocalConsulta")}>
                        <ButtonTitle>Ver local da consulta</ButtonTitle>
                    </ButtonModal>

                    <ButtonSecundario onPress={()=> setShowModalMedico(false)}>
                        <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
                    </ButtonSecundario>
                </ModalContent>
            </PatientModal>
        </Modal>
    )
}