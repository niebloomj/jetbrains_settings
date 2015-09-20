//
//  ViewController.swift
//  HireRoc
//
//  Created by Jacob Niebloom on 3/12/15.
//  Copyright (c) 2015 Phatapps Development, LLC. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
	//NavBar
	@IBOutlet var Title: UINavigationBar!
	//UITextFields
	@IBOutlet var userField: UITextField!
	@IBOutlet var passField: UITextField!
	@IBOutlet var emailField: UITextField!
	//UIButton
	@IBOutlet var login: UIButton!
	@IBOutlet var newAccount: UIButton!
	
	override func viewDidLoad() {
		super.viewDidLoad()
		login.setTitle("Login", forState: UIControlState())
		newAccount.setTitle("Create a New Account!!", forState: UIControlState())
		Title.topItem?.title = "HireRoc"
		
		//Current User
		var currentUser = PFUser.currentUser()
		if currentUser != nil {
			userField.text = currentUser.username
		}
	}
	
	@IBAction func loginAction(sender: AnyObject) {
		PFUser.logInWithUsernameInBackground(userField.text, password:passField.text) {
			(user: PFUser!, error: NSError!) -> Void in
			if user != nil {
				
				//Check if the email is verified
				if user["emailVerified"] as Bool == true {
					self.loginSuccessful()
				} else {
					let alertController = UIAlertController(title: "HireRoc", message:
						"Email not verified.", preferredStyle: UIAlertControllerStyle.Alert)
					alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.Default,handler: nil))
					self.presentViewController(alertController, animated: true, completion: nil)
				}
				self.loginSuccessful()
			} else {
				let errorString = error.userInfo?.description
				let alertController = UIAlertController(title: "HireRoc", message:
					errorString, preferredStyle: UIAlertControllerStyle.Alert)
				alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.Default,handler: nil))
				self.presentViewController(alertController, animated: true, completion: nil)
			}
		}
	}
	
	@IBAction func newAccountAction(sender: AnyObject) {
		//Missing Fields??
		if userField.text == "" || passField.text == "" || emailField.text == "" {
			let alertController = UIAlertController(title: "HireRoc", message:
				"Missing Information", preferredStyle: UIAlertControllerStyle.Alert)
			alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.Default,handler: nil))
			self.presentViewController(alertController, animated: true, completion: nil)
			return
		}
		
		//Create the User
		var user = PFUser()
		user.username = userField.text
		user.password = passField.text
		user.email = emailField.text
		
		//Sign Up
		user.signUpInBackgroundWithBlock {
			(succeeded: Bool!, error: NSError!) -> Void in
			if error == nil {
				let alertController = UIAlertController(title: "HireRoc", message:
					"You will receive an email from us. Once you verify your email, you will be able to come back and use the app.", preferredStyle: UIAlertControllerStyle.Alert)
				alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.Default,handler: nil))
				self.presentViewController(alertController, animated: true, completion: nil)
			} else {
				let errorString = error.userInfo?.description
				let alertController = UIAlertController(title: "HireRoc", message:
					errorString, preferredStyle: UIAlertControllerStyle.Alert)
				alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.Default,handler: nil))
				self.presentViewController(alertController, animated: true, completion: nil)
			}
		}
	}
	
	func loginSuccessful() {
		var query = PFQuery(className:"UserDetails")
		query.whereKey("username", equalTo:PFUser.currentUser().username)
		query.findObjectsInBackgroundWithBlock {
			(objects: [AnyObject]!, error: NSError!) -> Void in
			println(objects.count)
			//Main View
			if error == nil && objects.count == 1{
				let storyBoard : UIStoryboard = UIStoryboard(name: "Main", bundle:nil)
				let newViewController = storyBoard.instantiateViewControllerWithIdentifier("home") as Home
				self.presentViewController(newViewController, animated:true, completion:nil)
			} else if (error != nil){
				println("Error: \(error) \(error.userInfo!)")
			} else {//Set Profile Data
				let storyBoard : UIStoryboard = UIStoryboard(name: "Main", bundle:nil)
				let newViewController = storyBoard.instantiateViewControllerWithIdentifier("setProfileData") as SetProfileData
				self.presentViewController(newViewController, animated:true, completion:nil)
			}
		}
		
	}
	
	override func didReceiveMemoryWarning() {
		super.didReceiveMemoryWarning()
		// Dispose of any resources that can be recreated.
	}
	
	
}

