import * as utils from "./utilities";
import './user/login'
import './user/register'

import './exp/index'
import './exp/user'
import './exp/join'
import './exp/update'
import './exp/submit'

import './topic/delete'
import './topic/update'
import './topic/multiple-choice'
import './topic/short-answer'

window.addEventListener('pageshow', function (event) {
    utils.loading.remove()
})

document.addEventListener("DOMContentLoaded", function () {
    if (server.flash !== []){
        server.flash.forEach(function (value, index){
            new utils.dialog(value[0], value[1]).show()
        })
    }
    const endpoint = server.endpoint.split('.')
});

/**
 * Activate Current Page NavigationBar Text
 */
document.querySelectorAll('#navbarToggler > ul > li > a > span').forEach(function (value, index) {
    if (value.innerHTML === server.page_title) {
        value.classList.add('text-active')
    }
})