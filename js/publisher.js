var Publisher = function() {
  var subscribers = {};

  this.subscribe = function(eventName, callback) {
    subscribers[eventName] = subscribers[eventName] || [];
    subscribers[eventName].push(callback);
  };

  this.publish = function(eventName, args) {
    (subscribers[eventName] || []).map(function(callback) {
      callback(args);
    });
  };
};
