const electron = require('electron');
const assert = require('assert');
const path = require('path');
var index_f = require('../index');


describe('First Test', function() {
    it('should pass', () => {
        assert.equal(1, 1);
      });
      
      it('should fail', () => {
        assert.notEqual(1, 2);
      });}
      );

describe('Second Test', function() 
{
    it('should pass', () => 
    {
        assert.equal(index_f.simple_print("Hello World"), "Hello World");
    });
});
