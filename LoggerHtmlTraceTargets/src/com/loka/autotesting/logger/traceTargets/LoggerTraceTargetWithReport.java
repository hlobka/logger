package com.loka.autotesting.logger.traceTargets;

import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.TraceTarget;
import com.loka.autotesting.logger.TraceTargetMarker;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposer;
import com.loka.autotesting.utils.ReportFileNamesGenerator;

import java.util.Date;

public class LoggerTraceTargetWithReport implements TraceTarget, TraceTargetMarker {
	private static final String reportsFolder = "reports";

	protected ReportComposer reportComposer;

	protected String suiteName;
	protected String buildNumber;
	protected Date startDate;
	private String subReportFolder;

	public LoggerTraceTargetWithReport(ReportComposer reportComposer) {
		this(reportComposer, "");
	}
	public LoggerTraceTargetWithReport(ReportComposer reportComposer, String subReportFolder) {
		this.subReportFolder = subReportFolder;
		setReportComposer(reportComposer);
	}

	@Override
	public void init(Date date) {
		setSuiteName(System.getProperty("suite", "unknown suite"));
		setBuildNumber(System.getProperty("build.number"));
		setStartDate(date);
		startReport();
	}

	protected void setReportComposer(ReportComposer reportComposer) {
		this.reportComposer = reportComposer;
	}

	@Override
	public void log(String caption, Date date, LogType logType, Object... descriptionItems) {
		reportComposer.addReportItem(caption, date, logType, descriptionItems);
	}

	protected String getReportName() {
		ReportFileNamesGenerator generator = new ReportFileNamesGenerator();
		String fileName;
		String reportNameFromSystemProperties = System.getProperty("reportName", "");
		if(!reportNameFromSystemProperties.isEmpty()){
			return reportNameFromSystemProperties;
		}
		if (buildNumber != null) {
			fileName = generator.generateFileName(suiteName, buildNumber, startDate);
		} else {
			fileName = generator.generateFileName(suiteName, startDate);
		}
		return fileName.replaceAll(":", "");
	}

	protected void setSuiteName(String suiteName) {
		if (suiteName == null) {
			suiteName = "unknown suite";
		}
		this.suiteName = suiteName;
	}

	protected void setBuildNumber(String buildNumber) {
		this.buildNumber = buildNumber;
	}

	protected void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	protected void startReport() {
		if(subReportFolder.isEmpty()){
			reportComposer.startReport(reportsFolder + "/" + getReportName(), suiteName);
		} else {
			reportComposer.startReport(reportsFolder + "/" + getReportName() + "/" + subReportFolder, suiteName);
		}
	}

	@Override
	public void destroy() {
		reportComposer.destroy();
	}

	@Override
	public void markAs(String label) {
		reportComposer.markCurrentHeaderAs(label);
	}
}
