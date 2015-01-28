define([
	'mediator'
], function(mediator){

	var View1 = Backbone.View.extend({
		
		template: _.template( $('#template-view1').html() ),

		initialize: function(){
			
			this.render();

			//just for lolz
			mediator.publish('global/showAlert');
		},

		render: function(){
			console.log(this.template());
			this.$el.html( this.template() );
		}
	});


	return View1;

});