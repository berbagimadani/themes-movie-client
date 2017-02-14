
var base_url = "//" + document.domain + "/",
    is_login = !1;
$(document).ready(function () {
    function e() {
        $(this).find(".sub-container").css("display", "block")
    }

    function t() {
        $(this).find(".sub-container").css("display", "none")
    }

    function a() {
        var e = Math.random().toString(36).substring(0, 8);
        return $.cookie("search_token", e, {
            path: "/"
        }), e
    }
    if ( $("#search a.box-title").click(function () {
            $("#search .box").toggleClass("active")
        }), $("#toggle-xsidebar").click(function () {
            $("#xsidebar").toggleClass("active"), $("#toggle-xsidebar").toggleClass("active")
        }), $(".mobile-menu").click(function () {
            $("#menu,.mobile-menu").toggleClass("active"), $("#search, .mobile-search").removeClass("active")
        }), $(".mobile-search").click(function () {
            $("#search,.mobile-search").toggleClass("active"), $("#menu, .mobile-menu").removeClass("active")
        }), $(".filter-toggle").click(function () {
            $("#filter").toggleClass("active"), $(".filter-toggle").toggleClass("active")
        }), $(".bp-btn-light").click(function () {
            $(".bp-btn-light, #overlay, #media-player, #main").toggleClass("active")
        }), $("#overlay").click(function () {
            $(".bp-btn-light, #overlay, #media-player, #main").removeClass("active")
        }), $(".bp-btn-auto").click(function () {
            $(".bp-btn-auto").toggleClass("active")
        }), $("#toggle, .cac-close").click(function () {
            $("#comment").toggleClass("active")
        }), $("#toggle-login").click(function () {
            $("#tab-login").click()
        }), $("#toggle-register").click(function () {
            $("#tab-register").click()
        }), $(".top-menu> li").bind("mouseover", e), $(".top-menu> li").bind("mouseout", t), $(function () {
            function e() {
                var e = $(this),
                    t = e.find(".modal-dialog");
                e.css("display", "block"), t.css("margin-top", Math.max(0, ($(window).height() - t.height()) / 2))
            }
            $(".modal").on("show.bs.modal", e), $(window).on("resize", function () {
                $(".modal:visible").each(e)
            })
        }), $("#slider").length > 0) {
        new Swiper("#slider", {
            pagination: ".swiper-pagination",
            paginationClickable: !0,
            loop: !0,
            autoplay: 4e3
        })
    }
    $(".xlist, .pw-comment .content").perfectScrollbar(), $("#pop-trailer").on("shown.bs.modal", function () {
        $("#iframe-trailer").attr("src", movie.trailer)
    }), $("#pop-trailer").on("hide.bs.modal", function () {
        $("#iframe-trailer").attr("src", "")
    });
    var i = !0;
    $(".search-suggest").mouseover(function () {
        i = !1
    }), $(".search-suggest").mouseout(function () {
        i = !0
    }), $("input[name=keyword]").keyup(function () {
        var e = $(this).val(),
            t = a(),
            i = md5(e + t);
        e.trim().length > 2 ? $.ajax({
            url: base_url + "ajax/movie_suggest_search.html",
            type: "POST",
            dataType: "json",
            data: {
                keyword: e,
                hash: i
            },
            success: function (e) {
                $(".search-suggest").html(e.content), "" !== e.content.trim() ? $(".search-suggest").show() : $(".search-suggest").hide()
            }
        }) : $(".search-suggest").hide()
    }), $("input[name=keyword]").blur(function () {
        i && $(".search-suggest").hide()
    }), $("input[name=keyword]").focus(function () {
        "" !== $(".search-suggest").html() && $(".search-suggest").show()
    }), $("input[name=keyword]").keypress(function (e) {
        13 == e.which && searchMovie()
    }), $("#login-form").submit(function (e) {
        $("#login-submit").prop("disabled", !0), $("#login-loading").show();
        var t = $(this).serializeArray();
        $.ajax({
            url: base_url + "ajax/user_login.html",
            type: "POST",
            data: t,
            dataType: "json",
            success: function (e) {
                0 == e.status && ($("#error-message").show(), $("#error-message").text(e.message), $("#login-submit").removeAttr("disabled"), $("#login-loading").hide()), 1 == e.status && window.location.reload()
            }
        }), e.preventDefault()
    }), $("#register-form").submit(function (e) {
        $("#register-submit").prop("disabled", !0), $("#register-loading").show(), $(".error-message").hide();
        var t = $(this).serializeArray();
        $.ajax({
            url: base_url + "ajax/user_register.html",
            type: "POST",
            data: t,
            dataType: "json",
            success: function (e) {
                if ($(".error-message").hide(), 0 == e.status) {
                    for (var t in e.messages) $("#error-" + t).show(), $("#error-" + t).text(e.messages[t]);
                    $("#register-submit").removeAttr("disabled"), $("#register-loading").hide()
                }
                1 == e.status && window.location.reload()
            }
        }), e.preventDefault()
    }), $("#request-form").submit(function (e) {
        $("#request-submit").prop("disabled", !0), $("#request-loading").show();
        var t = $(this).serializeArray();
        $.ajax({
            url: base_url + "ajax/user_request.html",
            type: "POST",
            data: t,
            dataType: "json",
            success: function (e) {
                1 == e.status && ($("#message-success").show(), setTimeout(function () {
                    $("#message-success").hide()
                }, 5e3), document.getElementById("request-form").reset()), $("#request-submit").removeAttr("disabled"), $("#request-loading").hide()
            }
        }), e.preventDefault()
    }), $("#profile-form").submit(function (e) {
        $("#btn-update").prop("disabled", !0), $("#submit-loading").show();
        var t = new FormData(this);
        $.ajax({
            url: base_url + "ajax/user_update.html",
            type: "POST",
            data: t,
            dataType: "json",
            mimeType: "multipart/form-data",
            contentType: !1,
            processData: !1,
            cache: !1,
            success: function (e) {
                if ($(".error-message").hide(), 0 == e.status) {
                    for (var t in e.messages) $("#error-" + t).show(), $("#error-" + t).text(e.messages[t]);
                    $("#btn-update").removeAttr("disabled"), $("#submit-loading").hide()
                }
                1 == e.status && window.location.reload()
            }
        }), e.preventDefault()
    }), $("#forgot-form").submit(function (e) {
        $("#forgot-form").prop("disabled", !0);
        var t = $(this).serializeArray();
        $.ajax({
            url: base_url + "ajax/user_forgot",
            type: "POST",
            data: t,
            dataType: "json",
            success: function (e) {
                0 == e.status && ($("#forgot-error-message").show(), $("#forgot-error-message").text(e.message)), 1 == e.status && ($("#forgot-success-message").show(), $("#forgot-success-message").text(e.message)), $("#forgot-submit").removeAttr("disabled")
            }
        }), e.preventDefault()
    })
});
