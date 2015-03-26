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
        callback: options[options.routes[item]],
        match: this.createMatch(item)
      };
    }.bind(this))
  };

  App.prototype.createMatch = function (route) {
    if (route === "") {
      return new RegExp(/^\s*$/);
    }

    return route.split('/').map(function (item) {
      return !!item.match(/:/) ? "[^\\/]*" : item;
    }).join('\\/') + '$';
  },

  App.prototype.start = function () {
    var actual;

    Object.keys(this.routes).forEach(function (route) {
      actual = this.routes[route];

      if (this.isMatch(actual.match)) {
        actual.callback.call();
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


App.register({
  routes: {
    '': 'foo',
    '/page/:id': 'singlePage',
    '/page/:id/teste/:seila': 'page',
    '/bar/:id': 'bar'
  },

  singlePage: function () {
    console.log('single');
  },

  foo: function () {
    console.log('foo');
  },

  page: function () {
    console.log('thats page of mauricio');
  },

  bar: function () {
    console.log('thats bar');
  }
});

App.start();
