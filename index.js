var vm = require('vm');
var fs = require('fs');
var path = require('path');

var dateJsSource = fs.readFileSync(path.join(__dirname, 'lib/date.js'),'utf8');
dateJsSource += fs.readFileSync(path.join(__dirname, 'lib/date.patch.js'),'utf8');
var sandbox = {
  safeExports: {

  }
};
vm.runInNewContext(dateJsSource, sandbox, 'date.js');
var DateType = sandbox.safeExports.Date;
DateType.prototype.AsRegularDate = function() {
  var newDate = new Date();
  newDate.setTime(this.valueOf());
  return newDate; 
}
Date.prototype.AsDateJs = function() {
  var newDate = new DateType();
  newDate.setTime(this.valueOf());
  return newDate; 
}
exports.DateType = DateType;
