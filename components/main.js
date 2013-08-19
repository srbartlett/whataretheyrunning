window.WhatAreTheyRunning = (function() {

  function WhatAreTheyRunning() {
  }

  WhatAreTheyRunning.prototype.launch = function() {
    d3.json("ask_for_head.json", function(error, data) {
      if (error) return console.warn(error);
      byOperatingSystem(data, function(byOs) {
        nv.addGraph(function() {
          renderChart("#all-members svg", byOs);
        });
      });
      byServer(data, function(r) {
        nv.addGraph(function() {
          renderChart("#servers svg", r);
        });
      });
      jQuery.each(parties(data), function(i, v) {
        divId = v.charAt(0) + i;
        jQuery('.charts').append('<div id=' + divId + "><h3>" + v + "</h3><svg></svg></div>")
        byParty(data, v, "#" + divId  + " svg", function(results, selector) {
          console.log(selector);
          nv.addGraph(function() {
            renderChart(selector, results);
          });
        });
      });
      byAppServer(data, function(r) {
        nv.addGraph(function() {
          renderChart("#app-server svg", r);
        });
      });
      jQuery.each(data, function(i,v) {
        $('#complete-list tr:last').after('<tr><td>' + v.firstname + ' ' + v.lastname + '</td><td>' + v.party + '</td><td><a href="' + v.url + '">'+ (v.url ? v.url : "N/A") + '</a></td><td>' + (v.operating_system ? v.operating_system : "N/A") + '</td><td>' + (v.server ? v.server : "N/A") + '</td></tr>');
      });
    });
  };

  function renderChart(selector, data) {
    var width = 300, height = 300;
    var chart = nv.models.pieChart()
      .width(width)
      .height(height)
    .x(function(d) { return d.label })
    .y(function(d) { return d.value })
     .values(function(d) { return d })
      .color(d3.scale.category10().range());

    d3.select(selector)
    .datum([data])
    .transition().duration(200)
    .attr('height', 325)
    .call(chart);

    return chart;
  };

  function byOperatingSystem(data, view) {
    byOs = {}
    jQuery.each(operatingSystems(data), function(key,s) { byOs[s] = 0 });
    jQuery.each(data, function(key, s) {
      if (s.operating_system) {
        byOs[s.operating_system]++;
      }
    });
    view(Object.keys(byOs).map(function(s) { return {label: s, value: byOs[s]}; }));
  };

  function byParty(data, party, selector, view) {
    results = {}
    jQuery.each(operatingSystems(data), function(key,s) { results[s] = 0 });
    jQuery.each(data, function(key, s) {
      if (s.party == party && s.operating_system) {
        results[s.operating_system]++;
      }
    });
    view(Object.keys(results).map(function(s) { return {label: s, value: results[s]}; }), selector);
  };


  function byServer(data, view) {
    results = {}
    jQuery.each(data, function(key, s) {
      if (s.server) {
        if (! (s.server in results)) {
          results[s.server] = 0 ;
        }
        results[s.server]++;
      }
    });
    view(Object.keys(results).map(function(s) { return {label: s, value: results[s]}; }));
  };

  function byAppServer(data, view) {
    results = {}
    results['Unknown'] = 0
    jQuery.each(data, function(key, s) {
      if (s.powered_by) {
        powered_by = s.powered_by.split("/")[0];
        if (! (powered_by in results)) {
          results[powered_by] = 0 ;
        }
        results[powered_by]++;
      } else {
        results['Unknown']++;
      }
    });
    view(Object.keys(results).map(function(s) { return {label: s, value: results[s]}; }));
  };


  function operatingSystems(data) {
    var p = data.map(function(s) { return s.operating_system });
    return p.sort().filter(function(el,i,a) { if(i==a.indexOf(el)) return 1; return 0}).filter(function(n){return n}).reverse();
  }

  function parties(data) {
    var p = data.map(function(s) { return s.party });
    return p.sort().filter(function(el,i,a) { if(i==a.indexOf(el)) return 1; return 0});
  }

  return WhatAreTheyRunning;

})();
