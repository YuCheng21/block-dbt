import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.exp.public.show && ['build', 'auth'].includes(page.state)) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};
        utils.fetch_data(server.url.exp.index, server.basic_auth).then(data => {
            utils.load_info(data)
        })
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            utils.load_topic(data)
        })
    })
}
