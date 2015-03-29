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
});
