package com.loka.autotesting.logger.screenShooter;

import com.loka.autotesting.data.ScreenShotVO;
import org.fest.assertions.Assertions;
import org.junit.Test;

import java.util.Date;


public class ReportScreenShooterTest {
	@Test
	public void testSetReportFolder() throws Exception {
		ReportScreenShooter reportScreenShooter = new ReportScreenShooterForTest();
		Assertions.assertThat(reportScreenShooter.reportFolder).isNull();

		reportScreenShooter.setReportFolder("abraKadabra");

		Assertions.assertThat(reportScreenShooter.reportFolder).
				isNotNull().
				isEqualTo("abraKadabra");
	}

	@Test
	public void testSetReportFolderForScreenShooter() throws Exception {
		ReportScreenShooter reportScreenShooter = new ReportScreenShooterForTest();
		ReportScreenShooter reportScreenShooter2 = new ReportScreenShooterForTest();
		Assertions.assertThat(reportScreenShooter.reportFolder).isNull();
		Assertions.assertThat(reportScreenShooter2.reportFolder).isNull();

		reportScreenShooter.setReportFolderForScreenShooter(reportScreenShooter2, "abraKadabra");

		Assertions.assertThat(reportScreenShooter.reportFolder).
				isNotNull().
				isEqualTo("abraKadabra");
		Assertions.assertThat(reportScreenShooter2.reportFolder).
				isNotNull().
				isEqualTo("abraKadabra");
	}

	@Test
	public void testSetScreenShotsFolder() throws Exception {
		ReportScreenShooter reportScreenShooter = new ReportScreenShooterForTest();
		Assertions.assertThat(reportScreenShooter.screenShotsFolder).isNull();

		reportScreenShooter.setScreenShotsFolder("abraKadabra");

		Assertions.assertThat(reportScreenShooter.screenShotsFolder).
				isNotNull().
				isEqualTo("abraKadabra");
	}

	@Test
	public void testSetScreenShotsFolderForScreenShooter() throws Exception {
		ReportScreenShooter reportScreenShooter = new ReportScreenShooterForTest();
		ReportScreenShooter reportScreenShooter2 = new ReportScreenShooterForTest();
		Assertions.assertThat(reportScreenShooter.screenShotsFolder).isNull();
		Assertions.assertThat(reportScreenShooter2.screenShotsFolder).isNull();

		reportScreenShooter.setScreenShotsFolderForScreenShooter(reportScreenShooter2, "abraKadabra");

		Assertions.assertThat(reportScreenShooter.screenShotsFolder).
				isNotNull().
				isEqualTo("abraKadabra");
		Assertions.assertThat(reportScreenShooter2.screenShotsFolder).
				isNotNull().
				isEqualTo("abraKadabra");
	}

	@Test
	public void testIsScreenShooterWantToUpdate() throws Exception {
		ReportScreenShooter reportScreenShooter = new ReportScreenShooterForTest();
		ReportScreenShooter reportScreenShooter2 = new ReportScreenShooterForTest();
		Assertions.assertThat(reportScreenShooter.isScreenShooterWantToUpdate(reportScreenShooter)).
				isFalse();
		Assertions.assertThat(reportScreenShooter.isScreenShooterWantToUpdate(reportScreenShooter2)).
				isTrue();
	}

	private class ReportScreenShooterForTest extends ReportScreenShooter {
		@Override
		public ScreenShotVO captureScreenShot(Date date, Object[] descriptionItems) {
			return null;
		}
	}
}