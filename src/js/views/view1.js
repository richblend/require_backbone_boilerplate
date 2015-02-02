define(
	[
		'jquery',
		'underscore',
		'backbone',
		'mediator',
		'collections/burritos',
		'text!templates/module1.html',
	], 

	function($, _, Backbone, mediator, burritoCollection, html){

		var View1 = Backbone.View.extend({
			
			template: _.template( html ),

			initialize: function(){
				
				this.render();

				var bur = new burritoCollection();
				console.log(bur);

				//just for lolz
				mediator.publish('global/showAlert');
			},

			render: function(){
				this.$el.html( this.template() );
			},

			addSubView: function(viewName){
				console.log('subview, ', viewName);
			}
		});

		return View1;
	
	}

);