import styled, { css } from "styled-components";

export const BoxCardClinicas = styled.TouchableOpacity`
width: 90%;
border-radius: 5px;
padding: 16px;
background-color: white;
margin-bottom: 12px;
align-self: center;
shadow-color:'black';
shadow-opacity:0.26;
shadow-offset:20px 20px;
shadow-radius:10px;
elevation:5;
${props => props.clickButton ? css`border: 2px solid #496BBA` : css`border: transparent`}

`


export const BoxCardConteudo = styled.View`
width: 90%;
flex-direction: row;
justify-content: space-between;
margin-bottom: 10px;
`

export const NomeClinica = styled.Text`
font-family: MontserratAlternates_600SemiBold;
font-size: 16px;
color: #33303E;
`

export const BoxClassificacao = styled.View`
flex-direction: row;
gap: 3px;

`

export const Nota = styled.Text`
font-family: Quicksand_600SemiBold;
color: #F9A620;
font-size: 14px;
`

export const LocalClinica = styled(Nota)`
color: #4E4B59;
`

export const BoxDias = styled.View`
width: 100px;
border-radius: 5px;
height: 26px;
background-color: #E8FCFD;
gap: 7px;
justify-content: center;
align-items: center;
flex-direction: row;
`

export const Dias = styled(Nota)`
color: #49B3BA;
`