;(function (root, listener) {

  function App () {
    this.routes = {};
    this.bind();
    this.setup();
  };

  App.prototype.bind = function () {
    listener('hashchange', this.onHasChange.bind(this), false);
  };

  App.prototype.onHasChange = function () {
    this.setup();
    this.start();
  };

  App.prototype.register = function (options) {
    Object.keys(options.routes).forEach(function (item, index) {
      this.routes[item] = {
        callback: this.getCallback(options[options.routes[item]]),
        match: this.createMatch(item)
      };
    }.bind(this))

    return this;
  };

  App.prototype.getCallback = function (fn) {
    return typeof fn === 'function' ? fn : function () {
      console.log('[router]: callback not found for this route!');
    };
  };

  App.prototype.not = function (fn) {
    return typeof fn === 'function' ? fn : function () { console.log('yea');};
  };

  App.prototype.getParameters = function (route) {
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

  App.prototype.createMatch = function (route) {
    route = this.prepareRoute(route);
    if (route === "/") {
      return new RegExp(/^\s*$/);
    }

    return route.split('/').map(function (item) {
      return !!item.match(/:/) ? "[^\\/]*" : item;
    }).join('\\/') + '$';
  };

  App.prototype.prepareRoute = function (route) {
    return route.charAt(0) === '/' ? route : '/' + route; 
  };

  App.prototype.start = function () {
    var actual, bawords;

    Object.keys(this.routes).forEach(function (route) {
      actual = this.routes[route];

      if (this.isMatch(actual.match)) {
        actual.callback.apply(this, this.getParameters(route));
      }

    }.bind(this))
  };

  App.prototype.isMatch = function (regex) {
    return !!this.options.hash.match(regex);
  };

  App.prototype.setup = function () {
    var hash = document.location.hash.replace(/#/, '');
    this.options = {
      origin: document.location.origin,
      hash: hash
    }
  };

  root.App = new App();

} (window, window.addEventListener));
