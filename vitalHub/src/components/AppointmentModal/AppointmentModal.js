import { Modal, View } from "react-native"
import { ModalContent, PatientModal } from "../CancelattionModal/Style"
import { ImageModal, ModalContentAppointment } from "./Style"
import { EmailPerfil, TitleGray } from "../Title/Style"
import { ButtonModal, ButtonSecundario } from "../Button/Style"
import { ButtonSecundarioTitleBlue, ButtonTitle } from "../ButtonTitle/Style"

export const AppointmentModal = ({
    visible,
    setShowModalAppointment,
    navigation,
    ...rest
}) => {
    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <PatientModal>
                <ModalContent>
                    <ImageModal
                        source={require('../../assets/image/Image_Modal.png')}
                    />
                    <TitleGray>Niccole Sarga</TitleGray>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width:270, marginTop:20 }}>
                        <EmailPerfil>22 anos</EmailPerfil>
                        <EmailPerfil>richard.kosta@gmail.com</EmailPerfil>

                    </View>


                    <ButtonModal onPress={()=> navigation.navigate("Prontuario")}>
                        <ButtonTitle>Inserir prontuario</ButtonTitle>
                    </ButtonModal>

                    <ButtonSecundario onPress={() => setShowModalAppointment(false)}>
                        <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
                    </ButtonSecundario>
                </ModalContent>
            </PatientModal>
        </Modal>
    )
}