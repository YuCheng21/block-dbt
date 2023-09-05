import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";
import {state} from "@static/src/js/config/state";


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
        if (item._Researchers_name === server.account) {
            rows.push({
                id: `${item._serial}`,
                name: utils.component_name(item._name, item._address),
                member: utils.component_member(item._Researchers_name),
                content: utils.component_content(item._content),
                state: utils.component_state(item._status),
                action: component_action(item._address, item._status, key)
            })
        }
    });
    $('#expTable').bootstrapTable('load', rows)
}

function component_action(id, status, key) {
    let href = [
        utils.route2url(server.route.exp.parent.store4build, id),
        utils.route2url(server.route.exp.parent.destroy4build, id),
        utils.route2url(server.route.exp.parent.build2auth, id),
        utils.route2url(server.route.exp.parent.build2auth, id),
        utils.route2url(server.route.exp.parent.exp2sub, id),
        utils.route2url(server.route.exp.parent.obj4sub, id),
        utils.route2url(server.route.exp.parent.start4sub, id),
        utils.route2url(server.route.exp.parent.obj4run, id),
        utils.route2url(server.route.exp.parent.run2finish, id),
    ]
    let newPage = '<span class="iconify-inline" data-icon="ph:arrow-square-out-duotone"></span>'
    let buttonList = [
        `<a href="${href[0]}" class="btn btn-outline-primary fw-bold">新增問卷${newPage}</a>`,
        `<a href="${href[1]}" class="btn btn-outline-primary fw-bold">查看與刪除問卷${newPage}</a>`,
        `<a href="${href[2]}" class="btn btn-outline-primary fw-bold setLoading">確認問卷</a>`,
        `<a href="${href[3]}" class="btn btn-outline-primary fw-bold setLoading">招募受測員</a>`,
        `<a href="${href[4]}" class="btn btn-outline-primary fw-bold">新增實驗物${newPage}</a>`,
        `<a href="${href[5]}" class="btn btn-outline-primary fw-bold">開始實驗${newPage}</a>`,
        `<a href="${href[6]}" class="btn btn-outline-primary fw-bold">實驗物清單${newPage}</a>`,
        `<!--<a href="${href[7]}" class="btn btn-outline-primary fw-bold setLoading">[測試]強制解盲</a>-->`,
        `<a href="#" class="btn btn-outline-primary fw-bold disabled">無</a>`,
    ]
    // buttonList = buttonList.filter((v, k) => [0, 1, 2, 3, 4, 5, 6, 7].includes(k))
    if (state[status] === 'build') buttonList = buttonList.filter((v, k) => [0, 1, 2].includes(k))
    if (state[status] === 'auth') buttonList = buttonList.filter((v, k) => [8].includes(k))
    if (state[status] === 'experiment') buttonList = buttonList.filter((v, k) => [3].includes(k))
    if (state[status] === 'subject') buttonList = buttonList.filter((v, k) => [4, 5].includes(k))
    if (state[status] === 'running') buttonList = buttonList.filter((v, k) => [6, 7].includes(k))
    if (state[status] === 'finish') buttonList = buttonList.filter((v, k) => [8].includes(k))
    return `
        <button class="btn btn-primary text-nowrap w-100 text-white" data-bs-toggle="collapse" data-bs-target="#key${key}">
            <span class="iconify-inline" data-icon="icon-park-solid:down-c"></span>
            <span>展開選項</span>
        </button>
        <div class="collapse pt-2 text-nowrap" id="key${key}">
            <div class="btn-group-vertical w-100">${buttonList.join('')}</div>
        </div>
    `
}

if (server.endpoint === endpoint.exp.parent.build) {
    document.addEventListener("DOMContentLoaded", function () {
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
    })
}
