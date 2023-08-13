import * as utils from "../utilities";

function component_mc(index, max){
    var data = ``
    for (var i=1; i<=max; i++){
        data = data + `
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions${index}" value="${i}">
            <label class="form-check-label">${i}</label>
        </div>
        `
    }
    return data
}

function component_sa(index) {
    return `
    <div class="input-group">
        <textarea name="shortAnswer${index}" class="form-control" placeholder="請輸入回答內容" rows="2"></textarea>
    </div>
    `
}
function load_table(data) {
    const mc = [];
    const sa = [];
    Object.values(data).forEach((item) => {
        if (item._type === 'choose') {
            mc.push({
                multipleChoice: `${item._topic}`,
                value: component_mc(mc.length, item._scale),
            })
        }
        if (item._type === 'filling') {
            sa.push({
                shortAnswer: `${item._topic}`,
                value: component_sa(sa.length, item._scale),
            })
        }
    });
    $('#MCTable').bootstrapTable('load', mc)
    $('#SATable').bootstrapTable('load', sa)
}

let MCTable = document.querySelector('#MCTable')
let SATable = document.querySelector('#SATable')
if (MCTable && SATable && server.endpoint === 'exp.form') {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            load_table(data)
        })
    })
}