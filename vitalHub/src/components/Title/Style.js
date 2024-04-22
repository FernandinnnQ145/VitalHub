import styled from "styled-components";

export const Title = styled.Text`
font-family: MontserratAlternates_600SemiBold;
font-size: 20px;
color: #FFFFFF;
`

export const TitleGray = styled(Title)`
color: #33303E;
`

export const TextSubRecuperar = styled(Title)`
font-family: MontserratAlternates_500Medium;
font-size: 14px;
color: #33303E;
margin-top: 13px;
text-align: center;
`

export const TextSubRedefinir = styled(TextSubRecuperar)`
font-size: 12px;
margin-bottom: 24px;
`

export const TextSubCriar = styled(TextSubRecuperar)`
font-family: Quicksand_500Medium;
`

export const TextSubVerificar = styled(TextSubRedefinir)`
margin-bottom: none;
`

export const NamePerfil = styled(Title)`
font-size: 16px;
color: #33303E;
text-align: center;
/* margin-top: 26px; */
`

export const EmailPerfil = styled(TextSubRedefinir)`
margin-top: none;
color: #5F5C6B;
font-size: 14px;
font-family: Quicksand_500Medium;
`

export const TitleGrayMargin = styled(TitleGray)`
margin-top: 35px;
margin-bottom: 35px;
`

export const TextPrescricao = styled(TextSubRecuperar)`
font-size: 14px;
color: 4E4B59;
`

export const TitleEnviaFoto = styled.Text`
font-family: MontserratAlternates_700Bold;
font-size: 14px;
color: white;
`






