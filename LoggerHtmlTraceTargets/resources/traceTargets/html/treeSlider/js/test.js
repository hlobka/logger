(function ($) {

    $(document).ready(function () {
        $('body').click(function () {
            hideForgotPasswordDialog();
        });

        // stop the link and the form from closing
        $('#sign_in').click(function (e) {
            e.stopPropagation();
        });
        $('#login-form-wrapper, #forgotpw-form-wrapper').click(function (e) {
            e.stopPropagation();
        });
        // end

        // game page List games
        $('.but.more').click(function (e) {
            e.preventDefault();

            if ($(this).hasClass('is-open')) {
                var p = $('.games-screen');
                p.slideUp();
                $(this).removeClass('is-open');
            } else {
                $(".games-screen").slideDown();
                $(this).addClass('is-open');
            }
        });

        $('.scroll-pane').css('opacity', '0.9').jScrollPane( );
        $(".games-screen").css('top', '109px').hide();

        $('#s').keyup(function () {
            var valThis = $(this).val().toLowerCase();
            $('#games-wrapper >div').each(function () {
                var text = $(this).data('title').toLowerCase();
                (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();
            });
        });

        $('#sort-wrapper button').click(function (e) {
            $('#sort-wrapper button').removeClass('active');
            $(this).addClass('active');
            switch ($(this).data('type')) {
                case 1:
                    $('#games-wrapper >div').sortElements(function (a, b) {
                        return $(a).data('date') > $(b).data('date') ? 1 : -1;
                    });
                    break;
                case 2:
                    $('#games-wrapper >div').sortElements(function (a, b) {
                        return $(a).data('date') < $(b).data('date') ? 1 : -1;
                    });
                    break;
                default:
                    $('#games-wrapper >div').sortElements(function (a, b) {
                        return $(a).data('title') > $(b).data('title') ? 1 : -1;
                    });
            }
        });

        // header top login
        $("#login-btn").click(function (e) {
            e.preventDefault();
            $('#login-link').removeClass('active');
            if ($('#forgotpw-form-wrapper').is(':hidden')) {
                $('#login-link').addClass('active');
                $("#login-form-wrapper").slideToggle('fast');
                $(".register-now-link").show();
                $(".play-now-link").hide();
            }
        });

        initForgotPasswordForm();

        // home page open register mail wrapper
        $("#register-mail").click(function (e) {
            e.preventDefault();
            if ($("#login-form-wrapper").is(":hidden")) {
                $("#login-mail").slideToggle('fast');
            }
            $("#login-form-wrapper").slideUp('fast');
            $(".register-now-link").hide();
            $(".play-now-link").show();
            $('#login-link').removeClass('active');
            if ($('#forgotpw-form-wrapper').is(':visible')) {
                $("#forgotpw-form-wrapper").slideUp('fast');
            }
            $("#register-wrapper").slideToggle('fast');
        });
        $("#play-mail").click(function (e) {
            e.preventDefault();
            $(".register-now-link").show();
            $(".play-now-link").hide();
            $("#login-link").addClass('active');
            $("#register-wrapper").slideToggle('fast');
            $("#login-form-wrapper").slideToggle('fast');
        });

        $("#login-mail-link").click(function (e) {
            e.preventDefault();
            $("#login-mail").slideToggle('fast');
            $("#login-form-wrapper").slideToggle('fast');
            $(".register-now-link").show();
            $(".play-now-link").hide();
            $('#login-link').addClass('active');
            if ($("#forgotpw-form-wrapper").is(":visible")) {
                $("#forgotpw-form-wrapper").slideUp('fast');
            }
        });

        $('.cancel', "#settings_modal").click(function () {
            $('#settings-general-screen').show();
            $('#settings-email-screen').hide();
            $('#settings-password-screen').hide();
        });
        // change email
        $('#change-mail-submit').click(function (e) {
            change_email();
        });

        // change password
        $('#change-password-submit').click(function (e) {
            change_password();
        });
        $("#change_password_old, #change_password_new, #change_password_retype, #change_email_password, #change_email_new, #captcha, #reset_pass1, #reset_pass2").focus(function () {
            $(this).parent().find('span.error, span.success').remove();
            $('.status').html('');
        });

        // forgot password
        if ($('#password_reset_form').length > 0) {
            $('#password_reset_form').submit(function (e) {
                e.preventDefault();
                if ($('#rest_wp-submit').val() == 'Close' ) {
                    $('#forgotpw-form-wrapper').hide();
                    $('#login-link').removeClass('active');
                    $('#rest_wp-submit').val('Send');
                    return false;
                }

                var form = $('#password_reset_form'),
                    username = form.find('#rest_email'),
                    security = $('#pass_reset_security');
                if ('' == username.val() || username.val() == username.attr('placeholder') || !isValidEmailAddress(username.val())) {
                    showErrorTip(username, username.data('error-text'));
                    username.focus(function () {
                        $(this).parent().find('span.error, span.success').remove();
                    });
                    $('#forgotpw-form-wrapper').hide();
                    $('#login-link').removeClass('active');
                    return false;
                }
                // Perform AJAX login on form submit
                $('#password_reset_form p.status').show().text(sm.loadingmessage);

                sendForgotPasswordRequest();
                e.preventDefault();
            });
        }

        //reset password
        $('#pass_reset_form').submit(function (e) {
            e.preventDefault();
            var newpass = $('#reset_pass1'),
                newpass2 = $('#reset_pass2');

            if ('' == newpass.val() || newpass.val() == newpass.attr('placeholder')) {
                showErrorTip(newpass, newpass.data('error-text'));
                return false;
            } else if (newpass.val().length < 6) {
                newpass.after('<span class="error">' + newpass.data('error-length-text') + '</span>');
                return false;
            } else if (newpass.val() != newpass2.val()) {
                showErrorTip(newpass2, newpass.data('error-match-text'));
                return false;
            }
            $(this).find('input').prop("disabled", true);
            resetPassword();
        });

        $('input', '#settings_modal').focus(function () {
            $(this).parent().find('span.error, span.success').remove();
            $('.status').html('');
        });

        loadPlaceHoldersForIE();
        handleErrorTooltips();

        // login action
        if ($('#loginform-custom').length > 0) {
            var form = $('#loginform-custom'),
                username = $('#username'),
                password = $('#pass'),
                security = $('#security');

            username.focus(function () {
                $(this).parent().find('span.error, span.success').remove();
                $('.status').html('');
            });
            password.focus(function () {
                $(this).parent().find('span.error, span.success').remove();
                $('.status').html('');
            });

            form.submit(function (e) {
                e.preventDefault();

                if ('' == username.val() || username.val() == username.attr('placeholder') || !isValidEmailAddress(username.val())) {
                    showErrorTip(username, username.data('error-text'));
                    return false;
                } else if ('' == password.val() || password.val() == password.attr('placeholder')) {
                    showErrorTip(password, password.data('error-text'));
                    return false;
                }
                // Perform AJAX login on form submit
                $('#loginform-custom p.status').show().text(sm.loadingmessage);
                login();
            });
        }

        // handle register form:
        var form = $('#user-register-form');
        if (form.length > 0) {
            var email = form.find('#email'),
                pass = form.find('#pass1'),
                pass2 = form.find('#pass2'),
                tou = form.find('#tou');

            email.focus(function () {
                $(this).parent().find('span.error, span.success').remove();
            });
            pass.focus(function () {
                $(this).parent().find('span.error, span.success').remove();
            });
            pass2.focus(function () {
                $(this).parent().find('span.error, span.success').remove();
            });
            var submit = form.find('#wp-submit'),
                success = true;
            submit.click(function (e) {
                success = true;
                e.preventDefault();
                $('span.error, span.success').remove();

                if ('' == email.val() || !isValidEmailAddress(email.val())) {
                    email.addClass('error');
                    showErrorTip(email, email.data('error-text'));
                    success = false;
                }

                if ('' == pass.val() || pass.val() == pass.attr('placehollder')) {
                    pass.addClass('error');
                    showErrorTip(pass, pass.data('error-text'));
                    success = false;
                } else if (pass.val() != pass2.val()) {
                    pass2.addClass('error');
                    showErrorTip(pass2, pass.data('error-match-text'));
                    success = false;
                } else if (pass.val().length < 6) {
                    pass2.addClass('error');
                    showErrorTip(pass2, pass.data('error-length-text'));
                    success = false;
                }

                if (!tou.is(':checked')) {
                    tou.addClass('error');
                    showErrorTip(tou, tou.data('error-text'));
                    success = false;
                }

                if (success) {
                    $('<p id="ajax_wait_msg"><span class="ajax-loader"></span>' + sm.loadingmessage + '</p>').insertAfter(form);
                    $(this).prop("disabled", true);
                    //  form.hide();
                    signUp();
                }
            });

            return success;
        }
    });

})(jQuery);

// valid email function
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}


