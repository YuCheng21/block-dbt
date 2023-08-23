import * as utils from "@static/src/js/utilities"

let contentSend = document.querySelector('#contentSend')
if (contentSend) {
    contentSend.addEventListener('click', function () {
        let data = {
            smartContractAddress: page.id,
            expList: document.querySelector("#expList").value,
        }
        utils.submitForm(data)
    })
}