//jQuery plugin
(function($) {

    $.fn.uploader = function(options) {
        var settings = $.extend({
            MessageAreaText: "",
            MessageAreaTextWithFiles: "",
            DefaultErrorMessage: "Unable to open this file.",
            BadTypeErrorMessage: "Не поддерживаемый формат файла.",
            acceptedFileTypes: ['pdf', 'jpg', 'gif', 'jpeg', 'bmp', 'tif', 'tiff', 'png', 'xps', 'doc', 'docx',
                'fax', 'wmp', 'ico', 'txt', 'cs', 'rtf', 'xls', 'xlsx'
            ]
        }, options);

        var uploadId = 1;
        //update the messaging 
        $('.file-uploader__message-area p').text(options.MessageAreaText || settings.MessageAreaText);

        //create and add the file list and the hidden input list
        var fileList = $('<ul class="file-list selected "></ul>');
        var hiddenInputs = $('<div class="hidden-inputs hidden"></div>');
        $('.file-uploader__message-area').after(fileList);
        $('.file-list').after(hiddenInputs);

        //when choosing a file, add the name to the list and copy the file input into the hidden inputs
        $('.file-chooser__input').on('change', function() {
            var file = $('.file-chooser__input').val();
            var fileName = (file.match(/([^\\\/]+)$/)[0]);

            //clear any error condition
            $('.file-chooser').removeClass('error');
            $('.error-message').remove();

            //validate the file
            var check = checkFile(fileName);
            if (check === "valid") {

                // move the 'real' one to hidden list 
                $('.hidden-inputs').append($('.file-chooser__input'));

                //insert a clone after the hiddens (copy the event handlers too)
                $('.file-chooser').append($('.file-chooser__input').clone({ withDataAndEvents: true }));

                //add the name and a remove button to the file-list
                $('.file-list').append('<li style="display: none;"><div class="file-list__name name">' + fileName + '</div><button class="removal-button remove" data-uploadid="' + uploadId + '"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0 2.682 2.682 0 6 0C9.318 0 12 2.682 12 6C12 9.318 9.318 12 6 12C2.682 12 0 9.318 0 6ZM8.8242 8.8242C9.0588 8.5896 9.0588 8.2104 8.8242 7.9758L6.8484 6L8.8242 4.0242C9.0588 3.7896 9.0588 3.4104 8.8242 3.1758C8.5896 2.9412 8.2104 2.9412 7.9758 3.1758L6 5.1516L4.0242 3.1758C3.7896 2.9412 3.4104 2.9412 3.1758 3.1758C2.9412 3.4104 2.9412 3.7896 3.1758 4.0242L5.1516 6L3.1758 7.9758C2.9412 8.2104 2.9412 8.5896 3.1758 8.8242C3.2928 8.9412 3.4464 9 3.6 9C3.7536 9 3.9072 8.9412 4.0242 8.8242L6 6.8484L7.9758 8.8242C8.0928 8.9412 8.2464 9 8.4 9C8.5536 9 8.7072 8.9412 8.8242 8.8242Z" fill="#E32424"/></svg></button></li>');
               
                $('.file-list').find("li:last").show();

                //removal button handler
                $('.removal-button').on('click', function(e) {
                    e.preventDefault();

                    //remove the corresponding hidden input
                    $('.hidden-inputs input[data-uploadid="' + $(this).data('uploadid') + '"]').remove();

                    //remove the name from file-list that corresponds to the button clicked
                    $(this).parent().hide().queue(function() { $(this).remove(); });

                    //if the list is now empty, change the text back 
                    if ($('.file-list li').length === 0) {
                        $('.file-uploader__message-area').text(options.MessageAreaText || settings.MessageAreaText);
                    }
                });

                //so the event handler works on the new "real" one
                $('.hidden-inputs .file-chooser__input').removeClass('file-chooser__input').attr('data-uploadId', uploadId);

                //update the message area
                $('.file-uploader__message-area').text(options.MessageAreaTextWithFiles || settings.MessageAreaTextWithFiles);

                uploadId++;

            } else {
                //indicate that the file is not ok
                $('.file-chooser').addClass("error");
                var errorText = options.DefaultErrorMessage || settings.DefaultErrorMessage;

                if (check === "badFileName") {
                    errorText = options.BadTypeErrorMessage || settings.BadTypeErrorMessage;
                }

                $('.file-chooser__input').after('<p class="error-message">' + errorText + '</p>');
            }
        });

        var checkFile = function(fileName) {
            var accepted = "invalid",
                acceptedFileTypes = this.acceptedFileTypes || settings.acceptedFileTypes,
                regex;

            for (var i = 0; i < acceptedFileTypes.length; i++) {
                regex = new RegExp("\\." + acceptedFileTypes[i] + "$", "i");

                if (regex.test(fileName)) {
                    accepted = "valid";
                    break;
                } else {
                    accepted = "badFileName";
                }
            }

            return accepted;
        };
    };
}(jQuery));

//init 
$(document).ready(function() {
    $('.fileUploader').uploader({
        MessageAreaText: "Файл не выбран"
    });
});