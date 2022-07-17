import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { darkTheme, lightTheme, customTheme } from '../themes'
import { CssBaseline } from '@mui/material'

interface Props extends AppProps{
  themeCookie: string
}

function MyApp({ Component, pageProps, ...rest }: Props) {

  const theme = JSON.stringify(rest.themeCookie).toString();
  // console.log(theme)
  let themeAux = lightTheme;

  if(
    theme.includes("dark")
  ){
    themeAux = darkTheme
  }

  if(
    theme.includes("light")
    
  ){
    themeAux = lightTheme
  }


  if(
    theme.includes("custom")
  ){
    themeAux = customTheme
  }
  
  // const props = {rest}
  // console.log('ppppp'+props.props!)
  return (
    <ThemeProvider theme={themeAux}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({req}) => {

//   const {themeCookie  = 'light', name = 'No name'} = req.cookies

//   const validTheme = ['light', 'dark', 'custom'];

//   console.log('SSP:' + themeCookie)

//   return {
//     props: {
//       themeCookie,
//       name
//     }
//   }
// }

MyApp.getInitialProps = async (ctx: AppContext) => {

  const cookies = ctx.ctx.req ? (ctx.ctx.req as any).cookies : {themeCookie: 'light'}
  // console.log('getInitialProps: '+cookies?.themeCookie)
  const validTheme = ['light', 'dark', 'custom'];

  return{
      themeCookie: validTheme.includes(cookies?.themeCookie) ? cookies?.themeCookie : 'light'
  }
} 


export default MyApp
