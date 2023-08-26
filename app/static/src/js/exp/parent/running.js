import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.exp.parent.obj4run) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};
        utils.fetch_data(server.url.exp.object_list, server.basic_auth, 'POST', body).then(data => {
            let div = document.querySelector("#connectData")
            div.innerHTML = `<pre>${JSON.stringify(data, null, 4)}</pre>`
        })
    })
}