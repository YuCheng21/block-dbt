/*
* click edit button: open target row on edit modal, and write info on modal
* */
document.addEventListener('click', function (event) {
    if (!event.target.matches('.MCUpdate, .SAUpdate')) return false
    const target = event.target
    // getting the target index that was click.
    const index = target.closest('tr').getAttribute('data-index')
    // Open the item update modal
    let targetModal, targetTable;
    if (target.classList.contains('MCUpdate')){
        targetModal = document.querySelector('#modalTopicMC')
        targetTable = document.querySelector('#MCTable')
    } else if (target.classList.contains('SAUpdate')) {
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
    if (target.matches('.MCUpdate')) {
        document.querySelector('#multipleChoice').value = value[0].multipleChoice
        document.querySelector('#maxScore').value = value[0].maxScore
    } else if (target.matches('.SAUpdate')) {
        document.querySelector('#shortAnswer').value = value[0].shortAnswer
    }
})
