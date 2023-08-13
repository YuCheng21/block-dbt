import * as utils from "../utilities";

function component_name(name, address) {
    return `
        <span data-bs-toggle="tooltip" data-bs-placement="top" title="${address}">
            ${name}
        </span>
    `
}

function component_member(researchers_name) {
    return `
        <span data-bs-toggle="tooltip" data-bs-placement="top" title="${researchers_name}">
            ${researchers_name.slice(-6)}
        </span>
    `
}

function component_action(id) {
    return `
        <a href="/oauth/authenticate/${id}" class="btn btn-primary text-white">驗證</a>
    `
}

function component_content(content) {
    return `
        <span class="truncate overflow-hidden">${content}</span>
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
            action: component_action(item._address)
        })
    });
    $('#expTable').bootstrapTable('load', rows)
}

function load_data() {
    utils.fetch_data(server.url.exp.index, server.basic_auth, 'GET', null).then(data => {
        load_table(data)
        utils.init_tooltip()
    })
}

let expTable = document.querySelector('#expTable')
if (expTable && server.endpoint === 'oauth.authenticate') {
    document.addEventListener("DOMContentLoaded", function () {
        load_data()
    })
}