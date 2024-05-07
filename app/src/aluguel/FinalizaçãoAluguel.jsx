import { Fragment, useEffect, useState } from "react"
import { Button, Grid, IconButton, Snackbar } from '@mui/material';
import { ItemForm } from "./ItemForm";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function FinalizarAluguel() {
    const [destino, setDestino] = useState()
    const [kmPercorridos, setKmPercorridos] = useState()
    const [aluguel, setAluguel] = useState()


    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()

    const [dataAluguel, setDataAluguel] = useState([])



    const handleChangeAluguel = (event) => {
    setAluguel(event.target.value);
    };



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    useEffect(() => {
        loadAluguel()
    }, [])


    function loadAluguel() {
        fetch('http://localhost:8080/aluguel?status=CONFIRMADO' , {
            method: 'GET'
            }).then(response => {
            return response.json()
            }).then(data => {
            setDataAluguel(data)
            }).catch(response => {
            alert('Erro ao achar alugueis!')
            alert(response.status)
            })
    }
    


    function click() {


        let data = {
            'destino': destino,
            'kmPercorridos': kmPercorridos,
            'status': 'FINALIZADO',
            
        }
    
        fetch('http://localhost:8080/aluguel/' + aluguel,{
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
          }).then(response => {
            if (!response.ok){
              throw 'Error';
            }
            setOpen(true)
            setMessage("Alguel finalizado com sucesso!")
            //load()
          }).catch(response => {
            setOpen(true)
            setMessage("Erro ao finalizar partida!")
            // alert('erro no cadastro do time!')
            // alert(response.status)
          })
    }


    return (
        <>
            <div className="card">
              <Grid container columnSpacing={2} rowSpacing={1}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Aluguel</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={aluguel}
                        label="Campeonato"
                        onChange={handleChangeAluguel}
                    >
                    {
                        dataAluguel.map((aluguel, index) => {
                        return <MenuItem value={aluguel.id}>{aluguel.origem}</MenuItem>
                    })
                    }
                        
                    
                    </Select>
                </FormControl>

                <ItemForm label={"Destino"} value={destino} set={setDestino}></ItemForm>
                <ItemForm label={"Km percorridos"} value={kmPercorridos} set={setKmPercorridos}></ItemForm>
                

                <Grid item xs={6} style={{textAlign:"right"}}>
                    <Button variant="outlined" onClick={() => click()}>Finalizar</Button>
                </Grid>
              </Grid>

            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
            ></Snackbar>
        </>
    )
}