document.addEventListener('click', function (event) {
    if (!event.target.matches('.MCUpdate, .SAUpdate')) return false
    const target = event.target
    // getting the target index that was click.
    const index = target.closest('tr').getAttribute('data-index')
    // Open the item update modal
    let targetModal, targetTable;
    if (target.classList.contains('MCUpdate')){
        // targetModal = $('#modalTopicMC');
        // targetTable = $('#MCTable');
        targetModal = document.querySelector('#modalTopicMC')
        targetTable = document.querySelector('#MCTable')
    } else if (target.classList.contains('SAUpdate')) {
        // targetModal = $('#modalTopicSA');
        // targetTable = $('#SATable');
        targetModal = document.querySelector('#modalTopicSA')
        targetTable = document.querySelector('#SATable')
    } else {
        throw 'class name error'
    }
    targetModal = $(targetModal)
    targetTable = $(targetTable)

    targetModal.modal('show')
    targetModal.attr('data-update', index)
    // enter the value to modal
    targetTable.bootstrapTable('check', index)
    let value = targetTable.bootstrapTable('getSelections')
    targetTable.bootstrapTable('uncheck', index)

    document.querySelector('#shortAnswer').value = value[0].shortAnswer
    document.querySelector('#multipleChoice').value = value[0].multipleChoice
    document.querySelector('#maxScore').value = value[0].maxScore
})
