import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


/*
* 實驗人員填寫表單與掃描實驗物頁面載入資料
* */
if (server.endpoint === endpoint.exp.private.show && page.state === 'running') {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};
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

/*
* 實驗人員填寫表單載入資料
* */
if (server.endpoint === endpoint.exp.private.form4run) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            load_table(data)
        })
    })
}

function load_table(data) {
    const mc = [];
    const sa = [];
    Object.values(data).forEach((item) => {
        if (item._type === 'choose') {
            mc.push({
                multipleChoice: `${item._topic}`,
                value: component_mc(mc.length, item._scale),
            })
        }
        if (item._type === 'filling') {
            sa.push({
                shortAnswer: `${item._topic}`,
                value: component_sa(sa.length, item._scale),
            })
        }
    });
    $('#MCTable').bootstrapTable('load', mc)
    $('#SATable').bootstrapTable('load', sa)
}

function component_mc(index, max) {
    let data = ``
    for (let i = 1; i <= max; i++) {
        data = data + `
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions${index}" value="${i}">
            <label class="form-check-label">${i}</label>
        </div>
        `
    }
    return data
}

function component_sa(index) {
    return `
    <div class="input-group">
        <textarea name="shortAnswer${index}" class="form-control" placeholder="請輸入回答內容" rows="2"></textarea>
    </div>
    `
}

/*
* 實驗人員填寫表單送出資料
* */
function getRadioValue(theRadioGroup){
    let elements = document.getElementsByName(theRadioGroup);
    for (let i = 0, l = elements.length; i < l; i++){
        if (elements[i].checked){
            return elements[i].value;
        }
    }
}
let expFormSend = document.querySelector('#expFormSend')
if (expFormSend) {
    expFormSend.addEventListener('click', function () {
        let subId = document.querySelector("#subId").value;
        let mc = []
        let mc_element = document.querySelectorAll('#MCTable tr>td:nth-child(2)')
        Object.values(mc_element).forEach((item, key) => {
            if(mc_element.length > key) {
                mc.push(getRadioValue('inlineRadioOptions'+key))
            }
        })
        let sa = []
        let sa_element = document.querySelectorAll('#SATable tr>td:nth-child(2)')
        Object.values(sa_element).forEach((item, key) => {
            if(sa_element.length > key) {
                sa.push(document.getElementsByName('shortAnswer'+key)[0].value)
            }
        })
        let data = {
            subId: subId,
            MCTable: mc,
            SATable: sa,
        }
        utils.submitForm(data)
    })
}
