//
//  SetProfileData.swift
//  HireRoc
//
//  Created by Jacob Niebloom on 3/28/15.
//  Copyright (c) 2015 Phatapps Development, LLC. All rights reserved.
//

import UIKit

class SetProfileData: UIViewController {
	var user: PFUser;
	
	@IBOutlet var firstNameField: UITextField!
	@IBOutlet var lastNameField: UITextField!
	@IBOutlet var ageField: UITextField!
	
	required init(coder:NSCoder) {
		self.user = PFUser.currentUser()
		super.init(coder:coder)
	}
	
	override func viewDidLoad() {
		super.viewDidLoad()
	}
	
	@IBAction func setProfileData(sender: AnyObject) {
		if firstNameField.text != "" && lastNameField.text != "" &&
			ageField.text	   != "" {
				var query = PFQuery(className:"UserDetails")
				query.whereKey("username", equalTo: self.user.username)
				query.findObjectsInBackgroundWithBlock {
					(objects: [AnyObject]!, error: NSError!) -> Void in
					if error == nil {
						if (objects.count == 1) {
							if let objects = objects as? [PFObject] {
								objects[0]["first"] = self.firstNameField.text
								objects[0]["last"] = self.lastNameField.text
								objects[0]["age"] = self.ageField.text.toInt()
								objects[0].saveInBackgroundWithBlock {
									(succeeded: Bool!, error: NSError!) -> Void in
									if succeeded == true {
										let storyBoard : UIStoryboard = UIStoryboard(name: "Main", bundle:nil)
										let newViewController = storyBoard.instantiateViewControllerWithIdentifier("home") as Home
										self.presentViewController(newViewController, animated:true, completion:nil)
									}
								}
							}
						} else {
							var newObj = PFObject(className:"UserDetails")
							newObj["username"] = self.user.username
							newObj["first"] = self.firstNameField.text
							newObj["last"] = self.lastNameField.text
							newObj["age"] = self.ageField.text.toInt()
							newObj.saveInBackgroundWithBlock {
								(success: Bool, error: NSError!) -> Void in
								if (success) {
									let storyBoard : UIStoryboard = UIStoryboard(name: "Main", bundle:nil)
									let newViewController = storyBoard.instantiateViewControllerWithIdentifier("home") as Home
									self.presentViewController(newViewController, animated:true, completion:nil)
								} else {
									
								}
							}
						}
					} else {
						println("Error: \(error) \(error.userInfo!)")
					}
				}
				
		}
		else {
			let alertController = UIAlertController(title: "HireRoc", message:
				"Missing Information", preferredStyle: UIAlertControllerStyle.Alert)
			alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.Default,handler: nil))
			self.presentViewController(alertController, animated: true, completion: nil)
		}
	}
}