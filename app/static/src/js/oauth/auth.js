import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.oauth.authenticate) {
    document.addEventListener("DOMContentLoaded", function () {
        load_data()
    })
}

function load_data() {
    utils.fetch_data(server.url.exp.index, server.basic_auth, 'GET', null).then(data => {
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
    let href = utils.route2url(server.route.oauth.authenticate)
    let active = `
        <button type="submit" class="btn btn-primary w-100 setLoading">驗證</button> 
    `
    let disabled = `
        <button type="submit" class="btn btn-close w-100 disabled"></button> 
    `
    let button = (['1'].includes(code) ? active : disabled)
    return `
        <form action="${href}" method="post" enctype="application/x-www-form-urlencoded">
            <input type="hidden" name="id" value="${id}">
            ${button}     
        </form>
    `
}
