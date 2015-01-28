define([
	

], function(){

	

	

	var init = function(){

		var AppRouter = Backbone.Router.extend({
			routes: {
				'1': 'view1',
				'2': 'view2'
			}
		});


		var appRouter = new AppRouter();


		appRouter.on('route:view1', function(){			
			require(['views/view1'], function(View1){
				var view1 = new View1();
				$('.container').html(view1.$el);
			})
		});

		appRouter.on('route:view2', function(){			
			require(['views/view2'], function(View1){
				var view1 = new View2();
			})
		});
		

		Backbone.history.start();

	}

	

	return {
		init: init
		
	};

});