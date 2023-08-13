import * as utils from "../../utilities";

let contentSend = document.querySelector('#contentSend')
if (contentSend) {
    document.addEventListener("DOMContentLoaded", function () {
        contentSend.addEventListener('click', function () {
            let data = {
                smartContractAddress: page.id,
                expList: $('#expList').val(),
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
    })
}