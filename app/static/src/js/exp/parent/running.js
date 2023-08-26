import * as utils from "@static/src/js/utilities"
import {endpoint} from "@static/src/js/config/endpoint";


if (server.endpoint === endpoint.exp.parent.obj4run) {
    document.addEventListener("DOMContentLoaded", function () {
        const body = {"scaddress": page.id};

        utils.fetch_data(server.url.exp.object_list, server.basic_auth, 'POST', body).then(data => {
            let connectTable = document.querySelector("#connectTable")
            let obj = [];
            Object.entries(data[0]).forEach(([key, value]) => {
                Object.entries(value).forEach(([i_key, i_value]) => {
                    obj.push({
                        objectID: `${i_value}`,
                        location: `${key}`,
                    })
                })
            })
            $(connectTable).bootstrapTable('load', obj)
        })

        utils.fetch_data(server.url.exp.index, server.basic_auth).then(data => {
            utils.load_info(data)
        })
        utils.fetch_data(server.url.exp.number, server.basic_auth, 'POST', body).then(data => {
            utils.load_member(data)
        })
        utils.fetch_data(server.url.exp.n_object, server.basic_auth, 'POST', body).then(data => {
            utils.load_object(data)
        })
        utils.fetch_data(server.url.topic.index, server.basic_auth, 'POST', body).then(data => {
            utils.load_topic(data)
        })

    })
}
