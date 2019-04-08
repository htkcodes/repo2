$(document).ready(function(){


      /**
   * Clears Error Message
   */
  function clearError() {
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



    $(".startdate").datetimepicker();  
    $(".enddate").datetimepicker({
        useCurrent:false
    })

    $(".startdate").on("dp.change",function(e){
        $(".enddate").data("DateTimePicker").minDate(e.date);
    })

    $(".enddate").on("dp.change",function(e){
        $(".startdate").data("DateTimePicker").maxDate(e.date);
    })




    /**
 * Validates date input
 * @return {bool} true/false
 */
  function checkDate() {
    var startDate=$(".startdate").val();
    var endDate=$(".enddate").val();

    if (startDate == "" ) {
      errorAlert("Start Date should not be empty");
      return !1;
    } else if (endDate == "") {
      errorAlert("End Date should not be empty");
      return !1;
    }

    return !0;
  }


    /**
 * Validates checkbox input
 * @return {bool}
 */
function checkSelect() {
    var selected=$("#ctype").find(":selected").val();

    if (selected == "CARDS" || selected == "LOANS") {
      return !0;
    } else {
      errorAlert("Please select a campaign type");
      return !1;
    }
  }



  $("#submit").click(function() {
    clearError();
    if (checkDate() && checkSelect()) {
        $('#myTable').DataTable( {
            "ajax": "data/objects.txt",
            "dom": 'Bfrtip',
            "paging": true,
            "columns": [
              {"data": "name"},
              {"data": "position"},
              {"data": "office"},
              {"data": "extn"},
            ],
            "initComplete":function(settings,json){
             
        $(".card").removeClass("hidden")
        $("#myTable").css("width","100%");
        $('#myTable').DataTable().columns.adjust().draw();

         
            }
          } );
         
    } else {
    //  $.preloader.stop();

    

    }
  });


})