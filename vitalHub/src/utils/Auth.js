import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from "base-64";

if (!global.atob) {
  global.atob = encode;
}

if (!global.btoa) {
  global.atob = decode;
}

export const UserDecodeToken = async () => {
  const token = JSON.parse(await AsyncStorage.getItem("token")).token;

  // console.log(token);

  if (token === null) {
    return null;
  }
  //decodifica o token recebido
  const decoded = jwtDecode(token);
  //  console.log(decoded);

  return {
    name: decoded.name,
    role: decoded.role,
    email: decoded.email,
    id: decoded.jti,
    token: token,
  };
};

