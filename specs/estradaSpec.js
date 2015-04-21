describe('#estrada', function () {
  beforeEach(function () {
    document.location.hash = "";

    Estrada.register({
      routes: {
        '/foo': 'fooCallback'
      },

      fooCallback: function () {
        return 'foo';
      }
    });

  });

  describe('#register', function () {
    it('register routes into the application instance', function () {

      expect(Estrada.routes['/foo']).toBeDefined();
    });
  });

  describe('#_callbackHandler', function () {
    describe('get the proper callback or an dumb function for the route', function () {
      it('returns "foo" when the callback is executed', function () {
        expect(Estrada.routes['/foo'].callback()).toEqual('foo');
      });

      it('get the empty function inserted by Estrada', function () {
        Estrada.register({
          routes: {
            '/bar': ''
          }
        });

        expect(typeof Estrada.routes['/bar'].callback).toBe('function');
      });
    });
  });

  describe('#_prepareRoute', function () {
    describe('prepares the route removing or adding a "/" in the first char', function () {
      it('should return an string "/" since the argument is empty', function () {
        expect(Estrada._prepareRoute('')).toBe('/')
      });

      it('should return an string "/foo"', function () {
        expect(Estrada._prepareRoute('foo')).toBe('/foo')
      });
    });
  });

  describe('#_createMatch', function () {
    describe('creates a regex for each kind of route', function () {
      it('should match only an empty string', function () {
        var regex = Estrada._createMatch("/");

        expect(!!"".match(regex).length).toBe(true);
      });

      it('should match "/foo"', function () {
        var regex = Estrada._createMatch("/foo");

        expect(!!"/foo".match(regex).length).toBe(true);
      });

      it('should match "/foo/{anything}"', function () {
        var regex = Estrada._createMatch("/foo/:id");

        expect(!!"/foo/1".match(regex).length).toBe(true);
        expect(!!"/foo/bar".match(regex).length).toBe(true);
        expect(!!"/foo/another-example".match(regex).length).toBe(true);
      });
    });
  });

  describe('#_setup', function () {
    describe('setup options for the application handler', function () {
      it('remove unecessary characters from hash', function () {
        document.location.hash = '#/something';
        Estrada._setup();
        expect(Estrada.options.hash).toBe('/something');
      });
    });
  });

  describe('#_isMatch', function () {
    describe('identifies if the actual url is a match', function () {
      it('returns true if its a match', function () {
        expect(Estrada._isMatch('/foo', /foo/)).toBe(true);
        expect(Estrada._isMatch('/foo/1', /foo\/.*/)).toBe(true);
      });

      it('returns false if its not a match', function () {
        expect(Estrada._isMatch('/bar', /foo/)).toBe(false);
        expect(Estrada._isMatch('/bar/1', /foo\/.*/)).toBe(false);
      });
    });
  });

  describe('#_getParameters', function () {
    describe('get the parameters for the route', function () {
      it('returns an array that contains foo', function () {
        Estrada.options.hash = "/example/foo";
        Estrada.register({
          '/example/:id': ''
        });

        expect(Estrada._getParameters('/example/:id')).toContain('foo')
      });
    });
  });

  describe('#navigate', function () {
    it('navigates into a url', function () {
      var spy = spyOn(Estrada.routes['/foo'], 'callback');

      Estrada.navigate('/foo');
      Estrada.start();

      expect(spy).toHaveBeenCalled();
    });
  });

});
