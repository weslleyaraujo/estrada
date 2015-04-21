/** estrada -v0.1.3
* Copyright (c) 2015 Weslley Araujo <weslleyaraujo20@gmail.com>
* Licensed MIT
*/

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
  this._bind();
  this._setup();
}

/*
 * Bind listener event for page changes
 *
 * @method _bind
 * @private
 * @return {Null}
 * */
Estrada.prototype._bind = function () {
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', this._onHasChange.bind(this), false);
  }
};

/*
 * Event handler for page hash change
 *
 * @method _onHasChange
 * @private
 * @return {Null}
 * */
Estrada.prototype._onHasChange = function () {
  this._setup();
  this.start();
};

/*
 * Register routes and each callback.
 *
 * @method register
 * @public
 * @return {Object} Estrada instance
 * */
Estrada.prototype.register = function (options) {
  options = options || {};
  options.routes = options.routes || {};

  Object.keys(options.routes).forEach(function (item, index) {
    this.routes[item] = {
      callback: this._callbackHandler(options[options.routes[item]]),
      match: this._createMatch(item)
    };
  }.bind(this));

  return this;
};

/*
 * Get the proper callback for a route
 *
 * @method _callbackHandler
 * @private
 * @param {Function} fn The function callback for the route
 * @return {Function} The choosed function
 * */
Estrada.prototype._callbackHandler = function (fn) {
  return typeof fn === 'function' ? fn : function EstradaEmpty () {
    console.log('[Estrada]: callback not found for this route!');
  };
};

/*
 * Get the parameters for the route
 *
 * @method _getParameters
 * @private
 * @param {String} route The actual route
 * @return {Array} The parameters found on the route
 * */
Estrada.prototype._getParameters = function (route) {
  var args = [],
      actual = this.options.hash.split('/');

  route = this._prepareRoute(route).split('/');
  route.forEach(function (item, index) {
    if (item.match(/:/)) {
      args.push(actual[index]);
    }
  });

  return args;
};

/*
 * Creates the regex for each route
 *
 * @method _createMatch
 * @private
 * @param {String} route The actual route
 * @return {Object} The regex created
 * */
Estrada.prototype._createMatch = function (route) {
  route = this._prepareRoute(route);
  if (route === '/') {
    return new RegExp(/^\s*$/);
  }

  return route.split('/').map(function (item) {
    return !!item.match(/:/) ? '[^\\/]+' : item;
  }).join('\\/') + '$';
};

/*
 * Prepares the route removing or adding a '/' in the first char
 *
 * @method _prepareRoute
 * @private
 * @param {String} route The actual route
 * @return {String} The route
 * */
Estrada.prototype._prepareRoute = function (route) {
  return route.charAt(0) === '/' ? route : '/' + route; 
};

/*
 * Starts the routes system
 *
 * @method _bind
 * @public
 * @return {Null}
 * */
Estrada.prototype.start = function () {
  var actual;

  Object.keys(this.routes).forEach(function (route) {
    actual = this.routes[route];

    if (this._isMatch(this.options.hash, actual.match)) {
      actual.callback.apply(this, this._getParameters(route));
    }

  }.bind(this));
};

/*
 * Identifies if the actual url is a match
 *
 * @method _isMatch
 * @private
 * @param {String} hash The actual document hash
 * @param {Object} regex The regex to be matched
 * @return {Boolean}
 * */
Estrada.prototype._isMatch = function (hash, regex) {
  return !!hash.match(regex);
};

/*
 * Setup options for the application handler
 *
 * @method _setup
 * @private
 * @return {Object} Estrada instance
 * */
Estrada.prototype._setup = function () {
  var hash = document.location.hash.replace(/#/, '');
  this.options = {
    hash: hash
  };

  return this;
};

/*
 * Navigate into a url
 *
 * @method navigate
 * @public
 * @return {Null}
 * */
Estrada.prototype.navigate = function (hash) {
  hash = hash || '';
  document.location.hash = hash;
};

  return new Estrada();
}));
