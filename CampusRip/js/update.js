Parse.initialize("dUWpFIH0Iv7AGTYW5ps6TkYScmxjG1LgX8hIlfNV", "XSET46QVsV1VfewbHB0T5VoOPyaYpRIoowhtc7vF");

function update() {
    console.log("update");
    $(function() {
        $.getJSON('data.json', function(data) {
            var items = [];
            for (var key in data) {
                if (typeof data[key] === "object") {
                    for (var i = 0; i < data[key].length; i++) {
                        if (typeof data[key][i] === "string") {
                            items.push("<li>" + "Restaurant = " + data[key][i] + "</li>");
                        } else {
                            for (var property in data[key][i]) {
                                items.push("<li>" + property + " = " + data[key][i][property] + "</li>");
                            }
                        }
                    }
                }
            }
            $("<ul/>", {
                "class": "my-new-list",
                html: items.join("")
            }).appendTo("body");
        });
    });
}


function send() {

    // var TestObject = Parse.Object.extend("TestObject");
    // var testObject = new TestObject();
    // testObject.save({
    //     foo: "bar"
    // }, {
    //     success: function(object) {
    //         $(".success").show();
    //     },
    //     error: function(model, error) {
    //         $(".error").show();
    //     }
    // });
}
