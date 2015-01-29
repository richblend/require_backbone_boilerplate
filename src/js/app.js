define([
	'router',
	'mediator',
	'modules/module1'
], function(router, mediator, module1){

	

	var init = function(){
		
		router.init();
		
		//an example subscription
		mediator.subscribe(showAlert, 'global/showAlert');


	}

	var showAlert = function(){
		console.log('Here is an alert');
	}

	return {
		init: init,
		showAlert: showAlert
	}

});