package com.loka.autotesting.utils;

import com.loka.autotesting.BaseUnitTest;
import org.fest.assertions.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Locale;

@RunWith(Parameterized.class)
public class ReportFileNamesGeneratorTest extends BaseUnitTest {
	private final String fileType;
	private final String possiblePoint;
	private final Date dateForTest = new Date(5555);
	private final String dateForTestInString = new SimpleDateFormat("EEE MMM dd yyyy HH-mm-ss",Locale.US).format(dateForTest);

	public ReportFileNamesGeneratorTest(String fileType) {
		this.fileType = fileType;
		possiblePoint = fileType.isEmpty() ? "" : ".";
	}

	@Parameterized.Parameters()
	public static Collection primeNumbers() {
		return Arrays.asList(new Object[][]{
				{""},
				{"png"},
				{"jpg"},
				{"bmp"},
				{".bmp"}
		});
	}

	@Test
	public void testGenerateFileName() throws Exception {
		String fileName = new ReportFileNamesGenerator(fileType).generateFileName(dateForTest);
		System.out.println("timeZone: " + System.getProperty("user.timezone"));
		System.out.println("fileName: " + fileName);
		System.out.println("expected fileName: " + dateForTestInString + possiblePoint + fileType);
		Assertions.assertThat(fileName).isEqualTo(dateForTestInString + possiblePoint + fileType);
	}

	@Test
	public void testGenerateFileNameWithSuiteName() throws Exception {
		String fileName = new ReportFileNamesGenerator(fileType).generateFileName("Suite Name", dateForTest);
		Assertions.assertThat(fileName).isEqualTo("Suite Name " + dateForTestInString + possiblePoint + fileType);
	}

	@Test
	public void testGenerateFileNameSuiteNameAndBuildNumber() throws Exception {
		String fileName = new ReportFileNamesGenerator(fileType).generateFileName("Suite Name", "1.2.1", dateForTest);
		Assertions.assertThat(fileName).isEqualTo("Suite Name #1.2.1 " + dateForTestInString + possiblePoint + fileType);
	}

	@Test
	public void testGenerateFileNameWithMilliSeconds() throws Exception {
		String fileName = new ReportFileNamesGenerator(fileType).generateFileNameWithMilliSeconds(dateForTest);
		Assertions.assertThat(fileName).isEqualTo(dateForTestInString + ".555" + possiblePoint + fileType);
	}
}