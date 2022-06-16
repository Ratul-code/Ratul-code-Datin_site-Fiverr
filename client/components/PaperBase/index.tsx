import React from 'react'
import { PaperStyled } from './Paper.styled'
export interface paperBasePropType{
    children:React.ReactNode,
    bg:string
}
const index = ({children,bg="#fff"}:paperBasePropType) => {
  return (
    <PaperStyled bg={bg}>
        {children}
    </PaperStyled>
  )
}

export default index