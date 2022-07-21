package com.loka.autotesting.logger.traceTargets.reports.composer.builder;

import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.screenShooter.ReportScreenShooter;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposer;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.ObjectToStringConverter;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder.TreeSliderReportItemAdder;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.starter.TreeSliderReportStarter;

import java.util.ArrayList;
import java.util.List;

public class TreeSliderReportComposerBuilder implements Builder<ReportComposer> {
	Boolean openReportAfterDestroy = false;
	ReportScreenShooter screenShooter;
	ObjectToStringConverter objectToStringConverter = (o) -> o + "";
	String parentOfTree = null;
	List<LogType> logTypeWithStackTrace = new ArrayList<>();
	List<LogType> logTypesToCollapseSimilarLogs = new ArrayList<>();

	public TreeSliderReportComposerBuilder withScreenShooter(ReportScreenShooter screenShooter) {
		this.screenShooter = screenShooter;
		return this;
	}

	public TreeSliderReportComposerBuilder withOpeningReportAfterDestroy(Boolean openReportAfterDestroy) {
		this.openReportAfterDestroy = openReportAfterDestroy;
		return this;
	}

	public TreeSliderReportComposerBuilder withObjectToStringConverter(ObjectToStringConverter objectToStringConverter) {
		this.objectToStringConverter = objectToStringConverter;
		return this;
	}

	@Override
	public ReportComposer build() {
		TreeSliderReportStarter reportStarter = new TreeSliderReportStarter();
		TreeSliderReportItemAdder reportItemAdder = new TreeSliderReportItemAdder(objectToStringConverter);
		reportItemAdder.setParentOfReportHeaderTag(parentOfTree);
		reportItemAdder.setLogTypesToCollapseSimilarLogs(logTypesToCollapseSimilarLogs);
		reportItemAdder.setLogTypesToUseStackTrace(logTypeWithStackTrace);
		ReportComposer reportComposer = new ReportComposer(reportStarter, reportItemAdder);
		reportComposer.setOpenReportAfterDestroy(openReportAfterDestroy);
		reportComposer.setScreenShooter(screenShooter);
		return reportComposer;
	}

	public TreeSliderReportComposerBuilder withParentOfTree(String parentOfTree) {
		this.parentOfTree = parentOfTree;
		return this;
	}

	public TreeSliderReportComposerBuilder withStackTraceFor(LogType logType) {
		if(!logTypeWithStackTrace.contains(logType)) {
			logTypeWithStackTrace.add(logType);
		}
		return this;
	}

	public TreeSliderReportComposerBuilder withCollapseSimilarLogs(LogType logType) {
		if(!logTypesToCollapseSimilarLogs.contains(logType)) {
			logTypesToCollapseSimilarLogs.add(logType);
		}
		return this;
	}
}
