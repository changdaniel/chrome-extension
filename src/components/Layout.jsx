import React from "react"
import {useSlot,mix} from "../util"
import {Nav,Footer} from "./"
import styled from "styled-components"


const Style = styled.div`
    ${mix.hw([6,6])}
    ${mix.col("flex-start","stretch")}
    
    main{
        flex:1;
    }
`


export function Layout({children}) {
    children = useSlot(children)
  
    return (
        <Style>
            {children.nav ? children.nav : <Nav />}
            {children.default}
            {children.footer ? children.footer : <Footer />}
        </Style>
    )
}
