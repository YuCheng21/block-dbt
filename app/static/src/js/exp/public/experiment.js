import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.exp.public.show && ['experiment'].includes(page.state)) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};
        utils.fetch_data(server.url.exp.index, server.basic_auth).then(data => {
            utils.load_info(data)
        })
        utils.fetch_data(server.url.exp.number, server.basic_auth, 'POST', body).then(data => {
            document.querySelector("#expNum").value = data[0]['experimenter']
            document.querySelector("#subNum").value = data[0]['subject']
        })
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            utils.load_topic(data)
        })
        let stateExpSend = document.querySelector('#stateExpSend')
        stateExpSend.addEventListener('click', function (event) {
            let location = document.querySelector('#expLocation').value
            let path = event.target.dataset.url
            path = path.split('/')
            path[path.length - 1] = location
            path = path.join('/')
            window.location.href = path
            utils.loading.show()
        })
    })
}
