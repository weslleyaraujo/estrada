describe('#estrada', function () {
  beforeEach(function () {
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

  describe('#getCallback', function () {
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

        expect(Estrada.routes['/bar'].callback.name).toBe('EstradaEmpty');
      });
    });
  });

  describe('#prepareRoute', function () {
    describe('prepares the route removing or adding a "/" in the first char', function () {
      it('should return an string "/" since the argument is empty', function () {
        expect(Estrada.prepareRoute('')).toBe('/')
      });

      it('should return an string "/foo"', function () {
        expect(Estrada.prepareRoute('foo')).toBe('/foo')
      });
    });
  });

  describe('#createMatch', function () {
    describe('creates a regex for each kind of route', function () {
      it('should match only an empty string', function () {
        var regex = Estrada.createMatch("/");

        expect(!!"".match(regex)).toBe(true);
      });

      it('should match "/foo"', function () {
        var regex = Estrada.createMatch("/foo");

        expect(!!"/foo".match(regex)).toBe(true);
      });

      it('should match "/foo/{anything}"', function () {
        var regex = Estrada.createMatch("/foo/:id");

        expect(!!"/foo/1".match(regex)).toBe(true);
        expect(!!"/foo/bar".match(regex)).toBe(true);
        expect(!!"/foo/another-example".match(regex)).toBe(true);
      });
    });
  });

  describe('#setup', function () {
    describe('setup options for the application handler', function () {
      it('remove unecessary characters from hash', function () {
        
      });
    });
  });

  describe('#isMatch', function () {
    describe('identifies if the actual url is a match', function () {
      it('returns true if its a match', function () {
        expect(Estrada.isMatch('/foo', /foo/)).toBe(true);
        expect(Estrada.isMatch('/foo/1', /foo\/.*/)).toBe(true);
      });

      it('returns false if its not a match', function () {
        expect(Estrada.isMatch('/bar', /foo/)).toBe(false);
        expect(Estrada.isMatch('/bar/1', /foo\/.*/)).toBe(false);
      });
    });
  });
});
