import React from 'react'
import {Route,Redirect} from "react-router-dom"

export default function ProtectedRoute({children,path,exact}){
    return (<Route path={path} exact={exact} render={()=>{
      if(localStorage.getItem("token"))
        return <> {children} </>
      else
        return <Redirect to="/login"/>       
    }}/>)   
}