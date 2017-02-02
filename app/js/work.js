(function() {
  var $svg, check, circleEmpty, circleFull, i, reset, shrink, t, to;

  $svg = $('svg');

  to = null;

  t = function(ms, cb, fn) {
    return to = setTimeout(function() {
      fn();
      return cb();
    }, ms);
  }; 

  shrink = function(cb) {
    return t(0, cb, function() {
      return $svg.attr("class", "shrink");
    });
  };

  circleEmpty = function(cb) {
    return t(300, cb, function() {
      return $svg.attr("class", "circle-empty");
    });
  };

  circleFull = function(cb) {
    return t(700, cb, function() {
      return $svg.attr("class", "circle-full");
    });
  };

  check = function(cb) {
    return t(2000, cb, function() {
      return $svg.attr("class", "check");
    });
  };

  reset = function(cb) {
    return t(3000, cb, function() {
      return $svg.attr("class", null);
    });
  };

  $svg.click(function() {
    clearInterval(i);
    if ($svg.attr("class") != null) {
      $svg.attr('class', null).clearQueue();
      return clearTimeout(to);
    } else {
      return $svg.queue(shrink).queue(circleEmpty).queue(circleFull).queue(check).queue(reset);
    }
  });

  $svg.on('mouseenter mouseover', function() {
    return clearInterval(i);
  });

  i = setInterval(function() {
    return $svg.click();
  }, 15000);

}).call(this);
