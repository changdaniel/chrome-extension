import {createGlobalStyle} from "styled-components"
import reset,{normalize} from 'react-style-reset/string'
import {themeGet} from "@styled-system/theme-get"

export const GlobalStyle = createGlobalStyle`
	${reset}
	${normalize}

	button,input,textarea,a,ul,ol,li{ 
		all:unset;
		appearance: none; 
	}

	*{
		box-sizing:border-box;
		position:relative;
		font-family:${themeGet("fonts.body")} !important;
		font-weight:${themeGet("fontWeights.body")};
		font-size:${themeGet("fontSizes[2]")};
	}

	p,b,span,button,input{ color:${themeGet("colors.text")} }

	*:not(p):not(span)[primary]{ background:${themeGet("colors.primary.main")} }
	*:not(p):not(span)[secondary]{ background:${themeGet("colors.secondary.main")} }
	*:not(p):not(span)[error]{ background:${themeGet("colors.error.main")} }
	*:not(p):not(span)[warning]{ background:${themeGet("colors.warning.main")} }
	*:not(p):not(span)[info]{ background:${themeGet("colors.info.main")} }
	*:not(p):not(span)[success]{ background:${themeGet("colors.success.main")} }

	p[primary],span[primary]{ color:${themeGet("colors.primary.main")} }
	p[secondary],span[secondary]{ color:${themeGet("colors.secondary.main")} }
	p[error],span[error]{ color:${themeGet("colors.error.main")} }
	p[warning],span[warning]{ color:${themeGet("colors.warning.main")} }
	p[info],span[info]{ color:${themeGet("colors.info.main")} }
	p[success],span[success]{ color:${themeGet("colors.success.main")} }

	h1,h2,h3,h4,h5,h6{
		font-family:${themeGet("fonts.heading")};
		font-weight:${themeGet("fontWeights.heading")};
	}

	main{
		background:${themeGet("colors.background")};
	}

	h1{ font-size:${themeGet("fontSizes.7")} }
	h2{ font-size:${themeGet("fontSizes.6")} }
	h3{ font-size:${themeGet("fontSizes.5")} }
	h4{ font-size:${themeGet("fontSizes.4")} }
	h5{ font-size:${themeGet("fontSizes.3")} }
	h6{ font-size:${themeGet("fontSizes.2")} }

	b{ font-weight:${themeGet("fontWeights.bold")} }

	button,input,a{ cursor:pointer }

`