package com.loka.autotesting.logger.traceTargets.reports.composer.builder;

import com.loka.autotesting.BaseUnitTest;
import com.loka.autotesting.data.ScreenShotVO;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.screenShooter.ReportScreenShooter;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposer;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerDataTestUtils;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.ObjectToStringConverter;
import org.fest.assertions.Assertions;
import org.junit.Test;

import java.util.Date;

public class TreeSliderReportComposerBuilderTest extends BaseUnitTest {
	@Override
	public void setUp() throws Exception {
		super.setUp();
		System.setProperty("debugMode", "true");
	}

	@Test
	public void testDefaultValues() throws Exception {
		TreeSliderReportComposerBuilder builder = new TreeSliderReportComposerBuilder();
		Assertions.assertThat(builder.openReportAfterDestroy).isFalse();
		Assertions.assertThat(builder.screenShooter).isNull();
		Assertions.assertThat(builder.objectToStringConverter).isNotNull();
		Assertions.assertThat(builder.parentOfTree).isNull();
		Assertions.assertThat(builder.logTypesToCollapseSimilarLogs).isEmpty();
		Assertions.assertThat(builder.logTypeWithStackTrace).isEmpty();
	}

	@Test
	public void testAddStackTraceLogType() throws Exception {
		TreeSliderReportComposerBuilder builder = new TreeSliderReportComposerBuilder();
		Assertions.assertThat(builder.logTypeWithStackTrace).isEmpty();
		builder.withStackTraceFor(LogType.DEBUG);
		Assertions.assertThat(builder.logTypeWithStackTrace).isNotEmpty();
	}

	@Test
	public void testCollapseSimilarLogItems() throws Exception {
		TreeSliderReportComposerBuilder builder = new TreeSliderReportComposerBuilder();
		Assertions.assertThat(builder.logTypesToCollapseSimilarLogs).isEmpty();
		builder.withCollapseSimilarLogs(LogType.DEBUG);
		Assertions.assertThat(builder.logTypesToCollapseSimilarLogs).isNotEmpty();
	}

	@Test
	public void testWithScreenShooter() throws Exception {
		TreeSliderReportComposerBuilder builder = new TreeSliderReportComposerBuilder();
		Assertions.assertThat(builder.withScreenShooter(new ReportScreenShooter() {
			@Override
			public ScreenShotVO captureScreenShot(Date date, Object[] descriptionItems) {
				return new ScreenShotVO();
			}
		})).isEqualTo(builder);
		Assertions.assertThat(builder.openReportAfterDestroy).isFalse();
		Assertions.assertThat(builder.objectToStringConverter).isNotNull();
		Assertions.assertThat(builder.screenShooter).isNotNull();
	}

	@Test
	public void testWithObjectToStringConverter() throws Exception {
		TreeSliderReportComposerBuilder builder = new TreeSliderReportComposerBuilder();
		ObjectToStringConverter objectToStringConverter = (o) -> "";
		Assertions.assertThat(builder.withObjectToStringConverter(objectToStringConverter)).isEqualTo(builder);
		Assertions.assertThat(builder.objectToStringConverter).isNotNull().isEqualTo(objectToStringConverter);
	}

	@Test
	public void testWithOpeningReportAfterDestroy() throws Exception {
		TreeSliderReportComposerBuilder builder = new TreeSliderReportComposerBuilder();
		Assertions.assertThat(builder.withOpeningReportAfterDestroy(true)).isEqualTo(builder);
		Assertions.assertThat(builder.openReportAfterDestroy).isTrue();
		Assertions.assertThat(builder.withOpeningReportAfterDestroy(false)).isEqualTo(builder);
		Assertions.assertThat(builder.openReportAfterDestroy).isFalse();
	}

	@Test
	public void testDefaultBuild() throws Exception {
		TreeSliderReportComposerBuilder builder = new TreeSliderReportComposerBuilder();
		ReportComposer reportComposer = builder.build();

		Assertions.assertThat(reportComposer).isNotNull();
		ReportComposerData reportComposerData = ReportComposerDataTestUtils.
				getReportComposerDataAtReportComposer(reportComposer);
		Assertions.assertThat(reportComposerData.hasScreenShooter()).isFalse();
		Assertions.assertThat(reportComposerData.isNeedOpenReportAfterFinish()).isFalse();
	}

	@Test
	public void testBuildWithOpeningReportAfterDestroy() throws Exception {
		TreeSliderReportComposerBuilder builder = new TreeSliderReportComposerBuilder()
				.withOpeningReportAfterDestroy(true);
		ReportComposer reportComposer = builder.build();

		Assertions.assertThat(reportComposer).isNotNull();
		ReportComposerData reportComposerData = ReportComposerDataTestUtils.
				getReportComposerDataAtReportComposer(reportComposer);
		Assertions.assertThat(reportComposerData.hasScreenShooter()).isFalse();
		Assertions.assertThat(reportComposerData.isNeedOpenReportAfterFinish()).isTrue();
	}
}