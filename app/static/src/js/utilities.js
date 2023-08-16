import Swal from 'sweetalert2'
import copy from "copy-to-clipboard";

/**
 * sweetAlert
 */
export class dialog {
    constructor(category, message) {
        this.category = category
        this.message = message
    }

    error() {
        Swal.fire('錯誤', this.message, 'error')
    }

    success() {
        Swal.fire('成功', this.message, 'success')
    }

    toast() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: this.message,
            width: 'auto'
        })
    }
    show(){
        if(this.category === 'error') this.error()
        if(this.category === 'success') this.success()
        if(this.category === 'success-toast') this.toast()
    }
}

/**
 * Asynchronous fetch data
 */
export async function fetch_data(url, basic_auth = null, method='GET', body=null) {
    const headers = new Headers();
    if (basic_auth != null) {
        headers.append("Authorization", basic_auth);
    }
    if (method === 'POST'){
        headers.append("Content-Type", "application/x-www-form-urlencoded");
    }
    let urlencoded = null;
    if (body != null) {
        urlencoded = new URLSearchParams();
        Object.keys(body).forEach((key) => {
            urlencoded.append(key, body[key]);
        });
    }
    const requestOptions = {
        method: method, headers: headers, body: urlencoded, redirect: 'follow'
    };
    return await fetch(url, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

/**
 * Initialize Tooltip
 */
export function init_tooltip() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

/**
 * Loading Element
 */

export class loading {
    static markup = `
        <div class="loading" id="loading">
            <div class="loadingWrapper">
                <div class="loadingCircle"></div>
                <div class="loadingCircle"></div>
                <div class="loadingCircle"></div>
                <div class="loadingShadow"></div>
                <div class="loadingShadow"></div>
                <div class="loadingShadow"></div>
                <span>處理中，請稍後</span>
            </div>
        </div>
        `;

    static remove() {
        let loading;
        loading = document.querySelector('#loading')
        if (loading != null) {
            loading.remove()
        }
    }

    static show() {
        let body;
        body = document.querySelector('body')
        body.insertAdjacentHTML('afterbegin', this.markup)
    }
}

/**
 * Load Component
 */

export function component_name(name, address) {
    return `
        <span class="address" data-bs-toggle="tooltip" data-bs-placement="top" title="${address}">
            ${name}
        </span>
    `
}

export function component_member(researchers_name) {
    return `
        <span class="researchers" data-bs-toggle="tooltip" data-bs-placement="top" title="${researchers_name}">
            ${researchers_name.slice(2, 8)}
        </span>
    `
}

export function component_content(content) {
    return `
        <span class="truncate overflow-hidden">${content}</span>
    `
}

export function component_state(code) {
    const state = {
        '0': ['未確認問卷', 'text-primary'],
        '1': ['權威機構審核中', 'text-info'],
        '2': ['招募實驗人員中', 'text-info'],
        '3': ['招募受測人員中', 'text-danger'],
        '4': ['實驗中', 'text-danger'],
        '5': ['已解盲', 'text-success'],
    }
    return `
        <span class="${state[code][1]} fw-bold">${state[code][0]}</span>
    `
}

/**
 * Copy Address
 */

export function copy_address() {
    let allAddress = document.querySelectorAll(".address");
    for (let i = 0; i < allAddress.length; i++) {
        allAddress[i].addEventListener("click", function (element) {
            let address = element.target.dataset.bsOriginalTitle
            copy(address)
            new dialog('success-toast', `已複製地址:<br>${address}`).show()
        });
    }
}

export function copy_researchers() {
    let allResearchers = document.querySelectorAll(".researchers");
    for (let i = 0; i < allResearchers.length; i++) {
        allResearchers[i].addEventListener("click", function (element) {
            let researchers = element.target.dataset.bsOriginalTitle
            copy(researchers)
            new dialog('success-toast', `已複製帳號:<br>${researchers}`).show()
        });
    }
}

/**
 * Form Submit
 */

export function appendInput(key, value, form) {
    let field = document.createElement('input')
    field.setAttribute('type', 'hidden')
    field.setAttribute('name', key)
    field.setAttribute('value', value)
    form.appendChild(field)
}

export function submitForm(data) {
    let form = document.createElement('form')

    form.setAttribute('method', 'POST')
    form.setAttribute('action', window.location.href)
    form.setAttribute('enctype', 'multipart/form-data')

    Object.entries(data).forEach((item) => {
        let key = item[0]
        let value = item[1]
        appendInput(key, value, form);
    })

    document.body.appendChild(form)
    form.submit()
    loading.show()
}
