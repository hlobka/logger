package com.loka.autotesting.logger.traceTargets.reports.composer;

import com.loka.autotesting.BaseUnitTest;
import com.loka.autotesting.logger.screenShooter.ReportScreenShooter;
import org.fest.assertions.Assertions;
import org.junit.Test;
import org.mockito.Mockito;

public class ReportComposerDataTest extends BaseUnitTest {

	@Test
	public void testSetMainData() throws Exception {
		ReportComposerData reportComposerData = new ReportComposerData();

		Assertions.assertThat(reportComposerData.reportFolder).isNull();
		Assertions.assertThat(reportComposerData.suiteName).isNull();
		Assertions.assertThat(reportComposerData.jsReportFolder).isNull();
		Assertions.assertThat(reportComposerData.iconsReportFolder).isNull();
		Assertions.assertThat(reportComposerData.reportJSFileName).isNull();

		reportComposerData.setMainData("reportFolder", "suiteName");

		Assertions.assertThat(reportComposerData.reportFolder).isEqualTo("reportFolder");
		Assertions.assertThat(reportComposerData.suiteName).isEqualTo("suiteName");
		Assertions.assertThat(reportComposerData.jsReportFolder).isEqualTo("reportFolder"+reportComposerData.jsFolder);
		Assertions.assertThat(reportComposerData.iconsReportFolder).isEqualTo("reportFolder"+reportComposerData.iconsFolder);
		Assertions.assertThat(reportComposerData.reportJSFileName).isEqualTo(reportComposerData.jsFileDataHolder);
	}

	@Test(expected = RuntimeException.class)
	public void testCreateNewJsFileWriterWithEmptyFields() throws Exception {
		ReportComposerData reportComposerData = new ReportComposerData();
		reportComposerData.createNewJsFileWriter(true);
	}

	@Test(expected = RuntimeException.class)
	public void testCreateNewJsFileWriterWithFailedFields() throws Exception {
		ReportComposerData reportComposerData = new ReportComposerData();
		reportComposerData.jsReportFolder = "";
		reportComposerData.reportJSFileName = "";
		reportComposerData.createNewJsFileWriter(true);
	}

	@Test(expected = RuntimeException.class)
	public void testCreateNewJsFileWriterWithFields() throws Exception {
		ReportComposerData reportComposerData = new ReportComposerData();
		reportComposerData.jsReportFolder = "";
		reportComposerData.reportJSFileName = "testFile.txt";
		reportComposerData.createNewJsFileWriter(true);
	}

	@Test
	public void testSetScreenShooter() throws Exception {
		ReportComposerData reportComposerData = new ReportComposerData();
		ReportScreenShooter reportScreenShooter = Mockito.mock(ReportScreenShooter.class);
		reportComposerData.setScreenShooter(reportScreenShooter);
	}

	@Test(expected = AssertionError.class)
	public void testSetScreenShooterWillSetReportFolder() throws Exception {
		ReportComposerData reportComposerData = new ReportComposerData();
		reportComposerData.reportFolder = "report";
		ReportScreenShooter reportScreenShooter = Mockito.mock(ReportScreenShooter.class);
		Mockito.doThrow(new AssertionError()).when(reportScreenShooter).
				setReportFolder(reportComposerData.reportFolder);

		reportComposerData.setScreenShooter(reportScreenShooter);
	}

	@Test(expected = AssertionError.class)
	public void testSetScreenShooterWillSetScreenShotsFolder() throws Exception {
		ReportComposerData reportComposerData = new ReportComposerData();
		ReportScreenShooter reportScreenShooter = Mockito.mock(ReportScreenShooter.class);
		Mockito.doThrow(new AssertionError()).when(reportScreenShooter).
				setScreenShotsFolder(reportComposerData.screenShotsFolder);

		reportComposerData.setScreenShooter(reportScreenShooter);
	}

	@Test
	public void testHasScreenShooter() throws Exception {
		ReportComposerData reportComposerData = new ReportComposerData();
		ReportScreenShooter reportScreenShooter = Mockito.mock(ReportScreenShooter.class);

		Assertions.assertThat(reportComposerData.hasScreenShooter()).isFalse();

		reportComposerData.setScreenShooter(reportScreenShooter);

		Assertions.assertThat(reportComposerData.hasScreenShooter()).isTrue();
	}

	@Test
	public void testGetScreenShooter() throws Exception {
		ReportComposerData reportComposerData = new ReportComposerData();
		ReportScreenShooter reportScreenShooter = Mockito.mock(ReportScreenShooter.class);

		Assertions.assertThat(reportComposerData.getScreenShooter()).isNull();

		reportComposerData.setScreenShooter(reportScreenShooter);

		Assertions.assertThat(reportComposerData.getScreenShooter()).isNotNull();
	}
}