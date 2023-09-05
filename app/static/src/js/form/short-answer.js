/*
* click confirm button on sa modal: update/add the data on sa table
* */
export let addAction = `
<div class="btn-group w-100">
    <button class="btn btn-secondary fs-6 fw-bold w-100 ws-nowrap SAUpdate">編輯</button>
    <button class="btn btn-danger fs-6 fw-bold w-100 ws-nowrap SADelete">刪除</button>
</div>
`
export let deleteAction = `
<div class="btn-group w-100">
    <button class="btn btn-close fs-6 fw-bold w-100 ws-nowrap SADelete disabled"></button>
</div>
`
let shortAnswerSend = document.querySelector('#shortAnswerSend')
if (shortAnswerSend){
    let modalTopicSA = document.querySelector('#modalTopicSA')
    let shortAnswer = document.querySelector('#shortAnswer')
    shortAnswerSend.addEventListener('click', function () {
        // check required item
        if (shortAnswer.value === '') return false;
        // dialog data
        const topic = shortAnswer.value
        // Is insert or update
        const index = modalTopicSA.getAttribute('data-update')
        modalTopicSA.removeAttribute('data-update')

        let SATable = document.querySelector('#SATable')
        if (index == null) {
            // Insert items to table
            $(SATable).bootstrapTable('insertRow', {
                index: 0, row: {
                    shortAnswer: topic, SAAction: addAction,
                }
            });
        } else {
            // update items to table
            $(SATable).bootstrapTable('updateRow', {
                index: index, row: {
                    shortAnswer: topic, SAAction: addAction,
                }
            });
        }
        // hide the modal.
        $(modalTopicSA).modal('hide')
    })

    $(modalTopicSA).on('hidden.bs.modal', function (e) {
        shortAnswer.value = null
        modalTopicSA.removeAttribute('data-update')
    })
}
