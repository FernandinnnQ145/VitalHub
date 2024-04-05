import styled, { css } from "styled-components";

export const Input = styled.TextInput`
width: 100%;
border: 1px white;
padding: 15px;
border-radius: 5px;
margin-top: 25px;
font-size: 14px;
font-family: MontserratAlternates_600SemiBold;
color: white;


`

export const InputSenha = styled(Input)`
margin-top: 16px;
margin-bottom: none;
`

export const InputCodVerfivica = styled(Input)`
width: 16%;
height: 68px;
font-family: Quicksand_600SemiBold;
font-size: 45px;
text-align: center;
padding: 5px;

`

export const InputPreenchido = styled(Input)`
background-color: #F5F3F3;
color: #33303E;
margin-top: none;
text-align: justify;
`

export const InputProntuario = styled.TextInput.attrs({
    placeholderTextColor: '#34898F'
})`
height: ${(props) => `${props.height}px`};


border: 1px solid #49B3BA;
    border-radius: 5px;
    font-family: 'MontserratAlternates_600SemiBold';
    font-size: 14px;
    margin-bottom: 15px;
    padding-left: 16px;
    color: #34898F;
    padding: ${(props) => props.padding ? `${props.padding}px` : '15px'};
    padding-bottom: ${(props) => props.paddingBottom ? `${props.paddingBottom}px` : '15px'};

`



