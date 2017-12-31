$(function () {

    /*******************  ANIMATION  ********************/
    $('.animated').appear(function () {
        var elem = $(this);
        var animation = elem.data('animation');

        if (!elem.hasClass('visible')) {
            var animationDelay = elem.data('animation-delay');

            if (animationDelay) {
                setTimeout(function () {
                    elem.addClass(animation + " visible");
                }, animationDelay);
            }
            else {
                elem.addClass(animation + " visible");
            }
        }
    });

    /********************  PARALLAX  ********************/
    $('.parallax').each(function () {
        var $obj = $(this);

        $(window).scroll(function () {
            if ($(document).width() > 500) {
                var yPos = ($obj.offset().top - $(window).scrollTop()) / $obj.data('speed');
                var bgpos = '50% ' + yPos + 'px';
                $obj.css('background-position', bgpos);
            }
            else {
                $obj.css('background-position', '50% 0px');
            }
        });
    });

    /*******************  ROTATOR  *******************/
    $(".rotate").textrotator({
        animation: "dissolve",
        separator: "|",
        speed: 3000
    });

    /*******************  ISOTOPE  *******************/
    var $container = $('.premium-tv-grid');

    function startIsotope() {
        if (jQuery().isotope) {
            $container.isotope();
        }

        $('.filters a').on('click', function (e) {
            e.preventDefault();
            $('.filters a').removeClass('active');
            $(this).addClass('active');

            refreshIsotope();
        });
    }
    function refreshIsotope() {
        var $filters = $('.filters a.active');
        var selectors = '';

        $filters.each(function () {
            if (selectors != '') {
                selectors += ', '
            }
            selectors += $(this).attr('data-filter');
        });

        $container.isotope({ filter: selectors });
    }
    startIsotope();

    /*******************  ANIMATION  *******************/
    if ($(window).width() >= 768) {
        $('.dropdown').hover(function () {
            $(this)
					.find('.dropdown-menu')
					.first()
					.stop(true, true)
					.delay(100)
					.fadeIn()
					.slideDown('fast')
        }, function () {
            $(this)
					.find('.dropdown-menu')
					.first()
					.stop(true, true)
					.delay(250)
					.fadeOut()
					.slideUp('slow')
        });
    }

    /*******************  PIE CHART  *******************/
    if ($('.pie-chart').length) {
        $('.pie-chart').easyPieChart({
            animate: 2000,
            barColor: "#01BAFD",
            trackColor: "#f5f5f5",
            scaleColor: false,
            lineWidth: 7,
            lineCap: "square",
        });
    }

    /*******************  SCROLL *******************/
    $('.navbar-nav').onePageNav({
        currentClass: 'active',
        filter: ':not(.exclude)',
    });

    /*******************  CAROUSEL  *******************/
    $("#carousel-testimonials").owlCarousel({
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });
    $("#carousel-testimonials").find('.owl-pagination').append('<div class="owl-page"></div>');

    /*******************  PRELOADER  *******************/
    $('#preloader').fadeOut('slow');
    $("header").sticky({ topSpacing: 0, wrapperClassName: 'stickyWrapper' });

    /*******************  REGISTER  *******************/
    $("#register").submit(function () {
        var elem = $(this);
        var urlTarget = $(this).attr("action");
        $.ajax({
            type: "POST",
            url: urlTarget,
            dataType: "html",
            data: $(this).serialize(),
            beforeSend: function () {
                elem.prepend("<div class='loading alert'>" + "<a class='close' data-dismiss='alert'>×</a>" + "Loading" + "</div>");
            },
            success: function (response) {
                elem.prepend(response);
                elem.find(".loading").hide();
                elem.find("input[type='text'],input[type='email'],textarea").val("");
            }
        });
        return false;
    });

    /*******************  TOOLTIPS  *******************/
    function changeTooltipColorTo(color) {
        $('.tooltip-inner').css('background-color', color)
        $('.tooltip.top .tooltip-arrow').css('border-top-color', color);
        $('.tooltip.right .tooltip-arrow').css('border-right-color', color);
        $('.tooltip.left .tooltip-arrow').css('border-left-color', color);
        $('.tooltip.bottom .tooltip-arrow').css('border-bottom-color', color);
    }
    $('.device a').tooltip({ placement: 'bottom' })
    $('.device a').hover(function () { changeTooltipColorTo('#01b9ff') });
    $('.social a').tooltip({ placement: 'top' })
    $('.social a').hover(function () { changeTooltipColorTo('#01b9ff') });
});
