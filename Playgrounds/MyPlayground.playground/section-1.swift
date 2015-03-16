// Playground - noun: a place where people can play

import UIKit

var str = "Hello, playground"
let appName = "HireRoc"

var list = ["test1", "test2"]
for item in list {
	println(item)
}

var optional: Int?
optional = 5

if let num = optional {
	println(num)
}


println("\nRanged For")
for i in 0...3 {
	println(i)
}

func fact(n: Int) -> Int {
	if n == 0 {
		return 1
	}
	return n * fact(n - 1)
}

println(fact(5))

func sumOf(numbers: Int...) -> Int {
	var sum = 0
	for number in numbers {
		sum += number
	}
	return sum
}

class NamedShape {
	var numberOfSides: Int = 0
	var name: String
	
	init(name: String) {
		self.name = name
	}
	
	func simpleDescription() -> String {
		return "A shape with \(numberOfSides) sides."
	}
}

class Square: NamedShape {
	var sideLength: Double
	
	init(sideLength: Double, name: String) {
		self.sideLength = sideLength
		super.init(name: name)
		numberOfSides = 4
	}
	
	func area() ->  Double {
		return sideLength * sideLength
	}
	
	override func simpleDescription() -> String {
		return "A square with sides of length \(sideLength)."
	}
}

let testSquare = Square(sideLength: 5.2, name: "my test square")
testSquare.area()
testSquare.simpleDescription()
















