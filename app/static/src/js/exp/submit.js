import * as utils from "../utilities";


let expSend = document.querySelector('#expSend')
if (expSend) {
    expSend.addEventListener('click', function () {
        let data = {
            expName: $('#expName').val(),
            expContent: $('#expContent').val(),
            expTime: $('#expTime').val(),
            expSub: $('#expSub').val(),
        }

        utils.submitForm(data);
    })
}

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

function getRadioValue(theRadioGroup){
    let elements = document.getElementsByName(theRadioGroup);
    for (let i = 0, l = elements.length; i < l; i++){
        if (elements[i].checked){
            return elements[i].value;
        }
    }
}
let expFormSend = document.querySelector('#expFormSend')
if (expFormSend) {
    expFormSend.addEventListener('click', function () {
        let subId = document.querySelector("#subId").value;
        let mc = []
        var temp = $('#MCTable tr>td:nth-child(2)')
        Object.values(temp).forEach((item, key) => {
            if(temp.length > key) {
                mc.push(getRadioValue('inlineRadioOptions'+key))
            }
        })
        let sa = []
        var temp = $('#SATable tr>td:nth-child(2)')
        Object.values(temp).forEach((item, key) => {
            if(temp.length > key) {
                sa.push(document.getElementsByName('shortAnswer'+key)[0].value)
            }
        })
        let data = {
            subId: subId,
            MCTable: mc,
            SATable: sa,
        }

        utils.submitForm(data)
    })
}
