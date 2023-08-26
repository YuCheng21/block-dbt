import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.exp.private.scan4run) {
    document.addEventListener("DOMContentLoaded", function () {

        let objTest = document.querySelector('#objTest')
        if (objTest) {
            objTest.addEventListener('change', function (event) {
                document.querySelector('#objectID').disabled = !event.target.checked
            })
        }

    })
}