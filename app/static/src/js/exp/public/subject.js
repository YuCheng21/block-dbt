import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";
import {loading} from "@static/src/js/utilities";


if (server.endpoint === endpoint.exp.public.show && ['subject'].includes(page.state)) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};
        utils.fetch_data(server.url.exp.index, server.basic_auth).then(data => {
            utils.load_info(data)
        })
        utils.fetch_data(server.url.exp.number, server.basic_auth, 'POST', body).then(data => {
            utils.load_member(data)
        })
        utils.fetch_data(server.url.exp.n_object, server.basic_auth, 'POST', body).then(data => {
            utils.load_object(data)
        })
        utils.fetch_data(server.url.exp.object_limit, server.basic_auth, 'POST', body).then(data => {
            utils.load_object_max(data)
        })
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            utils.load_topic(data)
        })
        utils.fetch_data(server.url.exp.location, server.basic_auth, 'POST', body).then(data => {
            load_location(data)
        })
    })

    let stateSubSend = document.querySelector('#stateSubSend')
    stateSubSend.addEventListener('click', function () {
        let type = stateSubSend.getAttribute('data-type')
        let location = document.querySelector('#expLocation')
        location = location.value

        let consentForm = document.querySelector('#consentForm')
        utils.appendInput('location', location, consentForm)
        utils.appendInput('address', page.id, consentForm)
        utils.appendInput('type', type, consentForm)
        consentForm.submit()
        loading.show()
    })
}

function load_location(data) {
    let input_location = document.querySelector('#expLocation')
    input_location.replaceChildren();
    let firstOptions = document.createElement('option');
    firstOptions.value = 0;
    firstOptions.innerHTML = '點擊下拉選單選擇';
    input_location.appendChild(firstOptions)
    for (let i = 0; i < data.length; i++) {
        let newOptions = document.createElement('option');
        newOptions.value = data[i];
        newOptions.innerHTML = data[i];
        input_location.appendChild(newOptions)
    }
}
