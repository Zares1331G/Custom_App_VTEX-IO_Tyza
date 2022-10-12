//Este script debe ser colocado en el checkout para que se ejecute una vez se cargue el mismo para que setee la varible del orderForm
//https://developers.vtex.com/vtex-rest-api/docs/customizable-fields-with-checkout-api

let dataStorage = window?.localStorage?.getItem('aliados_referidos_flamingo') ?? "[]"
let dataStorageJson = JSON.parse(dataStorage)

async function putData(url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

if (dataStorageJson?.length) {

    const bodyData = {
        "value":  dataStorage
    }

    const { orderFormId } = vtexjs.checkout.orderForm

    putData(`/api/checkout/pub/orderForm/${orderFormId}/customData/referidos_flamingo/aliados`, bodyData).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}
