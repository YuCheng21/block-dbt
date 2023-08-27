import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.exp.public.show && ['finish'].includes(page.state)) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};

        utils.fetch_data(server.url.exp.data, server.basic_auth, 'POST', body).then(data => {
            let div = document.querySelector("#finishData")
            div.innerHTML = `<pre>${JSON.stringify(data, null, 4)}</pre>`

            console.log(data)

            let unblindMCTable = document.querySelector("#unblindMCTable")
            let unblindSATable = document.querySelector("#unblindSATable")
            let unblind_mc = [];
            let unblind_sa = [];
            Object.entries(data).forEach(([key, value]) => {
                console.log(key, value)
                if (value._type === 'choose') {
                    unblind_mc.push({
                        topic: `${value._topic}`,
                        score: `${value._result}`,
                    })
                }
                if (value._type === 'filling') {
                    unblind_sa.push({
                        scale: `${value._scale}`,
                    })
                }
            })
            $(unblindMCTable).bootstrapTable('load', unblind_mc)
            $(unblindSATable).bootstrapTable('load', unblind_sa)
        })

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
