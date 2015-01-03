function ScriptsLoader(dependencyForest, callback) {
    var head = document.getElementsByTagName("head")[0] || document.documentElement;
    var processed = 0;
    var toBeProcessed = 0;
    var scriptsLoaded = {}; // to check uniqueness
    function loadOne(src, innerCallback) {
        toBeProcessed++;
        if(scriptsLoaded[src]){
            onDone();
            return;
        }
        scriptsLoaded[src] = true;
        // console.log('Loading - ' + src);
        var done = false;
        var script = document.createElement('script');
        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                done = true;
                // console.log('Loaded - ' + src);

                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                if (head && script.parentNode) {
                    head.removeChild(script);
                }
                onDone();
            }
        };
        script.src = src;
        script.type = 'text/javascript';
        head.appendChild(script);

        function onDone() {
            if (typeof(innerCallback) == 'function') {
                innerCallback();
            };
            processed++;
            if ((typeof(callback) == 'function') && (processed == toBeProcessed)) {
                callback(scriptsLoaded);
            }
        }
    }
    var processors = {
        '[object String]': loadOne,
        '[object Array]': function(array) {
            for (var key in array) {
                load(array[key]);
            }
        },
        '[object Object]': function(object) {
            for (var key in object) {
                (function(child) {
                    loadOne(key, function() {
                        load(child);
                    });
                })(object[key]);
            }
        }
    };

    function load(subForest) {
        var processor = processors[toString.call(subForest)];
        if (!processor) {
            throw 'Malformated dependencyForest'
        }
        else {
            processor(subForest);
        }
    }
    load(dependencyForest);
};
