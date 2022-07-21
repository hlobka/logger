package com.loka.autotesting.logger.traceTargets.reports.composer.builder;

import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposer;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder.TableReportItemAdder;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.starter.TableReportStarter;

public class TableReportComposerBuilder implements Builder<ReportComposer> {
	protected boolean openReportAfterDestroy = false;

	@Override
	public ReportComposer build() {
		ReportComposer reportComposer = new ReportComposer(new TableReportStarter(), new TableReportItemAdder());
		reportComposer.setOpenReportAfterDestroy(openReportAfterDestroy);
		return reportComposer;
	}

	public TableReportComposerBuilder withOpeningReportAfterDestroy(boolean openReportAfterDestroy) {
		this.openReportAfterDestroy = openReportAfterDestroy;
		return this;
	}
}
