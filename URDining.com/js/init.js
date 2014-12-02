Parse.initialize("aEGq7Uw6GgqbGZo8JWxPQAEYdxSgexrv9zLLXVJu",
    "ahEsV3cewyapjRJ7Wudks47q10eh9fGnerBb3pBy");
var currentUser;

function init() {
    
    console.log("init");
    $("#formSigninButton").click(function() {
        event.preventDefault();
        console.log("pressed");
        var username = $("#formUsername").val();
        var password = $("#formPassword").val();

        Parse.User.logIn(username, password, {
            success: function(user) {
                currentUser = Parse.User.current();
                if (currentUser.get("isAdmin")){
                    loginSuccessful();
                } else {
                    location.reload();
                }
            },
            error: function(user, error) {
                location.reload();
                // alert("Error: " + error.code + " " + error.message);
            }
        });
    });

}

// loads up all the scripts and preps the game
function loadItUp() {
    init();
    // var scripts = new getScripts(
    //     [

    //     ],
    //     function() {
    //          Optional - Executed each time a script has loaded (Use for Progress updates?) 
    //     },
    //     function() {
    //         console.log('%cAll scripts loaded!', 'color:#ffbc2e;');
    //         init();
    //     }
    // );
    // scripts.fetch();
}

function loginSuccessful() {
    window.location.href = "home.html";
}


// taken from http://stackoverflow.com/a/21817543
function getScripts(scripts, onScript, onComplete) {
    this.async = true;
    this.cache = false;
    this.data = null;
    this.complete = function() {
        $.scriptHandler.loaded();
    };
    this.scripts = scripts;
    this.onScript = onScript;
    this.onComplete = onComplete;
    this.total = scripts.length;
    this.progress = 0;
};

getScripts.prototype.fetch = function() {
    $.scriptHandler = this;
    var src = this.scripts[this.progress];
    console.log('%cFetching %s', 'color:#ffbc2e;', src);

    $.ajax({
        crossDomain: true,
        async: this.async,
        cache: this.cache,
        type: 'GET',
        url: src,
        data: this.data,
        statusCode: {
            200: this.complete
        },
        dataType: 'script'
    });
};

getScripts.prototype.loaded = function() {
    this.progress++;
    if (this.progress >= this.total) {
        if (this.onComplete) this.onComplete();
    } else {
        this.fetch();
    };
    if (this.onScript) this.onScript();
};
