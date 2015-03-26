;(function (root) {

  function App () {
    this.routes = {};
    this.setup();
  };

  App.prototype.register = function (options) {
    Object.keys(options.routes).forEach(function (item, index) {
      this.routes[item] = {
        callback: options[options.routes[item]],
        match: this.createMatch(item)
      };

      console.log(this.createMatch(item));
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
      hash:  hash === '' ? '' : hash
    }
  };

  root.App = new App();

} (this));


App.register({
  routes: {
    '': 'foo',
    '/page/:id/a/:seila': 'page',
    '/bar/:id': 'bar'
  },

  foo: function () {
    console.log('foo');
  },

  page: function () {
    console.log('thats page');
  },

  bar: function () {
    console.log('thats bar');
  }
});

App.start();
