package com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder;

import com.loka.autotesting.data.ParaValue;
import com.loka.autotesting.data.ScreenShotVO;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.screenShooter.ReportScreenShooter;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import org.fest.assertions.Assertions;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.io.FileWriter;
import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.List;

public class TreeSliderReportItemAdderTest extends TreeSliderReportItemAdder {
	@Mock
	private ReportComposerData mockReportComposerData;
	private SliderReportItem savedReportItemToWroteInFile;

	public TreeSliderReportItemAdderTest() {
		super(o -> o + "");
	}

	@Before
	public void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		mockReportComposerData.jsFileWriter = Mockito.mock(FileWriter.class);
		Mockito.when(mockReportComposerData.createNewJsFileWriter(false)).thenReturn(mockReportComposerData.jsFileWriter);
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
	public void testAddReportItemWithTwiceIdenticalCaption() throws Exception {
		initialize(mockReportComposerData);

		addReportItem("caption", Date.from(Instant.EPOCH), LogType.HEADER);
		addReportItem("caption", Date.from(Instant.EPOCH), LogType.HEADER);

		Assertions.assertThat(jsonObject.length()).isEqualTo(1);
		List<ParaValue<String, String>> packages = SliderUtils.getPackages("caption", "parent", new String[]{});
		Assertions.assertThat(packages.size()).isPositive();
		JSONObject innerJsonObject = jsonObject;
		for (ParaValue<String, String> aPackage : packages) {
			String key = aPackage.getKey();
			if(key.equals("caption")){
				key += "__1";
				Assertions.assertThat(
						innerJsonObject.has("caption")
				).isTrue();
				Assertions.assertThat(
						innerJsonObject.has("caption__1")
				).isTrue();
			}
			Assertions.assertThat(
					innerJsonObject.has(key)
			).isTrue();
			innerJsonObject = innerJsonObject.getJSONObject(key);
		}
	}

	@Test
	public void testAddReportItemWithThriceIdenticalCaption() throws Exception {
		initialize(mockReportComposerData);

		addReportItem("caption", Date.from(Instant.EPOCH), LogType.HEADER);
		addReportItem("caption", Date.from(Instant.EPOCH), LogType.HEADER);
		addReportItem("caption", Date.from(Instant.EPOCH), LogType.HEADER);

		Assertions.assertThat(jsonObject.length()).isEqualTo(1);
		List<ParaValue<String, String>> packages = SliderUtils.getPackages("caption", "parent", new String[]{});
		Assertions.assertThat(packages.size()).isPositive();
		JSONObject innerJsonObject = jsonObject;
		for (ParaValue<String, String> aPackage : packages) {
			String key = aPackage.getKey();
			Assertions.assertThat(
					innerJsonObject.has(key)
			).isTrue();

			if(aPackage.getKey().equals("caption")){
				key = "caption";
				Assertions.assertThat(
						innerJsonObject.has(key)
				).isTrue();
				key = "caption__1";
				Assertions.assertThat(
						innerJsonObject.has(key)
				).isTrue();
				key = "caption__2";
				Assertions.assertThat(
						innerJsonObject.has(key)
				).isTrue();
			}
			innerJsonObject = innerJsonObject.getJSONObject(key);
		}
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
	public void testAddReportItemWithReportScreenShooterWhenUseLogTypeDebug() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		ReportScreenShooter reportScreenShooterMock = Mockito.mock(ReportScreenShooter.class);
		Mockito.when(mockReportComposerData.hasScreenShooter()).thenReturn(true);
		Mockito.when(mockReportComposerData.getScreenShooter()).thenReturn(reportScreenShooterMock);
		Mockito.when(reportScreenShooterMock.captureScreenShot(date, new Object[]{})).
				thenReturn(new ScreenShotVO("fullImageLink", "thumbImageLink"));
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();
		logTypesToUseStackTrace.add(LogType.DEBUG);
		addReportItem("caption", date, LogType.DEBUG);

		checkReportItem("", "", LogType.DEBUG.geType(), 1, "Caption");
		String description = savedReportItemToWroteInFile.getDescription().getString(0);
		Assertions.assertThat(description.replaceAll("\n", "")).matches("(\\t?at (\\w+\\.)+\\w+\\(\\w+\\.\\w+:\\d+\\))+");
	}

	@Test
	public void testAddReportItemWithReportScreenShooterWhenUseLogTypeDebugWitoutStackTrace() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		ReportScreenShooter reportScreenShooterMock = Mockito.mock(ReportScreenShooter.class);
		Mockito.when(mockReportComposerData.hasScreenShooter()).thenReturn(true);
		Mockito.when(mockReportComposerData.getScreenShooter()).thenReturn(reportScreenShooterMock);
		Mockito.when(reportScreenShooterMock.captureScreenShot(date, new Object[]{})).
				thenReturn(new ScreenShotVO("fullImageLink", "thumbImageLink"));
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();
		addReportItem("caption", date, LogType.DEBUG);

