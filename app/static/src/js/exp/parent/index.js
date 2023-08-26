import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


/*
*  實驗管理頁面載入資料
* */
if (server.endpoint === endpoint.exp.parent.index) {
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
        utils.route2url(server.route.exp.parent.update4build, id),
        utils.route2url(server.route.exp.parent.build2auth, id),
        utils.route2url(server.route.exp.parent.exp2sub, id),
        utils.route2url(server.route.exp.parent.obj4sub, id),
        utils.route2url(server.route.exp.parent.start4sub, id),
        utils.route2url(server.route.exp.parent.obj4run, id),
    ]
    return `
        <button class="btn btn-primary text-nowrap w-100" data-bs-toggle="collapse" data-bs-target="#key${key}">
            <span class="iconify iconify-inline" data-icon="icon-park-solid:down-c"></span>
            <span>展開選項</span>
        </button>
        <div class="collapse pt-2 text-nowrap" id="key${key}">
            <div class="btn-group-vertical w-100">
                <a href="${href[0]}" class="btn btn-outline-primary">編輯問卷</a>
                <a href="${href[1]}" class="btn btn-outline-primary setLoading">確認問卷</a>
                <a href="${href[2]}" class="btn btn-outline-primary setLoading">招募受測員</a>
                <a href="${href[3]}" class="btn btn-outline-primary">新增實驗物</a>
                <a href="${href[4]}" class="btn btn-outline-primary">開始實驗</a>
                <a href="${href[5]}" class="btn btn-outline-primary">實驗物清單</a>
            </div>
        </div>
    `
}

/*
*  新增實驗頁面送出資料
* */
let expSend = document.querySelector('#expSend')
if (expSend) {
    expSend.addEventListener('click', function () {
        let data = {
            expName: document.querySelector('#expName').value,
            expContent: document.querySelector('#expContent').value,
            expTime: document.querySelector('#expTime').value,
            expSub: document.querySelector('#expSub').value,
        }
        utils.submitForm(data);
    })
}
