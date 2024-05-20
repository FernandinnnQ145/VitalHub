import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BoxCardClinicas,
  BoxCardConteudo,
  BoxClassificacao,
  BoxDias,
  Dias,
  LocalClinica,
  NomeClinica,
  Nota,
} from "./Style";

export const CardClinicas = ({
  selected,
  clinica,
  setClinica,
}) => {
  return (
    <BoxCardClinicas
      onPress={() =>
        setClinica({
          clinicaId: clinica.id,
          clinicaLabel: clinica.nomeFantasia,
        })
      }
      selected={selected}
    >
      <BoxCardConteudo>
        <NomeClinica>{clinica.nomeFantasia}</NomeClinica>
      </BoxCardConteudo>

      <BoxCardConteudo>
        <LocalClinica>{clinica.endereco.cidade}</LocalClinica>

        <BoxDias>
          <MaterialCommunityIcons name="calendar" size={14} color="#49B3BA" />
          <Dias>Seg-Sex</Dias>
        </BoxDias>
      </BoxCardConteudo>
    </BoxCardClinicas>
  );
};
