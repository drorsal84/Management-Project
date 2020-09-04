package com.shidroogim.enums;

public enum WorkStage {
	
	AO("AO"), // Active Offer.
	OH("OH"), // Offer History.
	AJ("AJ"), // Active Job.
	JH("JH"); // Job History
	
	private final String workStage;

	private WorkStage(String name) {
		workStage = name;
	}
	
	public String getWorkStageName() {
		return workStage;
	}


}
