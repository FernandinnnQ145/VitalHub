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
import { UserDecodeToken } from "../../utils/Auth"

export const LocalConsulta = ({
    navigation,
    route
}) => {
    const [clinica, setClinica] = useState(null)
    const [nome, setNome] = useState("")

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
    async function profileLoad() {
        const token = await UserDecodeToken();
    
       
    
        if (token) {
          setNome(token.name);
        }
      }

    useEffect(() => {
        if (clinica == null) {
            BuscarClinica()
        }
        profileLoad()
    }, [clinica])

    return (
        <Containerwhite>
            {
                clinica != null && (
                    <>
                        <Map 
                        latitude={clinica.endereco.latitude}
                        longitude={clinica.endereco.longitude}
                        nomeClinica={clinica.nomeFantasia}
                        nomeUsuario={nome}
                        />



                        <TitleGray>{clinica.nomeFantasia}</TitleGray>
                        <SubTitleLocal>{clinica.endereco.cidade}</SubTitleLocal>


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
                                    value={JSON.stringify(clinica.endereco.cep)}
                                    textLabel='Cep'
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