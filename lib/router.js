Iron.utils.debug = true;

Router.route('/', function () {
  this.layout('layout');
  this.render('Home');
});

Router.route('/user', function () {
  this.layout('layout');
  this.render('User');
});

Router.route('/submit', function () {
  this.layout('layout');
  this.render('Submit');
});
 
Router.route('/admin', function () {
	if (Meteor.user() && Meteor.user().username === 'admin') {
		this.layout('layout');
  		this.render('Admin');
	} else {
		return 'unauthorized';
	}
});

Router.route('/library/:_id', {
	name: 'library',
	data: function() { return Libraries.findOne(this.params._id); }
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.next();
    this.redirect('/');
  } else {
    this.next();
  }
});