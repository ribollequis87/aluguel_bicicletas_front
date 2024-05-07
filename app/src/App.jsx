import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CadastraAluguel } from './aluguel/CadastraAluguel'
import { ListaAlugueis } from './aluguel/ListaAluguel'
import {  Grid } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom'
import { FinalizarAluguel } from './aluguel/FinalizaçãoAluguel'

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
            <Grid item xs={12}>
              <Link to='/listarAlugueis'>Listar Alugueis</Link>
            </Grid>
            <Grid item xs={12}>
              <Link to='/finalizarAluguel'>Finalizar Alugueis</Link>
            </Grid>
          </Grid>


        </Grid>
      </Grid>
        <Routes>
          <Route path='/cadastrarAluguel' element={<CadastraAluguel />} />
          <Route path='/listarAlugueis' element={<ListaAlugueis />} />
          <Route path='/finalizarAluguel' element={<FinalizarAluguel />} />
        </Routes>


    </>
  )}


export default App