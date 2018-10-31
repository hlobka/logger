package com.loka.autotesting.logger.utils;

import com.loka.autotesting.utils.strings.StringAppender;

public class StringUtils {
	public static String insertSpaceInMultiCaseStringAtCaps(String s) {
		if (s == null || s.isEmpty()) {
			return s;
		}
		char[] cArray = s.toCharArray();
		StringAppender result = new StringAppender();
		result = result.append(Character.toString(cArray[0]).toUpperCase());
		boolean isPrevCharUpperCase = true;
		char prevC = cArray[0];
		boolean isNextWillBeUpperCase = false;
		for (int i = 1; i < cArray.length; i++) {
			char c = cArray[i];
			boolean isUpperCase = (c >= 65 && c <= 90)||isNextWillBeUpperCase;
			isNextWillBeUpperCase = false;
			boolean isWhiteSpace = c == 32;
			boolean isNextUpperCaseUpperCase = false;
			if(cArray.length>i+1){
				char c1 = cArray[i + 1];
				isNextUpperCaseUpperCase = c1 >= 65 && c1 <= 90;
			}

			if (isUpperCase && !isPrevCharUpperCase && prevC!='_' && !isNextUpperCaseUpperCase) {
				result.append(" ", (Character.toString(c)).toLowerCase());
			} else if(isUpperCase && isNextUpperCaseUpperCase && prevC!='_'&& !isPrevCharUpperCase ){
				result.append(" ", c);
			} else if (isWhiteSpace) {
				isNextWillBeUpperCase = true;
			} else {
				result.append(c);

			}
			isPrevCharUpperCase = isUpperCase;
			prevC=c;
		}
		return result.toString();
	}

	public static String getDefaultStackTrace(Throwable cause) {
		StringAppender result = new StringAppender();
		for (StackTraceElement traceElement : cause.getStackTrace())
			result.appendLn("\tat " + traceElement);
		return result.toString();
	}

	public static String getStackTrace(Throwable cause) {
		return getStackTrace(cause, "org.testng");
	}
	public static String getStackTrace(Throwable cause, int startIndex) {
		return getStackTrace(cause, startIndex, "org.testng");
	}
	public static String getStackTrace(Throwable cause, String ...ignorePackageToTraceStackTraceRegEx) {
		return getStackTrace(cause, 0, ignorePackageToTraceStackTraceRegEx);
	}
	public static String getStackTrace(Throwable cause, int startIndex, String ...ignorePackageToTraceStackTraceRegEx) {
		StringAppender result = new StringAppender().appendLn("");
		if(cause != null) {
			int index = 0;
			for (StackTraceElement stackTraceElement : cause.getStackTrace()) {
				index++;
				if(stackTraceElement.getLineNumber()<0) {
					continue;
				}
				boolean isPackageInValid = isContains(stackTraceElement.getClassName(), ignorePackageToTraceStackTraceRegEx);
				boolean isIndexInValid = index <= startIndex;
				if(isPackageInValid || isIndexInValid) {
					continue;
				}
				String fileName = stackTraceElement.getFileName();
				if(fileName == null){
					break;
				}
				result.appendLn("").
						append(fileName.replaceAll("\\.java", "")).
						append(".").
						append(stackTraceElement.getMethodName()).
						append("()").
						append(":").
						append(stackTraceElement.getLineNumber());
			}
		}
		return result.toString();
	}

	private static boolean isContains(String s, String[] strngs) {
		for (String strng : strngs) {
			if(strng.contains(s)) return true;
		}
		return false;
	}
}