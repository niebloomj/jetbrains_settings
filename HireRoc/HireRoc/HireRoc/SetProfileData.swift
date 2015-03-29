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
	
	required init(coder:NSCoder) {
		self.user = PFUser.currentUser()
		super.init(coder:coder)
	}
	
	override func viewDidLoad() {
		super.viewDidLoad()
	}
	
	func setProfileData(){
		var newObj = PFObject(className:"UserDetails")
		newObj["username"] = self.user.username
		newObj["first"] = "Jacob"
		newObj["last"] = "Niebloom"
		newObj["age"] = 18
		newObj.saveInBackgroundWithBlock {
			(success: Bool, error: NSError!) -> Void in
			if (success) {
				println("YAY")
			} else {
				
			}
		}
	}
}