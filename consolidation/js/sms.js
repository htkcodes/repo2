$(document).ready(function(){
    $(".startdate").datepicker({
        autoclose: true,
        format: "dd-M-yy",
      }).on('changeDate', function(selected) {
        var minDate = new Date(selected.date.valueOf());
        $('.enddate').datepicker('setStartDate', minDate);
      });
    
      $(".enddate").datepicker({
        format: "dd-M-yy",
      })
          .on('changeDate', function(selected) {
            var minDate = new Date(selected.date.valueOf());
            $('.startdate').datepicker('setEndDate', minDate);
          });
})