//
//  ViewController.swift
//  HireRoc
//
//  Created by Jacob Niebloom on 3/12/15.
//  Copyright (c) 2015 Phatapps Development, LLC. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

	@IBOutlet var Title: UINavigationBar!

	@IBOutlet var userField: UITextField!
	@IBOutlet var passField: UITextField!
	
	
	@IBOutlet var login: UIButton!
	@IBOutlet var newAccount: UIButton!

	@IBAction func loginAction(sender: AnyObject) {
		let storyBoard : UIStoryboard = UIStoryboard(name: "Main", bundle:nil)
		let newViewController = storyBoard.instantiateViewControllerWithIdentifier("home") as Home
		self.presentViewController(newViewController, animated:true, completion:nil)
	}
	@IBAction func newAccountAction(sender: AnyObject) {
	}
	
	override func viewDidLoad() {
		super.viewDidLoad()
		login.setTitle("Login", forState: UIControlState())
		newAccount.setTitle("Create a New Account!!", forState: UIControlState())
		Title.topItem?.title = "HireRoc"
	}

	override func didReceiveMemoryWarning() {
		super.didReceiveMemoryWarning()
		// Dispose of any resources that can be recreated.
	}


}

