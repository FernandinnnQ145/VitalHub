import { NomeClinica } from "../CardClinicas/Style";
import { ImagePaciente } from "../ImagemPerfil/Style";
import { BoxCardMedico, BoxInfoMedico, InfoMedico } from "./Style";

export const CardMedico = ({ selected, medico, setMedico }) => {
  return (
    <BoxCardMedico
      onPress={() =>
        setMedico({
          medicoClinicaId: medico.id,
          medicoLabel: medico.idNavigation.nome,
          medicoEspecialidade: medico.especialidade.especialidade1,
        })
      }
      selected={selected}
    >
      <ImagePaciente
        source={{uri: medico.idNavigation.foto}}
      />

      <BoxInfoMedico>
        <NomeClinica>{medico.idNavigation.nome}</NomeClinica>
        <InfoMedico>{medico.especialidade.especialidade1}</InfoMedico>
      </BoxInfoMedico>
    </BoxCardMedico>
  );
};
