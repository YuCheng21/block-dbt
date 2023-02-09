$(document).on('click', '#multipleChoiceSend', function () {
    // check required item
    if($('#multipleChoice').val() == '') return false;
    if($('#maxScore').val() == '') return false;
    // dialog data
    const topic = $('#multipleChoice').val()
    const maxScore = $('#maxScore').val()
    const action = `
    <button class="btn btn-primary w-50 MCUpdate">編輯</button>
    <button class="btn btn-danger w-50 MCDelete">刪除</button>
    `
    // Is insert or update
    const index = $('#modalTopicMC').attr('data-update');
    $('#modalTopicMC').removeAttr('data-update')
    if (index == null) {
        // Insert items to table
        $('#MCTable').bootstrapTable('insertRow', {
            index: 0,
            row: {
                multipleChoice: topic,
                maxScore: maxScore,
                MCAction: action,
            }
        });
    } else {
        // update items to table
        $('#MCTable').bootstrapTable('updateRow', {
            index: index,
            row: {
                multipleChoice: topic,
                maxScore: maxScore,
                MCAction: action,
            }
        });
    }
    // hide the modal.
    $('#modalTopicMC').modal('hide')
})

$('#modalTopicMC').on('hidden.bs.modal', function (e) {
    $('#multipleChoice').val(null)
    $('#maxScore').val(null)
    $('#modalTopicMC').removeAttr('data-update')
})