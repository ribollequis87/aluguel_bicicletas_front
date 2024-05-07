import { useEffect, useState } from "react"
import { Button, Grid, IconButton, Snackbar } from '@mui/material';



export function ListaAlugueis() {

  const [data, setData] = useState([])
  const [idAluguel, setIdAluguel] = useState()

  useEffect(() => {
    load()
  }, [])

  function load() {
    fetch('http://localhost:8080/aluguel', {
        mode: 'no-cors',
        method: 'GET',
  
    }).then(response => {
      return response.json()
    }).then(data => {
      setData(data)
    }).catch(response => {
      alert('Erro ao listar times!')
      alert(response.status)
    })
  }

  function loadAluguelId(){
    fetch('http://localhost:8080/aluguel' + idAluguel, {
      mode: 'no-cors',
      method: 'GET',
    }).then(response => {
      return response.json()
    }).then(data => {
      setIdAluguel(data)
    }).catch(response => {
      alert('Erro ao listar times!')
      alert(response.status)
    })
  }

  function click() {
  fetch('http://localhost:8080/aluguel' + idAluguel,{
    mode: 'no-cors',
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
    //load()
  }).catch(response => {
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
                        return <tr>
                        <td>{aluguel.id}</td>
                        <td>{aluguel.dataInicio}</td>
                        <td>{aluguel.duracaoViagem}</td>
                        <td>{aluguel.origem}</td>
                        <td>{aluguel.destino}</td>
                        <td>{aluguel.kmPercorridos}</td>
                        <td>{aluguel.precoTotal}</td>
                        <td>{aluguel.status}</td>
                        <td>{aluguel.bicicleta}</td>
                        </tr>
                    })

                    }
                    <tr>
                      <td><Button variant="outlined" onClick={() => click()}>Excluir</Button></td>
                    </tr>
                </tbody>
            </table>

        </div>
      </>
  )


}