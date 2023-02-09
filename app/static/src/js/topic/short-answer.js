$(document).on('click', '#shortAnswerSend', function () {
    // check required item
    if($('#shortAnswer').val() == '') return false;
    // Insert items to table
    const topic = $('#shortAnswer').val()
    const action = `
    <button class="btn btn-primary w-50 SAUpdate">編輯</button>
    <button class="btn btn-danger w-50 SADelete">刪除</button>
    `
    $('#SATable').bootstrapTable('insertRow', {
        index: 0,
        row: {
            shortAnswer: topic,
            SAAction: action,
        }
    });
    // hide the modal.
    $('#modalTopicSA').modal('hide')
    // reset modal
    $('#shortAnswer').val(null)
})