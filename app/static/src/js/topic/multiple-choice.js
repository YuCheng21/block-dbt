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
        const action = `
            <button class="btn btn-primary w-50 MCUpdate">編輯</button>
            <button class="btn btn-danger w-50 MCDelete">刪除</button>
        `
        // Is insert or update
        const index = modalTopicMC.getAttribute('data-update')
        modalTopicMC.removeAttribute('data-update')

        let MCTable = document.querySelector('#MCTable')
        if (index == null) {
            // Insert items to table
            $(MCTable).bootstrapTable('insertRow', {
                index: 0, row: {
                    multipleChoice: topic, maxScore: score, MCAction: action,
                }
            });
        } else {
            // update items to table
            $(MCTable).bootstrapTable('updateRow', {
                index: index, row: {
                    multipleChoice: topic, maxScore: score, MCAction: action,
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
