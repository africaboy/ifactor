package com.entrofine.ifactor.mgt.script;

import java.io.File;
import java.io.FileInputStream;

import jt.classic.system.table.TableDataRestore;

import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.ddshell.framework.app.script.DbInitScript;

@Lazy(false)
@Component
@DependsOn("dataInitScript")
public class UserInitScript extends DbInitScript {

	public static void main(String[] args) throws Exception {
		init(UserInitScript.class);
	}

	@Override
	public void init(File datafile) throws Exception {
		FileInputStream in = new FileInputStream(datafile);
		try {
			new TableDataRestore().restore(in);
		} finally {
			in.close();
		}
	}

}
