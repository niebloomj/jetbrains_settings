//
//  Home.swift
//  HireRoc
//
//  Created by Jacob Niebloom on 3/16/15.
//  Copyright (c) 2015 Phatapps Development, LLC. All rights reserved.
//

import UIKit

class Home: UIViewController {
	var user: PFUser;
	
	
	required init(coder:NSCoder) {
		self.user = PFUser.currentUser()
		super.init(coder:coder)
	}
	
	
	override func viewDidLoad() {
		super.viewDidLoad()
	}
	
	@IBAction func setMyProfile(sender: AnyObject) {
		let storyBoard : UIStoryboard = UIStoryboard(name: "Main", bundle:nil)
		let newViewController = storyBoard.instantiateViewControllerWithIdentifier("setProfileData") as SetProfileData
		self.presentViewController(newViewController, animated:true, completion:nil)
	}
	
	override func didReceiveMemoryWarning() {
		super.didReceiveMemoryWarning()
		// Dispose of any resources that can be recreated.
	}
	
	
	/*
	// MARK: - Navigation
	
	// In a storyboard-based application, you will often want to do a little preparation before navigation
	override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
	// Get the new view controller using segue.destinationViewController.
	// Pass the selected object to the new view controller.
	}
	*/
	
}
