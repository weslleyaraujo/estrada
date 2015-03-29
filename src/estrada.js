;(function (root, listener) {

  function Estrada () {
    this.routes = {};
    this.bind();
    this.setup();
  }

  Estrada.prototype.bind = function () {
    listener('hashchange', this.onHasChange.bind(this), false);
  };

  Estrada.prototype.onHasChange = function () {
    this.setup();
    this.start();
  };

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

  Estrada.prototype.callbackHandler = function (fn) {
    return typeof fn === 'function' ? fn : function EstradaEmpty () {
      console.log('[router]: callback not found for this route!');
    };
  };

  Estrada.prototype.not = function (fn) {
    return typeof fn === 'function' ? fn : function () { console.log('yea');};
  };

  Estrada.prototype.getParameters = function (route) {
    var args = [],
        actual = this.options.hash.split('/');
    route = route.split('/');
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
      origin: document.location.origin,
      hash: hash
    };
  };

  root.Estrada = new Estrada();

} (window, window.addEventListener));
