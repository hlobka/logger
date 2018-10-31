package com.loka.autotesting.logger.traceTargets.reports.composer.actions.starter;

import com.loka.autotesting.BaseUnitTest;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import com.loka.autotesting.utils.Utils;
import com.loka.autotesting.utils.objectControllers.DestroyUtils;
import org.fest.assertions.Assertions;
import org.junit.Test;
import org.mockito.Mockito;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class SliderReportStarterTest extends BaseUnitTest {
	protected final String testFolder = "testFolder";
	protected SliderReportStarter reportStarter;

	@Override
	public void setUp() throws Exception {
		super.setUp();
		reportStarter = new SliderReportStarter();
		clearUnitTestResult();
	}

	@Override
	public void tearDown() throws Exception {
		super.tearDown();
		DestroyUtils.destroyObject(reportStarter);
		clearUnitTestResult();
	}

	protected boolean clearUnitTestResult() {
		File testFolder = new File(this.testFolder);
		return testFolder.exists() && Utils.purgeDirectory(testFolder, "") && testFolder.delete();
	}

	@Test
	public void testInitialize() throws Exception {
		ReportComposerData reportComposerData = new ReportComposerData();
		reportComposerData.setMainData(testFolder, "testSuiteName");
		reportStarter.initialize(reportComposerData);
		Assertions.assertThat(reportStarter.cssFilePath).isNotNull();
		Assertions.assertThat(reportStarter.mainJsFilePath).isNotNull();
		Assertions.assertThat(reportStarter.superBoxJsFilePath).isNotNull();
		Assertions.assertThat(reportStarter.reportFilePath).isNotNull();
		Assertions.assertThat(reportStarter.reportFolder).isNotNull();
		Assertions.assertThat(reportStarter.iconsReportFolder).isNotNull();
		Assertions.assertThat(reportStarter.jsReportFolder).isNotNull();
	}

	@Test(expected = IOException.class)
	public void testStartReportWithEmptyReportComposerData() throws Exception {
		reportStarter.startReport();
	}

	@Test()
	public void testDestroyMethodWithoutInitializing() throws Exception {
		reportStarter.destroy();
	}

	@Test()
	public void testDestroyMethodWithInitializing() throws Exception {
		reportStarter.jsFileWriter = Mockito.mock(FileWriter.class);
		reportStarter.destroy();
	}

	@Test()
	public void testDestroyMethodWithIOException() throws Exception {
		reportStarter.jsFileWriter = Mockito.mock(FileWriter.class);
		Mockito.doThrow(new IOException()).when(reportStarter.jsFileWriter).close();
		reportStarter.destroy();
	}

	@Test
	public void testStartReportWillCreateTemplates() throws Exception {
		ReportComposerData reportComposerData = new ReportComposerData();
		reportComposerData.setMainData(testFolder, "testSuiteName");
		reportStarter.initialize(reportComposerData);
		reportStarter.startReport();

		checkIsFileExist(reportStarter.cssFilePath);
		checkIsFileExist(reportStarter.mainJsFilePath);
		checkIsFileExist(reportStarter.superBoxJsFilePath);
		checkIsFileExist(reportStarter.reportFilePath);
		checkIsFileExist(reportStarter.reportFolder);
		checkIsFileExist(reportStarter.iconsReportFolder);
		checkIsFileExist(reportStarter.jsReportFolder);
	}

	protected void checkIsFileExist(String path) {
		Assertions.assertThat(new File(path).exists()).isTrue();
	}
}