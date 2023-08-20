import * as utils from "../utilities";


let send = document.querySelector('#send')
if (send && server.endpoint === 'user.login') {
    send.addEventListener('click', function () {
        // check required item
        if (document.querySelector("#account").value === '') return false
        if (document.querySelector("#password").value === '') return false
        document.querySelector('form').submit()
        utils.loading.show()
    })
}

