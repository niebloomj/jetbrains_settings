from urllib.request import urlopen
import execjs
fullweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

def getPageSource(url):
	html = urlopen(url)
	pageSource = html.read()
	return str(pageSource)
def printElem(inpStr):
	inpStr = inpStr.split("</td>")[0]
	inpStr = inpStr.split("\"")[0]
	if (len(inpStr) < 60):
		print (inpStr)
def processPageSource(site, week):
	dayNum = 0
	pageSource = getPageSource(site)
	pageSource = str(pageSource).split("<body>")[1]
	pageSource = pageSource.replace("\\n","")
	pageSource = pageSource.replace("\\r","")
	pageSource = pageSource.replace("\\","")
	pageSource = str(pageSource).split("ConceptTabText\">")
	for ConceptTabText in pageSource[1:]:
		print("")
		printElem(ConceptTabText)
		menuBorder = str(ConceptTabText).split("menuBorder")
		for dayMenu in menuBorder[1:]:
			if "menuTxt" in dayMenu:
				try:
					week[dayNum]
				except:
					dayNum = 0
					printElem(dayMenu)
				print("\n"+week[dayNum])
				dayNum += 1
			else:
				dayNum += 1
				continue
			menuText = dayMenu.split("menuTxt")
			for dayItem in menuText:
				if len(dayItem.split("RN=")) > 1:
					printElem(dayItem.split("RN=")[1])
		dayNum = 0


sites   = ["http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=1&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=16&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm?LocationName=Douglass%20Dining%20Center&MealID=17&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DanforthFreshFoodCompany.htm?LocationName=Danforth%20Fresh%20Food%20Company&MealID=16&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True",
		"http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DanforthFreshFoodCompany.htm?LocationName=Danforth%20Fresh%20Food%20Company&MealID=17&OrgID=195030&Date=1_18_2015&ShowPrice=False&ShowNutrition=True"]

print("Douglas Breakfast:\n")
processPageSource(sites[0], fullweek)
print("Douglas Lunch:\n")
processPageSource(sites[1], fullweek)
print("Douglas Dinner:\n")
processPageSource(sites[2], fullweek)
print("Danforth Lunch:\n")
processPageSource(sites[3], fullweek)
print("Danforth Dinner:\n")
processPageSource(sites[4], fullweek)



# ctx = execjs.compile("""
	
# 	Parse.initialize("aEGq7Uw6GgqbGZo8JWxPQAEYdxSgexrv9zLLXVJu", "ahEsV3cewyapjRJ7Wudks47q10eh9fGnerBb3pBy");
#     function sendToParse(dataToSend) {
#         return dataToSend;
#     }
	
# 	""")
# print(ctx.call("sendToParse", fullweek))




