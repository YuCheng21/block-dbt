$(document).on('click', '#multipleChoiceSend', function () {
    // check required item
    if($('#multipleChoice').val() == '') return false;
    if($('#maxScore').val() == '') return false;
    // Insert items to table
    const topic = $('#multipleChoice').val()
    const maxScore = $('#maxScore').val()
    const action = `
    <button class="btn btn-primary w-50 MCUpdate">編輯</button>
    <button class="btn btn-danger w-50 MCDelete">刪除</button>
    `
    $('#MCTable').bootstrapTable('insertRow', {
        index: 0,
        row: {
            multipleChoice: topic,
            maxScore: maxScore,
            MCAction: action,
        }
    });
    // hide the modal.
    $('#modalTopicMC').modal('hide')
    // reset modal
    $('#multipleChoice').val(null)
    $('#maxScore').val(null)
})