import { Fragment, useState } from "react"
import { ItemForm } from "./ItemForm";
import { Button, Grid, IconButton, Snackbar } from '@mui/material';



export function CadastraAluguel() {

    const [origem, setOrigem] = useState()
    const [identificador, setIdentificador] = useState()
    const [precoTotal, setPrecoTotal] = useState()

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
        const dataInicio = currentDate.toISOString();
        let data = {
        'origem': origem,
        'identificador': identificador,
        'dataInicio': dataInicio,
        'status': "INDISPONIVEL",
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
                    <ItemForm label={"Nome:"} value={origem} set={setOrigem}></ItemForm>
                    <ItemForm label={"Indentificador:"} value={identificador} set={setIdentificador}></ItemForm>
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