(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Estrada = factory();
  }
}(this, function () {

'use strict';


/*
 * @class Estrada
 *
 * Initial start for Estrada class
 * */
function Estrada () {
  this.routes = {};
  this.bind();
  this.setup();
}

/*
 * Bind listener event for page changes
 *
 * @method bind
 * @return {Null}
 * */
Estrada.prototype.bind = function () {
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', this.onHasChange.bind(this), false);
  }
};

/*
 * Event handler for page hash change
 *
 * @method onHasChange
 * @return {Null}
 * */
Estrada.prototype.onHasChange = function () {
  this.setup();
  this.start();
};

/*
 * Register a route into Estrada
 *
 * @method register
 * @return {Object} Estrada instance
 * */
Estrada.prototype.register = function (options) {
  options.routes = options.routes || {};
  Object.keys(options.routes).forEach(function (item, index) {
    this.routes[item] = {
      callback: this.callbackHandler(options[options.routes[item]]),
      match: this.createMatch(item)
    };
  }.bind(this));

  return this;
};

/*
 * Get the proper callback for a route
 *
 * @method callbackHandler
 * @param {Function} fn The function callback for the route
 * @return {Object} Estrada instance
 * */
Estrada.prototype.callbackHandler = function (fn) {
  return typeof fn === 'function' ? fn : function EstradaEmpty () {
    console.log('[router]: callback not found for this route!');
  };
};

/*
 * Get the parameters for the route
 *
 * @method getParameters
 * @param {String} route The actual route
 * @return {Array} The parameters found on the route
 * */
Estrada.prototype.getParameters = function (route) {
  var args = [],
      actual = this.options.hash.split('/');

  route = this.prepareRoute(route).split('/');
  route.forEach(function (item, index) {
    if (item.match(/:/)) {
      args.push(actual[index]);
    }
  });

  return args;
};

Estrada.prototype.createMatch = function (route) {
  route = this.prepareRoute(route);
  if (route === "/") {
    return new RegExp(/^\s*$/);
  }

  return route.split('/').map(function (item) {
    return !!item.match(/:/) ? "[^\\/]*" : item;
  }).join('\\/') + '$';
};

Estrada.prototype.prepareRoute = function (route) {
  return route.charAt(0) === '/' ? route : '/' + route; 
};

Estrada.prototype.start = function () {
  var actual;

  Object.keys(this.routes).forEach(function (route) {
    actual = this.routes[route];

    if (this.isMatch(this.options.hash, actual.match)) {
      actual.callback.apply(this, this.getParameters(route));
    }

  }.bind(this));
};

Estrada.prototype.isMatch = function (hash, regex) {
  return !!hash.match(regex);
};

Estrada.prototype.setup = function () {
  var hash = document.location.hash.replace(/#/, '');
  this.options = {
    hash: hash
  };
};

  return new Estrada();
}));
