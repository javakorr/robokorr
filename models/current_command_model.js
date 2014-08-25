exports.load = function(db) {
	return db.define('robokorr',
		{
			current_command: String
		},
		{
			methods: {
				getCurrentCommand: function() {
					return {
						current_command: this.current_command
					};
				}
			}
		}
	);
};