import * as utils from "../utilities";

let expSend = document.querySelector('#expSend')
if (expSend) {
    expSend.addEventListener('click', function () {
        let data = {
            expName: $('#expName').val(),
            expContent: $('#expContent').val(),
            expTime: $('#expTime').val(),
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

let expUpdateSend = document.querySelector('#expUpdateSend')
if (expUpdateSend) {
    expUpdateSend.addEventListener('click', function () {
        let data = {
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
function getRadioValue(theRadioGroup)
{
    var elements = document.getElementsByName(theRadioGroup);
    for (var i = 0, l = elements.length; i < l; i++)
    {
        if (elements[i].checked)
        {
            return elements[i].value;
        }
    }
}
let expFormSend = document.querySelector('#expFormSend')
if (expFormSend) {
    expFormSend.addEventListener('click', function () {
        var mc = []
        var temp = $('#MCTable tr>td:nth-child(2)')
        Object.values(temp).forEach((item, key) => {
            if(temp.length > key) {
                mc.push(getRadioValue('inlineRadioOptions'+key))
            }
        })
        var sa = []
        var temp = $('#SATable tr>td:nth-child(2)')
        Object.values(temp).forEach((item, key) => {
            if(temp.length > key) {
                sa.push(document.getElementsByName('shortAnswer'+key)[0].value)
            }
        })
        console.log()
        let data = {
            MCTable: mc,
            SATable: sa,
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