import * as utils from "../../utilities";

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

function load_location(data) {
    let buffer = document.querySelector(".location")
    buffer.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        buffer.innerHTML += `
        <button class="btn btn-secondary col-3 i-location">${data[i]}</button>
        `

    }
    let allLocation = document.querySelectorAll(".i-location");
    for (let i = 0; i < allLocation.length; i++) {
        allLocation[i].addEventListener("click", function (element) {
            let location = element.target.innerHTML
            document.querySelector('#expLocation').value = location
            let button = document.querySelector('#stateSubSend')
            let path = button.getAttribute('onclick')
            path = path.split('/')
            path[path.length-1] = location + "'"
            path = path.join('/')
            button.setAttribute('onclick', path)
        });
    }
}

let MCTable = document.querySelector('#MCTable')
let SATable = document.querySelector('#SATable')
if (MCTable && SATable && server.endpoint === 'exp.show' && typeof page != 'undefined' && ['s-sub'].includes(page.state)) {
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
        utils.fetch_data(server.url.exp.location, server.basic_auth, 'POST', body).then(data => {
            load_location(data)
        })
    })
}