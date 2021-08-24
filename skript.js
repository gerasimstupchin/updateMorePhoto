$("body").on("change", ".update_more_photo input", function ()
    {
        $.blockUI({
            message: "<p>Пожалуйста подождите...</p>",
            css: { backgroundColor: "#f00", color: "#fff" },
            overlayCSS: { backgroundColor: "#000", opacity: 0.1, cursor: "wait" }
        });
        var file = [];
        file_temp = $(this)[0].files;
        var elementId = $(this)
            .parents("tr")
            .attr("data-id");
        var block = $(this)
            .parents("tr")
            .find(".DETAIL_PICTURE");
        var COLORS = $(this).parents("td.COLORS");

        var formData = new FormData();
        for (var i in file_temp)
        {
            formData.append("image_" + i, file_temp[i]);
        }

        formData.append("id", elementId);
        formData.append("type", "more_photo");

        $.ajax({
            type: "POST",
            processData: false,
            contentType: false,
            url: "/local/ajax/updatePicture.php",
            data: formData
        }).done(function (data)
        {
            var data = $.parseJSON(data);
            if (data.STATUS == "ERROR")
            {
                alert("Ошибка");
            } else
            {
                //$(block).find('.more_photo_dop').find('a.fancybox').remove();
                // $(block).find('.more_photo_dop').prepend(data.IMAGES);
                $(block)
                    .find(".block_COLORS")
                    .remove();
                $(block)
                    .find(".update_more_photo")
                    .parent(".bl_update_more")
                    .before(data.IMAGES);
            }
            $.unblockUI();
        });
    });
