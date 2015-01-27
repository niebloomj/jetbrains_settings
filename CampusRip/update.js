Parse.initialize("aEGq7Uw6GgqbGZo8JWxPQAEYdxSgexrv9zLLXVJu", "ahEsV3cewyapjRJ7Wudks47q10eh9fGnerBb3pBy");
var year = 2015;
var month = 1;
var day = 18;

function update() {
    console.log("Update Started");
    restNum = 0;
    $(function() {
        $.getJSON('data.json', function(data) {
            var items = [];
            for (var key in data) {
                if (typeof data[key] === "object") {
                    for (var i = 0; i < data[key].length; i++) {
                        if (typeof data[key][i] === "string") {
                            restNum += 1;
                            items.push("<li>" + "Restaurant = " + data[key][i] + "</li>");
                        } else {
                            for (var property in data[key][i]) {
                                for (var j = 1; j < data[key][i][property].length; j++) {
                                    if (data[key][i][property][j].length != 1) {
                                    	//Set Table
                                        if (restNum >= 1 && restNum <= 3) {
                                            var MenuObject = Parse.Object.extend("testDoug");
                                            var menuObject = new MenuObject();
                                        } else if (restNum >= 4 && restNum <= 6){
                                        	var MenuObject = Parse.Object.extend("testDanf");
                                            var menuObject = new MenuObject();
                                        }
                                        //Set StationID
                                        menuObject.set("stationID", data[key][i][0]);
                                        //Set the name of the food
                                        menuObject.set("foodItem", data[key][i][property][j]);
                                        //Set the mealTime
                                        if (restNum == 1) {
                                            menuObject.set("mealTime", 1);
                                        } else if (restNum == 2 || restNum == 4) {
                                            menuObject.set("mealTime", 2);
                                        } else if (restNum == 3 || restNum == 5) {
                                            menuObject.set("mealTime", 3);
                                        }
                                        //Set the date;
                                        var sendDate = new Date(year, 0, day);
                                        if (data[key][i][property][0] === "Sunday") {
                                            sendDate.setDate(sendDate.getDate());
                                        } else if (data[key][i][property][0] === "Monday") {
                                            sendDate.setDate(sendDate.getDate() + 1);
                                        } else if (data[key][i][property][0] === "Tuesday") {
                                            sendDate.setDate(sendDate.getDate() + 2);
                                        } else if (data[key][i][property][0] === "Wednesday") {
                                            sendDate.setDate(sendDate.getDate() + 3);
                                        } else if (data[key][i][property][0] === "Thursday") {
                                            sendDate.setDate(sendDate.getDate() + 4);
                                        } else if (data[key][i][property][0] === "Friday") {
                                            sendDate.setDate(sendDate.getDate() + 5);
                                        } else if (data[key][i][property][0] === "Saturday") {
                                            sendDate.setDate(sendDate.getDate() + 6);
                                        }
                                        menuObject.set("serveDate", sendDate);
                                        //End send date
                                        items.push("<li>" + property + " = " + data[key][i][property][j] + "</li>");
                                        menuObject.save(null, {
                                            success: function(testObject) {
                                                $(".success").show();
                                                // alert('New object created with objectId: ' + testObject.id);
                                            },
                                            error: function(testObject, error) {
                                                $(".error").show();
                                                // alert('Failed to create new object, with error code: ' + error.message);
                                            }
                                        });
                                    }
                                }
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
