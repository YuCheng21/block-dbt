import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.exp.parent.user) {
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
    Object.entries(data).forEach(([key, item]) => {
        if (item._Researchers_name === server.account){
            rows.push({
                id: `${item._serial}`,
                name: utils.component_name(item._name, item._address),
                member: utils.component_member(item._Researchers_name),
                content: utils.component_content(item._content),
                state: utils.component_state(item._status),
                action: component_action(item._address, key)
            })
        }
    });
    $('#expTable').bootstrapTable('load', rows)
}

function component_action(id, key) {
    let href = [
        utils.route2url(server.route.exp.parent.update, id),
        utils.route2url(server.route.exp.parent.submit, id),
        utils.route2url(server.route.exp.parent.subject, id),
        utils.route2url(server.route.exp.parent.add_object, id),
        utils.route2url(server.route.exp.parent.start, id),
        utils.route2url(server.route.exp.parent.obj_list, id),
    ]
    return `
        <button class="btn btn-primary w-100" data-bs-toggle="collapse" data-bs-target="#key${key}">
            <span class="iconify" data-icon="icon-park-solid:down-c" data-rotate="270deg"></span>
            <span>展開選項</span>
        </button>
        <div class="row g-2 collapse pt-2" id="key${key}">
            <a href="${href[0]}" class="btn btn-info w-100">編輯問卷</a>
            <a href="${href[1]}" class="btn btn-secondary w-100 setLoading">確認問卷</a>
            <a href="${href[2]}" class="btn btn-warning w-100 setLoading">招募受測員</a>
            <a href="${href[3]}" class="btn btn-success w-100">新增實驗物</a>
            <a href="${href[4]}" class="btn btn-danger w-100">開始實驗</a>
            <a href="${href[5]}" class="btn btn-primary w-100">實驗物清單</a>
        </div>
    `
}
