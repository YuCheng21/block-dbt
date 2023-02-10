$(document).ready(function () {
    // console.log('ready')

})

/**
 * Theme Color
 */
const style = getComputedStyle(document.body);
const theme = {};
theme.primary = style.getPropertyValue('--bs-primary');
theme.secondary = style.getPropertyValue('--bs-secondary');
theme.success = style.getPropertyValue('--bs-success');
theme.info = style.getPropertyValue('--bs-info');
theme.warning = style.getPropertyValue('--bs-warning');
theme.danger = style.getPropertyValue('--bs-danger');
theme.light = style.getPropertyValue('--bs-light');
theme.dark = style.getPropertyValue('--bs-dark');

theme.blue = style.getPropertyValue('--bs-blue');
theme.indigo = style.getPropertyValue('--bs-indigo');
theme.purple = style.getPropertyValue('--bs-purple');
theme.pink = style.getPropertyValue('--bs-pink');
theme.red = style.getPropertyValue('--bs-red');
theme.orange = style.getPropertyValue('--bs-orange');
theme.yellow = style.getPropertyValue('--bs-yellow');
theme.green = style.getPropertyValue('--bs-green');
theme.teal = style.getPropertyValue('--bs-teal');
theme.cyan = style.getPropertyValue('--bs-cyan');

theme.white = style.getPropertyValue('--bs-white-rgb');
theme.gray = style.getPropertyValue('--bs-gray');
theme.black = style.getPropertyValue('--bs-black-rgb');

/**
 * sweetAlert
 */
function dialog(category, message) {
    if (category === 'error') {
        Swal.fire(
            '錯誤',
            message,
            'error'
        )
    } else if (category === 'success') {
        Swal.fire(
            '成功',
            message,
            'success'
        )
    } else if (category === 'success-toast') {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: message
        })
    }
}

/**
 * Loading Element
 */
const markup = `
<div class="loading">
    <div class="loadingWrapper">
        <div class="loadingCircle"></div>
        <div class="loadingCircle"></div>
        <div class="loadingCircle"></div>
        <div class="loadingShadow"></div>
        <div class="loadingShadow"></div>
        <div class="loadingShadow"></div>
        <span>處理中，請稍後</span>
    </div>
</div>
`;
const loading_element = $(markup);

window.onpageshow = function () {
    if (loading_element){
        loading_element.remove();
    }
}

function loading(){
    $('body').prepend(loading_element);
}

/**
 * Activate Current Page NavigationBar Text
 */
$('#navbarToggler > ul a > span').each(function (index, value) {
    if (value.innerHTML === pageTitle) {
        $(this).addClass('text-active')
    }
})