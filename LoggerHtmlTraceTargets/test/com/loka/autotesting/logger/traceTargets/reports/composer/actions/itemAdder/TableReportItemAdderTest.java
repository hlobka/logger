package com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder;

import com.loka.autotesting.BaseUnitTest;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import org.fest.assertions.Assertions;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;

public class TableReportItemAdderTest extends BaseUnitTest {
	@Mock
	private ReportComposerData mockReportComposerData;

	@Override
	@Before
	public void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		mockReportComposerData.jsFileWriter = Mockito.mock(FileWriter.class);
		Mockito.when(mockReportComposerData.createNewJsFileWriter(false)).thenReturn(mockReportComposerData.jsFileWriter);

	}

	@Test
	public void testInitialize() throws Exception {
		TableReportItemAdder tableReportItemAdder = new TableReportItemAdder();
		Assertions.assertThat(tableReportItemAdder.reportComposerData).isNull();
		tableReportItemAdder.initialize(mockReportComposerData);
		Assertions.assertThat(tableReportItemAdder.reportComposerData).isNotNull().isEqualTo(mockReportComposerData);
	}

	@Test
	public void testAddReportItemWhenAddSameCaptionAllWillWork() throws Exception {
		TableReportItemAdder tableReportItemAdder = new TableReportItemAdder();
		tableReportItemAdder.initialize(mockReportComposerData);
		tableReportItemAdder.addReportItem("TestCaption", new Date(), LogType.LOG, "test item");
		Assertions.assertThat(tableReportItemAdder.description.toString()).
				contains("TestCaption").
				contains("test item");
	}

	@Test
	public void testAddReportItemWhenFileWriterThrowError() throws Exception {
		TableReportItemAdder tableReportItemAdder = new TableReportItemAdder();
		Mockito.doThrow(new IOException()).when(mockReportComposerData.jsFileWriter).write(Mockito.any(String.class));
		tableReportItemAdder.initialize(mockReportComposerData);

		tableReportItemAdder.addReportItem("TestCaption", new Date(), LogType.LOG, "test item");

		Assertions.assertThat(tableReportItemAdder.description.toString()).
				contains("TestCaption").
				contains("test item");
	}

	@Test
	public void testAddReportItemWhenJsonObjectThrowError() throws Exception {
		TableReportItemAdder tableReportItemAdder = new TableReportItemAdder();
		Mockito.doThrow(new IOException()).when(mockReportComposerData.jsFileWriter).write(Mockito.any(String.class));
		tableReportItemAdder.initialize(mockReportComposerData);
		String testName = "testName";
		tableReportItemAdder.jsonObject.put(testName, new JSONArray());
		tableReportItemAdder.addReportItem("StopTest", new Date(), LogType.LOG, testName);

		Assertions.assertThat(tableReportItemAdder.jsonObject.has(testName)).isTrue();
		Assertions.assertThat(tableReportItemAdder.jsonObject.get(testName)).isInstanceOf(JSONArray.class);
	}

	@Test
	public void testAddReportItemWhenAddStartCaption() throws Exception {
		TableReportItemAdder tableReportItemAdder = new TableReportItemAdder();
		tableReportItemAdder.initialize(mockReportComposerData);
		tableReportItemAdder.addReportItem("StartTest", new Date(), LogType.LOG);
		Assertions.assertThat(tableReportItemAdder.description.toString()).contains(
				"StartTest"
		);
	}

	@Test
	public void testAddReportItemWhenAddStartCaptionWithTwoParams() throws Exception {
		TableReportItemAdder tableReportItemAdder = new TableReportItemAdder();
		tableReportItemAdder.initialize(mockReportComposerData);
		tableReportItemAdder.addReportItem("StartTest", new Date(), LogType.LOG, "testName", "testStage");
		Assertions.assertThat(tableReportItemAdder.description.toString()).
				contains("StartTest").
				contains("testName").
				contains("testStage");
	}

	@Test
	public void testAddReportItemWhenAddStartAndStopCaption() throws Exception {
		TableReportItemAdder tableReportItemAdder = new TableReportItemAdder();
		tableReportItemAdder.initialize(mockReportComposerData);
		Assertions.assertThat(tableReportItemAdder.jsonObject.has("")).isFalse();
		String testName = "TestName";
		String stageName = "StageName";
		tableReportItemAdder.addReportItem("StartTest", new Date(), LogType.LOG, testName, stageName);
		tableReportItemAdder.addReportItem("StopTest", new Date(), LogType.LOG, testName, stageName, true);
		Assertions.assertThat(tableReportItemAdder.jsonObject.has(testName)).isTrue();
		JSONObject testJsonObject = tableReportItemAdder.jsonObject.getJSONObject(testName);
		Assertions.assertThat(testJsonObject.has(stageName)).isTrue();
		JSONObject stageJsonObject = testJsonObject.getJSONObject(stageName);
		Assertions.assertThat(stageJsonObject.has("description")).isTrue();
		Assertions.assertThat(stageJsonObject.has("status")).isTrue();
		Assertions.assertThat(stageJsonObject.getBoolean("status")).isTrue();
	}

	@Test
	public void testAddReportItemWhenAddStopCaption() throws Exception {
		TableReportItemAdder tableReportItemAdder = new TableReportItemAdder();
		tableReportItemAdder.initialize(mockReportComposerData);
		Assertions.assertThat(tableReportItemAdder.jsonObject.has("")).isFalse();
		tableReportItemAdder.addReportItem("StopTest", new Date(), LogType.LOG);
		Assertions.assertThat(tableReportItemAdder.jsonObject.has("")).isTrue();
		JSONObject testJsonObject = tableReportItemAdder.jsonObject.getJSONObject("");
		Assertions.assertThat(testJsonObject.has("")).isTrue();
		JSONObject stageJsonObject = testJsonObject.getJSONObject("");
		Assertions.assertThat(stageJsonObject.has("description")).isTrue();
		Assertions.assertThat(stageJsonObject.has("status")).isTrue();
		Assertions.assertThat(stageJsonObject.getBoolean("status")).isFalse();
	}

	@Test
	public void testMarkCurrentHeaderAs() throws Exception {
		TableReportItemAdder tableReportItemAdder = new TableReportItemAdder();
		tableReportItemAdder.markCurrentHeaderAs("testTag");
	}


}