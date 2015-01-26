import json
from urllib.request import urlopen

sites   = ["http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=1&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=16&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=17&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DanforthFreshFoodCompany.htm?LocationName=Danforth%20Fresh%20Food%20Company&MealID=16&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DanforthFreshFoodCompany.htm?LocationName=Danforth%20Fresh%20Food%20Company&MealID=17&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True"]
fullweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
restaurants = ["Douglas Breakfast", "Douglas Lunch", "Douglas Dinner","Danforth Lunch","Danforth Dinner"]
dataArray = []
restaurantNum = -1
stationNum = 0
stationDayNum = 0

def getPageSource(url):
	html = urlopen(url)
	pageSource = html.read()
	return str(pageSource)
def processElem(inpStr, depth):
	global restaurantNum, stationNum, stationDayNum
	inpStr = inpStr.split("</td>")[0]
	inpStr = inpStr.split("\"")[0]
	if depth == 1:
		dataArray[restaurantNum].append([inpStr])
	if depth == 2:
		dataArray[restaurantNum][stationNum].append([inpStr])
	if depth == 3:
		dataArray[restaurantNum][stationNum][stationDayNum].append(inpStr)
def processPageSource(site, week):
	global restaurantNum, stationNum, stationDayNum
	stationNum = 0
	dayNum = 0
	restaurantNum += 1
	pageSource = getPageSource(site)
	pageSource = str(pageSource).split("<body>")[1]
	pageSource = pageSource.replace("\\n","")
	pageSource = pageSource.replace("\\r","")
	pageSource = pageSource.replace("\\","")
	pageSource = str(pageSource).split("ConceptTabText\">")
	dataArray.append([restaurants[restaurantNum]])
	for ConceptTabText in pageSource[1:]:
		stationDayNum = 0
		stationNum += 1
		processElem(ConceptTabText, 1)
		menuBorder = str(ConceptTabText).split("menuBorder")
		for dayMenu in menuBorder[1:]:
			if "menuTxt" in dayMenu:
				processElem(week[dayNum], 2)
				stationDayNum += 1
				dayNum += 1
			else:
				dayNum += 1
				continue
			menuText = dayMenu.split("menuTxt")
			for dayItem in menuText:
				rnSplit = dayItem.split("RN=")
				if len(rnSplit) > 1:
					processElem(rnSplit[1], 3)
		dayNum = 0

for site in sites:
	processPageSource(site, fullweek)
with open('data.txt', 'w') as outfile:
	json.dump(dataArray, outfile, indent=4, separators=(',', ': '))


