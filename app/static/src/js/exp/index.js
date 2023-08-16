import copy from 'copy-to-clipboard';

import * as utils from "../utilities";


function component_action(id, code) {
    const state = {
        '0': 's-form',
        '1': 's-auth',
        '2': 's-exp',
        '3': 's-sub',
        '4': 's-run',
        '5': 's-over'
    }
    const href = `/exp/show/${state[code]}/${id}`
    const active = `
        <a href="${href}" class="btn btn-secondary text-white">查看</a>
    `
    const disabled = `
        <a href="${href}" class="btn btn-close text-white disabled"></a>
    `
    const action = (['0', '1'].includes(code) ? disabled: active)
    return action
}

function load_table(data) {
    const rows = [];
    Object.values(data).forEach((item) => {
        rows.push({
            id: `${item._serial}`,
            name: utils.component_name(item._name, item._address),
            member: utils.component_member(item._Researchers_name),
            content: utils.component_content(item._content),
            state: utils.component_state(item._status),
            action: component_action(item._address, item._status)
        })
    });
    $('#expTable').bootstrapTable('load', rows)
}

function load_data() {
    utils.fetch_data(server.url.exp.index, server.basic_auth).then(data => {
        load_table(data);
        utils.copy_address();
        utils.copy_researchers();
        utils.init_tooltip();
    })
}

let expTable = document.querySelector('#expTable')
if (expTable && server.endpoint === 'exp.index') {
    document.addEventListener("DOMContentLoaded", function () {
        load_data()
    })
}
