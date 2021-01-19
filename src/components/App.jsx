import React,{createContext,useReducer} from 'react'
import {Account,CheckForgot,CheckRegister,Contact,Error,Forgot,Login,
    Paid,Root,Signup,SuccessMessage} from "../pages"
import {theme,reducer,initialState} from "../util"
import {ThemeProvider} from 'styled-components';
import {MemoryRouter,Route} from "react-router-dom"
import {GlobalStyle,ProtectedRoute} from "./"


export const Context = createContext()


export function App() {
	const [state, dispatch] = useReducer(reducer,initialState);

	return (
		<Context.Provider value={{state,dispatch}}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />

				<MemoryRouter>
					<ProtectedRoute path="/" exact component={Root} />
					<ProtectedRoute path="/account" component={Account}/>
					<Route path="/paid" component={Paid}/>
					<Route path="/success-message" component={SuccessMessage}/>
					<Route path="/login" component={Login}/>
					<Route path="/signup" component={Signup}/>
					<Route path="/forgot" component={Forgot}/>
					<Route path="/check-register" component={CheckRegister}/>
					<Route path="/check-forgot" component={CheckForgot}/>
					<Route path="/contact" component={Contact}/>
					<Route path="/error" component={Error}/>
				</MemoryRouter>

			</ThemeProvider>
		</Context.Provider>
	);
}


