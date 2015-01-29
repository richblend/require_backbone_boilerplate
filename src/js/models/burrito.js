define([

], function(){
	
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