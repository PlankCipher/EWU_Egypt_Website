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
});