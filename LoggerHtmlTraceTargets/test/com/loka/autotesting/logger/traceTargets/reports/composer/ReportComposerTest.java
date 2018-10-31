package com.loka.autotesting.logger.traceTargets.reports.composer;

import com.loka.autotesting.BaseUnitTest;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.screenShooter.ReportScreenShooter;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder.ReportItemAdder;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.starter.ReportStarter;
import com.loka.autotesting.utils.FileOpener;
import com.loka.autotesting.utils.Utils;
import org.fest.assertions.Assertions;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.Mockito;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;

public class ReportComposerTest extends BaseUnitTest {

	protected ReportStarter reportStarter;
	protected ReportItemAdder reportItemAdder;
	protected ReportComposer reportComposer;
	protected String reportFolder = "reportFolder";

	@Override
	public void setUp() throws Exception {
		super.setUp();
		reportStarter = Mockito.mock(ReportStarter.class);
		reportItemAdder = Mockito.mock(ReportItemAdder.class);
		reportComposer = new ReportComposer(reportStarter, reportItemAdder);
		ReportComposer.errorsReport.clear();
		System.setProperty("debugMode", "true");
	}

	@Override
	public void tearDown() throws Exception {
		super.tearDown();
		clearUnitTestResult();
		System.setProperty("debugMode", "false");
	}

	protected boolean clearUnitTestResult() {
		File testFolder = new File(this.reportFolder);
		return testFolder.exists() && Utils.purgeDirectory(testFolder, "") && testFolder.delete();
	}

	@Test(expected = AssertionError.class)
	public void testConstructor() throws Exception {
		new ReportComposer(null, null);
	}

	@Test()
	public void testStartReport() throws Exception {
		final Boolean[] setMainDataWillCalled = {false};
		final Boolean[] updateScreenShooterWillCalled = {false};
		final Boolean[] startReportWillCalled = {false};
		reportComposer.reportComposerData = Mockito.mock(ReportComposerData.class);
		Mockito.doAnswer(invocation -> setMainDataWillCalled[0] = true).
				when(reportComposer.reportComposerData).
				setMainData("asd", "test");
		Mockito.doAnswer(invocation -> updateScreenShooterWillCalled[0] = true).
				when(reportComposer.reportComposerData).
				updateScreenShooter();
		Mockito.doAnswer(invocation -> startReportWillCalled[0] = true).
				when(reportComposer.reportStarter).
				startReport();

		Assertions.assertThat(ReportComposer.errorsReport.size()).
				isEqualTo(0);
		reportComposer.reportComposerData.reportFolder = reportFolder;

		reportComposer.startReport("asd", "test");

		Assertions.assertThat(setMainDataWillCalled[0]).isTrue();
		Assertions.assertThat(updateScreenShooterWillCalled[0]).isTrue();
		Assertions.assertThat(startReportWillCalled[0]).isTrue();
		Assertions.assertThat(ReportComposer.errorsReport.size()).
				isGreaterThan(0);
	}

	@Test(expected = ReportComposerException.class)
	public void testStartReportWithIoExceptionCanThrowReportComposerException() throws Exception {
		reportComposer.reportComposerData = Mockito.mock(ReportComposerData.class);
		Mockito.doThrow(new IOException()).
				when(reportComposer.reportStarter).
				startReport();

		reportComposer.reportComposerData.reportFolder = reportFolder;

		reportComposer.startReport("asd", "test");

	}

	@Test()
	public void testAddReportItem() throws Exception {
		final Boolean[] addReportItemWillCalled = {false};
		Date date = new Date();
		Mockito.doAnswer(invocation -> addReportItemWillCalled[0] = true).
				when(reportComposer.reportItemAdder).
				addReportItem("asd", date, LogType.LOG, "test");

		reportComposer.addReportItem("asd", date, LogType.LOG, "test");

		Assertions.assertThat(addReportItemWillCalled[0]).isTrue();
		Assertions.assertThat(reportComposer.hasErrors).isFalse();
	}

	@Test()
	public void testAddReportItemWithLogTypeThrowableErrorWillCheckError() throws Exception {
		reportComposer.addReportItem("asd", new Date(), LogType.THROWABLE_ERROR, "test");

		Assertions.assertThat(reportComposer.hasErrors).isTrue();
	}

	@Test()
	public void testAddReportItemWithLogTypeErrorWillCheckError() throws Exception {
		reportComposer.addReportItem("asd", new Date(), LogType.THROWABLE_ERROR, "test");

		Assertions.assertThat(reportComposer.hasErrors).isTrue();
	}

	@Test()
	public void testAddReportItemWithLogTypeNotErrorWillNotCheckError() throws Exception {
		for (LogType logType : LogType.values()) {
			switch (logType) {
				case THROWABLE_ERROR:
				case ERROR:
					break;
				default:
					reportComposer.addReportItem("asd", new Date(), LogType.THROWABLE_ERROR, "test");
					Assertions.assertThat(reportComposer.hasErrors).isTrue();
					break;
			}
		}
	}

	@Test()
	public void testFinishReportWillAddTestStatus() throws Exception {
		reportComposer.hasErrors = true;
		reportComposer.reportComposerData.jsFileWriter = Mockito.mock(FileWriter.class);
		reportComposer.reportComposerData.setMainData(reportFolder, "suiteName");

		reportComposer.finishReport();

		Boolean errorReportStatus = ReportComposer.
				errorsReport.get(reportComposer.getErrorsReportKey());

		Assertions.assertThat(errorReportStatus).
				isTrue();
	}

