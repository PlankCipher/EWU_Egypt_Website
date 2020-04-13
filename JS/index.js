$(document).ready(function () {
    "use strict";

    var togglerBtn = $("nav i");
    togglerBtn.click(function () {
        if (togglerBtn.hasClass("fa-bars")) {
            togglerBtn.removeClass("fa-bars");
            togglerBtn.addClass("fa-times");
        } else {
            togglerBtn.removeClass("fa-times");
            togglerBtn.addClass("fa-bars");
        }
        $("nav ul").toggleClass("displayed");
    });

    $(window).on("scroll", function () {
        var links = $("nav ul li").children("a");

        var stop = Math.round($(window).scrollTop());

        for (var link of links) {
            $(link).removeClass("current");
            var scrollToOffset = $("#" + $(link).attr("data-scroll-to")).offset().top;

            if (stop + ($(window).height() / 2) > scrollToOffset) {
                $(link).addClass("current");
                break;
            }
        }
    });

    $("nav ul li a").on("click", function () {
        $("html, body").animate({
            scrollTop: $("#" + $(this).attr("data-scroll-to")).offset().top
        }, 1500);
    });
});