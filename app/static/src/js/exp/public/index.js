import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";
import {state} from "@static/src/js/config/state";


if (endpoint.exp.public.index.includes(server.endpoint)) {
    document.addEventListener("DOMContentLoaded", function () {
        load_data()
    })
}

function load_data() {
    utils.fetch_data(server.url.exp.index, server.basic_auth).then(data => {
        load_table(data);
        // utils.init_tooltip();
    })
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

function component_action(id, code) {
    let href = utils.route2url(server.route.exp.public[state[code]], id)
    if (code === '4') {
        href = utils.route2url(server.route.exp.private[state[code]], id)
    }
    const active = `
        <a href="${href}" class="btn btn-primary w-100 text-white">查看</a>
    `
    const disabled = `
        <a href="${href}" class="btn btn-close w-100 disabled"></a>
    `
    const action = (['6'].includes(code) ? disabled : active)
    return action
}
