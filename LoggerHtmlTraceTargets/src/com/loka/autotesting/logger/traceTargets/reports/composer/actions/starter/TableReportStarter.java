package com.loka.autotesting.logger.traceTargets.reports.composer.actions.starter;

import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import com.loka.autotesting.utils.Utils;

import java.io.IOException;

public class TableReportStarter implements ReportStarter {
	protected String reportFolder;
	protected String jsReportFolder;
	protected String iconsReportFolder;
	protected String reportFilePath;

	@Override
	public void initialize(ReportComposerData reportComposerData) {
		assert !reportComposerData.isEmpty();
		reportFolder = reportComposerData.reportFolder;
		jsReportFolder = reportComposerData.jsReportFolder;
		iconsReportFolder = reportComposerData.iconsReportFolder;
		reportFilePath = reportComposerData.reportFolder + "/" + reportComposerData.reportFileName;
	}

	@Override
	public void startReport() throws IOException {
		Utils.makeDir(reportFolder);
		Utils.makeDir(jsReportFolder);
		Utils.makeDir(iconsReportFolder);
		Utils.moveFile("/traceTargets/html/table/traceTargetHomePage.html", reportFilePath, false);
	}
}
