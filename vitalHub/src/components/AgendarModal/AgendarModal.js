import { Modal } from "react-native"
import { Button, ButtonSecundario } from "../Button/Style"
import { ButtonSecundarioTitleBlue, ButtonTitle } from "../ButtonTitle/Style"
import { BoxInput } from "../InputAndLabel/Index"
import { ModalContent, PatientModal } from "../CancelattionModal/Style"
import { TitleGray } from "../Title/Style"
import { ButtonNivelModal, ContainerButtonsModal, LabelModal, ModalContentAgendar, PatientModalAgendar, TitleBtnModal } from "./Style"

export const AgendarModal = ({
    visible,
    setShowModalAgendar,
    navigation,
    ...rest
    
}) => {
    

    function Qualquer (){
        navigation.navigate("SelecionarClinica", { setShowModalAgendar : setShowModalAgendar })
        

        setShowModalAgendar(false)
    }

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <PatientModalAgendar>
                <ModalContentAgendar>
                    <TitleGray>Agendar consulta</TitleGray>
                    <LabelModal>Qual o nível da consulta</LabelModal>
                    <ContainerButtonsModal>
                        <ButtonNivelModal>
                            <TitleBtnModal>Rotina</TitleBtnModal>
                        </ButtonNivelModal>
                        <ButtonNivelModal>
                            <TitleBtnModal>Exame</TitleBtnModal>
                        </ButtonNivelModal>
                        <ButtonNivelModal>
                            <TitleBtnModal>Urgência</TitleBtnModal>
                        </ButtonNivelModal>
                    </ContainerButtonsModal>


                    <BoxInput
                        placeholder='Informe a localização'
                        textLabel='Informe a localização desejada'
                        editable={true}
                    />

                    <Button onPress={() => Qualquer()}>
                        <ButtonTitle>Continuar</ButtonTitle>
                    </Button>


                    <ButtonSecundario onPress={() => setShowModalAgendar(false)}>
                        <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
                    </ButtonSecundario>
                </ModalContentAgendar>
            </PatientModalAgendar>
        </Modal>
    )
}