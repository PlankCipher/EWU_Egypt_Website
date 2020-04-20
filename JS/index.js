$(document).ready(function () {
    "use strict";

    changeCurrent();

    $(".moverlay i").click(function () {
        $(".moverlay").css("display", "none");
    });

    var urlParams;
    (window.onpopstate = function () {
        var match,
            pl = /\+/g, // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) {
                return decodeURIComponent(s.replace(pl, " "));
            },
            query = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query)) {
            urlParams[decode(match[1])] = decode(match[2]);
        }
    })();

    if (urlParams["m"]) {
        $(".moverlay").css("display", "block");
        $(".moverlay p").text(urlParams["m"]);
    }

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

    $("nav ul li a").on("click", function () {
        var navBarHeight = $("nav").height();

        $("html, body").animate({
            scrollTop: $("#" + $(this).attr("data-scroll-to")).offset().top - navBarHeight
        }, 1000);

        $("nav i").removeClass("fa-times");
        $("nav i").addClass("fa-bars");
        $("nav ul").removeClass("displayed");
    });

    $(window).on("scroll", function () {
        changeCurrent();
    });

    function changeCurrent() {
        var links = $("nav ul li").children("a");
        links = Array.prototype.reverse.call(links);

        var stop = Math.round($(window).scrollTop());

        for (var link of links) {
            $(link).removeClass("current");
        }

        for (var link of links) {
            if ($("#" + $(link).attr("data-scroll-to")).length > 0) {
                var scrollToOffset = $("#" + $(link).attr("data-scroll-to")).offset().top;

                if (stop + ($(window).height() / 2) > scrollToOffset) {
                    $(link).addClass("current");
                    break;
                }
            }
        }
    }

    $("#email").on("change", function () {
        var email = $("#email").val();
        email = encodeURIComponent(email);
        $("#custom").val(email);
    });
});