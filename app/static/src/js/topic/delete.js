$(document).on('click', '.MCDelete, .SADelete', function (e) {
    // getting the target index that was click.
    const index = $(e.currentTarget).closest('tr').data('index');
    // Delete items from table
    let target;
    if ($(e.currentTarget).hasClass('MCDelete')) {
        target = $('#MCTable');
    } else if ($(e.currentTarget).hasClass('SADelete')) {
        target = $('#SATable');
    } else {
        throw 'class name error'
    }
    target.bootstrapTable('remove', {
        field: '$index', values: [index]
    });
})
