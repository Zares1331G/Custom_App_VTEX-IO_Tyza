import React, { useEffect } from 'react'
import { useRuntime } from 'vtex.render-runtime'

function Aliados() {
  const { query } = useRuntime()

  async function postData(data:object) {
    const response = await fetch("http://172.16.83.24:8080/api/v1/marcacion/ecommerce", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  useEffect(()=>{
    let dataStorage:any = window?.localStorage?.getItem('aliados_referidos_flamingo') ?? "[]"
    let dataStorageJson:any = JSON.parse(dataStorage)


    //Primera Validación, esta validación se ejecuta cuando se carga la pagina por primera vez
    if(dataStorageJson?.length && !query?.ir){

      const bodyData = {
        "referidos":{
          "variableLocalStorage": dataStorageJson,
          "urlActual": window.location.href
      }}

      postData(bodyData).then(res =>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }

    if(query.iddel){
      if (dataStorageJson && dataStorageJson.length) {
        const result = dataStorageJson.filter(({ir}:any)=> ir!== query.iddel)

        if(result?.length < dataStorageJson?.length){
          localStorage.setItem("aliados_referidos_flamingo", JSON.stringify(result))
        }
      }

    }
    else if(query.ir){
      delete query.map

      if (dataStorageJson?.length) {
        //Segunda validación

        const result = dataStorageJson.some(({ir}:any)=> ir === query?.ir)

        if(!result){
          dataStorageJson.push(query)
          localStorage.setItem("aliados_referidos_flamingo", JSON.stringify(dataStorageJson))
        }

        const bodyData = {
          "referidos":{
            "variableLocalStorage": dataStorageJson,
            "urlActual": window.location.href
        }}

        postData(bodyData).then(res =>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })

      }else{
        //Tercer validación, aquí se crea por primera vez la variable en localStorage
        localStorage.setItem("aliados_referidos_flamingo", JSON.stringify([query]))

        const bodyData = {
          "referidos":{
            "variableLocalStorage": [query],
            "urlActual": window.location.href
        }}

        postData(bodyData).then(res =>{
        console.log(res)
        }).catch(err=>{
        console.log(err)
        })
      }
    }
  }, [])

  return <div />
}

export default Aliados
