function fetch_data() {
    var rows = []
    for (var i = 0; i < 10; i++) {
        rows.push({
            id: 'N00' + i,
            name: '實驗名稱',
            member: '研究人員',
            content: '實驗內容',
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