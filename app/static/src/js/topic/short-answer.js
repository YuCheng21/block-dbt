let shortAnswerSend = document.querySelector('#shortAnswerSend')
if (shortAnswerSend){
    let modalTopicSA = document.querySelector('#modalTopicSA')
    let shortAnswer = document.querySelector('#shortAnswer')
    shortAnswerSend.addEventListener('click', function () {
        // check required item
        if (shortAnswer.value === '') return false;
        // dialog data
        const topic = shortAnswer.value
        const action = `
            <button class="btn btn-primary w-50 SAUpdate">編輯</button>
            <button class="btn btn-danger w-50 SADelete">刪除</button>
        `
        // Is insert or update
        const index = modalTopicSA.getAttribute('data-update')
        modalTopicSA.removeAttribute('data-update')

        let SATable = document.querySelector('#SATable')
        if (index == null) {
            // Insert items to table
            $(SATable).bootstrapTable('insertRow', {
                index: 0, row: {
                    shortAnswer: topic, SAAction: action,
                }
            });
        } else {
            // update items to table
            $(SATable).bootstrapTable('updateRow', {
                index: index, row: {
                    shortAnswer: topic, SAAction: action,
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
