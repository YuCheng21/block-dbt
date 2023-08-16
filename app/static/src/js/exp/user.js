import * as utils from "../utilities";


function component_action(id) {
    return `
        <div class="row g-2">
            <a href="/exp/update/${id}" class="btn btn-primary text-white col-6">編輯問卷</a>
            <a href="/exp/topic/${id}" class="btn btn-secondary text-white col-6">確認問卷</a>
            <a href="/exp/subject/${id}" class="btn btn-warning text-white col-12">招募受測人員</a>
            <a href="/exp/start/${id}" class="btn btn-danger text-white col-12">開始實驗</a>
        </div>
    `
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
            action: component_action(item._address)
        })
    });
    $('#expTable').bootstrapTable('load', rows)
}

function load_data() {
    utils.fetch_data(server.url.exp.index, server.basic_auth, 'GET', null).then(data => {
        load_table(data)
        utils.copy_address();
        utils.copy_researchers();
        utils.init_tooltip()
    })
}

let expTable = document.querySelector('#expTable')
if (expTable && server.endpoint === 'exp.user') {
    document.addEventListener("DOMContentLoaded", function () {
        load_data()
    })
}