import React from 'react'
import {ButtonStyled} from "./Button.styled";
export interface btnPropType{
    size?:"sm" | "md" | "lg",
    btnType?:"outline" | "fill"
    fontSize?:"sm" | "md" | "lg",
    fullWidth?:boolean,
    children?:React.ReactNode,
    onClick?:React.MouseEventHandler<HTMLButtonElement> | undefined,
    bg?:string
    color?:string,
    hoverText?:string,
    type?:string
}
const index = ({size="md",btnType="fill",type,fontSize="lg",fullWidth=false,onClick,children="Button",bg="#ADD8E6",color="#fff",hoverText="white"}:btnPropType) => {
  return (
    <ButtonStyled type={type} color={color} onClick={onClick} size={size} btnType={btnType} bg={bg} fontSize={fontSize} hoverText={hoverText} fullWidth={fullWidth}>
        {children}
    </ButtonStyled>
  )
}

export default index