/**
 * jQuery.fn.sortElements
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode;
 *   })
 *
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function () {

    var sort = [].sort;

    return function (comparator, getSortable) {

        getSortable = getSortable || function () {
                return this;
            };

        var placements = this.map(function () {

            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
                // Since the element itself will change position, we have
                // to have some way of storing its original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );

            return function () {

                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }

                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);

            };

        });

        return sort.call(this, comparator).each(function (i) {
            placements[i].call(getSortable.call(this));
        });

    };

})();

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    var cookie = [cname, '=', cvalue, ';' + expires + '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    document.cookie = cookie;

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}
function deleteCookie(cname) {
    setCookie(cname, '', -365);
}

function showErrorTip(parentEl, errText) {
    var errEl = $('<span class="error">' + errText + '</span>').click(function (e) {
        e.preventDefault();
        $(this).parent().find('input').focus();
        $(this).remove();
    });
    parentEl.after(errEl);
}

function showSuccessTip(parentEl, successText) {
    var successEl = $('<span class="success">' + successText + '</span>').click(function (e) {
        e.preventDefault();
        $(this).parent().find('input').focus();
        $(this).remove();
    });
    parentEl.after(successEl);
}

function loadPlaceHoldersForIE() {
    //only for IE
    var agent = navigator.userAgent.match(/MSIE ([0-9.]{3})/);
    if (agent === null || (!!agent && !!agent[1] && parseInt(agent[1]) > 9)) {
        return;
    }

    //create placeholders
    $('input').each(function () {
        var placeHolder = $(this).attr("placeholder");
        if (placeHolder && !$(this).val()) {
            $(this).after('<span class="placeHolder">' + placeHolder + '</span>');
            $(this).parent().css("position", "relative");
        }
    });

    //on focus action
    $('input').focus(function () {
        var placeholder = $(this).attr("placeholder");
        if (placeholder) {
            $(this).parent().find(".placeHolder").hide();
        }
    });

    //on bind action
    $('input').focusout(function () {
        var placeholder = $(this).attr("placeholder");
        if (placeholder && !$(this).val()) {
            $(this).parent().find(".placeHolder").show();
        }
    });

    //emulate focus when clicks on placeholder
    $(".placeHolder").click(function () {
        $(this).prev().focus();
    });
}

function handleErrorTooltips() {
    $('#change_email_div input').focus(function () { //TODO: add to all inputs
        $(this).parent().find('span.error, span.success').remove();
    });
}

function initForgotPasswordForm() {
    //show form
    $("#forgot-password-link").click(function (e) {
        e.preventDefault();
        $("#login-form-wrapper").slideUp();
        $(".register-now-link").show();
        $(".play-now-link").hide();
        $("#login-mail").slideDown('fast');
        $("#forgotpw-form-wrapper").slideDown();
        $('#div_overlay').fadeIn(500);
    });

    //close form
    $("#forgot-password-link-back").click(function () {
        $("#forgotpw-form-wrapper").slideUp();
        $("#login-mail").slideUp('fast');
        $("#login-form-wrapper").slideDown();
        $(".register-now-link").show();
        $("#div_overlay, .play-now-link").hide();
    });
}

/**
 * converts query string string to object
 * @param paramsString - optional string with get parameters
 * @param excludedParams - optional array of parameters which must be excluded
 * @returns object
 */
function convertQueryStringToObj(paramsString, excludedParams){
    var paramsArr = paramsString.split("&"),
        pair,
        paramsObj = {};
    for(i in paramsArr){//convert param's array to object where fields are get param's names and values are get param's values
        pair = paramsArr[i].split("=");
        if($.inArray(pair[0], excludedParams) >= 0) {
            continue;
        }
        paramsObj[pair[0]] = pair[1];
    }
    return paramsObj;
}

/**
 * makes valid well formed query string from object
 * @param obj - input object
 * @param excludedParams - optional array of parameters which must be excluded from result query string
 * @returns {string} - query string
 */
function buildQueryStringFromObj(obj, excludedParams){
    var queryString = '?';
    for(var i in obj){
        if($.inArray(i, excludedParams) >= 0){
            continue;
        }
        queryString += i + "=" + obj[i] + "&";
    }
    queryString = queryString.slice(0, -1);//remove last symbol "&";
    return queryString;
}