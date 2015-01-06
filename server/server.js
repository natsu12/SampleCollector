Meteor.startup(function() {
	if (Libraries.find().count() === 0) {
		Libraries.insert({name: "Iniitial library"});
	}
	if (Meteor.users.find({username: 'admin'}).count() === 0) {
		Accounts.createUser({
			username: 'admin',
			password: '123456'
		});
	}
});
 
Meteor.methods({
	addSample: function(name, studentNumber, libraryId) {
		Samples.insert({
			studentName: name,
			studentNumber: studentNumber,
			owner: Meteor.userId(),
			libraryId: libraryId
		});
	},
  	addLibrary: function(name) {
  		Libraries.insert({
  			name: name

  		});
  	},
  	clearSample: function() {
  		Images.remove({metadata:{owner: Meteor.userId()} });
  	},
  	resetSample: function() {
  		Samples.remove({owner: Meteor.userId()});
  	}
});

Images.allow({
	insert: function(userId, doc) {
	  	return (userId && doc.metadata.owner === userId);
	},
	update: function(userId, doc, fieldNames, modifier) {
	  	return (userId === doc.metadata.owner);
  	},
  	remove: function(userId, doc) {
		return false;
  	},
  	download: function(userId) {
		return !!userId;
  	}
});