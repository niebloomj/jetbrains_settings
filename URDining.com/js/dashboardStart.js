//http://www.w3schools.com/jsref/met_table_insertrow.asp
var dougStations = "D, PM, P, HZ, G, or B";
var danfStations = "VEGAN, SOUP, SAUTE, PM, MG, G, DELI, D, BO, or BHZ";

function dashboardLoad() {
    Parse.initialize("aEGq7Uw6GgqbGZo8JWxPQAEYdxSgexrv9zLLXVJu",
        "ahEsV3cewyapjRJ7Wudks47q10eh9fGnerBb3pBy");
    resetTables();

    $("#analytics").click(function() {
        event.preventDefault();
    });

    $("#addFood").click(function() {
        event.preventDefault();
        question(3, "Which dining hall?", "Douglas", "Danforth", "The Commons",
            function() {
                question(3, "Which time of food is this?", "Breakfast",
                    "Lunch", "Dinner",
                    function() {
                        bootbox.prompt("What stationID? - " + dougStations, function(stationID) {
                            if (stationID === null) {} else {
                                bootbox.prompt("What is that name of the dish?", function(dish) {
                                    if (dish === null) {} else {
                                        bootbox.prompt("How many calories are there per serving?", function(cal) {
                                            if (cal === null) {} else {
                                                var Table = Parse.Object.extend("DG_MENU")
                                                sendFoodToDB(Table, 1, stationID, dish, cal);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    },
                    function() {
                        bootbox.prompt("What stationID? - " + dougStations, function(stationID) {
                            if (stationID === null) {} else {
                                bootbox.prompt("What is that name of the dish?", function(dish) {
                                    if (dish === null) {} else {
                                        bootbox.prompt("How many calories are there per serving?", function(cal) {
                                            if (cal === null) {} else {
                                                var Table = Parse.Object.extend("DG_MENU")
                                                sendFoodToDB(Table, 2, stationID, dish, cal);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    },
                    function() {
                        bootbox.prompt("What stationID? - " + dougStations, function(stationID) {
                            if (stationID === null) {} else {
                                bootbox.prompt("What is that name of the dish?", function(dish) {
                                    if (dish === null) {} else {
                                        bootbox.prompt("How many calories are there per serving?", function(cal) {
                                            if (cal === null) {} else {
                                                var Table = Parse.Object.extend("DG_MENU")
                                                sendFoodToDB(Table, 3, stationID, dish, cal);
                                            }
                                        });
                                    }
                                });
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
                                bootbox.prompt("What is that name of the dish?", function(dish) {
                                    if (dish === null) {} else {
                                        bootbox.prompt("How many calories are there per serving?", function(cal) {
                                            if (cal === null) {} else {
                                                var Table = Parse.Object.extend("DF_Menu")
                                                sendFoodToDB(Table, 2, stationID, dish, cal);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    },
                    function() {
                        bootbox.prompt("What stationID? - " + danfStations, function(stationID) {
                            if (stationID === null) {} else {
                                bootbox.prompt("What is that name of the dish?", function(dish) {
                                    if (dish === null) {} else {
                                        bootbox.prompt("How many calories are there per serving?", function(cal) {
                                            if (cal === null) {} else {
                                                var Table = Parse.Object.extend("DF_Menu")
                                                sendFoodToDB(Table, 3, stationID, dish, cal);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    },
                    null)
            },
            function() {
                bootbox.prompt("What stationID? - Pizza, or Panda?", function(stationID) {
                    if (stationID === null) {} else {
                        bootbox.prompt("What is that name of the dish?", function(dish) {
                            if (dish === null) {} else {
                                bootbox.prompt("How many calories are there per serving?", function(cal) {
                                    if (cal === null) {} else {
                                        var Table = Parse.Object.extend("TC_Menu")
                                        sendFoodToDB(Table, 3, stationID, dish, cal);
                                    }
                                });
                            }
                        });
                    }
                });
            });
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
                                var list = "";
                                for (var i = 1, row; row = table.rows[i]; i++) {
                                    if (stationID == row.cells[1].innerText) {
                                        list += row.cells[2].innerText + ", ";
                                    }
                                }
                                console.log(list);
                                bootbox.prompt("Which food would you like to delete? - " + list, function(food) {
                                    if (food == null) {} else {
                                        console.log("deleting " + food);
                                        var Table = Parse.Object.extend("DG_MENU");
                                        var query = new Parse.Query(Table);
                                        query.equalTo("stationID", stationID);
                                        query.equalTo("foodItem", food);
                                        query.find({
                                            success: function(object) {
                                                if (object.length == 1) {
                                                    object[0].destroy({
                                                        success: function(object) {
                                                            bootbox.alert("Food removed successfully", function() {});
                                                        },
                                                        error: function(object, error) {}
                                                    })
                                                } else {
                                                    bootbox.alert("Failed. Either food doesn't exist or multiple references of this food exist.", function() {});
                                                }
                                                console.log(object);
                                            },
                                            error: function(object, error) {
                                                console.log(object + error);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                },
                danger: {
                    label: "Danforth",
                    className: "btn-danger",
                    callback: function() {
                        bootbox.prompt("What stationID? - " + danfStations, function(stationID) {
                            if (stationID === null) {} else {
                                var table = document.getElementById("danfTable");
                                var list = "";
                                for (var i = 1, row; row = table.rows[i]; i++) {
                                    if (stationID == row.cells[1].innerText) {
                                        list += row.cells[2].innerText + ", ";
                                    }
                                }
                                console.log(list);
                                bootbox.prompt("Which food would you like to delete? - " + list, function(food) {
                                    if (food == null) {} else {
                                        console.log("deleting " + food);
                                        var Table = Parse.Object.extend("DF_Menu");
                                        var query = new Parse.Query(Table);
                                        query.equalTo("stationID", stationID);
                                        query.equalTo("foodItem", food);
                                        query.find({
                                            success: function(object) {
                                                if (object.length == 1) {
                                                    object[0].destroy({
                                                        success: function(object) {
                                                            bootbox.alert("Food removed successfully", function() {});
                                                        },
                                                        error: function(object, error) {}
                                                    })
                                                } else {
                                                    bootbox.alert("Failed. Either food doesn't exist or multiple references of this food exist.", function() {});
                                                }
                                                console.log(object);
                                            },
                                            error: function(object, error) {
                                                console.log(object + error);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                },
                main: {
                    label: "The Commons",
                    className: "btn-primary",
                    callback: function() {
                        bootbox.prompt("What stationID? - ", function(stationID) {
                            if (stationID === null) {} else {
                                var table = document.getElementById("commTable");
                                var list = "";
                                for (var i = 1, row; row = table.rows[i]; i++) {
                                    if (stationID == row.cells[1].innerText) {
                                        list += row.cells[2].innerText + ", ";
                                    }
                                }
                                console.log(list);
                                bootbox.prompt("Which food would you like to delete? - " + list, function(food) {
                                    if (food == null) {} else {
                                        console.log("deleting " + food);
                                        var Table = Parse.Object.extend("TC_Menu");
                                        var query = new Parse.Query(Table);
                                        query.equalTo("stationID", stationID);
                                        query.equalTo("foodItem", food);
                                        query.find({
                                            success: function(object) {
                                                if (object.length == 1) {
                                                    object[0].destroy({
                                                        success: function(object) {
                                                            bootbox.alert("Food removed successfully", function() {});
                                                        },
                                                        error: function(object, error) {}
                                                    })
                                                } else {
                                                    bootbox.alert("Failed. Either food doesn't exist or multiple references of this food exist.", function() {});
                                                }
                                                console.log(object);
                                            },
                                            error: function(object, error) {
                                                console.log(object + error);
                                            }
                                        });
                                    }
                                });
                            }
                        });

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
                        bootbox.confirm("Are you sure?", function(result) {
                            if (result) {
                                console.log("DELETE");
                            }
                        });
                    }
                },
                danger: {
                    label: "Danforth",
                    className: "btn-danger",
                    callback: function() {
                        bootbox.confirm("Are you sure?", function(result) {
                            if (result) {
                                console.log("DELETE");
                            }
                        });
                    }
                },
                main: {
                    label: "The Commons",
                    className: "btn-primary",
                    callback: function() {
                        bootbox.confirm("Are you sure?", function(result) {
                            if (result) {
                                console.log("DELETE");
                            }
                        });
                    }
                }
            }
        });
    });

    $("#refreshFoods").click(function() {
        event.preventDefault();
        downloadAndSetTable("DG_MENU", "dougTable");
        downloadAndSetTable("DF_Menu", "danfTable");
        downloadAndSetTable("TC_Menu", "commTable");
        bootbox.alert("Food Refreshed", function() {});
    });
}

function sendFoodToDB(Table, mealTime, stationID, dish, calories) {
    var table = new Table();
    table.set("mealTime", mealTime);
    table.set("stationID", stationID);
    table.set("foodItem", dish);
    table.set("cal", calories);
    table.save(null, {
        success: function(table) {
            bootbox.alert("Food added successfully", function() {
                resetTables();
            });
        }
    });
}

function resetTables() {
    downloadAndSetTable("DG_MENU", "dougTable");
    downloadAndSetTable("DF_Menu", "danfTable");
    downloadAndSetTable("TC_Menu", "commTable");
}

function downloadAndSetTable(tableName, tableID) {
    var r = document.getElementById(tableID).rows.length;
    for (var i = 1; i < r; i++) {
        document.getElementById(tableID).deleteRow(1);
    }
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
