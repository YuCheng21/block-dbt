function fetch_data() {
    var rows = []
    var state = ['已完成', '進行中', '等待中']
    for (var i = 0; i < 10; i++) {
        rows.push({
            id: 'N00' + i,
            name: '實驗名稱' + i,
            member: '研究人員' + i,
            content: '實驗內容' + i,
            state: state[Math.floor(Math.random() * state.length)],
            action: `
            <a href="/exp/show/N00${i}" class="btn btn-secondary text-white">查看</a>
            `
        })
    }
    return rows
}

$(document).ready(function () {
    $('#expTable').bootstrapTable('load', fetch_data())
})