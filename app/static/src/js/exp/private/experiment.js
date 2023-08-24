import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.exp.private.show && page.state === 'experiment') {
    let contentSend = document.querySelector('#contentSend')
    contentSend.addEventListener('click', function () {
        let data = {
            smartContractAddress: page.id,
            expList: document.querySelector("#expList").value,
        }
        utils.submitForm(data)
    })
}
