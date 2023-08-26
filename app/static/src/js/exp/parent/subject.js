import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.exp.parent.obj4sub) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};

        let objTest = document.querySelector('#objTest')
        if (objTest) {
            objTest.addEventListener('change', function (event) {
                document.querySelector('#objectID').disabled = !event.target.checked
            })
        }

        utils.fetch_data(server.url.exp.number, server.basic_auth, 'POST', body).then(data => {
            utils.load_member(data)
        })
        utils.fetch_data(server.url.exp.n_object, server.basic_auth, 'POST', body).then(data => {
            utils.load_object(data)
        })
    })
}

if (server.endpoint === endpoint.exp.parent.start4sub) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};

        utils.fetch_data(server.url.exp.index, server.basic_auth).then(data => {
            utils.load_info(data)
        })
        utils.fetch_data(server.url.exp.number, server.basic_auth, 'POST', body).then(data => {
            utils.load_member(data)
        })
        utils.fetch_data(server.url.exp.n_object, server.basic_auth, 'POST', body).then(data => {
            utils.load_object(data)
        })
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            utils.load_topic(data)
        })

    })
}
