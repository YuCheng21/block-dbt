import * as utils from "@static/src/js/utilities";

let oauthSend = document.querySelector('#oauthSend')
if (oauthSend) {
    oauthSend.addEventListener('click', function () {
        let data = {
            account: document.querySelector("#account").value,
        }
        utils.submitForm(data)
    })
}
