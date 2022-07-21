package com.loka.autotesting.logger.traceTargets.reports.composer.builder;

import com.loka.autotesting.logger.screenShooter.ReportScreenShooter;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposer;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.ObjectToStringConverter;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder.SliderReportItemAdder;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.starter.SliderReportStarter;

public final class SliderReportComposerBuilder implements Builder<ReportComposer> {
	protected Boolean openReportAfterDestroy = false;
	protected ReportScreenShooter screenShooter;
	protected ObjectToStringConverter objectToStringConverter = (o) -> o + "";

	public SliderReportComposerBuilder withScreenShooter(ReportScreenShooter screenShooter) {
		this.screenShooter = screenShooter;
		return this;
	}

	public SliderReportComposerBuilder withOpeningReportAfterDestroy(Boolean openReportAfterDestroy) {
		this.openReportAfterDestroy = openReportAfterDestroy;
		return this;
	}

	public SliderReportComposerBuilder withObjectToStringConverter(ObjectToStringConverter objectToStringConverter) {
		this.objectToStringConverter = objectToStringConverter;
		return this;
	}

	@Override
	public ReportComposer build() {
		ReportComposer reportComposer = new ReportComposer(new SliderReportStarter(), new SliderReportItemAdder(objectToStringConverter));
		reportComposer.setOpenReportAfterDestroy(openReportAfterDestroy);
		reportComposer.setScreenShooter(screenShooter);
		return reportComposer;
	}
}
