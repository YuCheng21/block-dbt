import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.exp.public.show && page.state === 'finish') {
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
        utils.fetch_data(server.url.exp.n_object, server.basic_auth, 'POST', body).then(data => {
            document.querySelector("#expObject").value = data[0]['experimental']
            document.querySelector("#controlObject").value = data[0]['control']
        })
        utils.fetch_data(server.url.exp.data, server.basic_auth, 'POST', body).then(data => {
            let div = document.querySelector("body > main > div > div:nth-child(3) > div.card-body.px-5.py-4 > div")
            div.innerHTML = `<pre>${JSON.stringify(data, null, 4)}</pre>`
        })
    })
}
