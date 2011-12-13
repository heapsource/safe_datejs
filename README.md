# Safe Date.js

An special wrapper for [the Date.js library](http://www.datejs.com/) that loads the Date.js Date extensions into an special type giving you access to the Date.js magic without screwing `Date` type of the Node.js application. It's safe to be used with type sensitive modules like [Mongoose.js](http://mongoosejs.com/).

See [the datejs site](http://www.datejs.com/) for more information.


## Installation

    npm install safe_datejs

## Usage

Use the function `AsDateJs` to convert your date to Date.js and use `AsRegularDate` when you are finished working with  Date.js. Both functions will return shallow copies.

## Example

    var datejs = require('safe_datejs');

	var today = new Date(2011, 11, 12, 0, 0, 0, 0);
	var wrappedToday = today.AsDateJs();
	console.log('Is today:', wrappedToday.is().today());
	
	var tomorrow = wrappedToday.clone().add({days:1});
	console.log('Wrapped Tomorrow:', tomorrow.toString(), 'is date regular Date: ', (tomorrow instanceof Date));
	
	var unwrappedTomorrow = tomorrow.AsRegularDate(); 
	console.log('Unwrapped Tomorrow:', unwrappedTomorrow.toString(), 'is date regular Date: ', (unwrappedTomorrow instanceof Date));

### Result

    Is today: false
	Wrapped Tomorrow: Tue Dec 13 2011 00:00:00 GMT-0500 (COT) is date regular Date:  false
	Unwrapped Tomorrow: Tue Dec 13 2011 00:00:00 GMT-0500 (COT) is date regular Date:  true

## Cloning the Repository

    git clone https://github.com/firebaseco/safe_datejs.git

## Tests

    npm test

## Author

* Johan (author). Email: *johan@firebase.co*

## License

MIT. Check the [the datejs site](http://www.datejs.com/)