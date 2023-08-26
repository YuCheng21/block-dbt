import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.exp.parent.obj4run) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};

        utils.fetch_data(server.url.exp.object_list, server.basic_auth, 'POST', body).then(data => {
            let div = document.querySelector("#connectData")
            div.innerHTML = `<pre>${JSON.stringify(data, null, 4)}</pre>`
        })

        utils.fetch_data(server.url.exp.index, server.basic_auth).then(data => {
            utils.load_info(data)
        })
        utils.fetch_data(server.url.exp.number, server.basic_auth, 'POST', body).then(data => {
            document.querySelector("#expNum").innerText = data[0]['experimenter']
            document.querySelector("#subNum").innerText = data[0]['subject']
        })
        utils.fetch_data(server.url.exp.n_object, server.basic_auth, 'POST', body).then(data => {
            document.querySelector("#expObject").innerText = data[0]['experimental']
            document.querySelector("#controlObject").innerText = data[0]['control']
        })
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            utils.load_topic(data)
        })

    })
}
