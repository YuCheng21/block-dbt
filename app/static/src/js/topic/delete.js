document.addEventListener('click', function (event) {
    if (!event.target.matches('.MCDelete, .SADelete')) return false
    const target = event.target
    // getting the target index that was click.
    const index = target.closest('tr').getAttribute('data-index')
    // Delete items from table
    let table;
    if (target.classList.contains('MCDelete')){
        table = document.querySelector('#MCTable')
    } else if (target.classList.contains('SADelete')) {
        table = document.querySelector('#SATable')
    } else {
        throw 'class name error'
    }
    $(table).bootstrapTable('remove', {
        field: '$index', values: [parseInt(index)]
    });
})
