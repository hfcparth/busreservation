package com.lti.busreservation.service;

import com.lti.busreservation.models.Admin;

public interface Adminservice {
	public boolean verifyData(String email,String password);
	public boolean registerData(Admin ad);
}
