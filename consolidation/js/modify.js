$(document).ready(function() {
  "use strict";
  var obj = FetchSelectQryRecords('*', 'CMS_EMAILCAMPAIGN_STRATEGY', 'CAMPAIGN_ID>0', '');
  if (obj[0] === "ERROR") {
    if (localStorage.getItem('errors') === null) {
      localStorage.setItem("errors", 1);
      $("#error").modal({
        show:true,
        keyboard:false,
        backdrop:'static'
      });
      $(".m-errormsg").html("Please login and try again");
    } else {
      $("#error").modal({
        show:true,
        keyboard:false,
        backdrop:'static'
      });
      $(".m-errormsg").html("There seems to be an issue with the database.Please try again later.");
    }
  } else if (obj[0]==="NODATAFOUND") {
    $("#error").modal({
      show:true,
      keyboard:false,
      backdrop:'static'
    });

    $(".m-errormsg").html("No campaigns were made,Please make a campaign to use this feature.");
  } else {
    if (localStorage.getItem('errors') !== null) {
      localStorage.removeItem('errors');
    }
    var options='';
    Object.keys(obj).forEach(function(key) {
      var rules=obj[key].RULEDEFINITION;
      var newSql=rules.replace(/#/g, '%');

      options+='<option aria-id="'+obj[key].CAMPAIGN_ID+'" value="'+newSql+'">'+obj[key].STRATEGYNAME+'</option>';
      if (key == 0 ) {
        $('#builder-basic').queryBuilder('setRulesFromSQL', newSql);
      }
    });


    $('select#type').html(options);


    $('#builder-basic').queryBuilder('setRulesFromSQL', $('select#type').eq(0).val());


    $('select#type').on('change', function() {
      var rule=this.value;
      $('#builder-basic').queryBuilder('setRulesFromSQL', rule);
    });


    $("#execute").on('click', function() {
      'use strict';
      if ($('#builder-basic').queryBuilder('validate') === false) {
        return;
      } else {
        var dataFound=getQueryCount();

        if (dataFound === "ERROR") {
          errorAlert("An error occured,Please try again later");
        } else if (dataFound === "NODATAFOUND") {
          errorAlert("No customers were found based on your criteria.Try changing your criteria");
        } else {


          $(".custCount").html(dataFound);


          $("#custCount").modal({
            show:true,
            keyboard:false,
            backdrop: 'static'
          });


          $(".yes").click(function(){
           modifyEmailCampaign();
           })

        
        }
      }
    });
  }
});


function modifyEmailCampaign()
{
      var sqlRaw = $('#builder-basic').queryBuilder('getSQL', false, true);
            var newSql=sqlRaw.sql.replace(/%/g, '#');
            var replaceFirstBracket=newSql.replace(/(\(')/g, "(''");
            var replaceSecondBracket=replaceFirstBracket.replace(/('\))/g, "'')");
            var removedEscaped=replaceSecondBracket.replace(/(\\')/g, "'");
            var securedQuotes=removedEscaped.replace(/(='UNSECURED')|(= 'UNSECURED')/g, "= ''UNSECURED''");
            var removeNewLine = securedQuotes.replace(/(\r\n|\n|\r)/gm, " ");
            var id=$('select#type').find(":selected").attr('aria-id');
            var tableName="CMS_EMAILCAMPAIGN_STRATEGY";
            var columnName="RULEDEFINITION";
            var whereClause="CAMPAIGN_ID="+id;
            var values="'"+removeNewLine+"'";
            
            var update=updateLAC(tableName,columnName,values,whereClause);


            if ($.isEmptyObject(update)) {
              successAlert("Campaign was successfully to the email campaign queue.")
            } else {
              errorAlert("An error occured.please try again later or enter a different campaign name.");
            }
}
