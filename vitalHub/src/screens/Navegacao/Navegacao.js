import { Button, View } from "react-native"
import { ContainerScrollView } from "../../components/Container/Style"



export const Navegacao = ({ navigation }) => {
    return (
        <ContainerScrollView>
            <View style={{ gap: 20 }}>
                <Button
                    title="login"
                    onPress={() => navigation.navigate("Login")}
                />
                <Button
                    title="recuperarSenha"
                    onPress={() => navigation.navigate("RecuperarSenha")}
                />
                <Button
                    title="redefinirSenha"
                    onPress={() => navigation.navigate("RedefinirSenha")}
                />
                <Button
                    title="criarConta"
                    onPress={() => navigation.navigate("CriarConta")}
                />
                <Button
                    title="verificarConta"
                    onPress={() => navigation.navigate("VerificarConta")}
                />
                <Button
                    title="telaPerfil"
                    onPress={() => navigation.navigate("TelaPerfil")}
                />
                <Button
                    title="prontuario"
                    onPress={() => navigation.navigate("Prontuario")}
                />
                <Button
                    title="homeMedico"
                    onPress={() => navigation.navigate("HomeMedico")}
                />
                <Button
                    title="homePaciente"
                    onPress={() => navigation.navigate("HomePaciente")}
                />
                <Button
                    title="selecionarClinica"
                    onPress={() => navigation.navigate("SelecionarClinica")}
                />
                <Button
                    title="selecionarMedico"
                    onPress={() => navigation.navigate("SelecionarMedico")}
                />
                <Button
                    title="selecionarData"
                    onPress={() => navigation.navigate("SelecionarData")}
                />
                <Button
                    title="localConsulta"
                    onPress={() => navigation.navigate("LocalConsulta")}
                />
                <Button
                    title="prescricaoConsulta"
                    onPress={() => navigation.navigate("PrescricaoConsulta")}
                />
            </View>
        </ContainerScrollView>



    )
}

