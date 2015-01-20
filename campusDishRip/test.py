from urllib.request import urlopen

def printElem(inpStr):
	inpStr = inpStr.split("</td>")[0]
	inpStr = inpStr.split("\"")[0]
	if (len(inpStr) < 60):
		print (inpStr)
def getPageSource(url):
	html = urlopen(url)
	pagesource = html.read()
	pagesource = str(pagesource).split("<body>")[1]
	pagesource = pagesource.replace("\\n","")
	pagesource = pagesource.replace("\\r","")
	pagesource = pagesource.replace("\\","")
	pagesource = str(pagesource).split("ConceptTabText\">")
	return pagesource

pagesource = getPageSource("http://www.campusdish.com/en-US/CSNE/Rochester/Menus/DouglassDiningCenter.htm")
weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
fullweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
dayNum = 8

for ConceptTabText in pagesource[1:]:
	rn = str(ConceptTabText).split("RN=")
	for elem in rn:
		if "RecipeTable" in elem:
			try:
				weekdays[dayNum]
			except:
				dayNum = 0
				printElem(elem)
			print("\n"+weekdays[dayNum])
			dayNum += 1
			continue
		printElem(elem)
	print("")