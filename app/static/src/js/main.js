import "@static/src/scss/all.scss";

import "@iconify/iconify"
import copy from 'copy-to-clipboard';

import * as utils from "./utilities";
import './user/login'
import './user/register'

import './exp/index'
import './exp/user'
import './exp/join/exp'
import './exp/join/content'
import './exp/update'
import './exp/submit'
import './exp/state/s-form'
import './exp/state/s-exp'
import './exp/state/s-sub'
import './exp/state/s-run'
import './exp/state/s-over'
import './exp/form'

import './topic/delete'
import './topic/update'
import './topic/multiple-choice'
import './topic/short-answer'

import './oauth/submit'
import './oauth/authenticate'

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

document.querySelector('#c-account').addEventListener('click', function (element){
    copy(server.account)
    new utils.dialog('success-toast', `已複製帳號:<br>${server.account}`).show()
});