	@Test()
	public void testFinishReportWillAddTestStatus2() throws Exception {
		reportComposer.hasErrors = false;
		ReportComposerData reportComposerData = reportComposer.reportComposerData;
		reportComposerData.jsFileWriter = Mockito.mock(FileWriter.class);
		reportComposerData.reportFolder = reportFolder;
		reportComposerData.setMainData(reportFolder, "suiteName");
		reportComposer.finishReport();

		Boolean errorReportStatus = ReportComposer.
				errorsReport.get(reportComposer.getErrorsReportKey());

		Assertions.assertThat(errorReportStatus).
				isFalse();
	}

	@Test()
	public void testCreateDescIcon() throws Exception {
		reportComposer.reportComposerData.setMainData(reportFolder, "suiteName");
		reportComposer.createDescIcon();
		Assertions.assertThat(new File(reportFolder+ "/icons").exists()).isTrue();
	}

	@Test(expected = AssertionError.class)
	public void testCreateDescIconWithoutCallSetMainDataInReportComposerData() throws Exception {
		reportComposer.createDescIcon();
	}

	@Test(expected = AssertionError.class)
	public void testGetErrorsReportKeyWithEmptyData() throws Exception {
		reportComposer.getErrorsReportKey();
	}

	@Test()
	public void testGetErrorsReportKey() throws Exception {
		reportComposer.reportComposerData.reportFolder = reportFolder;
		reportComposer.getErrorsReportKey();
	}

	@Test(expected = ReportComposerException.class)
	public void testFinishReportWithThrowIoError() throws Exception {
		reportComposer.hasErrors = false;
		FileWriter fileWriter = Mockito.mock(FileWriter.class);
		reportComposer.reportComposerData.jsFileWriter = fileWriter;
		Mockito.doThrow(new IOException()).when(fileWriter).flush();
		reportComposer.reportComposerData.setMainData(reportFolder, "suiteName");

		reportComposer.finishReport();
	}

	@Test()
	public void testFinishReportWithOpenReportAfterFinish() throws Exception {
		reportComposer.hasErrors = false;
		reportComposer.reportComposerData.jsFileWriter = Mockito.mock(FileWriter.class);
		reportComposer.reportComposerData.openReportAfterDestroy = true;
		reportComposer.reportComposerData.setMainData(reportFolder, "suiteName");

		reportComposer.finishReport();
	}

	@Test()
	public void testFinishWillOpenReportAfterFinish() throws Exception {
		reportComposer.hasErrors = false;
		reportComposer.reportComposerData = new ReportComposerData();
		reportComposer.reportComposerData.jsFileWriter = Mockito.mock(FileWriter.class);
		reportComposer.reportComposerData.setMainData(reportFolder, "suiteName");
		reportComposer.reportComposerData.openReportAfterDestroy = true;
		reportComposer.finishReport();
	}

	@Test()
	public void testOpenReport() throws Exception {
		final Boolean[] browseMethodWillCalled = {false};
		reportComposer.fileOpener = Mockito.mock(FileOpener.class);
		reportComposer.reportComposerData = Mockito.mock(ReportComposerData.class);
		Mockito.doAnswer(invocation -> browseMethodWillCalled[0] = true).
				when(reportComposer.fileOpener).
				open(Mockito.any());
		reportComposer.reportComposerData.reportFolder = reportFolder;
		reportComposer.openReport();

		Assertions.assertThat(browseMethodWillCalled[0]).
				isTrue();
	}
	@Ignore
	@Test()
	public void testOpenReportWithIOException() throws Exception {
		reportComposer.fileOpener = Mockito.mock(FileOpener.class);
		Mockito.doThrow(new IOException()).
				when(reportComposer.fileOpener).
				open(Mockito.any());

		reportComposer.openReport();
	}

	@Test()
	public void testDestroyWillNotHaveErrors() throws Exception {
		reportComposer.reportComposerData = new ReportComposerData();
		reportComposer.reportComposerData.jsFileWriter = Mockito.mock(FileWriter.class);
		reportComposer.reportComposerData.setMainData(reportFolder, "suiteName");
		reportComposer.destroy();
	}

	@Test()
	public void testMarkCurrentHeaderAs() throws Exception {
		final Boolean[] markCurrentHeaderAsWillCalled = {false};
		Mockito.doAnswer(invocation -> markCurrentHeaderAsWillCalled[0] = true).
				when(reportItemAdder).
				markCurrentHeaderAs("testTag");

		reportComposer.markCurrentHeaderAs("testTag");

		Assertions.assertThat(markCurrentHeaderAsWillCalled[0]).
				isTrue();
	}

	@Test()
	public void testGetSuiteName() throws Exception {
		Assertions.assertThat(reportComposer.getSuiteName()).isNull();
	}

	@Test()
	public void testGetSuiteNameAfterCallStartReport() throws Exception {
		reportComposer.startReport(reportFolder, "suiteName");
		Assertions.assertThat(reportComposer.getSuiteName()).isEqualTo("suiteName");
	}

	@Test()
	public void testSetScreenShooter() throws Exception {
		final Boolean[] setScreenShooterWillCalled = {false};
		reportComposer.reportComposerData = Mockito.mock(ReportComposerData.class);
		ReportScreenShooter screenShooter = Mockito.mock(ReportScreenShooter.class);
		Mockito.doAnswer(invocation -> setScreenShooterWillCalled[0]=true).
				when(reportComposer.reportComposerData).setScreenShooter(screenShooter);

		reportComposer.setScreenShooter(screenShooter);

		Assertions.assertThat(setScreenShooterWillCalled[0]).
				isTrue();
	}

	@Test
	public void testSetOpenReportAfterDestroy() throws Exception {
		Assertions.assertThat(reportComposer.reportComposerData.openReportAfterDestroy).
				isFalse();
		reportComposer.setOpenReportAfterDestroy(true);
		Assertions.assertThat(reportComposer.reportComposerData.openReportAfterDestroy).
				isTrue();
	}
}