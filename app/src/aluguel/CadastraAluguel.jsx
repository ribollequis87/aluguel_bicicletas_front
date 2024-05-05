import { Fragment, useState } from "react"
import { ItemForm } from "./ItemForm";
import { Button, Grid, IconButton, Snackbar } from '@mui/material';



export function CadastraAluguel() {

    const [nome, setNome] = useState()
    const [origem, setOrigem] = useState()
    const [destino, setDestino] = useState()
    const [identificador, setIdentificador] = useState()
    const [kmPercorridos, setKmPercorridos] = useState()
    const [precoTotal, setPrecoTotal] = useState()
    const [duracaoViagem, setDuracaoViagem] = useState()
    const [message, setMessage] = useState()
    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

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
        const timestamp = currentDate.getTime();
        let data = {
        'origem': nome,
        'identificador': identificador,
        'dataInicio': timestamp,
        'status': "INDISPONIVEL",
        'duracaoViagem': duracaoViagem,
        'kmPercorridos': kmPercorridos,
        'precoTotal': precoTotal,

        }

    fetch('http://localhost:8080/aluguel', {
      mode: 'no-cors',
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
                    <ItemForm label={"Destino:"} value={destino} set={setDestino}></ItemForm>
                    <ItemForm label={"Km Percorridos:"} value={kmPercorridos} set={setKmPercorridos}></ItemForm>
                    <ItemForm label={"Duração da Viagem:"} value={duracaoViagem} set={setDuracaoViagem}></ItemForm>
                    <ItemForm label={"Preco Total:"} value={precoTotal} set={setPrecoTotal}></ItemForm>
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