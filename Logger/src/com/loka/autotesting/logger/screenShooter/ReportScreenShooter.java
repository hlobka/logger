package com.loka.autotesting.logger.screenShooter;

public abstract class ReportScreenShooter implements ScreenShooter {

	protected String reportFolder;
	protected String screenShotsFolder;

	public void setReportFolder(String reportFolder) {
		setReportFolderForScreenShooter(this, reportFolder);
	}

	protected void setReportFolderForScreenShooter(ScreenShooter screenShooter, String reportFolder) {
		if (isScreenShooterWantToUpdate(screenShooter)) {
			((ReportScreenShooter) screenShooter).setReportFolder(reportFolder);
		}
		this.reportFolder = reportFolder;
	}

	public void setScreenShotsFolder(String screenShotsFolder) {
		setScreenShotsFolderForScreenShooter(this, screenShotsFolder);
	}

	protected void setScreenShotsFolderForScreenShooter(ScreenShooter screenShooter, String reportFolder) {
		if (isScreenShooterWantToUpdate(screenShooter)) {
			((ReportScreenShooter) screenShooter).setScreenShotsFolder(reportFolder);
		}
		this.screenShotsFolder = reportFolder;
	}

	protected boolean isScreenShooterWantToUpdate(ScreenShooter screenShooter) {
		return screenShooter instanceof ReportScreenShooter && !screenShooter.equals(this);
	}
}
