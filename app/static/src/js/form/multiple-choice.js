/*
* click confirm button on mc modal: update/add the data on mc table
* */
export let addAction = `
<div class="btn-group w-100">
    <button class="btn btn-secondary fs-6 fw-bold w-100 ws-nowrap MCUpdate">編輯</button>
    <button class="btn btn-danger fs-6 fw-bold w-100 ws-nowrap MCDelete">刪除</button>
</div>
`
export let deleteAction = `
<div class="btn-group w-100">
    <button class="btn btn-close fs-6 fw-bold w-100 ws-nowrap MCDelete disabled"></button>
</div>
`
let multipleChoiceSend = document.querySelector('#multipleChoiceSend')
if (multipleChoiceSend){
    let modalTopicMC = document.querySelector('#modalTopicMC')
    let maxScore = document.querySelector('#maxScore')
    let multipleChoice = document.querySelector('#multipleChoice')
    multipleChoiceSend.addEventListener('click', function () {
        // check required item
        if (multipleChoice.value === '') return false;
        if(maxScore.value === '') return false
        // dialog data
        const topic = multipleChoice.value
        const score = maxScore.value
        // Is insert or update
        const index = modalTopicMC.getAttribute('data-update')
        modalTopicMC.removeAttribute('data-update')

        let MCTable = document.querySelector('#MCTable')
        if (index == null) {
            // Insert items to table
            $(MCTable).bootstrapTable('insertRow', {
                index: 0, row: {
                    multipleChoice: topic, maxScore: score, MCAction: addAction,
                }
            });
        } else {
            // update items to table
            $(MCTable).bootstrapTable('updateRow', {
                index: index, row: {
                    multipleChoice: topic, maxScore: score, MCAction: addAction,
                }
            });
        }
        // hide the modal.
        $(modalTopicMC).modal('hide')
    })


    $(modalTopicMC).on('hidden.bs.modal', function () {
        multipleChoice.value = null
        maxScore.value = null
        modalTopicMC.removeAttribute('data-update')
    })
}
