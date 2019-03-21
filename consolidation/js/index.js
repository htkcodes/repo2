/**
 * Loads campaign name modal
 */
function loadModal() {
    $("#cname").modal('show');
    $("input#campaign").focus();
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
 * Validates the campaign name;
 * @returns {boolean} True/False
 */
function isValidateCName() {
    var root = v8n().string();
    var empty=v8n().empty();
    var rootClass = $(".form-text.campaignName").addClass("danger-text");

    var campaignName = $("#campaign").val();


    var errors = [root.minLength(4).test(campaignName), root.maxLength(30).test(campaignName)];
    var isEmpty = empty.test(campaignName);

    for (var i = 0; i < errors.length; i++) {
        if (errors[1] == !1) {
            rootClass.html("Campaign name is too long. (30 Characters allowed.)");
            return !1;
        } else if (errors[0] == !1) {
            if(isEmpty == !0)
            {
                rootClass.html("Please enter a campaign name to continue.");
            }
            else{
                rootClass.html("Campaign name is too short.(It should not be less than 4 Characters.)")
            }
            
            return !1;
        }
    }


    return !0;

}

$(document).ready(function () {

   // loadModal();

    $('#continue').click(function () {
       modalHandler(isValidateCName())
    })

});

function modalHandler(isValidate)
{
if(isValidate == !0)
{
    var campaignName = $("#campaign").val();
    $("#cname").modal('hide');
    localStorage.setItem('campaignName',campaignName);
}

}