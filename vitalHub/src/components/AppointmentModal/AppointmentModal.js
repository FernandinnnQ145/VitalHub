import { Modal, View } from "react-native"
import { ModalContent, PatientModal } from "../CancelattionModal/Style"
import { ImageModal, ModalContentAppointment } from "./Style"
import { EmailPerfil, TitleGray } from "../Title/Style"
import { ButtonModal, ButtonSecundario } from "../Button/Style"
import { ButtonSecundarioTitleBlue, ButtonTitle } from "../ButtonTitle/Style"
import { useEffect, useState } from "react"
import api from "../../services/service"
import { format, differenceInYears } from "date-fns";

export const AppointmentModal = ({
    visible,
    consulta,
    medicamento,
    diagnostico,
    descricao,
    setShowModalAppointment,
    navigation,
    ...rest
}) => {
    function HandlePress(rota) {

        navigation.replace(rota, { consultaId:consulta.id })
    }



//Data de nascimento esta vindo errado, NaN anos
//Tentar arrumar isso depois


    

const calculateAge = (dataNascimento) => {
    return differenceInYears(new Date(), new Date(dataNascimento));
  };



  function QualTelaProntuario(diagnostico, descricao){
    if(diagnostico != null && descricao !=null){
        HandlePress("ProntuarioPreenchido")
    }else{
      HandlePress("Prontuario")
    }


  }
      

      
    return (
        <>
            {consulta != null ?
                <Modal {...rest} visible={visible} transparent={true} animationType="fade">
                    <PatientModal>
                        <ModalContent>
                            
                            <ImageModal
                                source={require('../../assets/image/Image_Modal.png')}
                            />
                            <TitleGray>{consulta.paciente.idNavigation.nome}</TitleGray>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: 270, marginTop: 20 }}>

                                <EmailPerfil>{calculateAge(consulta.paciente.dataNacimento) + " anos"}</EmailPerfil>
                                <EmailPerfil>{consulta.paciente.idNavigation.email}</EmailPerfil>

                            </View>


                            <ButtonModal onPress={() => QualTelaProntuario(consulta.diagnostico, consulta.descricao)}>
                                <ButtonTitle>Inserir prontuario</ButtonTitle>
                            </ButtonModal>

                            <ButtonSecundario onPress={() => setShowModalAppointment(false)}>
                                <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
                            </ButtonSecundario>
                        </ModalContent>
                    </PatientModal>
                </Modal>
                :
                <>
                </>
            }
        </>

    )
}