package com.loka.autotesting.logger.traceTargets.reports.composer.actions.starter;

import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import com.loka.autotesting.utils.Utils;
import com.loka.autotesting.utils.objectControllers.Destroyable;

import java.io.FileWriter;
import java.io.IOException;
import java.util.function.Function;

public class SliderReportStarter implements ReportStarter, Destroyable {

	protected final String reportTemplatePath = "/traceTargets/html/slider/";
	protected String cssFilePath;
	protected String mainJsFilePath;
	protected String superBoxJsFilePath;
	protected String reportFilePath;
	protected String reportFolder;
	protected String iconsReportFolder;
	protected String jsReportFolder;
	protected String cssReportFolder;
	protected FileWriter jsFileWriter;
	protected String suiteName;
	protected Function<Boolean, FileWriter> createJsFileWriter;

	@Override
	public void initialize(ReportComposerData reportComposerData) {
		assert !reportComposerData.isEmpty();
		String reportFileName = reportComposerData.reportFileName;
		reportFolder = reportComposerData.reportFolder;
		iconsReportFolder = reportComposerData.iconsReportFolder;
		jsReportFolder = reportComposerData.jsReportFolder;
		cssReportFolder = reportComposerData.cssReportFolder;
		createJsFileWriter = reportComposerData::createNewJsFileWriter;
		suiteName = reportComposerData.suiteName;
		reportFilePath = reportFolder + "/" + reportFileName;
		cssFilePath = reportFolder + "/css/style.css";
		mainJsFilePath = reportFolder + "/js/main_js.js";
		superBoxJsFilePath = reportFolder + "/js/super_box.js";
	}

	@Override
	public void startReport() throws IOException {
		Utils.makeDir(reportFolder);
		Utils.makeDir(jsReportFolder);
		Utils.makeDir(iconsReportFolder);
		Utils.makeDir(cssReportFolder);
		Utils.moveFile(reportTemplatePath + "traceTargetHomePage.html", reportFilePath, false);
		Utils.moveFile(reportTemplatePath + "css/style.css", cssFilePath, false);
		Utils.moveFile(reportTemplatePath + "js/main_js.js", mainJsFilePath, false);
		Utils.moveFile(reportTemplatePath + "js/super_box.js", superBoxJsFilePath, false);
		jsFileWriter = createJsFileWriter.apply(true);
		jsFileWriter.write("var suiteName = \"" + suiteName + "\";\n");
		jsFileWriter.write("var items = [];");
		jsFileWriter.flush();
	}

	@Override
	public void destroy() {
		try {
			jsFileWriter.close();
		} catch (IOException|NullPointerException e) {
			e.printStackTrace();
		}
	}
}
