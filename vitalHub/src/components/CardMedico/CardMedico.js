import { NomeClinica } from "../CardClinicas/Style";
import { ImagePaciente } from "../ImagemPerfil/Style";
import { BoxCardMedico, BoxInfoMedico, InfoMedico } from "./Style";

export const CardMedico = ({ onPress, clickButton, medicos }) => {
  return (
    <BoxCardMedico onPress={onPress} clickButton={clickButton}>
      <ImagePaciente
        source={require("../../assets/image/Imagem_Escolha_Medico.png")}
      />

      <BoxInfoMedico>
        <NomeClinica>{medicos.idNavigation.nome}</NomeClinica>
        <InfoMedico>{medicos.especialidade.especialidade1}</InfoMedico>
      </BoxInfoMedico>
    </BoxCardMedico>
  );
};
