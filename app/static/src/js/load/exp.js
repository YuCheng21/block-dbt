function component_member(researchers_name) {
    return `
        <span data-bs-toggle="tooltip" data-bs-placement="top" title="${researchers_name}">
            ${researchers_name.slice(-6)}
        </a>
    `
}

function component_action(id) {
    return `
        <a href="/exp/show/${id}" class="btn btn-secondary text-white">查看</a>
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

function fetch_data() {
    // account = '0xB32711d554917A8A55270A666df5c68dD6A2fF65'
    // password = 'asdf'
    // url = "http://localhost:15000/explist"
    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", 'Basic ' + btoa(`${account}:${password}`));
    // const requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow'
    // };
    // fetch(url, requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));

    data = {
        "0": {
            "_address": "0x920D26291B4ca217AD34c1fa768AEcDc9940A124",
            "_name": "實驗名稱1",
            "_content": "實驗內容1",
            "_Researchers_name": "0xD4E68Bbf258194D22034Be3B0Fe946ACDaB488A2",
            "_status": "0",
            "_serial": "0"
        },
        "1": {
            "_address": "0x62Ff69F0156B4F0D39243c955b27E7Ef12c46e9f",
            "_name": "實驗名稱2",
            "_content": "實驗內容2",
            "_Researchers_name": "0xD4E68Bbf258194D22034Be3B0Fe946ACDaB488A2",
            "_status": "0",
            "_serial": "1"
        },
        "2": {
            "_address": "0xdEf14b331f165bD71C24aD548EC8f6b12C896CB0",
            "_name": "實驗名稱3",
            "_content": "實驗內容3",
            "_Researchers_name": "0xD4E68Bbf258194D22034Be3B0Fe946ACDaB488A2",
            "_status": "0",
            "_serial": "2"
        },
        "3": {
            "_address": "0x0b756f4d179e69c31964ede0Ae5dc08bb6B7cA2D",
            "_name": "實驗名稱4",
            "_content": "實驗內容4",
            "_Researchers_name": "0xD4E68Bbf258194D22034Be3B0Fe946ACDaB488A2",
            "_status": "0",
            "_serial": "3"
        },
        "4": {
            "_address": "0x8D8f857331d8443B82eeC5E7cB1b4F2DC353d746",
            "_name": "實驗名稱",
            "_content": "實驗內容",
            "_Researchers_name": "0xD4E68Bbf258194D22034Be3B0Fe946ACDaB488A2",
            "_status": "0",
            "_serial": "4"
        }
    }
    const rows = [];
    Object.values(data).forEach((item) => {
        rows.push({
            id: `${item._serial}`,
            name: `${item._name}`,
            member: component_member(item._Researchers_name),
            content: `${item._name}`,
            state: component_state(item._status),
            action: component_action(item._serial)
        })
    });
    return rows
}

$(document).ready(function () {
    /**
     * Fetch Data
     */
    $('#expTable').bootstrapTable('load', fetch_data())

    /**
     * Initialize Tooltip
     */
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
})