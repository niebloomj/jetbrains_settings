Parse.initialize("aEGq7Uw6GgqbGZo8JWxPQAEYdxSgexrv9zLLXVJu", "ahEsV3cewyapjRJ7Wudks47q10eh9fGnerBb3pBy");
var jsonFile = '1_25_2015.json';
var year = 2015;
var month = 1;
var day = 25;

function update() {
    console.log("Update Started");
    restNum = 0;
    $(function() {
        $.getJSON(jsonFile, function(data) {
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
                                        var MenuObject = Parse.Object.extend("Menu");
                                        var menuObject = new MenuObject();
                                        if (restNum >= 1 && restNum <= 3) {
                                            menuObject.set("Restaurant", "Douglass");
                                        } else if (restNum >= 4 && restNum <= 6) {
                                            menuObject.set("Restaurant", "Danforth");
                                        }
                                        //Set StationID
                                        menuObject.set("stationID", data[key][i][0]);
                                        //Set the name of the food
                                        menuObject.set("foodItem", data[key][i][property][j].split("%20").join(" ").split(",")[0]);
                                        //Set the mealTime
                                        menuObject.set("calories", parseInt(data[key][i][property][j].split("%20").join(" ").split(",")[1]));
                                        menuObject.set("protein", parseInt(data[key][i][property][j].split("%20").join(" ").split(",")[2]));
                                        menuObject.set("carbohydrates", parseInt(data[key][i][property][j].split("%20").join(" ").split(",")[3]));
                                        menuObject.set("cholesterol", parseInt(data[key][i][property][j].split("%20").join(" ").split(",")[4]));
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
                                                items.push("<li>^^Succesfull</li>");
                                                $(".success").show();
                                                // alert('New object created with objectId: ' + testObject.id);
                                            },
                                            error: function(testObject, error) {
                                                // alert(error.message);
                                                items.push("<li>" + error.message + "</li>");
                                                console.log(error.message);
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
