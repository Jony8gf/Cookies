import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Layout } from '../components/layouts'
import Cookies from 'js-cookie'
import { LineAxisOutlined } from '@mui/icons-material';
import axios from 'axios';

const ThemeChangerPage:FC = (props) => {

  console.log(props)

  const [currentTheme, setCurrentTheme] = useState('light');

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTheme(event.target.value);
    localStorage.setItem('theme', event.target.value);
    Cookies.set('themeCookie', event.target.value)
  }

  const onSolicitud = async() => {
    const {data} = await axios.get('/api/hello');
    console.log(data);
  }

  useEffect(() => {
    console.log("LocalStorage " + localStorage.getItem('theme'));
    console.log("Cookies " + Cookies.get('themeCookie'));
  }, [currentTheme])

  return (
    <Layout>
       <Card>
          <CardContent>
            <FormControl>
              <FormLabel>Tema</FormLabel>
              <RadioGroup
                value={currentTheme}
                onChange={onThemeChange}
              >
                <FormControlLabel value='light' control={<Radio/>} label="Light" />
                <FormControlLabel value='dark' control={<Radio/>} label="Dark" />
                <FormControlLabel value='custom' control={<Radio/>} label="Custom" />
              </RadioGroup>
            </FormControl>

            <Button 
              onClick={onSolicitud} 
            >
              Solicitud
            </Button>

          </CardContent>
       </Card>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({req}) => {

  const {themeCookie  = 'light', name = 'No name'} = req.cookies


  return {
    props: {
      themeCookie,
      name
    }
  }
}

export default ThemeChangerPage;