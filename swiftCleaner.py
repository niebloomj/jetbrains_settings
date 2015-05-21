import fileinput
import os
import sys

for root, dirs, files in os.walk("./URdining"):
	for file in files:
		if file.endswith(".swift"):

			print(os.path.join(root, file))

			f = open(os.path.join(root, file),'r')
			filedata = f.read()
			f.close()

			newdata = filedata
			newdata = filedata.split("\n")

			for x in range(len(newdata)):
				if "if" in newdata[x] and "else" not in newdata[x]:
					if newdata[x-1] != "":
						newdata[x] = "\n"+newdata[x]
					if newdata[x-2] != "":
						print("too many")
				if ":" in newdata[x]:
					index = newdata[x].find(":")
					try:
						if newdata[x][index - 1] != " ":
							newdata[x] = newdata[x][:index] + " " + newdata[x][index:]
						index = newdata[x].find(":")
						if newdata[x][index + 1] != " ":
							newdata[x] = newdata[x][:index + 1] + " " + newdata[x][index+ 1:]
					except Exception as e:
						pass
				if "->" in newdata[x]:
					index = newdata[x].find("->")
					try:
						if newdata[x][index - 1] != " ":
							newdata[x] = newdata[x][:index] + " " + newdata[x][index:]
						index = newdata[x].find("->")
						if newdata[x][index + 2] != " ":
							newdata[x] = newdata[x][:index + 2] + " " + newdata[x][index+ 2:]
					except Exception as e:
						pass
				if "{" in newdata[x]:
					index = newdata[x].find("{")
					try:
						if newdata[x][index - 1] != " ":
							newdata[x] = newdata[x][:index] + " " + newdata[x][index:]
					except Exception as e:
						pass
				if "==" in newdata[x]:
					index = newdata[x].find("==")
					try:
						if newdata[x][index - 1] != " ":
							newdata[x] = newdata[x][:index] + " " + newdata[x][index:]
						index = newdata[x].find("==")
						if newdata[x][index + 2] != " ":
							newdata[x] = newdata[x][:index + 2] + " " + newdata[x][index+ 2:]
					except Exception as e:
						pass
				if "," in newdata[x]:
					index = newdata[x].find(",")
					try:
						if newdata[x][index + 1] != " ":
							newdata[x] = newdata[x][:index + 1] + " " + newdata[x][index + 1:]
					except Exception as e:
						pass

			newdata = "\n".join(str(x) for x in newdata)
			newdata = newdata.replace("\n\n\n", "\n\n")
			print(newdata)

			f = open(os.path.join(root, file),'w')
			f.write(newdata)
			f.close()