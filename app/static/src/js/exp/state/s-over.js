import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/endpoint";


if (server.endpoint === endpoint.exp.public.show && page.state === 's-over') {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};
        utils.fetch_data(server.url.exp.index, server.basic_auth).then(data => {
            load_info(data)
        })
        utils.fetch_data(server.url.exp.number, server.basic_auth, 'POST', body).then(data => {
            document.querySelector("#expNum").value = data[0]['experimenter']
            document.querySelector("#subNum").value = data[0]['subject']
        })
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            load_topic(data)
        })
        utils.fetch_data(server.url.exp.data, server.basic_auth, 'POST', body).then(data => {
            let div = document.querySelector("body > main > div > div:nth-child(3) > div.card-body.px-5.py-4 > div")
            div.innerHTML = `<pre>${JSON.stringify(data, null, 4)}</pre>`
        })
    })
}

function load_info(data) {
    let exp = null;
    Object.values(data).forEach((item) => {
        if (item._address === page.id) {
            exp = item
        }
    });
    document.querySelector("#expId").value = exp._serial
    document.querySelector("#expName").value = exp._name
    document.querySelector("#expContent").value = exp._content
    document.querySelector("#expTime").value = '2023/08/30 22:00:00'
}

function load_topic(data) {
    const mc = [];
    const sa = [];
    Object.values(data).forEach((item) => {
        if (item._type === 'choose') {
            mc.push({
                multipleChoice: `${item._topic}`,
                maxScore: `${item._scale}`
            })
        }
        if (item._type === 'filling') {
            sa.push({
                shortAnswer: `${item._topic}`
            })
        }
    });
    $('#MCTable').bootstrapTable('load', mc)
    $('#SATable').bootstrapTable('load', sa)
}
