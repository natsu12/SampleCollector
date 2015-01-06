Meteor.subscribe("samples");
Meteor.subscribe("images");
Meteor.subscribe("libraries");

Template.Home.helpers({
	admin: function () {
		return (Meteor.user().username == 'admin');
	}
});

Template.Sample.helpers({
	images: function () {
		console.log();
		return Images.find({metadata:{owner: this.owner} });
	}
});

Template.userSample.helpers({
	images: function () {
		return Images.find({metadata:{owner: Meteor.userId()} });
	}
});

Template.Submit.helpers({
	images : function () {
		return Images.find({metadata:{owner: Meteor.userId()} });
	},
	hasImage: function () {
		return Images.find({metadata:{owner: Meteor.userId()} }).fetch().length;
	},
	userSamples: function () {
		return Samples.find({owner: Meteor.userId()});
	},
	hasSample: function () {
		return Samples.find({owner: Meteor.userId()}).fetch().length;
	}
});

Template.Admin.helpers({
	libraries: function () {
		return Libraries.find();
	}
});

Template.User.helpers({
	libraries: function () {
		return Libraries.find();
	}
});

Template.Submit.events({
	"change .new-sample": function (event) {
		FS.Utility.eachFile(event, function(file) {
			var fsFile = new FS.File(file);
		    fsFile.metadata = {owner: Meteor.userId()};
		    Images.insert(fsFile, function (err, fileObj) {});
		});
	},
	
	"click .clear": function (event) {
	 	Meteor.call("clearSample");
	 	event.target.value = '';
	 	return false;
	},

	"submit .new-sample": function (event) {
		var name = event.target.name.value;
		var studentNumber = event.target.studentNumber.value;
		var libraryId = Session.get('libraryId');
		Meteor.call("addSample", name, studentNumber, libraryId);
		
        event.target.name.value = "";
        event.target.studentNumber.value = "";
        return false;
	},

	"click .reset": function () {
		Meteor.call("clearSample");
		Meteor.call("resetSample");
		return false;
	}
});

Template.library.events({
	"click .enter": function () {
		Session.set('libraryId', this._id);
	}
});

Template.Library.helpers({
	admin: function () {
		return (Meteor.user().username == 'admin');
	},
	samples: function() {
		var libraryId = Session.get('libraryId');
		return Samples.find({libraryId: libraryId});
	}
});



Template.Admin.events({
	"submit .new-library": function (event) {
		var name = event.target.name.value;
		Meteor.call("addLibrary", name);
		event.target.name.value = "";
		return false;
	}
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});

