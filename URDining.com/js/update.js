// Parse.initialize("dUWpFIH0Iv7AGTYW5ps6TkYScmxjG1LgX8hIlfNV", "XSET46QVsV1VfewbHB0T5VoOPyaYpRIoowhtc7vF");
fullweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
url = "http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=1&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True"
function update() {
    console.log("update");
    $.get(url, function (data) {
   console.log(url);
   console.log(data);
  });
}


function send() {
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({
        foo: "bar"
    }, {
        success: function(object) {
            $(".success").show();
        },
        error: function(model, error) {
            $(".error").show();
        }
    });
}
