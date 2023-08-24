import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


/*
*  編輯問卷頁面載入資料
* */
if (server.endpoint === endpoint.exp.parent.update4build) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            load_table(data)
        })
    })
}

function load_table(data) {
    const mc = [];
    const sa = [];
    Object.values(data).forEach((item) => {
        if (item._type === 'choose') {
            mc.push({
                multipleChoice: `${item._topic}`,
                maxScore: `${item._scale}`,
                MCAction: `
                <button class="btn btn-primary w-50 MCUpdate">編輯</button>
                <button class="btn btn-danger w-50 MCDelete">刪除</button>
                `
            })
        }
        if (item._type === 'filling') {
            sa.push({
                shortAnswer: `${item._topic}`,
                SAAction: `
                <button class="btn btn-primary w-50 SAUpdate">編輯</button>
                <button class="btn btn-danger w-50 SADelete">刪除</button>
                `
            })
        }
    });
    $('#MCTable').bootstrapTable('load', mc)
    $('#SATable').bootstrapTable('load', sa)
}

/*
*  編輯問卷頁面送出資料
* */
let expUpdateSend = document.querySelector('#expUpdateSend')
if (expUpdateSend) {
    expUpdateSend.addEventListener('click', function () {
        let data = {
            MCTable: JSON.stringify($('#MCTable').bootstrapTable('getData')),
            SATable: JSON.stringify($('#SATable').bootstrapTable('getData')),
        }

        utils.submitForm(data)
    })
}
