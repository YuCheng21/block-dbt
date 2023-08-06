import * as utils from "../utilities";

let oauthSend = document.querySelector('#oauthSend')
if (oauthSend) {
    oauthSend.addEventListener('click', function () {
        let data = {
            account: $('#account').val(),
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
