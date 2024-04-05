import styled, { css } from "styled-components";
import { BoxCardClinicas } from "../CardClinicas/Style";

export const BoxCardMedico = styled.TouchableOpacity`
flex-direction: row;
gap: 10px;
padding: 9px 0px 9px 8px;
align-items: center;
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

export const BoxInfoMedico = styled.View`
gap: 10px;
`

export const InfoMedico = styled.Text`
font-family:  Quicksand_500Medium;
font-size: 14px;
color: #8C8A97;
`