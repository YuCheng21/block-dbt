function component_member(researchers_name) {
    return `
        <span data-bs-toggle="tooltip" data-bs-placement="top" title="${researchers_name}">
            ${researchers_name.slice(-6)}
        </span>
    `
}

function component_action(id) {
    return `
        <a href="/exp/show/${id}" class="btn btn-secondary text-white">查看</a>
    `
}

function component_content(content) {
    return `
        ${content}
    `
}

function component_state(code) {
    const state = {
        '0': '等待中',
        '1': '進行中',
        '2': '已完成'
    }
    return state[code]
}

async function fetch_data() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", 'Basic ' + btoa(`${account}:${password}`));
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return await fetch(url, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

function load_table(data) {
    const rows = [];
    Object.values(data).forEach((item) => {
        rows.push({
            id: `${item._serial}`,
            name: `${item._name}`,
            member: component_member(item._Researchers_name),
            content: component_content(item._content),
            state: component_state(item._status),
            action: component_action(item._serial)
        })
    });
    $('#expTable').bootstrapTable('load', rows)
}

$(document).ready(function () {
    /**
     * Load Data
     */
    fetch_data().then(data => {
        load_table(data)
        /**
         * Initialize Tooltip
         */
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    })

})