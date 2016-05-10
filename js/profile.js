$(function () {
    //上传头像设置
    var options = {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: $("#Portrait_display").attr("src")
    };
    var cropper = $('.imageBox').cropbox(options);
    $('#upload-file').on('change', function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            options.imgSrc = e.target.result;
            cropper = $('.imageBox').cropbox(options);
        }
        reader.readAsDataURL(this.files[0]);
        this.files = [];
    })
    $('#btnCrop').on('click', function () {
        var img = cropper.getDataURL();
        $('.cropped').html('');
        $('.cropped').append('<img src="' + img + '" align="absmiddle" style="width:120px;margin-top:10px;"><p>120px*120px</p>');
    })
    $('#btnZoomIn').on('click', function () {
        cropper.zoomIn();
    })
    $('#btnZoomOut').on('click', function () {
        cropper.zoomOut();
    })
    $('#saveimg').on('click', function () {
        var img = cropper.getDataURL();
        $("#Portrait").val(img);
        $('#upimg_box').modal('hide');
        $("#Portrait_display").attr("src", img);
    })

})
