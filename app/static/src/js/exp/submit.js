import * as utils from "@static/src/js/utilities"


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
        let mc_element = document.querySelectorAll('#MCTable tr>td:nth-child(2)')
        Object.values(mc_element).forEach((item, key) => {
            if(mc_element.length > key) {
                mc.push(getRadioValue('inlineRadioOptions'+key))
            }
        })
        let sa = []
        let sa_element = document.querySelectorAll('#SATable tr>td:nth-child(2)')
        Object.values(sa_element).forEach((item, key) => {
            if(sa_element.length > key) {
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
