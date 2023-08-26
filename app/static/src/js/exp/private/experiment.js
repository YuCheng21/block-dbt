import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.exp.private.show && page.state === 'experiment') {
    let expList = document.querySelector("#expList")
    let contentSend = document.querySelector('#contentSend')
    contentSend.addEventListener('click', function () {
        let data = {
            smartContractAddress: page.id,
            expList: expList.value,
        }
        utils.submitForm(data)
    })
    let expListConvert = document.querySelector('#expListConvert')
    expListConvert.addEventListener('click', function () {
        let expTemp = document.querySelector("#expTemp").value
        let list = expTemp.split(/[ ,\n]+/)
        list = list.filter((x) => x !== '')
        list = list.join(',')
        expList.value = list
    })
}
