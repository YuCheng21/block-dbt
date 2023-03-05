import * as utils from "../utilities";

let expSend = document.querySelector('#expSend')
if (expSend) {
    expSend.addEventListener('click', function () {
        let data = {
            expName: $('#expName').val(),
            expContent: $('#expContent').val(),
            MCTable: JSON.stringify($('#MCTable').bootstrapTable('getData')),
            SATable: JSON.stringify($('#SATable').bootstrapTable('getData')),
        }

        let form = $('<form></form>');

        form.attr("method", "POST");
        form.attr("action", window.location.href);
        form.attr("enctype", "multipart/form-data");

        $.each(data, function (key, value) {
            var field = $('<input></input>');

            field.attr("type", "hidden");
            field.attr("name", key);
            field.attr("value", value);

            form.append(field);
        });

        $(document.body).append(form);
        form.submit();
        utils.loading.show()
    })
}
