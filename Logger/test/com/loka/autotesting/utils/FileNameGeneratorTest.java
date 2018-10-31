package com.loka.autotesting.utils;

import org.junit.Before;
import org.junit.Test;

import java.util.Calendar;
import java.util.GregorianCalendar;

public class FileNameGeneratorTest {
	private ReportFileNamesGenerator generator;
	private Calendar calendar;
	String suiteName;
	String buildNumber;

	@Before
	public void setUp() throws Exception {
		generator = new ReportFileNamesGenerator();
		calendar = new GregorianCalendar(2014,1,2,3,44,55);
		suiteName = "test_suite_name";
		buildNumber = "1234";
	}

	@Test
	public void createFileNameGenerator() {
		new ReportFileNamesGenerator();
	}

	@Test
	public void generateValidFileNameOnSuiteNameBuildNumberAndDate() {
		String generatedName = generator.generateFileName(suiteName, buildNumber, calendar.getTime());
		assert  generatedName.equals("test_suite_name #1234 Sun Feb 02 2014 03-44-55"):"Name generated doesn't match expected name: "+generatedName;
	}

	@Test
	public void generateValidFileNameOnSuiteNameAndDate() {
		String generatedName = generator.generateFileName(suiteName, calendar.getTime());
		assert generatedName.equals("test_suite_name Sun Feb 02 2014 03-44-55"):"Name generated doesn't match expected name: "+generatedName;
	}

	@Test
	public void generateValidFileNameOnDate() {
		String generatedName = generator.generateFileName(calendar.getTime());
		assert generatedName.equals("Sun Feb 02 2014 03-44-55"):"Name generated doesn't match expected name: "+generatedName;
	}
}
