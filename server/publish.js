Meteor.publish('samples', function() {
 	return Samples.find();
});
Meteor.publish('images', function() {
 	return Images.find();
});
Meteor.publish('libraries', function() {
 	return Libraries.find();
});