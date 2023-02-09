window.onpageshow = function () {
    if (loading){
        loading.remove();
    }
}

$('#loadingSend').click(function () {
    $('body').prepend(loading);
})
