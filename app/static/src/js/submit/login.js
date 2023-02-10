$(document).on('click', '#send', function () {
    // check required item
    if ($('#account').val() == '') return false;
    if ($('#password').val() == '') return false;

    $('form').submit();
    loading()
});