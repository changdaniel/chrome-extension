let environment = process.env.REACT_APP_ENV

let config = {
    development:{
        backendUrl:"http://localhost:5000",
        websiteUrl:"http://localhost:8080"
    },
    production:{
        backendUrl:"https://api.joincobble.com",
        websiteUrl:"https://joincobble.com/"
    }
}

export default config[environment]