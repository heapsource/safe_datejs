var vows = require('vows');
var assert = require('assert');
var safe_datejs = require('../index.js');

vows.describe('safe_datejs').addBatch({
  'When I require safe_datejs': {
    'The global Date prototype should not contain any of the datejs functions': function() {
      assert.isUndefined(Date.today);
      assert.isUndefined(Date.getMonthNumberFromName);
    },
    'The safe_datejs module should export DateType': function() {
      assert.typeOf(safe_datejs.DateType, 'function');
    }
  },
  'When I convert a date to a date.js object': {
    topic: function() {
      var date = new Date(2005, 06, 05);
      return {
        originalDate: date,
        boxedDate: date.AsDateJs()
      }
    },
    'The date.js object should contain the date.js date functions': function(topic) {
      assert.isFunction(topic.boxedDate.is);
    },
    'The original object should not contain any date.js functions': function(topic) {
      assert.isUndefined(topic.originalDate.is);
    },
    "Because it's sanboxed, the date.js date instance should not be recognized as a Date": function(topic) {
      assert.isFalse(topic.boxedDate instanceof Date);
    },
    "And I convert the date.js back to a regular date": {
      topic: function(topic) {
        return {
          topic: topic,
          unboxedDate: topic.boxedDate.add({days:1}).AsRegularDate()
        };
      },
      "Then the unboxed date.js value should be a regular Date object": function(topic) {
        assert.instanceOf(topic.unboxedDate, Date);
      },
      "And the regular Date value should contain the same date.js object": function(topic) {
        assert.strictEqual(topic.topic.boxedDate.toUTCString(), topic.unboxedDate.toUTCString());
      }
    }
  }
}).export(module);
