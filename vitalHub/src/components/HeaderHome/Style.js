import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";


export const HeaderHome = styled(LinearGradient).attrs({
    colors: ['#60BFC5', '#496BBA'],
    start: {x:0, y:0},
    end: {x:1, y:1}
})`

width:100%;
height:144px;
flex-direction:row;
align-items: center;
justify-content: space-between;
padding: 20px 20px 22px 20px;
border-radius: 0px 0px 15px 15px;

`