module.exports = {
	ensureAuthenticated: function(req, res, next) {
	  if (req.isAuthenticated()) {
		 return next();
	  }
	  res.redirect('/dashboard');
	},
	forwardAuthenticated: function(req, res, next) {
	  if (!req.isAuthenticated()) {
		 return next();
	  }
	  res.redirect('/login');      
	}
 };