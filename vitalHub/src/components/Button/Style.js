import styled from "styled-components";
import { ButtonTitle } from "../ButtonTitle/Style";

export const Button = styled.TouchableOpacity`
  margin-top: 25px;
  width: 100%;
  height: 44px;
  padding: 12px 8px 12px 8px;
  align-items: center;
  justify-content: center;
  background-color: #496bba;
  border-radius: 5px;
  border: 1px solid #496bba;
`;

export const ButtonFakeInput = styled.TouchableOpacity`
background-color: #F5F3F3;
color: #33303E;
margin-top: none;
text-align: justify;
width: 100%;
border: 1px white;
padding: 15px;
border-radius: 5px;
margin-top: 15px;
margin-bottom: 15px;
font-size: 14px;
font-family: MontserratAlternates_600SemiBold;
color: white;
`

export const ButtonBlock = styled(Button)`
 background-color: #ACABB7;
  border: #ACABB7;
`

export const ButtonSave = styled.TouchableOpacity`
  margin-top: 25px;
  width: 100%;
  height: 44px;
  padding: 12px 8px 12px 8px;
  align-items: center;
  justify-content: center;
  background-color: #acabb7;
  border-radius: 5px;
  border: 1px solid #acabb7;
`;

export const ButtonGoogle = styled(Button)`
  background-color: #ffffff;
  margin-bottom: 40px;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  border: 1px solid white;
`;

export const ButtonsHome = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 90%;
  margin-top: 38px;
  margin-bottom: 20px;
`;

export const ButtonSecundario = styled.TouchableOpacity`
  border: none;
  background-color: transparent;
  margin-top: 30px;
  margin-bottom: 5px;
`;

export const ButtonSecundarioPag = styled(ButtonSecundario)`
  margin-bottom: 25px;
`;

export const ButtonModal = styled(Button)`
  width: 100%;
`;

export const ButtonAgendar = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: #49b3ba;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export const Btn = styled(Button)``;
export const BtnText = styled(ButtonTitle)``;

export const FotoEnviar = styled.TouchableOpacity`
  background-color: #49b3ba;
  border-radius: 5px;
  width: 172px;
  height: 44px;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonSecundarioRed = styled(ButtonSecundario)`
  margin-top: none;
  margin-bottom: none;
  align-items: center;
  justify-content: center;
  width: 30%;
`;

export const ButtonExit = styled.TouchableOpacity`
  height: 45px;
  width: 190px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #acabb7;
  margin-top: 25px;
`;
