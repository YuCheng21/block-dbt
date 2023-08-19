import * as utils from "../utilities";


if (server.endpoint === 'exp.obj_list' && typeof page != 'undefined') {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};
        utils.fetch_data(server.url.exp.object_list, server.basic_auth, 'POST', body).then(data => {
            console.log(data)
            document.querySelector("body > main > div > div:nth-child(1) > div.card-body.px-5.py-4 > div").innerHTML = `<pre>${JSON.stringify(data, null, 4)}</pre>`
        })
    })
}