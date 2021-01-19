import { useMediaQuery } from 'react-responsive'
import {theme} from "../util"


function XSmall(props){
    let minWidth = props["shrink"] ? null : theme.breakpoints.xs
    let maxWidth = props["grow"] ? null : theme.breakpoints.sm
    return useMediaQuery({ minWidth, maxWidth}) ? props.children : null
}


function Small(props){
    let minWidth = props["shrink"] ? null : theme.breakpoints.sm
    let maxWidth = props["grow"] ? null : theme.breakpoints.md
    return useMediaQuery({ minWidth, maxWidth}) ? props.children : null
}


function Medium(props){
    let minWidth = props["shrink"] ? null : theme.breakpoints.md
    let maxWidth = props["grow"] ? null : theme.breakpoints.lg
    return useMediaQuery({ minWidth, maxWidth}) ? props.children : null
}


function Large(props){
    let minWidth = props["shrink"] ? null : theme.breakpoints.lg
    let maxWidth = props["grow"] ? null : theme.breakpoints.xl
    return useMediaQuery({ minWidth, maxWidth}) ? props.children : null
}


function XLarge(props){
    let minWidth = props["shrink"] ? null : theme.breakpoints.xl
    let maxWidth = props["grow"] ? null : theme.breakpoints.xxl
    return useMediaQuery({ minWidth, maxWidth}) ? props.children : null
}


function XXLarge(props){
    let minWidth = props["shrink"] ? null : theme.breakpoints.xxl
    return useMediaQuery({ minWidth }) ? props.children : null
}


export const Screen = {
    XSmall,
    Small,
    Medium,
    Large,
    XLarge,
    XXLarge
}
