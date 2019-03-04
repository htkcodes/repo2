$(document).ready(function(){
  
    $(".startdate").datepicker({
        autoclose: true,
    }).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('.enddate').datepicker('setStartDate', minDate);
    });
    
    $(".enddate").datepicker()
        .on('changeDate', function (selected) {
            var minDate = new Date(selected.date.valueOf());
            $('.startdate').datepicker('setEndDate', minDate);
        });





        $('#myTable').DataTable( {
            "ajax": "data/objects.txt",
            "columns": [
                { "data": "name" },
                { "data": "position" },
                { "data": "office" },
                { "data": "extn" },
                { "data": "start_date" },
                { "data": "salary" }
            ]
        } );


        $("#submit").click(function(){
            var count=$("#count").val();

            if(count > 5000)
            {
                $(".errors").removeClass("hidden");
                $(".errormsg").html("Count should be equal or less than 5000");
            }
        })
});