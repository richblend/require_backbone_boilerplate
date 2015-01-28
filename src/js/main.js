/* Bootstrap the app once DOM is ready */

require.config({
	urlArgs: window.requireCacheBust
});

require(['app'], function(App){
	
	$().ready(function(){
		App.init();
	});

});
