package com.loka.autotesting.logger.traceTargets.reports.composer.actions.starter;

import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import com.loka.autotesting.utils.Utils;

import java.io.IOException;
import java.util.List;

public class TreeSliderReportStarter implements ReportStarter {

	protected final String reportTemplatePath = "/traceTargets/html/treeSlider/";
	protected String imgFolder;
	protected String cssFilePath;
	protected String mainJsFilePath;
	protected String superBoxJsFilePath;
	protected String reportFilePath;
	protected String reportFolder;
	protected String iconsReportFolder;
	protected String jsReportFolder;
	protected String cssReportFolder;
	protected String jQueryFilePath;
	protected String dateJsFilePath;
	protected String iconArrow;

	public TreeSliderReportStarter() {
	}

	@Override
	public void initialize(ReportComposerData reportComposerData) {
		String reportFileName = reportComposerData.reportFileName;
		assert !reportComposerData.isEmpty();
		reportFolder = reportComposerData.reportFolder;
		iconsReportFolder = reportComposerData.iconsReportFolder;
		jsReportFolder = reportComposerData.jsReportFolder;
		cssReportFolder = reportComposerData.cssReportFolder;

		reportFilePath = reportFolder + "/" + reportFileName;
		imgFolder = reportFolder + "/img";
		cssFilePath = reportFolder + "/css/style.css";
		iconArrow = reportFolder + "/icons/arrow_down.png";
		mainJsFilePath = reportFolder + "/js/main_js.js";
		jQueryFilePath = reportFolder + "/js/jquery_2_1_1_min.js";
		dateJsFilePath = reportFolder + "/js/date.js";
		superBoxJsFilePath = reportFolder + "/js/super_box.js";
	}

	@Override
	public void startReport() throws IOException {
		Utils.makeDir(reportFolder);
		Utils.makeDir(jsReportFolder);
		Utils.makeDir(iconsReportFolder);
		Utils.makeDir(cssReportFolder);
		Utils.makeDir(reportFolder + "/img");
		Utils.moveFile(reportTemplatePath + "traceTargetHomePage.html", reportFilePath, false);
		Utils.moveFile(reportTemplatePath + "icons/arrow_down.png", iconArrow, false);
		Utils.moveFile(reportTemplatePath + "css/style.css", cssFilePath, false);
		Utils.moveFile(reportTemplatePath + "js/main_js.js", mainJsFilePath, false);
		Utils.moveFile(reportTemplatePath + "js/super_box.js", superBoxJsFilePath, false);
		Utils.moveFile(reportTemplatePath + "js/date.js", dateJsFilePath, false);
		Utils.moveFile(reportTemplatePath + "js/jquery_2_1_1_min.js", jQueryFilePath, false);
	}
}
