import styled from "styled-components";

export const CardPacienteAgendadas = styled.View`
width: 90%;
margin: 0 auto;
border-radius: 5px;
/* border: 1px solid black; */
flex-direction: row;
gap: 10px;
margin-bottom: 12px;
padding: 10px;
background-color: #FFFFFF;
shadow-color:'black';
    shadow-opacity:0.26;
    shadow-offset:20px 20px;
    shadow-radius:10px;
    elevation:5;
`

export const NamePacient = styled.Text`
font-size: 16px;
color: #33303E;
font-family: MontserratAlternates_600SemiBold;
`

export const IdadePaciente = styled.Text`
font-family: Quicksand_400Regular;
font-size: 14px;
color: #8C8A97;
`

export const TextBold = styled(IdadePaciente)`
font-family: Quicksand_600SemiBold;
color: ${(props) => props.situacao == "pendente" ? '#8C8A97' : '#4E4B59'};
`

export const TextBoldClock = styled(TextBold)`
color: ${(props) => props.situacao == "pendente" ? "#49B3BA" : "#4E4B59"};
`

export const DataProfilleCard = styled.View`
gap: 6px;
`

export const HoraConsulta = styled.View`
background-color: ${(props) => props.situacao == 'pendente' ? '#E8FCFD' : '#F1F0F5'};
width: 100px;
flex-direction: row;
padding: 4px 23px;
gap: 6px;
border-radius: 5px;
align-items: center;
justify-content: center;

`

export const ButtonCard = styled.TouchableOpacity`
`

export const ButtonText = styled.Text`
font-size: 12px;
font-family: MontserratAlternates_500Medium;
color: ${(props) => props.situacao == 'pendente' ? '#C81D25' : '#344F8F'};
`

export const ViewRow = styled.View`
justify-content: space-between;
flex-direction: row;
`