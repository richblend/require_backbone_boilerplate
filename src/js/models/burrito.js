define([
	'backbone'
], function(Backbone){
	
	var Burrito = Backbone.Model.extend({

		initialize: function(){

		},

		defaults: {
			salsa: 'hot',
			guac: true
		}

	});

	return Burrito;

});