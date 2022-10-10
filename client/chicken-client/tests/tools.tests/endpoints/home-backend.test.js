const HOME_BACKEND = require('../../../tools/endpoints/home-backend');

test('Test the home-backend endpoint', () => {
    expect(HOME_BACKEND.used_for_testing("1")).toBe("arg : 1");
});

