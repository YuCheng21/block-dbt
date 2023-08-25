import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";
import {state} from "@static/src/js/config/state";


if (server.endpoint === endpoint.exp.private.index) {
    document.addEventListener("DOMContentLoaded", function () {
        load_data()
    })
}

function load_data() {
    utils.fetch_data(server.url.exp.self, server.basic_auth).then(data => {
        load_table(data)
        // utils.init_tooltip()
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
    const href = utils.route2url(server.route.exp.private.show, state[code], id)
    return `
        <a href="${href}" class="btn btn-primary w-100">查看</a>
    `
}
