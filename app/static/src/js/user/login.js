import * as utils from "../utilities";


let send = document.querySelector('#send')
if (send && server.endpoint === 'user.login') {
    send.addEventListener('click', function () {
        // check required item
        if ($('#account').val() == '') return false;
        if ($('#password').val() == '') return false;

        $('form').submit();
        utils.loading.show()
    })
}

