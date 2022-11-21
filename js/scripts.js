$(() => {
    // Основной слайдер на главной
    if ($('.first_section .swiper-container').length) {
        new Swiper('.first_section .swiper-container', {
            loop: true,
            speed: 750,
            watchSlidesVisibility: true,
            slideActiveClass: 'active',
            slideVisibleClass: 'visible',
            spaceBetween: 0,
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
                bulletActiveClass: 'active'
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        })
    }


    // Моб. меню
    $('header .mob_menu_btn').click((e) => {
        e.preventDefault()

        $('header .mob_menu_btn').addClass('active')
        $('body').addClass('menu_open')
        $('header .menu').addClass('show')
        $('.overlay').fadeIn(300)
    })

    $('header .menu .close_btn, .overlay').click((e) => {
        e.preventDefault()

        $('header .mob_menu_btn').removeClass('active')
        $('body').removeClass('menu_open')
        $('header .menu').removeClass('show')
        $('.overlay').fadeOut(300)
    })


    $('body').on('click', '.contact_callback', function (e) {
        e.preventDefault()

        Fancybox.close()

        Fancybox.show([{
            src: $(this).data('content'),
            type: 'inline'
        }])
    })

    $('select').niceSelect();

    new AirDatepicker('.history_form input', {
        range: true,
        multipleDatesSeparator: ' - '
    });
    

    $('.open-menu').click(function(){
        $('.aside--lk').addClass('active');
        $('.overlay--lk').addClass('active');
        $('.open-menu').addClass('active');
    });
    $('.overlay--lk').click(function(){
        $('.aside--lk').removeClass('active');
        $('.overlay--lk').removeClass('active');
        $('.open-menu').removeClass('active');
    });


    $(document).on('change', '.error', function () {

        $(this).removeClass('error');
        /*if ($(this).attr('class') != 'checked') { $(this).next().hide(); }*/
    })

    $(document).on('click', '.js-submit', function (event) {
        event.preventDefault();        
        var valid = true;
        var form = $(this).closest('form');
        $(this).closest('form').find('input:not([type=submit]),textarea').each(function (i, elem) {
            if (this.value.length < 3 && $(this).hasClass('required')) {
                valid = false;
                $(this).addClass('error');
            }
            if ($(this).attr('name') == 'email' && $(this).hasClass('required')) {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if (!pattern.test($(this).val())) {
                    valid = false;
                    $(this).addClass('error');
                }
            }
            if ($(this).hasClass("checked") && !$(this).prop("checked")) {
                $(this).addClass('error');
                valid = false;
            }
        })

        if (!valid) {
            return false;
        }

        let form_create = document.querySelector("#form_create");

        var addressForAjax = myajax.url;            
        var formData = new FormData(form_create);
        formData.append('action', "form");

        /*formData.append('name', $('#name').val());        
        formData.append('text', $('#text').val());
        formData.append('phone', $('#phone').val());
        formData.append('email', $('#email').val());

        formData.append('file', $('#file')[0].files[0]);*/
        console.log(formData);
        $.ajax({
            type: 'POST',
            data: formData,
            url: addressForAjax,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                alert("Принят в обработку!");
                $('form').trigger("reset");                      
            }
        });
    });


})