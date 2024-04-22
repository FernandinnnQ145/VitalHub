import { Input } from "./Style";

export const InputLogin = ({
  placeholder,
  editable,
  onChangeText,
  keyType,
  value,
  height = 53,
  padding,
  paddingBottom,
  multiline,
  placeholdertextcolor,
}) => {
  return (
    <Input
      multiline={multiline}
      placeholder={placeholder}
      editable={editable}
      keyBoardType={keyType}
      onChangeText={onChangeText}
      value={value}
      height={height}
      padding={padding}
      paddingBottom={paddingBottom}
      placeholderTextColor={placeholdertextcolor}
    />
  );
};

export const InputProntuario = ({
  placeholder,
  editable,
  onChangeText,
  keyType,
  value,
  height,
  padding,
  paddingBottom,
  multiline,
  numberOfLines,
}) => {
  return (
    <InputProntuario
      multiline={multiline}
      placeholder={placeholder}
      editable={editable}
      keyBoardType={keyType}
      onChangeText={onChangeText}
      value={value}
      height={height}
      padding={padding}
      paddingBottom={paddingBottom}
      numberOfLines={numberOfLines}
    />
  );

};
