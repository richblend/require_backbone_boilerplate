require.config({
	
	/* optimizer looks for nested dependencies (i.e ones loaded with require(['something'])) */
	findNestedDependencies: true,

	paths: {
        "text" : "components/text",
        "jquery": "../../bower_components/jquery/dist/jquery",
        "underscore": "../../bower_components/underscore/underscore",
        "backbone": "../../bower_components/backbone/backbone"


        
    }

});