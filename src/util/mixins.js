import {css} from "styled-components"

export const mix = {
    row:function(justifyContent="center",alignItems=justifyContent,wrap="nowrap",alignContent="normal"){
        return ({theme})=>{
            return css`
                display:flex;
                flex-flow:row ${wrap};
                justify-content:${justifyContent};
                align-items:${alignItems};
                align-content:${alignContent};
            `
        }
    },
    col:function(justifyContent="center",alignItems=justifyContent,wrap="nowrap",alignContent="normal"){
        return ({theme})=>{
            return css`
                display:flex;
                flex-flow:column ${wrap};
                justify-content:${justifyContent};
                align-items:${alignItems};
                align-content:${alignContent};
            `
        }
    },
    gap:function(...args){
        return ({theme})=>{
            return css`
                & > *{
                    ${mix.m(...args)}
                }
            `
        }
    },
    stretch:function(){
        return ({theme})=>{
            return css`
                & > *{
                    flex:1;
                } 
            `
        }
    },
    p:function(top=2,right=top,bottom=top,left=right){
        return ({theme})=>{
            let s = theme.space 
            return css`
                padding:${s[top]} ${s[right]} ${s[bottom]} ${s[left]};
            `
        }
    },
    m:function(top=2,right=top,bottom=top,left=right){
        return ({theme})=>{
            let s = theme.space 
            return css`
                margin:${s[top]} ${s[right]} ${s[bottom]} ${s[left]};
            `
        }
    },
    hw:function(heightParam=0,widthParam=heightParam){
        return ({theme})=>{
            let minHeight,minWidth,maxHeight,maxWidth,height,width
            minHeight=minWidth=maxHeight=maxWidth=height=width="unset"

            if(Array.isArray(heightParam)){
                let h = heightParam[0]
                let min = heightParam[1]
                let max = heightParam[2]
                height = h === Number(h) ? theme.sizes[h] : h
                minHeight = min === Number(min) ? theme.sizes[min] : min
                maxHeight = max === Number(max) ? theme.sizes[max] : max
            }else
                height = heightParam === Number(heightParam) ? theme.sizes[heightParam] : heightParam

            if(Array.isArray(widthParam)){
                let w = widthParam[0]
                let min = widthParam[1]
                let max = widthParam[2]
                width = w === Number(w) ? theme.sizes[w] : w
                minWidth = min === Number(min) ? theme.sizes[min] : min
                maxWidth = max === Number(max) ? theme.sizes[max] : max
            }else
                width = widthParam === Number(widthParam) ? theme.sizes[widthParam] : widthParam

            return css`
                height:${height};
                width:${width};
                min-height:${minHeight};
                max-height:${maxHeight};
                min-width:${minWidth};
                max-width:${maxWidth};
            `
        }
    },
    h:function(height){
        return mix.hw(height,null)
    },
    w:function(width){
        return mix.hw(null,width)
    },
    pos:function(vertical,horizontal){
        return ({theme})=>{
            let percents = {
                top:0,
                center:50,
                bottom:100,
                left:0,
                right:100
            }
            let vPer = percents[vertical]
            let hPer = percents[horizontal]
            return css`
                position:absolute;
                top:${vPer}%;
                left:${hPer}%;
                transform:translate(-${hPer}%,-${vPer}%);
            `
        }
    },
    children:function(kids){
        return kids.map((styleArray,i) => {
            return css`
                & > *:nth-child(${i+1}){
                    ${styleArray}
                }
            `
        })
    }
}