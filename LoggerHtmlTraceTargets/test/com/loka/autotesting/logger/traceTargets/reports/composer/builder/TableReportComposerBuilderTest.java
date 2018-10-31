package com.loka.autotesting.logger.traceTargets.reports.composer.builder;

import com.loka.autotesting.BaseUnitTest;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposer;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerDataTestUtils;
import org.fest.assertions.Assertions;
import org.junit.Test;

public class TableReportComposerBuilderTest extends BaseUnitTest {
	@Override
	public void setUp() throws Exception {
		super.setUp();
		System.setProperty("debugMode", "true");
	}

	@Test
	public void testDefaultValues() throws Exception {
		TableReportComposerBuilder builder = new TableReportComposerBuilder();
		Assertions.assertThat(builder.openReportAfterDestroy).isFalse();
	}

	@Test
	public void testWithOpeningReportAfterDestroy() throws Exception {
		TableReportComposerBuilder builder = new TableReportComposerBuilder();
		Assertions.assertThat(builder.withOpeningReportAfterDestroy(true)).isEqualTo(builder);
		Assertions.assertThat(builder.openReportAfterDestroy).isTrue();
		Assertions.assertThat(builder.withOpeningReportAfterDestroy(false)).isEqualTo(builder);
		Assertions.assertThat(builder.openReportAfterDestroy).isFalse();
	}

	@Test
	public void testDefaultBuild() throws Exception {
		TableReportComposerBuilder builder = new TableReportComposerBuilder();
		ReportComposer reportComposer = builder.build();

		Assertions.assertThat(reportComposer).isNotNull();
		ReportComposerData reportComposerData = ReportComposerDataTestUtils.
				getReportComposerDataAtReportComposer(reportComposer);
		Assertions.assertThat(reportComposerData.hasScreenShooter()).isFalse();
		Assertions.assertThat(reportComposerData.isNeedOpenReportAfterFinish()).isFalse();
	}

	@Test
	public void testBuildWithOpeningReportAfterDestroy() throws Exception {
		TableReportComposerBuilder builder = new TableReportComposerBuilder()
				.withOpeningReportAfterDestroy(true);
		ReportComposer reportComposer = builder.build();

		Assertions.assertThat(reportComposer).isNotNull();
		ReportComposerData reportComposerData = ReportComposerDataTestUtils.
				getReportComposerDataAtReportComposer(reportComposer);
		Assertions.assertThat(reportComposerData.hasScreenShooter()).isFalse();
		Assertions.assertThat(reportComposerData.isNeedOpenReportAfterFinish()).isTrue();
	}
}