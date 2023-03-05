$(document).on('click', '#shortAnswerSend', function () {
    // check required item
    if ($('#shortAnswer').val() == '') return false;
    // dialog data
    const topic = $('#shortAnswer').val()
    const action = `
    <button class="btn btn-primary w-50 SAUpdate">編輯</button>
    <button class="btn btn-danger w-50 SADelete">刪除</button>
    `
    // Is insert or update
    const index = $('#modalTopicSA').attr('data-update');
    $('#modalTopicSA').removeAttr('data-update')
    if (index == null) {
        // Insert items to table
        $('#SATable').bootstrapTable('insertRow', {
            index: 0, row: {
                shortAnswer: topic, SAAction: action,
            }
        });
    } else {
        // update items to table
        $('#SATable').bootstrapTable('updateRow', {
            index: index, row: {
                shortAnswer: topic, SAAction: action,
            }
        });
    }
    // hide the modal.
    $('#modalTopicSA').modal('hide')
})

$('#modalTopicSA').on('hidden.bs.modal', function (e) {
    $('#shortAnswer').val(null)
    $('#modalTopicSA').removeAttr('data-update')
})
