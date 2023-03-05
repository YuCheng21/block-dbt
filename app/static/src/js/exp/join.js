import * as utils from "../utilities";


function component_member(researchers_name) {
    return `
        <span data-bs-toggle="tooltip" data-bs-placement="top" title="${researchers_name}">
            ${researchers_name.slice(-6)}
        </span>
    `
}

function component_action(id) {
    return `
        <a href="/exp/join/N00${id}" class="btn btn-primary text-white">查看</a>
    `
}

function component_content(content) {
    return `
        <span class="truncate overflow-hidden">${content}</span>
    `
}

function component_state(code) {
    const state = {
        '0': '等待中',
        '1': '進行中',
        '2': '已完成'
    }
    return state[code]
}


function load_table(data) {
    const rows = [];
    Object.values(data).forEach((item) => {
        rows.push({
            id: `${item._serial}`,
            name: `${item._name}`,
            member: component_member(item._Researchers_name),
            content: component_content(item._content),
            state: component_state(item._status),
            action: component_action(item._serial)
        })
    });
    $('#expTable').bootstrapTable('load', rows)
}

function load_data() {
    utils.fetch_data(server.url.exp.index, server.basic_auth).then(data => {
        load_table(data)
        utils.init_tooltip()
    })
}

let expTable = document.querySelector('#expTable')
if (expTable && server.endpoint === 'exp.join') {
    document.addEventListener("DOMContentLoaded", function () {
        load_data()
    })
}