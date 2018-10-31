package com.loka.autotesting.logger.traceTargets;

import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposer;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class LoggerTraceTargetWithReportTest extends LoggerTraceTargetWithReport {
	private String testSuiteName;
	private String testBuildNumber;
	private Date testStartDate;
	private String expectedFullReportName;
	private String expectedReportNameWithoutBuildNumber;

	@Mock
	private ReportComposer mockReportComposer;

	public LoggerTraceTargetWithReportTest() {
		super(Mockito.mock(ReportComposer.class));
	}

	@Before
	public void setUp() throws Exception {
		Calendar calendar = new GregorianCalendar(2014, 1, 2, 3, 44, 55);
		testStartDate = calendar.getTime();
		testSuiteName = "suite1";
		testBuildNumber = "123";
		expectedFullReportName = "suite1 #123 Sun Feb 02 2014 03-44-55";
		expectedReportNameWithoutBuildNumber = "suite1 Sun Feb 02 2014 03-44-55";
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testSetSuiteName() throws Exception {
		super.setSuiteName(this.testSuiteName);
		assert super.suiteName.equals(this.testSuiteName) : "suiteName wasn't set";
	}

	@Test
	public void testSetNullAsSuiteName() throws Exception {
		super.setSuiteName(null);
		assert super.suiteName.equals("unknown suite") : "suiteName is invalid";
	}

	@Test
	public void testSetBuildNumber() throws Exception {
		super.setBuildNumber(this.testBuildNumber);
		assert super.buildNumber.equals(this.testBuildNumber) : "buildNumber wasn't set";
	}

	@Test
	public void testSetTestStartDate() throws Exception {
		super.setStartDate(this.testStartDate);
		assert super.startDate.equals(this.testStartDate) : "startDate wasn't set";
	}

	@Test
	public void testSetReportComposer() throws Exception {
		super.setReportComposer(mockReportComposer);
		assert super.reportComposer != null : "mockReportComposer wasn't set";
	}

	@Test
	public void testGetReportFullFileName() throws Exception {
		super.setSuiteName(this.testSuiteName);
		super.setBuildNumber(this.testBuildNumber);
		super.setStartDate(this.testStartDate);
		String fileName = super.getReportName();
		String expectedFileName = expectedFullReportName;
		assert fileName.equals(expectedFileName) : "Report file name is incorrect: " + fileName + ", expected: " + expectedFileName;
	}

	@Test
	public void testGetReportFileNameBySystemProperties() throws Exception {
		super.setSuiteName(this.testSuiteName);
		super.setBuildNumber(null);
		super.setStartDate(this.testStartDate);
		String expectedFileName = "suite1";
		System.setProperty("reportName", expectedFileName);
		String fileName = super.getReportName();
		assert fileName.equals(expectedFileName) : "Report file name is incorrect: " + fileName + ", expected: " + expectedFileName;
	}

	@Test
	public void testGetReportFileNameWithoutBuildNumber() throws Exception {
		super.setSuiteName(this.testSuiteName);
		super.setBuildNumber(null);
		super.setStartDate(this.testStartDate);
		String fileName = super.getReportName();
		String expectedFileName = expectedReportNameWithoutBuildNumber;
		assert fileName.equals(expectedFileName) : "Report file name is incorrect: " + fileName + ", expected: " + expectedFileName;
	}

	@Test
	public void testInitialization() throws Exception {
		super.setSuiteName(null);
		super.setBuildNumber(null);
		super.setStartDate(null);
		super.setReportComposer(mockReportComposer);
		System.setProperty("suite", testSuiteName);
		System.setProperty("build.number", testBuildNumber);
		super.init(new Date());
		assert super.startDate.compareTo(new Date()) < 1 : "Date created is not \"now\"";
		assert super.suiteName.equals(testSuiteName);
		assert super.buildNumber.equals(testBuildNumber);
		assert super.reportComposer == mockReportComposer;
		Mockito.verify(mockReportComposer).startReport(Matchers.anyString(), Matchers.anyString());
	}

	@Test
	public void testLog() throws Exception {
		String caption = "caption";
		LogType logType = LogType.LOG;
		String descriptionLine1 = "descriptionLine1";
		String descriptionLine2 = "descriptionLine2";
		String descriptionLine3 = "descriptionLine3";
		super.setReportComposer(mockReportComposer);
		Date date = new Date();
		super.log(caption, date, logType, descriptionLine1, descriptionLine2, descriptionLine3);
		Mockito.verify(mockReportComposer).addReportItem(caption, date, logType, descriptionLine1, descriptionLine2, descriptionLine3);
	}
}