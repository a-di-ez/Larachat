(function(document, window, $) {
  'use strict';

  var Site = window.Site;
  $(document).ready(function($) {
    Site.run();
  });

  var chart = AmCharts.makeChart("chart1div", {
    "type": "serial",
    "theme": "light",
    "legend": {
      "useGraphSettings": true
    },
    "marginRight": 30,
    "marginLeft": 30,
    "autoMarginOffset": 20,
    "mouseWheelZoomEnabled":true,
    "dataDateFormat": "DD-MM-YYYY",
    "valueAxes": [{
      "id": "v1",
      "axisAlpha": 0,
      "position": "left",
      "ignoreAxisWidth":true
    }, {
      "id": "v2",
      "axisAlpha": 0,
      "position": "left",
      "ignoreAxisWidth":true
    }],
    "balloon": {
      "borderThickness": 1,
      "shadowAlpha": 0
    },
    "graphs": [{
      "id": "g1",
      "balloon":{
        "drop":true,
        "adjustBorderColor":false,
        "color":"#ffffff"
      },
      "bullet": "round",
      "bulletBorderAlpha": 1,
      "bulletColor": "#FFFFFF",
      "bulletSize": 5,
      "hideBulletsCount": 50,
      "lineThickness": 2,
      "title": "Completed orders",
      "useLineColorForBulletBorder": true,
      "valueField": "completed",
      "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
    },{
      "id": "g2",
      "balloon":{
        "drop":true,
        "adjustBorderColor":false,
        "color":"#ffffff"
      },
      "bullet": "round",
      "bulletBorderAlpha": 1,
      "bulletColor": "#FFFFFF",
      "bulletSize": 5,
      "hideBulletsCount": 50,
      "lineThickness": 2,
      "title": "Uncompleted orders",
      "useLineColorForBulletBorder": true,
      "valueField": "uncompleted",
      "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
    }],
    "chartScrollbar": {
      "graph": "g1",
      "oppositeAxis":false,
      "offset":30,
      "scrollbarHeight": 80,
      "backgroundAlpha": 0,
      "selectedBackgroundAlpha": 0.1,
      "selectedBackgroundColor": "#888888",
      "graphFillAlpha": 0,
      "graphLineAlpha": 0.5,
      "selectedGraphFillAlpha": 0,
      "selectedGraphLineAlpha": 1,
      "autoGridCount":true,
      "color":"#AAAAAA"
    },
    "chartCursor": {
      "pan": true,
      "valueLineEnabled": true,
      "valueLineBalloonEnabled": true,
      "cursorAlpha":1,
      "cursorColor":"#258cbb",
      "limitToGraph":"g1",
      "valueLineAlpha":0.2,
      "valueZoomable":true
    },
    "categoryField": "date",
    "categoryAxis": {
      "parseDates": true,
      "dashLength": 1,
      "minorGridEnabled": true
    },
    "export": {
      "enabled": true
    },
    "dataProvider": generateChartData()
});

  var chart2 = AmCharts.makeChart("chart2div", {
    "type": "serial",
    "theme": "light",
    "marginRight": 70,
    "dataProvider": generateFeedbackData(),
    "graphs": [{
      "balloonText": "<b>Count rating [[category]]: [[value]]</b>",
      "fillColorsField": "color",
      "fillAlphas": 0.9,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "visits"
    }],
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    "categoryField": "country",
    "categoryAxis": {
      "gridPosition": "start"
    },
    "export": {
      "enabled": true
    }

  });

  chart.addListener("rendered", zoomChart);
  chart2.addListener("rendered", zoomChart);

  zoomChart();

  function zoomChart() {
    chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);

    $.each($("a[title='JavaScript charts']"), function (key, value) {
      $(value).remove();
    });
  }

  $(document).on('click', 'g[cursor="pointer"]', function() {
    $.each($("a[title='JavaScript charts']"), function (key, value) {
      $(value).remove();
    });
  });

  //AmCharts.ready(function() {
  //  $('#chart1div').hide(4000);
  //});

})(document, window, jQuery);
