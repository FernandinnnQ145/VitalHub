import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export const SelectDate = ({ setHoraSelecionada }) => {
  const pickerStyles = {
    inputIOS: style.pickerInput,
    inputAndroid: style.pickerInput,
    placeholder: { color: "#34898F" },
  };
  const placeholder = {
    label: "Selecionar horário",
    value: null,
    color: "#34898F",
  };

  const dataAtual = moment().format("YYYY-MM-DD");
  const [arrayOptions, setArrayOptions] = useState(null);

  async function loadOptions() {
    //capturar a quantidade de horas que faltam para as 24h
    const horasRestantes = moment(dataAtual)
      .add(24, "hours")
      .diff(moment(), "hours");

    //criar um laco que rode a quantidade de horas que faltam
    const options = Array.from({ length: horasRestantes }, (_, index) => {
      let valor = new Date().getHours() + (index + 1);

      return {
        label: `${valor}:00`,
        value: `${valor}:00`,
      };
    });
    //pra cada hora que falta sera criada uma nova option
    setArrayOptions(options);
  }

  useEffect(() => {
    loadOptions();
  }, []);

  return (
    <View style={{ width: "90%" }}>
      {arrayOptions ? (
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          style={style}
          placeholder={{
            label: "Selecione um horário",
            value: null,
            color: "#34898F",
          }}
          onValueChange={(value) => setHoraSelecionada(value)}
          items={arrayOptions}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#60BFC5",
    borderRadius: 5,
    color: "#34898F",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "MontserratAlternates_600SemiBold",
  },
  inputAndroid: {
    marginBottom: "42px",
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#60BFC5",
    borderRadius: 5,
    color: "#34898F",
    alignItems: "center",
    justifyContent: "center",

    fontFamily: "MontserratAlternates_600SemiBold",
  },
  iconContainer: {
    // top: '25%',
    marginRight: 10,
  },
  placeholder: {
    color: "#34898F",
  },
});