		checkReportItem("", "", LogType.DEBUG.geType(), 0, "Caption");
	}

	@Test
	public void testAddReportItemWhenUseLogTypeHeader() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", date, LogType.HEADER);

		Assertions.assertThat(jsonObject.length()).isEqualTo(1);
		List<ParaValue<String, String>> packages = SliderUtils.getPackages("caption", "parent", new String[]{});
		Assertions.assertThat(packages.size()).isPositive();
		JSONObject innerJsonObject = jsonObject;
		for (ParaValue<String, String> aPackage : packages) {
			String key = aPackage.getKey();
			if(key.equals("caption")){
				key += "__1";
			}
			Assertions.assertThat(
					innerJsonObject.has(key)
			).isTrue();
			innerJsonObject = innerJsonObject.getJSONObject(key);
		}
	}

	@Test
	public void testAddReportItemWhenSetExecutionTimeForPreviousCaption() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		Assertions.assertThat(getSubTags().parentAtCurrentObject).isNull();

		addReportItem("caption", date, LogType.HEADER);

		JSONObject savedParentAtCurrentObject = this.getSubTags().parentAtCurrentObject;
		Assertions.assertThat(savedParentAtCurrentObject).isNotNull();
		Assertions.assertThat(savedParentAtCurrentObject.has("executionTime")).isFalse();

		addReportItem("caption2", date, LogType.HEADER);
		Assertions.assertThat(savedParentAtCurrentObject.has("executionTime")).isTrue();
	}

	@Test
	public void testAddReportItemWhenUseLogTypeHeaderWithDescriptionItems() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", date, LogType.HEADER, "fast test");

		Assertions.assertThat(jsonObject.length()).isEqualTo(1);
		List<ParaValue<String, String>> packages = SliderUtils.getPackages("caption", "parent", new String[]{"fast test"});
		Assertions.assertThat(packages.size()).isPositive();
		JSONObject innerJsonObject = jsonObject;
		for (ParaValue<String, String> aPackage : packages) {
			String key = aPackage.getKey();
			if(key.equals("caption")){
				key += "__1";
			}
			Assertions.assertThat(
					innerJsonObject.has(key)
			).isTrue();
			innerJsonObject = innerJsonObject.getJSONObject(key);
		}
	}

	@Test
	public void testAddReportItemWhenUseLogTypeHeaderWithDescriptionItems2() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", date, LogType.HEADER, this, 1);

		Assertions.assertThat(jsonObject.length()).isEqualTo(1);
		List<ParaValue<String, String>> packages = SliderUtils.getPackages("caption", this, new String[]{});
		Assertions.assertThat(packages.size()).isPositive();
		JSONObject innerJsonObject = jsonObject;
		for (ParaValue<String, String> aPackage : packages) {
			String key = aPackage.getKey();
			if(key.equals("caption")){
				key += "__1";
			}
			Assertions.assertThat(
					innerJsonObject.has(key)
			).isTrue();
			innerJsonObject = innerJsonObject.getJSONObject(key);
		}
	}

	@Test
	public void testAddReportItemWhenUseLogTypeHeaderWithDescriptionItemsInQuantifyMoreThenTwo() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		addReportItem("caption", date, LogType.HEADER, "fast test", "slow test", "test");

		Assertions.assertThat(jsonObject.length()).isEqualTo(1);
		List<ParaValue<String, String>> packages = SliderUtils.getPackages("caption", "parent", new String[]{"fast test", "slow test", "test"});
		Assertions.assertThat(packages.size()).isPositive();
		JSONObject innerJsonObject = jsonObject;
		for (ParaValue<String, String> aPackage : packages) {
			String key = aPackage.getKey();
			if(key.equals("caption")){
				key += "__1";
			}
			Assertions.assertThat(
					innerJsonObject.has(key)
			).isTrue();
			innerJsonObject = innerJsonObject.getJSONObject(key);
		}
	}

	@Test
	public void testAddReportItemWhenUseLogTypeHeaderAndDescriptionItemsContainsSomeClasses() throws Exception {
		initialize(mockReportComposerData);
		Date date = Date.from(Instant.EPOCH);
		Assertions.assertThat(savedReportItemToWroteInFile).isNull();

		Assertions.assertThat(jsonObject.length()).isEqualTo(0);
		addReportItem("caption", date, LogType.HEADER, this, "fast test");
		Assertions.assertThat(jsonObject.length()).isEqualTo(1);
		List<ParaValue<String, String>> packages = SliderUtils.getPackages("caption", this, new String[]{"fast test"});
		Assertions.assertThat(packages.size()).isPositive();
		JSONObject innerJsonObject = jsonObject;
		for (ParaValue<String, String> aPackage : packages) {
			String key = aPackage.getKey();
			if(key.equals("caption")){
				key += "__1";
			}
			Assertions.assertThat(innerJsonObject.has(key)).isTrue();
			innerJsonObject = innerJsonObject.getJSONObject(key);
		}
	}

	@Test
	public void testWriteReportItemToFileWithException() throws Exception {
		initialize(mockReportComposerData);
		FileWriter jsFileWriter = mockReportComposerData.jsFileWriter;
		Mockito.doThrow(new IOException()).when(jsFileWriter).write(Mockito.any(String.class));

		SliderReportItem reportItem = new SliderReportItem("caption", new Object[]{}, new ScreenShotVO(), "", Date.from(Instant.EPOCH));
		writeReportItemToFile(reportItem, LogType.LOG);
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
	public void testMarkCurrentHeaderAsWhenParentObjIsNull() throws Exception {
		markCurrentHeaderAs("testTag");
	}

	@Test
	public void testMarkCurrentHeaderAsWhenParentObjIsNotNull() throws Exception {
		Date date = Date.from(Instant.EPOCH);
		getSubTags().parentAtCurrentObject = new SliderReportItem("testCaption", new Object[]{}, new ScreenShotVO(), "log", date);
		Assertions.assertThat(getSubTags().parentAtCurrentObject.getString("caption")).
				isEqualTo("Test caption");
		markCurrentHeaderAs(" testTag");
		Assertions.assertThat(getSubTags().parentAtCurrentObject.getString("caption")).
				isEqualTo("Test caption testTag");

	}

	@Override
	protected void writeReportItemToFile(SliderReportItem reportItem, LogType logType) throws JSONException {
		this.savedReportItemToWroteInFile = reportItem;
		super.writeReportItemToFile(reportItem, logType);
	}
}