package com.loka.autotesting.utils;

import java.lang.management.ManagementFactory;
import java.util.regex.Pattern;

public class Debug {
	private final static Pattern debugPattern = Pattern.compile("-Xdebubg|jdwp|debugMode");
	public static boolean isDebugging() {
		for (String arg : ManagementFactory.getRuntimeMXBean().getInputArguments()) {
			if (debugPattern.matcher(arg).find()) {
				return true;
			}
		}
		return System.getProperty("debugMode", "false").equals("true");
	}
}
