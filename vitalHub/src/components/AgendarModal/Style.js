import styled from "styled-components";
import { ModalContent, PatientModal } from "../CancelattionModal/Style";


export const ModalContentAgendar = styled(ModalContent)`
width: 100%;
border-radius: 10px 10px 0px 0px;
`

export const PatientModalAgendar = styled(PatientModal)`
justify-content: flex-end;
`


export const LabelModal = styled.Text`
font-size: 16px;
font-family: Quicksand_600SemiBold;
color: black;
align-self: flex-start;
margin-top: 45px;
margin-bottom: 10px;
`

export const ContainerButtonsModal = styled.View`
flex-direction: row;
width: 100%;
justify-content: space-between;
margin-bottom: 22px;


`

export const ButtonNivelModal = styled.TouchableOpacity`
height: 40px;
width: 30%;
border: 2px solid #60BFC5;
align-items: center;
justify-content: center;
`

export const TitleBtnModal = styled.Text`
font-family: MontserratAlternates_600SemiBold;
font-size: 14px;
color: #34898F;
text-align: center;
`