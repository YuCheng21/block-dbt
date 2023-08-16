import copy from 'copy-to-clipboard';

import * as utils from "../utilities";

function component_name(name, address) {
    return `
        <span class="address" data-bs-toggle="tooltip" data-bs-placement="top" title="${address}">
            ${name}
        </span>
    `
}

function component_member(researchers_name) {
    return `
        <span class="researchers" data-bs-toggle="tooltip" data-bs-placement="top" title="${researchers_name}">
            ${researchers_name.slice(2, 8)}
        </span>
    `
}

function component_action(id, code) {
    const state = {
        '0': 's-form',
        '1': 's-auth',
        '2': 's-exp',
        '3': 's-sub',
        '4': 's-run',
        '5': 's-over'
    }
    return `
        <a href="/exp/show/${state[code]}/${id}" class="btn btn-secondary text-white">查看</a>
    `
}

function component_content(content) {
    return `<span class="truncate overflow-hidden">${content}</span>
        
    `
}

function component_state(code) {
    const state = {
        '0': ['未確認問卷', 'text-primary'],
        '1': ['權威機構審核中', 'text-info'],
        '2': ['招募實驗人員中', 'text-info'],
        '3': ['招募受測人員中', 'text-danger'],
        '4': ['實驗中', 'text-danger'],
        '5': ['已解盲', 'text-success'],
    }
    return `
        <span class="${state[code][1]} fw-bold">${state[code][0]}</span>
    `
}


function load_table(data) {
    const rows = [];
    Object.values(data).forEach((item) => {
        rows.push({
            id: `${item._serial}`,
            name: component_name(item._name, item._address),
            member: component_member(item._Researchers_name),
            content: component_content(item._content),
            state: component_state(item._status),
            action: component_action(item._address, item._status)
        })
    });
    $('#expTable').bootstrapTable('load', rows)
}

function load_data() {
    utils.fetch_data(server.url.exp.index, server.basic_auth).then(data => {
        load_table(data)
        utils.init_tooltip()
        let allAddress = document.querySelectorAll(".address");
        for (let i = 0; i < allAddress.length; i++) {
            allAddress[i].addEventListener("click", function (element) {
                let address = element.target.dataset.bsOriginalTitle
                copy(address)
                new utils.dialog('success-toast', `已複製地址:<br>${address}`).show()
            });
        }
        let allResearchers = document.querySelectorAll(".researchers");
        for (let i = 0; i < allResearchers.length; i++) {
            allResearchers[i].addEventListener("click", function (element) {
                let researchers = element.target.dataset.bsOriginalTitle
                copy(researchers)
                new utils.dialog('success-toast', `已複製地址:<br>${researchers}`).show()
            });
        }

    })
}

let expTable = document.querySelector('#expTable')
if (expTable && server.endpoint === 'exp.index') {
    document.addEventListener("DOMContentLoaded", function () {
        load_data()
    })
}
