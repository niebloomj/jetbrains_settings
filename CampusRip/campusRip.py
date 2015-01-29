import json
from urllib.request import urlopen

date = "1_25_2015"

sites   = ["http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=1&OrgID=195030&Date="+date+"&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=16&OrgID=195030&Date="+date+"&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=17&OrgID=195030&Date="+date+"&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DanforthFreshFoodCompany.htm?LocationName=Danforth%20Fresh%20Food%20Company&MealID=16&OrgID=195030&Date="+date+"&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DanforthFreshFoodCompany.htm?LocationName=Danforth%20Fresh%20Food%20Company&MealID=17&OrgID=195030&Date="+date+"&ShowPrice=False&ShowNutrition=True"]
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
		if "BREAKFAST PASTRIES" in ConceptTabText:
			processElem("BP", 1)
		elif "GRILL" in ConceptTabText:
			processElem("G", 1)
		elif "DESSERT" in ConceptTabText:
			processElem("D", 1)
		elif "HOME ZONE" in ConceptTabText:
			processElem("HZ", 1)
		elif "PIZZA" in ConceptTabText:
			processElem("P", 1)
		elif "PRODUCE MARKET" in ConceptTabText:
			processElem("PM", 1)
		elif "BISTRO HOME ZONE" in ConceptTabText:
			processElem("BHZ", 1)
		elif "BRICK OVEN" in ConceptTabText:
			processElem("BO", 1)
		elif "DESSERT" in ConceptTabText:
			processElem("D", 1)
		elif "DELI/CHANGE" in ConceptTabText:
			processElem("DELI", 1)
		elif "MONGOLIAN GRILL" in ConceptTabText:
			processElem("MG", 1)
		elif "SAUTE" in ConceptTabText:
			processElem("SAUTE", 1)
		elif "SOUP" in ConceptTabText:
			processElem("SOUP", 1)
		elif "VEGAN" in ConceptTabText:
			processElem("VEGAN", 1)
		else:
			print(ConceptTabText)
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
				nutSplit = dayItem.split('<a href="')
				if len(nutSplit) > 1:
					nutSplit = nutSplit[1].split('"')[0]
					nutSplit = nutSplit.replace(" ","%20")
					rnSplit = nutSplit.split("RN=")[1].replace("%20"," ")
					print(nutSplit)
					try:
						nutritionSource = getPageSource(nutSplit)
						calories = nutritionSource.split("lblCal")[1]
						calories = calories.split('RDANutValue">')[1]
						calories = calories.split('<')[0]
						protein = nutritionSource.split("lblProtein")[1]
						protein = protein.split('RDANutValue">')[1]
						protein = protein.split('<')[0]
						carb = nutritionSource.split("lblCarb")[1]
						carb = carb.split('RDANutValue">')[1]
						carb = carb.split('<')[0]
						colest = nutritionSource.split("lblColest")[1]
						colest = colest.split('RDANutValue">')[1]
						colest = colest.split('<')[0]
						dataArray[restaurantNum][stationNum][stationDayNum].append(rnSplit.title() +"," +calories+"," +protein+"," +carb+"," +colest)
					except:
						dataArray[restaurantNum][stationNum][stationDayNum].append(rnSplit.title() + ",0,0,0,0")
		dayNum = 0

for site in sites:
	processPageSource(site, fullweek)
with open(date+'.json', 'w') as outfile:
	json.dump(dataArray, outfile, indent=4, separators=(',', ': '))


