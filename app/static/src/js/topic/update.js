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

    targetTable.bootstrapTable('check', index)
    console.log(targetTable.bootstrapTable('getSelections'))
    targetTable.bootstrapTable('uncheck', index)
})