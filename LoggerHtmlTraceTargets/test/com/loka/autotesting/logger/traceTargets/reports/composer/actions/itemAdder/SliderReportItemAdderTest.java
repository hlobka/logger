package com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder;

import com.loka.autotesting.data.ScreenShotVO;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.screenShooter.ReportScreenShooter;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import org.fest.assertions.Assertions;
import org.json.JSONException;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.io.FileWriter;
import java.io.IOException;
import java.time.Instant;
import java.util.Date;

public class SliderReportItemAdderTest extends SliderReportItemAdder {
	@Mock
	private ReportComposerData mockReportComposerData;
	private SliderReportItem savedReportItemToWroteInFile;

	public SliderReportItemAdderTest() {
		super(o -> o + "");
	}

	@Before
	public void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		mockReportComposerData.jsFileWriter = Mockito.mock(FileWriter.class);
	}

	@Test
	public void testInitialize() throws Exception {
		Assertions.assertThat(reportComposerData).isNull();
		initialize(mockReportComposerData);
		Assertions.assertThat(reportComposerData).isNotNull().isEqualTo(mockReportComposerData);
	}

	@Test
	public void testAddReportItem() throws Exception {
		initialize(mockReportComposerData);
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", Date.from(Instant.EPOCH), LogType.LOG);

		checkReportItem("", "", LogType.LOG.geType(), 0, "Caption");
	}

	@Test
	public void testAddReportItemWithLogUseScreenshot() throws Exception {
		initialize(mockReportComposerData);
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", Date.from(Instant.EPOCH), LogType.LOG_USE_SS);

		checkReportItem("", "", LogType.LOG_USE_SS.geType(), 0, "Caption");
	}

	@Test
	public void testAddReportItemWithReportScreenShooter() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		ReportScreenShooter reportScreenShooterMock = Mockito.mock(ReportScreenShooter.class);
		Mockito.when(mockReportComposerData.hasScreenShooter()).thenReturn(true);
		Mockito.when(mockReportComposerData.getScreenShooter()).thenReturn(reportScreenShooterMock);
		Mockito.when(reportScreenShooterMock.captureScreenShot(date, new Object[]{})).
				thenReturn(new ScreenShotVO("fullImageLink", "thumbImageLink"));
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", date, LogType.LOG_USE_SS);

		checkReportItem("fullImageLink", "thumbImageLink", LogType.LOG_USE_SS.geType(), 0, "Caption");
	}

	@Test
	public void testAddReportItemWhenReportScreenShooterThrowError() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		ReportScreenShooter reportScreenShooterMock = Mockito.mock(ReportScreenShooter.class);
		Mockito.when(mockReportComposerData.hasScreenShooter()).thenReturn(true);
		Mockito.when(mockReportComposerData.getScreenShooter()).thenReturn(reportScreenShooterMock);
		Mockito.when(reportScreenShooterMock.captureScreenShot(date, new Object[]{})).
				thenThrow(new RuntimeException());
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", date, LogType.LOG_USE_SS);

		checkReportItem("", "", LogType.LOG_USE_SS.geType(), 0, "Caption");
	}

	@Test
	public void testAddReportItemWithReportScreenShooterWhenUseLogTypeLog() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		ReportScreenShooter reportScreenShooterMock = Mockito.mock(ReportScreenShooter.class);
		Mockito.when(mockReportComposerData.hasScreenShooter()).thenReturn(true);
		Mockito.when(mockReportComposerData.getScreenShooter()).thenReturn(reportScreenShooterMock);
		Mockito.when(reportScreenShooterMock.captureScreenShot(date, new Object[]{})).
				thenReturn(new ScreenShotVO("fullImageLink", "thumbImageLink"));
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", date, LogType.LOG);

		checkReportItem("", "", LogType.LOG.geType(), 0, "Caption");
	}

	@Test
	public void testAddReportItemWhenUseLogTypeHeader() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", date, LogType.HEADER);

		checkReportItem("", "", LogType.HEADER.geType(), 0, "Caption");
	}

	@Test
	public void testAddReportItemWhenUseLogTypeHeaderWithDescriptionItems() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", date, LogType.HEADER, "fast test");

		checkReportItem("", "", LogType.HEADER.geType(), 1, "Caption");
	}

	@Test
	public void testAddReportItemWhenUseLogTypeHeaderWithDescriptionItemsInQuantifyMoreThenTwo() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", date, LogType.HEADER, "fast test", "slow test", "test");

		checkReportItem("", "", LogType.HEADER.geType(), 2, "Caption.test");
	}

	@Test
	public void testAddReportItemWhenUseLogTypeHeaderAndDescriptionItemsContainsSomeClasses() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", date, LogType.HEADER, this, "fast test");

		checkReportItem("", "", LogType.HEADER.geType(), 2, "Caption");
	}

	@Test
	public void testWriteReportItemToFileWithException() throws Exception {
		initialize(mockReportComposerData);
		FileWriter jsFileWriter = mockReportComposerData.jsFileWriter;
		Mockito.doThrow(new IOException()).when(jsFileWriter).write(Mockito.any(String.class));

		SliderReportItem reportItem = new SliderReportItem("caption", new Object[]{}, new ScreenShotVO(), "", Date.from(Instant.EPOCH));
		writeReportItemToFile(reportItem);
	}

	private void checkReportItem(String expectedImageLink, String expectedThumbImageLink, String expectedLogType, int expectedCountOfDescriptionItems, String caption) {
		Assertions.assertThat(savedReportItemToWroteInFile).isNotNull();
		Assertions.assertThat(savedReportItemToWroteInFile.getCaption()).isEqualTo(caption);
		Assertions.assertThat(savedReportItemToWroteInFile.getType()).isEqualTo(expectedLogType);
		Assertions.assertThat(savedReportItemToWroteInFile.getDescription().length()).isEqualTo(expectedCountOfDescriptionItems);
		Assertions.assertThat(savedReportItemToWroteInFile.getImageLink()).isEqualTo(expectedImageLink);
		Assertions.assertThat(savedReportItemToWroteInFile.getThumbImageLink()).isEqualTo(expectedThumbImageLink);
	}

	@Test
	public void testMarkCurrentHeaderAs() throws Exception {
		markCurrentHeaderAs("testTag");
	}

	@Override
	protected void writeReportItemToFile(SliderReportItem reportItem) throws JSONException {
		this.savedReportItemToWroteInFile = reportItem;
		super.writeReportItemToFile(reportItem);
	}
}