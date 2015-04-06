
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
 * @return {Null}
 * */
Estrada.prototype._onHasChange = function () {
  this._setup();
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
 * @param {Function} fn The function callback for the route
 * @return {Object} Estrada instance
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

Estrada.prototype._createMatch = function (route) {
  route = this._prepareRoute(route);
  if (route === "/") {
    return new RegExp(/^\s*$/);
  }

  return route.split('/').map(function (item) {
    return !!item.match(/:/) ? "[^\\/]*" : item;
  }).join('\\/') + '$';
};

Estrada.prototype._prepareRoute = function (route) {
  return route.charAt(0) === '/' ? route : '/' + route; 
};

Estrada.prototype.start = function () {
  var actual;

  Object.keys(this.routes).forEach(function (route) {
    actual = this.routes[route];

    if (this._isMatch(this.options.hash, actual.match)) {
      actual.callback.apply(this, this._getParameters(route));
    }

  }.bind(this));
};

Estrada.prototype._isMatch = function (hash, regex) {
  return !!hash.match(regex);
};

Estrada.prototype._setup = function () {
  var hash = document.location.hash.replace(/#/, '');
  this.options = {
    hash: hash
  };
};
