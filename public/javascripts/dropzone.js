const $fileInput = $('.file-input');
const $droparea = $('.file-drop-area');
const $delete = $('.item-delete');

$fileInput.on('dragenter focus click', function () {
    $droparea.addClass('is-active');
});

$fileInput.on('dragleave blur drop', function () {
    $droparea.removeClass('is-active');
});

$fileInput.on('change', function () {
    let filesCount = $(this)[0].files.length;
    let $textContainer = $(this).prev();

    if (filesCount === 1) {
        let fileName = $(this).val().split('\\').pop();
        $textContainer.text(fileName);
        $('.item-delete').css('display', 'inline-block');
    } else if (filesCount === 0) {
        $textContainer.text('or drop files here');
        $('.item-delete').css('display', 'none');
    } else {
        $textContainer.text(filesCount + ' files selected');
        $('.item-delete').css('display', 'inline-block');
    }

    console.log($(this)[0].files);

    // Send files to the backend
    const formData = new FormData();
    const files = $(this)[0].files;

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // Handle success response
        },
        error: function (xhr, status, error) {
            // Handle error response
        }
    });
});

$delete.on('click', function () {
    $('.file-input').val(null);
    $('.file-msg').text('or drop files here');
    $('.item-delete').css('display', 'none');
});
