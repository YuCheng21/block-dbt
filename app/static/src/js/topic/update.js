$(document).on('click', '.MCUpdate, .SAUpdate', function (e) {
    // getting the target index that was click.
    const index = $(e.currentTarget).closest('tr').data('index');
    // Open the item update modal
    let targetModal;
    let targetTable;
    if ($(e.currentTarget).hasClass('MCUpdate')) {
        targetModal = $('#modalTopicMC');
        targetTable = $('#MCTable');
    } else if ($(e.currentTarget).hasClass('SAUpdate')) {
        targetModal = $('#modalTopicSA');
        targetTable = $('#SATable');
    } else {
        throw 'class name error'
    }
    targetModal.modal('show')
    targetModal.attr('data-update', index)
    // enter the value to modal
    targetTable.bootstrapTable('check', index)
    let value = targetTable.bootstrapTable('getSelections')
    targetTable.bootstrapTable('uncheck', index)

    $('#shortAnswer').val(value[0].shortAnswer)
    $('#multipleChoice').val(value[0].multipleChoice)
    $('#maxScore').val(value[0].maxScore)
})
