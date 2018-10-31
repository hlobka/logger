package com.loka.autotesting.logger.traceTargets.reports.composer;

import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.Logger;
import com.loka.autotesting.logger.screenShooter.ReportScreenShooter;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder.ReportItemAdder;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.starter.ReportStarter;
import com.loka.autotesting.utils.FileOpener;
import com.loka.autotesting.utils.FileOpenerHelper;
import com.loka.autotesting.utils.Utils;
import com.loka.autotesting.utils.objectControllers.DestroyUtils;
import com.loka.autotesting.utils.objectControllers.Destroyable;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class ReportComposer implements Destroyable{
	protected ReportComposerData reportComposerData;
	protected static final Map<String, Boolean> errorsReport = new HashMap<>();
	protected final ReportItemAdder reportItemAdder;
	protected final ReportStarter reportStarter;
	protected boolean hasErrors = false;
	protected FileOpener fileOpener;

	public ReportComposer(ReportStarter reportStarter, ReportItemAdder reportItemAdder) {
		fileOpener = FileOpenerHelper.getFileOpenerForDifferentOS();
		assert reportStarter != null;
		assert reportItemAdder != null;
		this.reportStarter = reportStarter;
		this.reportItemAdder = reportItemAdder;
		reportComposerData = new ReportComposerData();
		reportItemAdder.initialize(reportComposerData);
	}

	public void startReport(String reportFolder, String suiteName){
		reportComposerData.setMainData(reportFolder, suiteName);
		if (!errorsReport.containsKey(getErrorsReportKey())) {
			errorsReport.put(getErrorsReportKey(), false);
		}
		reportComposerData.updateScreenShooter();
		reportStarter.initialize(reportComposerData);
		try {
			reportStarter.startReport();
		} catch (IOException e) {
			throw new ReportComposerException("startReport throw IOException", e);
		}
	}

	public void addReportItem(String caption, Date date, LogType logType, Object... descriptionItems){
		switch (logType){
			case ERROR:
			case THROWABLE_ERROR:
				hasErrors = true;
				break;
		}
		assert reportItemAdder != null;
		reportItemAdder.addReportItem(caption, date, logType, descriptionItems);
	}

	public void finishReport() {
		errorsReport.put(getErrorsReportKey(), hasErrors);
		try {
			reportComposerData.jsFileWriter.flush();
			reportComposerData.jsFileWriter.close();
			createDescIcon();
		} catch (IOException e) {
			throw new ReportComposerException("could not finish report", e);
		}
		if (reportComposerData.isNeedOpenReportAfterFinish()) {
			openReport();
		}
	}

	protected String getErrorsReportKey() {
		assert reportComposerData.reportFolder != null;
		return reportComposerData.reportFolder + reportComposerData.reportFileName;
	}

	protected void openReport() {
		try {
			if(reportComposerData.reportFolder == null){
				throw new IOException("reportFolder is null");
			}
			File file = new File(reportComposerData.reportFolder + "/index.html");
			fileOpener.open(file.toURI());
		} catch (IOException e) {
			Logger.debug(e);
		}
	}

	protected void createDescIcon() throws IOException {
		String filePath = "/icons";
		String errorsReportKey = getErrorsReportKey();
		if (errorsReport.containsKey(errorsReportKey) && errorsReport.get(errorsReportKey)) {
			filePath += "/failure.ico";
		} else {
			filePath += "/success.ico";
		}
		Utils.moveFile(filePath, reportComposerData.iconsReportFolder + "/icon.ico", false);
		FileWriter writer = new FileWriter(reportComposerData.reportFolder + "/desktop.ini");
		BufferedWriter out = new BufferedWriter(writer);
		out.write("[.ShellClassInfo]");
		out.newLine();
		out.write("IconResource=icons\\icon.ico,0");
		out.flush();
		out.close();
		if(System.getProperty("os.name").toLowerCase().contains("win")) {
			Runtime.getRuntime().exec("ATTRIB +R \"" + reportComposerData.reportFolder + "\"");
		}
	}

	@Override
	public void destroy() {
		DestroyUtils.destroyObject(reportItemAdder);
		DestroyUtils.destroyObject(reportStarter);
		try {
			finishReport();
		} finally {
			DestroyUtils.destroyObject(reportComposerData.getScreenShooter());
		}
	}

	public void markCurrentHeaderAs(String tag){
		reportItemAdder.markCurrentHeaderAs(tag);
	}

	public String getSuiteName() {
		return reportComposerData.suiteName;
	}

	public void setScreenShooter(ReportScreenShooter screenShooter) {
		this.reportComposerData.setScreenShooter(screenShooter);
	}

	public void setOpenReportAfterDestroy(boolean openReportAfterDestroy) {
		this.reportComposerData.openReportAfterDestroy = openReportAfterDestroy;
	}
}
