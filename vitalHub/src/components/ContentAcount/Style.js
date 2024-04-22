import styled from "styled-components";

export const ContentAcount = styled.View`
flex-direction: row;
justify-content: center;
align-items: center;
`

export const ContentDuvida = styled.Text`
color: white;
font-size: 14px;
font-family: MontserratAlternates_600SemiBold;
`

export const ContentLink = styled(ContentDuvida)`
color: #496BBA;
text-decoration-line: underline;
`
export const ExemploEmail = styled(ContentLink)`
font-family: MontserratAlternates_700Bold;
text-decoration-line: none;
`