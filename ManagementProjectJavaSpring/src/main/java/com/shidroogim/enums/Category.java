package com.shidroogim.enums;

public enum Category {

	CAM("מצלמות"), 
	DVR("DVR"),
	DET("גלאים"),
	SIR("סירנות"),
	KEY("לוח מקשים"),
	CON("רכזות"),
	INT("אינטרקום"),
	COD("קודנים"),
	BUT("לחצנים לאינטרקום"),
	LOC("מנעולים חשמליים"),
	BAT("סוללות"),
	POW("ספקי כוח"),
	ACC("ציוד נלווה");
	
	private final String category;

	private Category(String name) {
		category = name;
	}
	
	public String getCatName() {
		return category;
	}

}
