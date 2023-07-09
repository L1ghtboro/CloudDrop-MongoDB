$(document).ready(function () {


    $(".goToSignUpAnim").click(function () {
        $(".form-signin").fadeOut(300, function () {
            $(".form-signup").fadeIn(300);
        });
        $(".signin-active").removeClass("signin-active").addClass("signin-inactive");
        $(".signup-inactive").removeClass("signup-inactive").addClass("signup-active");
    });

    $(".goToSignInAnim").click(function () {
        $(".form-signup").fadeOut(300, function () {
            $(".form-signin").fadeIn(300);
        });
        $(".signup-active").removeClass("signup-active").addClass("signup-inactive");
        $(".signin-inactive").removeClass("signin-inactive").addClass("signin-active");
    });
});






