from urllib.request import urlopen

def printElem(inpStr):
	inpStr = inpStr.split("</td>")[0]
	inpStr = inpStr.split("\"")[0]
	if (len(inpStr) < 60):
		print (inpStr)
def getPageSource(url):
	html = urlopen(url)
	pagesource = html.read()
	return pagesource
def processPageSource(inputPageSource, week):
	pageSource = str(inputPageSource).split("<body>")[1]
	pageSource = pageSource.replace("\\n","")
	pageSource = pageSource.replace("\\r","")
	pageSource = pageSource.replace("\\","")
	pageSource = str(pageSource).split("ConceptTabText\">")
	for ConceptTabText in pageSource[1:]:
		rn = str(ConceptTabText).split("RN=")
		for elem in rn:
			if "RecipeTable" in elem:
				try:
					week[dayNum]
				except:
					dayNum = 0
					printElem(elem)
				print("\n"+week[dayNum])
				dayNum += 1
				continue
			printElem(elem)
		print("")

douglas = "http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm"
sites   = ["http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=1&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=16&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=17&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DanforthFreshFoodCompany.htm?LocationName=Danforth%20Fresh%20Food%20Company&MealID=16&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DanforthFreshFoodCompany.htm?LocationName=Danforth%20Fresh%20Food%20Company&MealID=17&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True"]
weeklist = {"dougDinnerWeek":["Monday", "Tuesday", "Wednesday", "Thursday"],
			"weekdays":["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			"fullweek":["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}
dayNum = 8

print("Douglas Breakfast:\n")
processPageSource(getPageSource(sites[0]), weeklist["weekdays"])
print("Douglas Lunch:\n")
processPageSource(getPageSource(sites[1]), weeklist["weekdays"])
print("Douglas Dinner:\n")
processPageSource(getPageSource(sites[2]), weeklist["dougDinnerWeek"])
# print("Danforth Lunch:\n")
# processPageSource(getPageSource(sites[3]), weeklist["fullweek"])
# print("Danforth Dinner:\n")
# processPageSource(getPageSource(sites[4]), weeklist["fullweek"])