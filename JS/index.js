$(document).ready(function () {
    "use strict";

    // Change the current link on page load
    changeCurrent();

    // Close the message box on clicking the X "times" icon
    $(".moverlay i").click(function () {
        $(".moverlay").css("display", "none");
    });

    var urlParams;
    (window.onpopstate = function () {
        var match,
            pl = /\+/g, // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) {
                return decodeURIComponent(s.replace(pl, " ")); // Decode the URL after replacing "+"s with spaces
            },
            query = window.location.search.substring(1); // Get the query string from the URL

        urlParams = {};
        // Put query strings decoded into the urlParams object
        while (match = search.exec(query)) {
            urlParams[decode(match[1])] = decode(decode(match[2]));
        }
    })();
    // Display message from URL, if found, in the message box
    if (urlParams["m"]) {
        $(".moverlay").css("display", "block");
        $(".moverlay p").text(urlParams["m"]);
    }

    var togglerBtn = $("nav i");
    togglerBtn.click(function () {
        // Change the icon of the nav menu togller
        // button on click
        if (togglerBtn.hasClass("fa-bars")) {
            togglerBtn.removeClass("fa-bars");
            togglerBtn.addClass("fa-times");
        } else {
            togglerBtn.removeClass("fa-times");
            togglerBtn.addClass("fa-bars");
        }
        // And display the nav menu
        $("nav ul").toggleClass("displayed");
    });

    // Scroll with animation to the target
    // section on clicking links from nav bar
    $("nav ul li a").on("click", function () {
        var navBarHeight = $("nav").height();

        // The "data-scroll-to" attribute contains
        // the id of the target section to which
        // we should scroll upon clicking its link
        // from nav bar
        $("html, body").animate({
            scrollTop: $("#" + $(this).attr("data-scroll-to")).offset().top - navBarHeight
        }, 1000);

        // Change the icon of nav menu toggler button
        // back to bars and close the menu
        $("nav i").removeClass("fa-times");
        $("nav i").addClass("fa-bars");
        $("nav ul").removeClass("displayed");
    });

    $(window).on("scroll", function () {
        // Change the current link on scroll
        changeCurrent();
    });

    function changeCurrent() {
        var links = $("nav ul li").children("a");
        links = Array.prototype.reverse.call(links);

        // Get the pixel at top of screen
        var stop = Math.round($(window).scrollTop());

        // Iterate over the links in nav bar
        // reversely and remove the "current"
        // class from them, to avoid marking
        // more than one link as current
        for (var link of links) {
            $(link).removeClass("current");
        }

        // For every link
        for (var link of links) {
            // Check if the element targetted by this
            // link is rendered or not
            if ($("#" + $(link).attr("data-scroll-to")).length > 0) {
                // Get the offset of this target element
                // from the top of screen
                var scrollToOffset = $("#" + $(link).attr("data-scroll-to")).offset().top;

                // If the offset is less than half of the
                // viewed screen
                if (stop + ($(window).height() / 2) > scrollToOffset) {
                    // Mark this link as current
                    $(link).addClass("current");
                    // Break to avoid marking more than
                    // one link as current
                    break;
                }
            }
        }
    }

    // Set the value of the "custom" input
    // in the ticket form to be the email
    // encoded
    $("#email").on("input", function () {
        var email = $("#email").val();
        email = encodeURIComponent(email);
        $("#custom").val(email);
    });
});