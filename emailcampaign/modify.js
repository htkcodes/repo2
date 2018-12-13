


$(document).ready(function(){
    var obj = FetchSelectQryRecords('ACCOUNT_NUMBER','CMS_EMAILCAMPAIGN_STRATEGY','','');
var options='';
Object.keys(obj).forEach(function(key) {
options+='<option value="'+obj[key]+'">'+obj[key]+'</option>';
    console.log(key, obj[key]);
});

$('select.criteria').html(options);



$('select.criteria').on('change', function() {
$('#builder-basic').queryBuilder('setRulesFromSQL', this.value);
});
})
