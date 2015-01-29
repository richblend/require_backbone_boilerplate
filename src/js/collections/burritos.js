define([
	'models/burrito'
	],

	function(burritoModel){

		var BurritoCollection = Backbone.Collection.extend({
			model: burritoModel,

			initialize: function(){
				this.add({salsa: 'medium'});
				this.add({salsa: 'hot'});
			}
		});

		return BurritoCollection;

	}
);