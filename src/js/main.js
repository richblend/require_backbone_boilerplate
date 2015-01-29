/* Bootstrap the app once DOM is ready */

require.config({
	urlArgs: window.requireCacheBust,
	paths: {
        "text" : "components/text"
        
    }

});


require(['app'], function(App){
	
	$().ready(function(){
		App.init();
	});

});
