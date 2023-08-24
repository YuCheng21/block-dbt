import Swal from 'sweetalert2'

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
        '0': ['建立問卷', 'text-secondary'],
        '1': ['機構審核', 'text-info'],
        '2': ['招募實驗員', 'text-success'],
        '3': ['招募受測員', 'text-warning'],
        '4': ['實驗中', 'text-danger'],
        '5': ['解盲完成', 'text-primary'],
    }
    return `
        <span class="${state[code][1]} text-nowrap fw-bold">${state[code][0]}</span>
    `
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

export function route2url(route, ...params){
    let rule = route.rule
    let args = route.args
    if (args.length !== params.length) return false
    Object.entries(args).forEach(([key, value]) => {
        rule = rule.replace(/<.*?>/, params[key])
    })
    return rule
}

export function load_info(data){
    let exp = null;
    Object.values(data).forEach((item) => {
        if (item._address === page.id) {
            exp = item
        }
    });
    document.querySelector("#expId").value = exp._serial
    document.querySelector("#expName").value = exp._name
    document.querySelector("#expContent").value = exp._content
    document.querySelector("#expTime").value = '2023/08/30 22:00:00'
}

export function load_topic(data) {
    const mc = [];
    const sa = [];
    Object.values(data).forEach((item) => {
        if (item._type === 'choose') {
            mc.push({
                multipleChoice: `${item._topic}`,
                maxScore: `${item._scale}`
            })
        }
        if (item._type === 'filling') {
            sa.push({
                shortAnswer: `${item._topic}`
            })
        }
    });
    $('#MCTable').bootstrapTable('load', mc)
    $('#SATable').bootstrapTable('load', sa)
}
