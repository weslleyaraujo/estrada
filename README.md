# Estrada [![Build Status](https://travis-ci.org/weslleyaraujo/estrada.svg?branch=master)](https://travis-ci.org/weslleyaraujo/estrada) [![Coverage Status](https://coveralls.io/repos/weslleyaraujo/estrada/badge.svg?branch=master)](https://coveralls.io/r/weslleyaraujo/estrada)

Estrada is a lightwell router manager crafted with no dependencies and based to work on major browsers (IE9+).

It was inspired by [Backbone Router](http://backbonejs.org/#Router).

## Basic Usage

You can install estrada using bower:

```
bower install estrada
```

In order to start using Estrada you should include the main script into your page as:

```html
<script src="estrada.js" ></script>
```

Then you can register your routes like:

```javascript
Estrada.register({
  routes: {
    '': 'example'
  },

  example: function () {
    // you callback for '' route
    console.log('yay!');
  }
});

Estrada.start();
```

You can also register routes with multiple parameters like:

```javascript
Estrada.register({
  routes: {
    '/user/:id': 'user',
    '/example/:id/foo/:slug': 'multiple'
  },

  user: function (id) {
    // you callback for '/user/:id' route
    console.log('thats my callback for /user/:id', id);
  },

  multiple: function (id, slug) {
    // you callback for '/example/:id/foo/:slug' route
    console.log('thats my callback for /example/:id/foo/:slug', id, slug);
  }
});

Estrada.start();
```

## Documentation

### Estrada.register ({ routes: {}, ...callbacks })
Register routes and each callback.

- `{ routes: {} }` (object): the routes object
- `{ ..callbacks }` (function): your routes callbacks

__Usage:__

```javascript
Estrada.register({
  routes: {
    '/example': 'exampleCallback'
  },

  exampleCallback: function () {
    // callback
  }
})
```

### Estrada.start ()
Starts the routes system.

__Usage:__

```javascript
Estrada.start();
```

## Release History

* v0.1.0 - First release
* v0.1.1 - Creating release grunt task
* v0.1.2 - Fix bug when route was triggered by undefined param

## License

[MIT](http://example.com)
