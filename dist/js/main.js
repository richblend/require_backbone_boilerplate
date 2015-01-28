/* Bootstrap the app once DOM is ready */

require(['app'], function(App){
	
	$().ready(function(){
		App.init();
	});

});
