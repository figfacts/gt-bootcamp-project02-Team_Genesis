const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Require User model
const User = require('./models/User');

module.exports = function (passport) {
	passport.use('local',
		new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
			// Match user record by email
			User.findOne({
				where: {
					email: email
				}
			}).then(user => {
				if (!user) {
					return done(null, false);
				}

				// Check password entered
				bcrypt.compare(password, user.password, (err, isCorrect) => {
					if (err) throw err;
					if (isCorrect) {
						console.log(`User authenticated.`);
						return done(null, user);
					} else {
						return done(null, false);
					}
				});
			});
		})
	);

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser( (err, id, done) => {
		// User.findByPk(id, function (err, user) {
		// 	console.log(err);
		// 	done(err, user);
		// });
		// try {
		// 	const userData = await User.findByPk(id);
		// 	done(err, userData);
		// } catch (err) {
		// 	console.log(err);
		// 	return;
		// }
		User.findByPk(id).then(user => {
			done(null, user);
		});
	});
};