import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";
import {addAction as MCAddAction, deleteAction as MCDeleteAction} from "@static/src/js/form/multiple-choice";
import {addAction as SAAddAction, deleteAction as SADeleteAction} from "@static/src/js/form/short-answer";


if (server.endpoint === endpoint.exp.parent.update4build) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};

        // /*
        // *  新增問卷頁面載入資料
        // * */
        // utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
        //     load_update_table(data)
        // })

        /*
        *  新增問卷頁面送出資料
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

    })
}

if (server.endpoint === endpoint.exp.parent.delete4build) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};

        /*
        *  刪除問卷頁面載入資料
        * */
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            load_delete_table(data)
        })

        /*
        *  刪除問卷頁面送出資料
        * */
        let expDeleteSend = document.querySelector('#expDeleteSend')
        if (expDeleteSend) {
            expDeleteSend.addEventListener('click', function () {
                let MCData = $('#MCTable').bootstrapTable('getSelections')
                let SAData = $('#SATable').bootstrapTable('getSelections')

                let MCSelected = [];
                MCData.forEach((value, index) => {
                    MCSelected.push(value.index)
                })
                let SASelected = [];
                SAData.forEach((value, index) => {
                    SASelected.push(value.index)
                })
                let data = {
                    MCSelected: JSON.stringify(MCSelected),
                    SASelected: JSON.stringify(SASelected),
                }

                utils.submitForm(data)
            })
        }

    })
}

function load_update_table(data) {
    const mc = [];
    const sa = [];
    Object.values(data).forEach((item) => {
        if (item._type === 'choose') {
            mc.push({
                multipleChoice: `${item._topic}`,
                maxScore: `${item._scale}`,
                MCAction: MCAddAction
            })
        }
        if (item._type === 'filling') {
            sa.push({
                shortAnswer: `${item._topic}`,
                SAAction: SAAddAction
            })
        }
    });
    $('#MCTable').bootstrapTable('load', mc)
    $('#SATable').bootstrapTable('load', sa)
}

function load_delete_table(data) {
    const mc = [];
    const sa = [];
    Object.entries(data).forEach(([key, value]) => {
        if (value._type === 'choose') {
            mc.push({
                index: `${key}`,
                multipleChoice: `${value._topic}`,
                maxScore: `${value._scale}`,
                MCAction: MCDeleteAction
            })
        }
        if (value._type === 'filling') {
            sa.push({
                index: `${key}`,
                shortAnswer: `${value._topic}`,
                SAAction: SADeleteAction
            })
        }
    });
    $('#MCTable').bootstrapTable('load', mc)
    $('#SATable').bootstrapTable('load', sa)
}