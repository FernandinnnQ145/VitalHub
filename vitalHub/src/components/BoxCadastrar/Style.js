import styled from "styled-components";

export const Box = styled.SafeAreaView`
width: 90%;
`

export const BoxRow = styled.View`
flex-direction: row;
gap: 16px;
`

export const BoxInputRow = styled(BoxRow)`
justify-content: space-between;
`
export const BoxMensagemHome = styled.View`
flex-direction: column;
`

export const BoxTitleAndImage = styled.View`
gap: 12px;
align-items: center;
flex-direction: row;
justify-content: center;
`

export const BoxInfoPaciente = styled.View`
width: 70%;
gap: 11px;

`
export const BoxEspacoButtons = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top: 10px;
`

export const Linha = styled.View`
width: 90%;
height: 2px;
background-color: #8C8A97;
margin-top: 20px;
margin-bottom: 20px;
`