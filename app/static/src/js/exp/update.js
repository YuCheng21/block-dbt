import * as utils from "../utilities";


function fetch_data_MC() {
    var rows = []
    for (var i = 0; i < 5; i++) {
        rows.push({
            multipleChoice: '題目內容',
            maxScore: ~~(Math.random() * 10),
            MCAction: `
            <button class="btn btn-primary w-50 MCUpdate">編輯</button>
            <button class="btn btn-danger w-50 MCDelete">刪除</button>
            `
        })
    }
    return rows
}

function fetch_data_SA() {
    var rows = []
    for (var i = 0; i < 3; i++) {
        rows.push({
            shortAnswer: '題目內容',
            SAAction: `
            <button class="btn btn-primary w-50 SAUpdate">編輯</button>
            <button class="btn btn-danger w-50 SADelete">刪除</button>
            `
        })
    }
    return rows
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
                <button class="btn btn-primary w-50 MCUpdate">編輯</button>
                <button class="btn btn-danger w-50 MCDelete">刪除</button>
                `
            })
        }
    });
    $('#MCTable').bootstrapTable('load', mc)
    $('#SATable').bootstrapTable('load', sa)
}

let MCTable = document.querySelector('#MCTable')
let SATable = document.querySelector('#SATable')
if (MCTable && SATable && server.endpoint === 'exp.update') {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            load_table(data)
            // $('#MCTable').bootstrapTable('load', fetch_data_MC())
            // $('#SATable').bootstrapTable('load', fetch_data_SA())
        })
    })
}