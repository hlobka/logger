package com.loka.autotesting.logger;

import com.loka.autotesting.utils.strings.StringAppender;

import java.util.ArrayList;
import java.util.List;

public class StackTraceUtils {
	public static String getStackTrace(Throwable cause, String excludePackage, String ...toPackages) {
		StackTraceElement[] stackTrace = cause.getStackTrace();
		List<String> stackTraceAsString = new ArrayList<>();
		int indexOfAvailablePackage = -1;
		int indexOfNotAvailablePackage = -1;
		for (int i = 0; i < stackTrace.length; i++) {
			StackTraceElement stackTraceElement = stackTrace[i];
			String stackTraceElementAsString = getStringAtStackTraceElement(stackTraceElement);
			for (String toPackage : toPackages) {
				if(stackTraceElementAsString.toLowerCase().contains(toPackage.toLowerCase())) {
					indexOfAvailablePackage = i;
					break;
				}
			}

			if(stackTraceElementAsString.contains(excludePackage)) {
				indexOfNotAvailablePackage = i;
			}
			stackTraceAsString.add(stackTraceElementAsString);
		}

		return getResult(stackTraceAsString, indexOfAvailablePackage, indexOfNotAvailablePackage);
	}

	private static String getStringAtStackTraceElement(StackTraceElement stackTraceElement) {
		return "\tat "+ stackTraceElement.toString();
	}

	private static String getResult(List<String> stackTraceAsString, int indexOfAvailablePackage, int indexOfNotAvailablePackage) {
		StringAppender result = new StringAppender();
		if(indexOfAvailablePackage>0){
			if(indexOfNotAvailablePackage>0 && indexOfNotAvailablePackage<indexOfAvailablePackage&& indexOfNotAvailablePackage+1<stackTraceAsString.size()){
				stackTraceAsString = stackTraceAsString.subList(indexOfNotAvailablePackage+1, indexOfAvailablePackage+1);
			} else {
				stackTraceAsString = stackTraceAsString.subList(0, indexOfAvailablePackage+1);
			}
		}
		for (String value : stackTraceAsString) {
			result.appendLn(value);
		}

		return result.toString();
	}
}
