package com.entrofine.ifactor.app.script.init;

public class DataInitScript {

	public static void main(String[] args) throws Exception {
		CatalogInitScript.main(args);
		QuestionInitScript.main(args);
		ResourceInitScript.main(args);
		MenuInitScript.main(args);
		RoleInitScript.main(args);
		UserInitScript.main(args);
	}
}