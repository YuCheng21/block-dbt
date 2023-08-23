import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.user.login) {
    let send = document.querySelector('#send')
    send.addEventListener('click', function () {
        // check required item
        if (document.querySelector("#account").value === '') return false
        if (document.querySelector("#password").value === '') return false
        document.querySelector('form').submit()
        utils.loading.show()
    })
}

