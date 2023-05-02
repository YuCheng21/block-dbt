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
        <a href="/exp/update/${id}" class="btn btn-primary text-white">問卷</a>
        <a href="/exp/topic/${id}" class="btn btn-secondary text-white">確認</a>
        <a href="/exp/start/${id}" class="btn btn-danger text-white">開始</a>
<!--        <a href="/exp/show/${id}" class="btn btn-secondary text-white">查看</a>-->
<!--        <a href="/exp/destroy/${id}" class="btn btn-danger text-white">刪除</a>-->
    `
}

function component_content(content) {
    return `
        <span class="truncate overflow-hidden">${content}</span>
    `
}

function component_state(code) {
    const state = {
        '0': ['等待中', 'text-secondary'],
        '1': ['進行中', 'text-danger'],
        '2': ['已完成', 'text-success']
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
if (expTable && server.endpoint === 'exp.user') {
    document.addEventListener("DOMContentLoaded", function () {
        load_data()
    })
}