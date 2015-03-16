//
//  ViewController.swift
//  HireRoc
//
//  Created by Jacob Niebloom on 3/12/15.
//  Copyright (c) 2015 Phatapps Development, LLC. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

	@IBOutlet var TestButton: UIButton!
	@IBOutlet var Title: UINavigationBar!
	
	@IBAction func ButtonPressed(sender: AnyObject) {
		println("Hello world")
	}


	
	override func viewDidLoad() {
		super.viewDidLoad()
		TestButton.setTitle("It Worked", forState: UIControlState())
		Title.setValue("Hi", forKey: "Title")
		// Do any additional setup after loading the view, typically from a nib.
	}

	override func didReceiveMemoryWarning() {
		super.didReceiveMemoryWarning()
		// Dispose of any resources that can be recreated.
	}


}

