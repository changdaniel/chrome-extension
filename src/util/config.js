let environment = process.env.REACT_APP_ENV


let configEnv = {
    development:{
        backendUrl:"http://localhost:5000",
        websiteUrl:"http://localhost:8080"
    },
    production:{
        backendUrl:"https://api.centiments.net",
        websiteUrl:"https://centiments.net"
    },
    global:{
        email:"hello@centiments.net"
    }
}


export const config = {
    ...configEnv.global,
    ...configEnv[environment]
}