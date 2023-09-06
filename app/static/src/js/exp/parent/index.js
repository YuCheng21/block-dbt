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
    let href = {
        storeForm: utils.route2url(server.route.exp.parent.store4build, id),
        destroyForm: utils.route2url(server.route.exp.parent.destroy4build, id),
        confirmForm: utils.route2url(server.route.exp.parent.confirm4build, id),
        confirmExp: utils.route2url(server.route.exp.parent.confirm4exp, id),
        storeObject: utils.route2url(server.route.exp.parent.obj4sub, id),
        confirmSub: utils.route2url(server.route.exp.parent.start4sub, id),
        showObject: utils.route2url(server.route.exp.parent.obj4run, id),
        confirmRun: utils.route2url(server.route.exp.parent.run2finish, id),
        none: '#',
    }
    let newPage = '<span class="iconify-inline" data-icon="ph:arrow-square-out-duotone"></span>'
    let parentClass = `btn btn-outline-primary fw-bold`
    let buttonList = [
        `<a href="${href.storeForm}" class="${parentClass}">新增問卷${newPage}</a>`,
        `<a href="${href.destroyForm}" class="${parentClass}">查看與刪除問卷${newPage}</a>`,
        `<a href="${href.confirmForm}" class="${parentClass}">確認問卷${newPage}</a>`,
        `<a href="${href.confirmExp}" class="${parentClass}">招募受測員${newPage}</a>`,
        `<a href="${href.storeObject}" class="${parentClass}">新增實驗物${newPage}</a>`,
        `<a href="${href.confirmSub}" class="${parentClass}">開始實驗${newPage}</a>`,
        `<a href="${href.showObject}" class="${parentClass}">實驗物清單${newPage}</a>`,
        `<a href="${href.confirmRun}" class="${parentClass} setLoading">[測試]強制解盲</a>`,
        `<a href="${href.none}" class="${parentClass} disabled">無</a>`,
    ]
    let includeList = [0, 1, 2, 3, 4, 5, 6, 7]
    if (state[status] === 'build') includeList = [0, 1, 2]
    if (state[status] === 'auth') includeList = [8]
    if (state[status] === 'experiment') includeList = [3]
    if (state[status] === 'subject') includeList = [4, 5]
    if (state[status] === 'running') {
        if (server.debug === true) includeList = [6, 7]
        else includeList = [6]
    }
    if (state[status] === 'finish') includeList = [8]
    buttonList = buttonList.filter((v, k) => includeList.includes(k))

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
