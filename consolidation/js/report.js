$(document).ready(function(){
   $("#filter").on('click',function(){
    $("#cname").modal('show');
   })
   $("#cname").modal('show');

   var resultcodes=[{
    "id": "Open-architected"
  }, {
    "id": "Open-source"
  }, {
    "id": "methodical"
  }, {
    "id": "Up-sized"
  }, {
    "id": "Networked"
  }, {
    "id": "Balanced"
  }, {
    "id": "tangible"
  }, {
    "id": "pricing structure"
  }, {
    "id": "firmware"
  }, {
    "id": "middleware"
  }, {
    "id": "contextually-based"
  }]

  var resultArray=Object.keys(resultcodes).map(function(key) {
    return resultcodes[key].id.toUpperCase();
  });

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var sortedResultCode = _toConsumableArray(resultArray).sort();





   $('#builder-basic').queryBuilder({
    plugins: ['bt-tooltip-errors'],
    filters: [{
      id: ' CI_CURRENTBAL',
      label: 'Current Balance',
      type: 'integer',
      input: 'number',
      operators: ['equal', 'not_equal', 'greater', 'greater_or_equal', 'between',
        'not_between', 'less', 'less_or_equal',
      ],
    },
    {
      id: ' UPPER(ci_occupation)',
      label: 'Occupation',
      type: 'integer',
      input: 'select',
      values: {
        'DOCTOR': 'DOCTOR',
        'TEACHER': 'TEACHER',
        'FIRE': 'FIRE',
        'SOLDIER': 'SOLDIER',
        'LAWYER': 'LAWYER',
        'HOUSEKEEPER': 'HOUSEKEEPER',
        'CHEF': 'CHEF',
        'WAITRESS': 'WAITRESS',
        'SUPERVISOR': 'SUPERVISOR',
      },
      operators: ['contains', 'not_contains'],
    }, {
      id: ' UPPER(RESULTCODE)',
      label: 'Result Code',
      type: 'integer',
      input: 'select',
      values: sortedResultCode,
      operators: ['contains', 'not_contains'],
    },
    {
      id: 'CI_NATUREOFADVANCE',
      label: 'Nature of Advance',
      type: 'integer',
      input: 'select',
      values: {
        'SECURED': 'SECURED',
        'UNSECURED': 'UNSECURED',
      },
      operators: ['equal', 'not_equal'],
    },
    {
      id: 'CI_SOLID',
      label: 'SOL ID',
      type: 'string',
      input: 'text',
      validation: {
        format: /^\d{3}?$/,
        messages: {
          format: 'Only 3 Digits are allowed.',
        },
      },
      operators: ['contains', 'not_contains'],
    },
    {
      id: 'CI_DPD',
      label: 'Days Past Due',
      type: 'integer',
      input: 'number',
      operators: ['equal', 'not_equal', 'greater', 'greater_or_equal', 'between', 'not_between', 'less', 'less_or_equal'],
    },
    {
      id: 'ACCOUNTTYPE',
      label: 'Product Type',
      type: 'integer',
      input: 'select',
      values: {
        'CARD': 'CARD',
        'LOAN': 'LOAN',
      },
      operators: ['contains', 'not_contains'],
    },
    {
      id: 'ACCSTATUS',
      label: 'Account Status',
      type: 'integer',
      input: 'select',
      values: [
        'D015',
        'D030',
        'D060',
        'D090',
        'WOFF',
        'BLBD',
      ],
      operators: ['contains', 'not_contains'],
    },
    {
      id: 'CI_PAYMENTDUEDATE',
      label: 'Payment Due Date',
      type: 'date',
      validation: {
          format: 'DD/MMM/YYYY'
      },
      plugin: 'datepicker',
      plugin_config: {
          format: 'dd/M/yyyy',
          autoclose: true
      },
      operators: ['equal', 'not_equal', 'greater', 'greater_or_equal', 'between',
          'not_between', 'less', 'less_or_equal'
      ]
  },
    ],
  
  });
})