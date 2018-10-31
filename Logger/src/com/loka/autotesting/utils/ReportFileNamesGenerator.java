package com.loka.autotesting.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class ReportFileNamesGenerator {
	private final SimpleDateFormat dateFormatter;
	private final SimpleDateFormat dateFormatterWithMilliSeconds;
	private final String fileType;

	public ReportFileNamesGenerator(String fileType) {
		this.fileType = fileType.isEmpty()?"":"."+fileType;
		dateFormatter = new SimpleDateFormat("EEE MMM dd yyyy HH-mm-ss", Locale.US);
		dateFormatterWithMilliSeconds = new SimpleDateFormat("EEE MMM dd yyyy HH-mm-ss.S", Locale.US);
	}
	public ReportFileNamesGenerator() {
		this("");
	}

	public String generateFileName(String suiteName, String buildNumber, Date date) {
		return suiteName + " #" + buildNumber + " " + dateFormatter.format(date) + fileType;
	}

	public String generateFileName(String suiteName, Date date) {
		return suiteName + " " + dateFormatter.format(date) + fileType;
	}

	public String generateFileName(Date date) {
		return dateFormatter.format(date) + fileType;
	}

	public String generateFileNameWithMilliSeconds(Date date) {
		return dateFormatterWithMilliSeconds.format(date) + fileType;
	}
}
