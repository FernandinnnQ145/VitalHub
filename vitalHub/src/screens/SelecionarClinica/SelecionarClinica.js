import { useEffect, useState } from "react"
import { Box } from "../../components/BoxCadastrar/Style"
import { Button, ButtonSecundario, ButtonSecundarioPag } from "../../components/Button/Style"
import { ButtonSecundarioTitleBlue, ButtonTitle, TitleGoogle } from "../../components/ButtonTitle/Style"
import { CardClinicas } from "../../components/CardClinicas/CardClinicas"
import { Containerwhite } from "../../components/Container/Style"
import { ListComponent } from "../../components/List/List"
import { TitleGrayMargin } from "../../components/Title/Style"
import api from "../../services/service"

export const SelecionarClinica = ({
    navigation,
    route
}) => {

    const { setShowModalAgendar } = route.params;

    async function Login() {
        navigation.navigate("Main")

        setShowModalAgendar(true)
    }
    // const Clinicas = [
    //     { id: 1, nome: "Fernando", },
    //     { id: 2, nome: "Fernando",},
    //     { id: 3, nome: "Fernando", },
    // ]


    const [selectClinicaId, setSelectClinicaId] = useState(0)


    //criar o state para receber a lista de medicos (array)
    const [clinica, setClinica] = useState([]);

    //criar a funcao para listar ou para obter a lista de clinicas da api e setar no state
    async function getClinicas() {
        // console.log("AAAAAAAAAAAAAA");
        const promise = await api.get("/Clinica/ListarTodas");
        const data = promise.data;

        // console.log(data);
        //  console.log("bbbbbbbbbbbb");
         


        setClinica(data);


    }

    //criar um effect para chamada da função
    useEffect(() => {
        getClinicas();
    }, [])




    return (
        <Containerwhite>
            <TitleGrayMargin>Selecionar clinica</TitleGrayMargin>


            {/* FlatList que sera feito mais tarde */}
            <ListComponent
                data={clinica}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <CardClinicas
                        clinica={item}
                        onPress={() => setSelectClinicaId(item.id)}
                        clickButton={item.id == selectClinicaId}
                    />

                }
                showsVerticalScrollIndicator={false}
            />


            <Box>
                <Button onPress={() => navigation.replace("SelecionarMedico")}>
                    <ButtonTitle>Continuar</ButtonTitle>
                </Button>
            </Box>

            <ButtonSecundarioPag onPress={() => Login()}>
                <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
            </ButtonSecundarioPag>

        </Containerwhite>
    )
}