$(document).ready(function () {
    $('.portfolio-link').on('click', function () {
        $('.flip-box-back').css('opacity', '1');
        $('.flip-box-inner').css('transform', 'rotateX(180deg)');
    });
    $('.about-link').on('click', function () {
        $('.flip-box-back').css('opacity', '1');
        $('.flip-box-inner').css('transform', 'rotateX(360deg)');

    });
    $('.contact-link').on('click', function () {
        $('.flip-box-inner').css('transform', 'rotateX(-90deg)');
        $('.flip-box-back').delay('1000').queue(function (next) {
            $(this).css('opacity', '0').next();
        });
    });
});