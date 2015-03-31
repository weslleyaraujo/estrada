# Estrada [![Build Status](https://travis-ci.org/weslleyaraujo/estrada.svg?branch=master)](https://travis-ci.org/weslleyaraujo/estrada) [![Coverage Status](https://coveralls.io/repos/weslleyaraujo/estrada/badge.svg?branch=master)](https://coveralls.io/r/weslleyaraujo/estrada) [![Code Climate](https://codeclimate.com/github/weslleyaraujo/estrada/badges/gpa.svg)](https://codeclimate.com/github/weslleyaraujo/estrada)


Estrada is a lightwell router manager crafted with no dependencies and based to work on major browsers (IE9+).

It was inspired by [Backbone Router](http://backbonejs.org/#Router).

## Basic Usage

In order to start using Estrada you should include the main script into your page as:

```html
<script src="estrada.js" ></script>
```

Then you can register your routes like:

```javascript
Estrada.register({
  routes: {
    '': 'index',
    '/example': 'exampleHandler'
  },

  index: {
    console.log('index callback');
  },

  exampleHandler: function () {
    console.log('Example callback!');
  }
});
```

Development...
