import * as utils from "../utilities";

function load_info(data){
    let exp = null;
    Object.values(data).forEach((item) => {
        if (item._address === page.id){
            exp = item
        }
    });
    document.querySelector("#expId").value = exp._serial
    document.querySelector("#expName").value = exp._name
    document.querySelector("#expContent").value = exp._content
    document.querySelector("#expTime").value = 60000
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

let MCTable = document.querySelector('#MCTable')
let SATable = document.querySelector('#SATable')
if (MCTable && SATable && server.endpoint === 'exp.show' && typeof page != 'undefined' && page.state === 'finish') {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};
        utils.fetch_data(server.url.exp.index, server.basic_auth).then(data => {
            load_info(data)

        })
        utils.fetch_data(server.url.exp.number, server.basic_auth, 'POST', body).then(data => {
            document.querySelector("#expNum").value = data[0]['experimenter']
            document.querySelector("#subNum").value = data[0]['subject']
            document.querySelector("#logNum").value = data[0]['logister']

        })
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            load_topic(data)
        })
        utils.fetch_data(server.url.exp.data, server.basic_auth, 'POST', body).then(data => {
            console.log(data)
            document.querySelector("body > main > div > div:nth-child(3) > div.card-body.px-5.py-4 > div").innerHTML = `<pre>${JSON.stringify(data, null, 4)}</pre>`
        })
    })
}