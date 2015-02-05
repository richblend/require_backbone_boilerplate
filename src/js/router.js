define(
	[
		'jquery',
		'underscore',
		'backbone',
	], 

	function(){


		var init = function(){

			var AppRouter = Backbone.Router.extend({
				routes: {
					'firstView/:argument': 'view1',
					'secondView': 'view2'
				}
			});


			var appRouter = new AppRouter();

			
			appRouter.on('route:view1', function(subview){			
				
				require(['views/view1'], function(View){
					var view = new View();
					view.addSubView(subview);
					$('.container').html(view.$el);
				});
				
			});

			Backbone.history.start();

		}

		

		return {
			init: init
			
		};
	}

);