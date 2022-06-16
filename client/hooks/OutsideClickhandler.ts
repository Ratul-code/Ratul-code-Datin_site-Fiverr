import { useEffect, useRef } from "react";

export const useOutsideClick = (callback:()=>void)=>{
    let wrapperRef = useRef<any>(null);
    useEffect(()=>{
      const handler = (e:any)=>{
        if( wrapperRef.current && !wrapperRef.current.contains(e.target)){
          callback()
        }
      }
      document.addEventListener("mousedown",handler)
      return ()=>{document.removeEventListener("mousedown",handler)}
    },[]);
    return wrapperRef
  }