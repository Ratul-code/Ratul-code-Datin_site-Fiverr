import styled,{css} from "styled-components";
import { btnPropType } from ".";

export const ButtonStyled = styled.button<btnPropType>`
    border:1px solid ${(props:btnPropType)=>(props.bg)};
    /* border:1px solid #cda777; */

    background:${(props:btnPropType)=>props.btnType==="fill"?props.bg:"none"};
    /* background:${(props:btnPropType)=>props.btnType==="fill"?"#cda777":"none"}; */

    padding:${(props:btnPropType)=>props.size==="sm"?"0.3rem 0.7rem":props.size==="lg"?"0.2rem 4.2rem ":"0.6rem 1.5rem"};

    font-size:${(props:btnPropType)=>props.fontSize==="sm"?"14px":props.size==="lg"?"1.5rem":"1rem"};

    color:${(props:btnPropType)=>props.btnType==="outline"?props.bg:props.color};

    border-radius: 7px;

    cursor:pointer;

    transition: all 0.2s ease-in-out ;

    width:${(props:btnPropType)=>props.fullWidth?"100%":"auto"};

    &:hover{
        ${(props:btnPropType)=>props.btnType==="outline" && css`
            color: ${props.hoverText};
            background: ${props.bg};
        `}
        ${(props:btnPropType)=>props.btnType==="fill" && css`
            color: ${props.bg};
            background: none;
        `}
    }
` 