import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/endpoint";


function component_action(id) {
    let href = [
        utils.route2url(server.route.exp.parent.update, id),
        utils.route2url(server.route.exp.parent.submit, id),
        utils.route2url(server.route.exp.parent.subject, id),
        utils.route2url(server.route.exp.parent.add_object, id),
        utils.route2url(server.route.exp.parent.start, id),
        utils.route2url(server.route.exp.parent.obj_list, id),
    ]
    return `
        <div class="row g-2">
            <a href="${href[0]}" class="btn btn-primary text-white col-6">編輯問卷</a>
            <a href="${href[1]}" class="btn btn-secondary text-white col-6 setLoading">確認問卷</a>
            <a href="${href[2]}" class="btn btn-warning text-white col-6 setLoading">招募受測員</a>
            <a href="${href[3]}" class="btn btn-success text-white col-6">新增實驗物</a>
            <a href="${href[4]}" class="btn btn-danger text-white col-6">開始實驗</a>
            <a href="${href[5]}" class="btn btn-info text-white col-6">實驗物清單</a>
        </div>
    `
}

function load_table(data) {
    const rows = [];
    Object.values(data).forEach((item) => {
        if (item._Researchers_name === server.account){
            rows.push({
                id: `${item._serial}`,
                name: utils.component_name(item._name, item._address),
                member: utils.component_member(item._Researchers_name),
                content: utils.component_content(item._content),
                state: utils.component_state(item._status),
                action: component_action(item._address)
            })
        }
    });
    $('#expTable').bootstrapTable('load', rows)
}

function load_data() {
    utils.fetch_data(server.url.exp.index, server.basic_auth, 'GET', null).then(data => {
        load_table(data)
        // utils.init_tooltip()
    })
}

let expTable = document.querySelector('#expTable')
if (expTable && server.endpoint === endpoint.exp.parent.user) {
    document.addEventListener("DOMContentLoaded", function () {
        load_data()
    })
}