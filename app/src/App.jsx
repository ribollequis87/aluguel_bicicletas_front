import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CadastraAluguel } from './aluguel/CadastraAluguel'
import {  Grid } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
      <h1>Sistema de Aluguel de Bikes</h1>
      <Grid container>
    
        <Grid item xs={4}>

          <Grid container>
            <Grid item xs={12}>
              <Link to='/'>Home</Link>   
            </Grid>
            <Grid item xs={12}>
              <Link to='/cadastrarAluguel'>Novo Aluguel</Link> 
            </Grid> 
          </Grid>


        </Grid>
        <Grid item xs={8}>
          <Routes>
            <Route path='/cadastrarAluguel' element={<CadastraAluguel />} />
          </Routes>
        </Grid>
      </Grid>


    </>
  )}


export default App