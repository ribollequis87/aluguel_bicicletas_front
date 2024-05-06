import { useEffect, useState } from "react"


export function ListaAlugueis() {

  const [data, setData] = useState([])

  useEffect(() => {
    load()
  }, [])

  function load() {
    fetch('http://localhost:8080/aluguel', {
        mode:'no-cors',
        method: 'GET'
    }).then(response => {
      return response.json()
    }).then(data => {
      setData(data)
    }).catch(response => {
      alert('Erro ao listar times!')
      alert(response.status)
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
                </tbody>
            </table>

        </div>
      </>
  )


}