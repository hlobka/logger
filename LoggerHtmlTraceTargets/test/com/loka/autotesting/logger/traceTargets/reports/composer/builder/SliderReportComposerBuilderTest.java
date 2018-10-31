package com.loka.autotesting.logger.traceTargets.reports.composer.builder;

import com.loka.autotesting.BaseUnitTest;
import com.loka.autotesting.data.ScreenShotVO;
import com.loka.autotesting.logger.screenShooter.ReportScreenShooter;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposer;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerDataTestUtils;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.ObjectToStringConverter;
import org.fest.assertions.Assertions;
import org.junit.Test;

import java.util.Date;

public class SliderReportComposerBuilderTest extends BaseUnitTest {
	@Override
	public void setUp() throws Exception {
		super.setUp();
		System.setProperty("debugMode", "true");
	}

	@Override
	public void tearDown() throws Exception {
		super.tearDown();
		System.setProperty("debugMode", "false");
	}

	@Test
	public void testDefaultValues() throws Exception {
		SliderReportComposerBuilder builder = new SliderReportComposerBuilder();
		Assertions.assertThat(builder.openReportAfterDestroy).isFalse();
		Assertions.assertThat(builder.screenShooter).isNull();
		Assertions.assertThat(builder.objectToStringConverter).isNotNull();
	}

	@Test
	public void testWithScreenShooter() throws Exception {
		SliderReportComposerBuilder builder = new SliderReportComposerBuilder();
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
		SliderReportComposerBuilder builder = new SliderReportComposerBuilder();
		ObjectToStringConverter objectToStringConverter = (o) -> "";
		Assertions.assertThat(builder.withObjectToStringConverter(objectToStringConverter)).isEqualTo(builder);
		Assertions.assertThat(builder.objectToStringConverter).isNotNull().isEqualTo(objectToStringConverter);
	}

	@Test
	public void testWithOpeningReportAfterDestroy() throws Exception {
		SliderReportComposerBuilder builder = new SliderReportComposerBuilder();
		Assertions.assertThat(builder.withOpeningReportAfterDestroy(true)).isEqualTo(builder);
		Assertions.assertThat(builder.openReportAfterDestroy).isTrue();
		Assertions.assertThat(builder.withOpeningReportAfterDestroy(false)).isEqualTo(builder);
		Assertions.assertThat(builder.openReportAfterDestroy).isFalse();
	}

	@Test
	public void testDefaultBuild() throws Exception {
		SliderReportComposerBuilder builder = new SliderReportComposerBuilder();
		ReportComposer reportComposer = builder.build();

		Assertions.assertThat(reportComposer).isNotNull();
		ReportComposerData reportComposerData = ReportComposerDataTestUtils.
				getReportComposerDataAtReportComposer(reportComposer);
		Assertions.assertThat(reportComposerData.hasScreenShooter()).isFalse();
		Assertions.assertThat(reportComposerData.isNeedOpenReportAfterFinish()).isFalse();
	}

	@Test
	public void testBuildWithOpeningReportAfterDestroy() throws Exception {
		SliderReportComposerBuilder builder = new SliderReportComposerBuilder()
				.withOpeningReportAfterDestroy(true);
		ReportComposer reportComposer = builder.build();

		Assertions.assertThat(reportComposer).isNotNull();
		ReportComposerData reportComposerData = ReportComposerDataTestUtils.
				getReportComposerDataAtReportComposer(reportComposer);
		Assertions.assertThat(reportComposerData.hasScreenShooter()).isFalse();
		Assertions.assertThat(reportComposerData.isNeedOpenReportAfterFinish()).isTrue();
	}
}