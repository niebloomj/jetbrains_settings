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
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
dayNum = 15

for ConceptTabText in pagesource:
	rn = str(ConceptTabText).split("RN=")
	for elem in rn:
		if "RecipeTable" in elem:
			try:
				test = days[dayNum] != "testNoPrint"
			except:
				printElem(elem)
				dayNum = 0
			print("\n"+days[dayNum])
			dayNum += 1
			continue
		printElem(elem)
	print("")