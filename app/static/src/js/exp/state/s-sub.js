import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/endpoint";


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
    let input_location = document.querySelector('#expLocation')
    input_location.replaceChildren();
    let firstOptions = document.createElement('option');
    firstOptions.value = 0;
    firstOptions.innerHTML = '請選擇實驗地點';
    input_location.appendChild(firstOptions)
    for (let i = 0; i < data.length; i++){
        let newOptions = document.createElement('option');
        newOptions.value = data[i];
        newOptions.innerHTML = data[i];
        input_location.appendChild(newOptions)
    }
}

let MCTable = document.querySelector('#MCTable')
let SATable = document.querySelector('#SATable')
let stateSubSend = document.querySelector('#stateSubSend')
if (MCTable && SATable && server.endpoint === endpoint.exp.public.show && typeof page != 'undefined' && ['s-sub'].includes(page.state)) {
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

    stateSubSend.addEventListener('click', function (){
        let type = stateSubSend.getAttribute('data-type')
        let location = document.querySelector('#expLocation')
        location = location.value
        // let url = stateSubSend.getAttribute('data-url')
        // url = url.split('/')
        // url[url.length-1] = location
        // url = url.join('/')

        let consentForm = document.querySelector('#consentForm')
        utils.appendInput('location', location, consentForm)
        utils.appendInput('address', page.id, consentForm)
        utils.appendInput('type', type, consentForm)
        consentForm.submit()
    })
}
