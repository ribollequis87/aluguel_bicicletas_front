import { Fragment, useEffect, useState } from "react"
import { ItemForm } from "./ItemForm";
import { Button, Grid, IconButton, Snackbar } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export function CadastraAluguel() {

    const [origem, setOrigem] = useState()
    const [identificador, setIdentificador] = useState()
    const [precoTotal, setPrecoTotal] = useState()
    const [bicicletas, setBicicletas] = useState([])

    const [dataBicicleta, setDataBicicleta] = useState([])

    const [message, setMessage] = useState()
    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const handleChangeBicicleta = (event) => {
      setBicicletas(event.target.value);
      };

    useEffect(() => {
      loadBicicletas()
  }, [])


  function loadBicicletas() {
      fetch('http://localhost:8080/bicicleta', {
          method: 'GET'
          }).then(response => {
          return response.json()
          }).then(data => {
          setDataBicicleta(data)
          }).catch(response => {
          alert('Erro ao achar bicicletas!')
          alert(response.status)
          })
  }

    const action = (
        <Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
          </IconButton>
        </Fragment>
      );
      
    function click() {
        const currentDate = new Date();
        const dataInicio = currentDate.toISOString();
        let data = {
        'origem': origem,
        'identificador': identificador,
        'dataInicio': dataInicio,
        'status': "CONFIRMADO",
        'precoTotal': precoTotal,
        'bicicleta': bicicletas,

        }

      fetch('http://localhost:8087/aluguel', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
          if (!response.ok) {
              // error processing
              throw 'Error';
          }
        setOpen(true)
        setMessage("Aluguel cadastrado com sucesso")
        //load()
      }).catch(response => {
          setOpen(true)
          setMessage('erro no cadastro da aluguel!')
      })
}

    return (
        <>
            <div className="card">

                <Grid container columnSpacing={2} rowSpacing={1}>
                    <ItemForm label={"Origem:"} value={origem} set={setOrigem}></ItemForm>
                    <ItemForm label={"Indentificador:"} value={identificador} set={setIdentificador}></ItemForm>
                    <ItemForm label={"Preco Total:"} value={precoTotal} set={setPrecoTotal}></ItemForm>

                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Bicicleta</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bicicletas}
                        label="Campeonato"
                        onChange={handleChangeBicicleta}
                    >
                    {
                        dataBicicleta.map((bicicleta, index) => {
                        return <MenuItem value={bicicleta.id}>{bicicleta.modelo} | {bicicleta.tipo} | R${bicicleta.preço}</MenuItem>
                    })
                    }
                        
                    
                    </Select>
                </FormControl>
                </Grid>
                <Button variant="outlined" onClick={() => click()}>Cadastrar</Button>

            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            ></Snackbar>
        </>
    )

}