define([
	'mediator',
	'collections/burritos'
], function(mediator, burritoCollection){

	var View1 = Backbone.View.extend({
		
		template: _.template( $('#template-view1').html() ),

		initialize: function(){
			
			this.render();

			var bur = new burritoCollection();
			console.log(bur);

			//just for lolz
			mediator.publish('global/showAlert');
		},

		render: function(){
			this.$el.html( this.template() );
		}
	});




	return View1;

});