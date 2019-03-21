/**
 * Loads campaign name modal
 */
function loadModal() {
    $("#cname").modal({
        show:true,
        keyboard:false,
        backdrop: 'static'
    });
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
 * Displays Success
 * @param {str} msg Message to display
 */
function sucessAlert(msg) {
    $(".success").removeClass("hidden");
    $(".sucessmsg").html(msg);
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

   loadModal();

    $('#continue').click(function () {
       modalHandler(isValidateCName())
    })

    $('#builder-basic').on('keyup','input[type="number"]',function(){
        // numeral
        var string = numeral($(this).val()).format('0,0');

$(".m-t-10").removeClass("hide").find("span").html(string);

$(this).focusout(function(){
    $(".m-t-10").addClass("hide");
})


    })


//Resets Querybuilder
    $('#reset').on('click', function() {
        'use strict';
        $('#builder-basic').queryBuilder('reset');
      });

      $("#execute").on('click',function(){
         /*  if(localStorage.getItem("campaignName") == null)
          {
              errorAlert("No campaign name was entered! You'll be prompted to enter a campaign name in 5 seconds.");

              setTimeout(function(){
            clearError();
                  $("#cname").modal('show');
              },5000);
          }
          else{
              executeCampaign();
          } */
          executeCampaign();
      })

});

function clearError()
{
    $(".errors").addClass("hidden");
}
function modalHandler(isValidate,reInit)
{
   
if(isValidate)
{
   
        var campaignName = $("#campaign").val();
        $("#cname").modal('hide');
        localStorage.setItem('campaignName',campaignName);    
 
}

}

//Temp function remember to delete and use original
function getQueryCount()
{
    return "You will be reaching 400 customers. Are you sure u wanna continue"
}

function executeCampaign()
{
    if ($('#builder-basic').queryBuilder('validate') == false) {
        $('.qerrors').removeClass("hidden");
        return;
      } 
      else {
        var dataFound=getQueryCount();
    
        if (dataFound === "ERROR") {
       errorAlert("An error occured,Please try again later");
        } else if (dataFound === "NODATAFOUND") {
      errorAlert("No customers were found based on your criteria.Try changing your criteria");
        } else {
          // Modal Trigger
          

          $(".custCount").html(dataFound);

          $("#custCount").modal({
            show:true,
            keyboard:false,
            backdrop: 'static'
          });
          $(".yes").click(function(){
           insertEmailCampaign();
          })
        
        }
      }
}

function insertEmailCampaign()
{
    var sqlRaw = $('#builder-basic').queryBuilder('getSQL', false, true);
    var newSql=sqlRaw.sql.replace(/%/g, '#');
    var replaceFirstBracket=newSql.replace(/(\(')/g, "(''");
    var replaceSecondBracket=replaceFirstBracket.replace(/('\))/g, "'')");
    var removedEscaped=replaceSecondBracket.replace(/(\\')/g, "'");
    var securedQuotes=removedEscaped.replace(/(='UNSECURED')|(= 'UNSECURED')/g, "= ''UNSECURED''");
    var removeNewLine = securedQuotes.replace(/(\r\n|\n|\r)/gm, " ");


    var campaignName=localStorage.getItem("campaignName");

    var username=$('#loginusername').val();
    var status="Pending";
    var tableName="CMS_EMAILCAMPAIGN_STRATEGY";
    var columns="STRATEGYNAME,RULEDEFINITION,MAKERID,STATUS";
var values="'"+campaignName+"'"+","+"'"+removeNewLine+"'"+","+"'"+username+"'"+","+"'"+status+"'";
    var result= insertRecordTable(tableName,columns,values);
    if (result==="SUCCESS") {
 sucessAlert("Campaign was successfully to the email campaign queue.")
    } else {
     errorAlert("An error occured.please try again later or enter a different campaign name.");
    }
}