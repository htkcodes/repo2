$('#criteria_name').focus();

$('#criteria_name').focusout(function() {
  'use strict';
  if (!$('#criteria_name').val()) {
    $('.uk-form-help-block').html('Please enter a criteria name');
    $('#criteria_name').focus();
    $('#get-save').attr('disabled', true);
    $(this).addClass('uk-form-danger');
  }
});

$('#criteria_name').on('keyup', function() {
  'use strict';
  $(this).removeClass('uk-form-danger');
  $('.uk-form-help-block').html('');
  $('#get-save').removeAttr('disabled');
});


$('#btn-reset').on('click', function() {
  'use strict';
  $('#builder-basic').queryBuilder('reset');
});


$('#btn-get').on('click', function() {
  'use strict';
  var result = $('#builder-basic').queryBuilder('getRules');

  if (!$.isEmptyObject(result)) {
    // empty
  }
});


$("#get-save").on('click', function() {
  'use strict';
  if ($('#builder-basic').queryBuilder('validate') == false) {
    return;
  } else {
    var dataFound=getQueryCount();

    if (dataFound === "ERROR") {
    // v for vague
      var vError=" <div class=\"uk-alert uk-alert-danger\" data-uk-alert>\n<a href=\"\" class=\"uk-alert-close uk-close\"></a>\n<p>Oops... An error occured,Please try again later</p>\n</div>";

      $(".errors").append(vError);
    } else if (dataFound === "NODATAFOUND") {
      var noCustomersFound=" <div class=\"uk-alert uk-alert-danger\" data-uk-alert>\n<a href=\"\" class=\"uk-alert-close uk-close\"></a>\n<p>Oops... No customers were found based on your criteria</p>\n</div>";

      $(".errors").append(noCustomersFound);
    } else {
      // Modal Trigger
      UIkit.modal.confirm(dataFound, function() {
        $('.errors').empty();
        var sqlRaw = $('#builder-basic').queryBuilder('getSQL', false, true);
        var newSql=sqlRaw.sql.replace(/%/g, '#');
        var replaceFirstBracket=newSql.replace(/(\(')/g, "(''");
        var replaceSecondBracket=replaceFirstBracket.replace(/('\))/g, "'')");
        var removedEscaped=replaceSecondBracket.replace(/(\\')/g, "'");
        var securedQuotes=removedEscaped.replace(/(='UNSECURED')|(= 'UNSECURED')/g, "= ''UNSECURED''");
        var removeNewLine = securedQuotes.replace(/(\r\n|\n|\r)/gm, " ");


        var criteriaName=$('#criteria_name').val();

        var username=$('#loginusername').val();
        var status="Pending";
        var tableName="CMS_EMAILCAMPAIGN_STRATEGY";
        var columns="STRATEGYNAME,RULEDEFINITION,MAKERID,STATUS";
var values="'"+criteriaName+"'"+","+"'"+removeNewLine+"'"+","+"'"+username+"'"+","+"'"+status+"'";
        var result= insertRecordTable(tableName,columns,values);
        if (result==="SUCCESS") {
          var vSuccess=" <div class=\"uk-alert uk-alert-success\" data-uk-alert>\n<a href=\"\" class=\"uk-alert-close uk-close\"></a>\n<p>Campaign was successfully added.</p>\n</div>";

          $('.errors').append(vSuccess);
        } else {
          var vError=" <div class=\"uk-alert uk-alert-danger\" data-uk-alert>\n<a href=\"\" class=\"uk-alert-close uk-close\"></a>\n<p>Oops...An error occured,please try again later or enter a different campaign name</p>\n</div>";

          $(".errors").append(vError);
        }
      }, {labels: {'Ok': 'Yes', 'Cancel': 'No'}, center: true});
    }
  }
});

