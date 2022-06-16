import styled from "styled-components";
import { paperBasePropType } from ".";

export const PaperStyled = styled.section<paperBasePropType>`
    padding: 4.4rem 6.4rem;
    background-color: ${(props:paperBasePropType)=>props.bg};
    width:100%;
    height: auto;
    position:relative;

    @media (max-width: 1050px) {
    padding: 3.5rem 4rem ;
  }
    @media (max-width: 700px) {
    padding: 2rem ;
  }
    @media (max-width: 390px) {
    padding: 2rem 0.3rem ;
  }
      
`