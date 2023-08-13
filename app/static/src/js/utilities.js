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
