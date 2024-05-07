import { useEffect, useState } from "react"
import { Button, Grid, IconButton, Snackbar } from '@mui/material';



export function ListaAlugueis() {

  const [data, setData] = useState([])
  const [idAluguel, setIdAluguel] = useState()

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()



  useEffect(() => {
    load()
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
};

  function load() {
    fetch('http://localhost:8080/aluguel', {
        method: 'GET',
    }).then(response => {
      return response.json()
    }).then(data => {
      setData(data)
    }).catch(response => {
      setOpen(true)
      setMessage('Erro ao achar alugueis!')
      
    })
  }

  function click() {
  fetch('http://localhost:8080/aluguel/' + idAluguel,{
    method: 'DELETE',
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
    setMessage("Aluguel excluido com sucesso")
    load()
  }).catch(response => {
      console.log(idAluguel)
      setOpen(true)
      setMessage('erro ao excluir aluguel!')
  })
}

  return(
    <>
        <div className="card">
            <table>
                <tbody>
                    <tr>
                    <td>Id</td>
                    <td>DataInicio</td>
                    <td>Duracao</td>
                    <td>Origem</td>
                    <td>Destino</td>
                    <td>KmPercorridos</td>
                    <td>PrecoTotal</td>
                    <td>Status</td>
                    <td>Bicicleta</td>
                    </tr>         
                    {
                    data.map((aluguel, index) => {
                        return <tr key={index}>
                        <td>{aluguel.id}</td>
                        <td>{aluguel.dataInicio}</td>
                        <td>{aluguel.duracaoViagem}</td>
                        <td>{aluguel.origem}</td>
                        <td>{aluguel.destino}</td>
                        <td>{aluguel.kmPercorridos}</td>
                        <td>{aluguel.precoTotal}</td>
                        <td>{aluguel.status}</td>
                        <td>{aluguel.bicicleta}</td>    
                        {/* vai pegar o ultimo o daquela linha */}
                        <td><Button variant="outlined" onClick={() => {click(); setIdAluguel(aluguel.id) }}>Excluir</Button></td>
                        </tr>
                        
                        
                    })
                    }
                    
                    
                </tbody>
            </table>

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