import "@static/src/scss/all.scss";

import "@iconify/iconify"
import copy from 'copy-to-clipboard';

import * as utils from "@static/src/js/utilities"

import './user/login'
import './user/sign_up'

import './exp/public'
import './exp/parent'
import './exp/private'
import './exp/private/experiment'
import './exp/private/running'
import './exp/parent/build'
import './exp/public/build'
import './exp/public/experiment'
import './exp/public/subject'
import './exp/public/running'
import './exp/public/finish'
import './exp/parent/running'

import './topic/delete'
import './topic/update'
import './topic/multiple-choice'
import './topic/short-answer'

import './oauth/store'
import './oauth/auth'

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

/**
 * Copy Address
 */

let copyAccount = document.querySelector('#c-account')
if (copyAccount){
    copyAccount.addEventListener('click', function (element){
        copy(server.account)
        new utils.dialog('success-toast', `已複製帳號:<br>${server.account}`).show()
    });
}

/**
 * Click Listener
 */

document.addEventListener('click', function (event){
    if (event.target.classList.contains('setLoading')){
        utils.loading.show()
    }
    else if (event.target.classList.contains('address')){
        let address = event.target.getAttribute('title')
        copy(address)
        new utils.dialog('success-toast', `已複製地址:<br>${address}`).show()
    }
    else if (event.target.classList.contains('researchers')){
        let researchers = event.target.getAttribute('title')
        copy(researchers)
        new utils.dialog('success-toast', `已複製帳號:<br>${researchers}`).show()
    }
})
