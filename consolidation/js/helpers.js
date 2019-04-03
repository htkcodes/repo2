function clearError()
{
    $(".errors").addClass("hidden");
}


/**
 * Displays Alert upon Error
 * @param {str} msg Message to display
 */
function errorAlert(msg) {
    $(".errors").removeClass("hidden");
    $(".errormsg").html(msg);
}

/**
 * Displays Success
 * @param {str} msg Message to display
 */
function successAlert(msg) {
    $(".success").removeClass("hidden");
    $(".sucessmsg").html(msg);
}