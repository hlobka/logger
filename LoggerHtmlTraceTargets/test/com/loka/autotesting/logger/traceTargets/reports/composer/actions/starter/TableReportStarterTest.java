package com.loka.autotesting.logger.traceTargets.reports.composer.actions.starter;

import com.loka.autotesting.BaseUnitTest;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import com.loka.autotesting.utils.Utils;
import org.fest.assertions.Assertions;
import org.junit.Test;

import java.io.File;
import java.io.IOException;

public class TableReportStarterTest extends BaseUnitTest {

	protected final String testFolder = "testFolder";
	@Override
	public void setUp() throws Exception {
		super.setUp();
		clearUnitTestResult();
	}

	@Override
	public void tearDown() throws Exception {
		super.tearDown();
		clearUnitTestResult();
	}

	protected boolean clearUnitTestResult() {
		File testFolder = new File(this.testFolder);
		return testFolder.exists() && Utils.purgeDirectory(testFolder, "") && testFolder.delete();
	}
	@Test
	public void testInitialize() throws Exception {
		TableReportStarter reportStarter = new TableReportStarter();
		ReportComposerData reportComposerData = new ReportComposerData();
		reportComposerData.setMainData(testFolder, "testSuiteName");
		reportStarter.initialize(reportComposerData);
		Assertions.assertThat(reportStarter.reportFolder).isNotNull();
		Assertions.assertThat(reportStarter.reportFilePath).isNotNull();
		Assertions.assertThat(reportStarter.iconsReportFolder).isNotNull();
		Assertions.assertThat(reportStarter.jsReportFolder).isNotNull();
	}

	@Test(expected = IOException.class)
	public void testStartReportWithEmptyReportComposerData() throws Exception {
		TableReportStarter reportStarter = new TableReportStarter();
		reportStarter.startReport();
	}

	@Test
	public void testStartReportWillCreateTemplates() throws Exception {
		TableReportStarter reportStarter = new TableReportStarter();
		ReportComposerData reportComposerData = new ReportComposerData();
		reportComposerData.setMainData(testFolder, "testSuiteName");
		reportStarter.initialize(reportComposerData);
		reportStarter.startReport();

		checkIsFileExist(reportStarter.reportFilePath);
		checkIsFileExist(reportStarter.reportFolder);
		checkIsFileExist(reportStarter.iconsReportFolder);
		checkIsFileExist(reportStarter.jsReportFolder);
	}

	protected void checkIsFileExist(String path) {
		Assertions.assertThat(new File(path).exists()).isTrue();
	}
}