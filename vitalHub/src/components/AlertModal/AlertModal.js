import { Modal, View } from "react-native"
import { Menssagem, Titulo, TituloModal } from "./Style"
import { ButtonSecundario } from "../Button/Style"
import { ButtonSecundarioTitleBlue } from "../ButtonTitle/Style"
import { ModalContent, PatientModal } from "../CancelattionModal/Style"

export const AlertModal = ({
    visible,
    setShowModalAlert,
    alert,
    ...rest
}) => {
    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <PatientModal>
                <ModalContent>
                    <TituloModal>Erro!</TituloModal>

                    <Menssagem>{alert}</Menssagem>

                    <ButtonSecundario onPress={() => setShowModalAlert(false)}>
                        <ButtonSecundarioTitleBlue>Voltar</ButtonSecundarioTitleBlue>
                    </ButtonSecundario>
                </ModalContent>
            </PatientModal>

        </Modal>
    )
}