# ScriptsLoader
Pure JavaScript scripts loader with dependencies and uniqueness check

## Install
```html
<script src="/js/scripts_loader.js"></script>
```

## Use
    // Define the dependency 
    var dependencyForest = [{
      '//code.jquery.com/jquery-1.11.0.min.js': {
        '//code.jquery.com/ui/1.11.2/jquery-ui.min.js': '/js/demo_scripts/script_based_on_jquery_ui.js',
        
        // will not load again '//code.jquery.com/jquery-1.11.0.min.js', but its child
        '//code.jquery.com/jquery-1.11.0.min.js': '/js/demo_scripts/script_based_on_jquery.js'
      },
      '//ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js': [
        '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.8/angular-cookies.min.js',
        '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.8/angular-animate.js'
      ]
    }];
    
    // Load the scripts
    ScriptsLoader(dependencyForest, function(scriptsLoaded) {
      console.log('Done. The following scripts were loaded:');
      console.log(Object.keys(scriptsLoaded).join('\n'));
    });

## Features
1. Loads the scripts according the dependencies so the chidren will be loaded only after the father was loaded.
2. Doesn't load scripts with the same path. In this case it will load directly its children.
3. A callback can be provided to be called when all the scripts are loaded.
4. The callback will recieve a hash with the src's as its keys (and true as a value).
