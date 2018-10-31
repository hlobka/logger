package com.loka.autotesting.logger.traceTargets.reports.composer;

import com.loka.autotesting.logger.Logger;
import com.loka.autotesting.logger.screenShooter.ReportScreenShooter;
import com.loka.autotesting.utils.Debug;

import java.io.FileWriter;
import java.io.IOException;
import java.util.function.Function;

public class ReportComposerData {
	public final String screenShotsFolder = "img";
	public final String reportFileName = "index.html";
	protected final String cssFolder = "/css/";
	protected final String jsFolder = "/js/";
	protected final String iconsFolder = "/icons/";
	protected final String jsFileDataHolder = "data.js";
	public String reportJSFileName;
	public String reportFolder;
	public String suiteName;
	public String jsReportFolder;
	public String cssReportFolder;
	public FileWriter jsFileWriter;
	public String iconsReportFolder;
	public ReportScreenShooter screenShooter;
	protected boolean openReportAfterDestroy;

	public ReportComposerData() {
	}

	public FileWriter createNewJsFileWriter(boolean append) {
		try {
			if(isPathEmpty(jsReportFolder) || isPathEmpty(reportJSFileName)){
				String message = "jsReportFolder: " + jsReportFolder + " or reportJSFileName: " + reportJSFileName +
						" is null";
				throw new IOException(message);
			}
			FileWriter fileWriter = new FileWriter(
					jsReportFolder + reportJSFileName, append
			);
			jsFileWriter = fileWriter;
			return fileWriter;
		} catch (IOException e) {
			Logger.debug(e);
			throw new RuntimeException(e);
		}
	}

	protected static boolean isPathEmpty(String path) {
		return path == null || path.isEmpty();
	}

	public ReportScreenShooter getScreenShooter() {
		return screenShooter;
	}

	public void setScreenShooter(ReportScreenShooter screenShooter) {
		this.screenShooter = screenShooter;
		updateScreenShooter();
	}

	public boolean hasScreenShooter() {
		return screenShooter != null;
	}

	public void updateScreenShooter() {
		if (screenShooter != null) {
			this.screenShooter.setReportFolder(reportFolder);
			this.screenShooter.setScreenShotsFolder(screenShotsFolder);
		}
	}

	public void setMainData(String reportFolder, String suiteName) {
		this.reportFolder = reportFolder.replaceAll(":", "");
		this.suiteName = suiteName;
		this.jsReportFolder = reportFolder + jsFolder;
		this.cssReportFolder = reportFolder + cssFolder;
		this.iconsReportFolder = reportFolder + iconsFolder;
		this.reportJSFileName = jsFileDataHolder;
	}

	public boolean isNeedOpenReportAfterFinish() {
		return Debug.isDebugging() && openReportAfterDestroy;
	}

	public boolean isEmpty() {
		Function<String, Boolean> isFileValid = fileOfFolder ->
				fileOfFolder != null && !fileOfFolder.isEmpty() && !fileOfFolder.contains("null");
		return !isFileValid.apply(reportFolder) || !isFileValid.apply(suiteName);
	}
}
