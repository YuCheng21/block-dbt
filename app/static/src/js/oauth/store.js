import * as utils from "@static/src/js/utilities";
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.oauth.store) {
    let oauthSend = document.querySelector('#oauthSend')
    oauthSend.addEventListener('click', function () {
        let data = {
            account: document.querySelector("#account").value,
        }
        utils.submitForm(data)
    })
}
