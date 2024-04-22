
import { useState } from "react"
import { LabelModal } from "../../components/AgendarModal/Style"
import { Box } from "../../components/BoxCadastrar/Style"
import { Button, ButtonSecundarioPag } from "../../components/Button/Style"
import { ButtonSecundarioTitleBlue, ButtonTitle } from "../../components/ButtonTitle/Style"
import CalendarComponent from "../../components/CallendarList/CallendarList"
import { ContainerScrollView, Containerwhite } from "../../components/Container/Style"
import { InputSelect, SelectDate } from "../../components/InputSelect/InputSelect"
import { TitleGrayMargin } from "../../components/Title/Style"
import { ConfirmarModal } from "../../components/ConfirmarModal/ConfirmarModal"

export const SelecionarData = ({
    navigation
}) => {

    async function Login() {
        navigation.navigate("Main")
    }


    const [showModalConfirmar, setShowModalConfirmar] = useState(false)
    return (
        <ContainerScrollView>
            <Containerwhite>
                <TitleGrayMargin>Selecionar data</TitleGrayMargin>

                <CalendarComponent />

                <Box>
                    <LabelModal>Selecione um horário disponível</LabelModal>
                </Box>

                <SelectDate />

                <Box>
                    <Button
                        onPress={() => setShowModalConfirmar(true)}
                    >
                        <ButtonTitle>Continuar</ButtonTitle>
                    </Button>
                </Box>

                <ButtonSecundarioPag onPress={() => navigation.replace("Main")}>
                    <ButtonSecundarioTitleBlue>Cancelar</ButtonSecundarioTitleBlue>
                </ButtonSecundarioPag>

                <ConfirmarModal
                    visible={showModalConfirmar}
                    setModalConfirmar={setShowModalConfirmar}
                    navigation={navigation}
                />
            </Containerwhite>
        </ContainerScrollView>

    )
}