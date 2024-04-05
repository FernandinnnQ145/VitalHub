import { Box, BoxInputRow } from "../../components/BoxCadastrar/Style"
import { Containerwhite } from "../../components/Container/Style"
import { ImagemLocalConsulta } from "../../components/ImagemPerfil/Style"
import { BoxInputPreenchido } from "../../components/InputAndLabel/Index"
import { TitleGray } from "../../components/Title/Style"
import { SubTitleLocal } from "./Style"
import { ButtonSecundarioPag } from "../../components/Button/Style"
import { ButtonSecundarioTitleBlue } from "../../components/ButtonTitle/Style"
import Map from "../../components/Map/Map"
import { useEffect, useState } from "react"
import api from "../../services/service"

export const LocalConsulta = ({
    navigation,
    route
}) => {
    const [clinica, setClinica] = useState(null)

    async function BuscarClinica() {
        await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaId}`)
            .then(response => {
                console.log(response.data);
                setClinica(response.data)
                
                const numeroEndereco = clinica.endereco.numero
                setNumero(numeroEndereco)
            }).catch(error => {
                console.log(error);
            })

    }

    useEffect(() => {
        if (clinica == null) {
            BuscarClinica()
        }
    }, [clinica])

    return (
        <Containerwhite>
            {
                clinica != null && (
                    <>
                        <Map 
                        // latitude={clinica.endereco.latitude}
                        // longitude={clinica.endereco.longitude}
                        />



                        <TitleGray>{clinica.nomeFantasia}</TitleGray>
                        <SubTitleLocal>São Paulo, SP</SubTitleLocal>


                        <Box>


                            <BoxInputPreenchido
                                value={clinica.endereco.logradouro}
                                textLabel='Endereço'
                            />
                            <BoxInputRow>
                                <BoxInputPreenchido
                                    keyboardType="numeric"
                                    value={JSON.stringify(clinica.endereco.numero)}
                                    textLabel='Número'
                                    fieldWidth={45}
                                />
                                <BoxInputPreenchido
                                    value={clinica.endereco.cidade}
                                    textLabel='Bairro'
                                    fieldWidth={45}
                                />
                            </BoxInputRow>
                        </Box>

                        <ButtonSecundarioPag onPress={() => navigation.replace("Main")}>
                            <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
                        </ButtonSecundarioPag>
                    </>
                )
            }


        </Containerwhite>
    )
}