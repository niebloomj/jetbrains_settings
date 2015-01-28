// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
// Parse.Cloud.define("hello", function(request, response) {
//   response.success("Hello world!");
// });
var Menu = Parse.Object.extend("Menu");

// Check if stopId is set, and enforce uniqueness based on the stopId column.
Parse.Cloud.beforeSave("Menu", function(request, response) {
    if (!request.object.get("Restaurant") || !request.object.get("serveDate")) {
        response.error("Missing Data");
    } else if (!request.object.get("stationID") || !request.object.get("mealTime")) {
        response.error("Missing Data");
    } else if (!request.object.get("foodItem")) {
        response.error("Missing Data");
    } else {
        var query = new Parse.Query(Menu);
        query.equalTo("Restaurant", request.object.get("Restaurant"));
        query.equalTo("serveDate", request.object.get("serveDate"));
        query.equalTo("stationID", request.object.get("stationID"));
        query.equalTo("mealTime", request.object.get("mealTime"));
        query.equalTo("foodItem", request.object.get("foodItem"));
        query.first({
            success: function(object) {
                if (object) {
                    response.error("Food already exists");
                } else {
                    response.success();
                }
            },
            error: function(error) {
                response.error("Could not validate uniqueness for this foodItem object.");
            }
        });
    }
});
