//http://www.w3schools.com/jsref/met_table_insertrow.asp
var dougStations = "D, PM, P, HZ, G, or B";
var danfStations = "VEGAN, SOUP, SAUTE, PM, MG, G, DELI, D, BO, or BHZ";

function dashboardLoad() {
    Parse.initialize("aEGq7Uw6GgqbGZo8JWxPQAEYdxSgexrv9zLLXVJu",
        "ahEsV3cewyapjRJ7Wudks47q10eh9fGnerBb3pBy");
    downloadAndSetTable("DG_MENU", "dougTable");
    downloadAndSetTable("DF_Menu", "danfTable");
    downloadAndSetTable("TC_Menu", "commTable");
    $("#addFood").click(function() {
        newFood();
    });

    $("#removeFood").click(function() {
        event.preventDefault();
        bootbox.dialog({
            message: "Which hall would you like to remove a food from?",
            title: "Remove Food",
            buttons: {
                success: {
                    label: "Douglas",
                    className: "btn-success",
                    callback: function() {
                        bootbox.prompt("What stationID? - " + dougStations, function(stationID) {
                            if (stationID === null) {} else {
                                var table = document.getElementById("dougTable");
                                for (var i = 1, row; row = table.rows[i]; i++) {
                                    // for (var j = 0, col; col = row.cells[j]; j++) {
                                    // console.log(stationID + "≠" + row.cells[1].innerText);
                                    if (stationID == row.cells[1].innerText) {
                                        console.log(row.cells[2].innerText);
                                    }
                                }
                            }
                        });
                    }
                },
                danger: {
                    label: "Danforth",
                    className: "btn-danger",
                    callback: function() {

                    }
                },
                main: {
                    label: "The Commons",
                    className: "btn-primary",
                    callback: function() {

                    }
                }
            }
        });
    });

    $("#clearHall").click(function() {
        event.preventDefault();
        bootbox.dialog({
            message: "Which hall would you like to clear all current foods from?",
            title: "Clear Hall",
            buttons: {
                success: {
                    label: "Douglas",
                    className: "btn-success",
                    callback: function() {

                    }
                },
                danger: {
                    label: "Danforth",
                    className: "btn-danger",
                    callback: function() {

                    }
                },
                main: {
                    label: "The Commons",
                    className: "btn-primary",
                    callback: function() {

                    }
                }
            }
        });
    });
}




function newFood() {
    event.preventDefault();
    question(3, "Which dining hall?", "Douglas", "Danforth", "The Commons",
        function() {
            question(3, "Which time of food is this?", "Breakfast",
                "Lunch", "Dinner",
                function() {
                    bootbox.prompt("What stationID? - " + dougStations, function(stationID) {
                        if (stationID === null) {} else {
                            newFoodNext("DG", stationID, 1);
                        }
                    });
                },
                function() {
                    bootbox.prompt("What stationID? - " + dougStations, function(stationID) {
                        if (stationID === null) {} else {
                            newFoodNext("DG", stationID, 2);
                        }
                    });
                },
                function() {
                    bootbox.prompt("What stationID? - " + dougStations, function(stationID) {
                        if (stationID === null) {} else {
                            newFoodNext("DG", stationID, 3);
                        }
                    });
                })
        },
        function() {
            question(2, "Which time of food is this?", "Lunch",
                "Dinner", null,
                function() {
                    bootbox.prompt("What stationID? - " + danfStations, function(stationID) {
                        if (stationID === null) {} else {
                            newFoodNext("DF", stationID, 2);
                        }
                    });
                },
                function() {
                    bootbox.prompt("What stationID? - " + danfStations, function(stationID) {
                        if (stationID === null) {} else {
                            newFoodNext("DF", stationID, 3);
                        }
                    });
                },
                null)
        },
        function() {
            bootbox.prompt("What stationID? - Pizza, or Panda?", function(stationID) {
                if (stationID === null) {} else {
                    newFoodNext("TC", stationID, 3);
                }
            });
        });
}

function newFoodNext(inputHall, stationID, inputMealTime) {
    bootbox.prompt("What is that name of the dish?", function(dish) {
        if (dish === null) {} else {
            bootbox.prompt("How many calories are there per serving?", function(cal) {
                if (cal === null) {} else {
                    //Send data to database;
                    //Variable:
                    //InputHall, stationID, inputMealTime, dish, cal;
                    if (inputHall === "DG") {
                        var Table = Parse.Object.extend("DG_MENU")
                        var table = new Table();
                        table.set("mealTime", inputMealTime);
                        table.set("stationID", stationID);
                        table.set("foodItem", dish);
                        table.set("cal", cal);
                        table.save(null, {
                            success: function(table) {
                                bootbox.alert("Food added successfully", function() {

                                });
                            }
                        });
                    } else if (inputHall === "DF") {
                        var Table = Parse.Object.extend("DF_Menu")
                        var table = new Table();
                        table.set("mealTime", inputMealTime);
                        table.set("stationID", stationID);
                        table.set("foodItem", dish);
                        table.set("cal", cal + "/serving");
                        table.save(null, {
                            success: function(table) {
                                bootbox.alert("Food added successfully", function() {

                                });
                            }
                        });
                    } else if (inputHall === "TC") {
                        var Table = Parse.Object.extend("TC_Menu")
                        var table = new Table();
                        table.set("mealTime", inputMealTime);
                        table.set("stationID", stationID);
                        table.set("foodItem", dish);
                        table.set("cal", cal + "/serving");
                        table.save(null, {
                            success: function(table) {
                                bootbox.alert("Food added successfully", function() {

                                });
                            }
                        });
                    }
                }
            });
        }
    });
}

function sendFoodToDB(hall, mealTime, stationID, dish, calories) {

}

function downloadAndSetTable(tableName, tableID) {
    var Table = Parse.Object.extend(tableName);
    var query = new Parse.Query(Table);
    query.descending("mealTime");
    query.find({
        success: function(results) {
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var table = document.getElementById(tableID);
                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = object.get("mealTime");
                cell2.innerHTML = object.get("stationID");
                cell3.innerHTML = object.get("foodItem");
                cell4.innerHTML = object.get("cal");
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function question(qNums, message, button1, button2, button3, a, b, c) {
    if (qNums == 2) {
        bootbox.dialog({
            message: message,
            title: "New Food",
            buttons: {
                success: {
                    label: button1,
                    className: "btn-success",
                    callback: function() {
                        a();
                    }
                },
                danger: {
                    label: button2,
                    className: "btn-danger",
                    callback: function() {
                        b();
                    }
                }
            }
        });
    } else if (qNums == 3) {
        bootbox.dialog({
            message: message,
            title: "New Food",
            buttons: {
                success: {
                    label: button1,
                    className: "btn-success",
                    callback: function() {
                        a();
                    }
                },
                danger: {
                    label: button2,
                    className: "btn-danger",
                    callback: function() {
                        b();
                    }
                },
                main: {
                    label: button3,
                    className: "btn-primary",
                    callback: function() {
                        c();
                    }
                }
            }
        });
    }
}

/* Extra code
var arr = $('#dougTable > tbody > tr').map(function() {
return $(this).children().map(function() {
return $(this);
});
});
arr[i][0].text(object.get("mealTime"));
arr[i][1].text(object.get("stationID"));
arr[i][2].text(object.get("foodItem"));
arr[i][3].text(object.get("cal"));
*/
