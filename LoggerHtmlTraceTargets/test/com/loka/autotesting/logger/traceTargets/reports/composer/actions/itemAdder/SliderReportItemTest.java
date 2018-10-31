package com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder;

import com.loka.autotesting.BaseUnitTest;
import com.loka.autotesting.data.ScreenShotVO;
import org.fest.assertions.Assertions;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Test;

import java.util.Date;

import static com.loka.autotesting.logger.utils.StringUtils.insertSpaceInMultiCaseStringAtCaps;

public class SliderReportItemTest extends BaseUnitTest {

	@Test
	public void structureTestOfResultAtGetJsReportItem() throws Exception {
		Date date = new Date();
		SliderReportItem jsReportItem = new SliderReportItem("testCaption", new Object[]{}, new ScreenShotVO(),
				"testReportType", date);
		Assertions.assertThat(jsReportItem).isNotNull();
		Assertions.assertThat(jsReportItem.has("caption")).isTrue();
		Assertions.assertThat(jsReportItem.has("description")).isTrue();
		Assertions.assertThat(jsReportItem.has("imageLink")).isFalse();
		Assertions.assertThat(jsReportItem.has("thumbImageLink")).isFalse();
		Assertions.assertThat(jsReportItem.getImageLink()).isEmpty();
		Assertions.assertThat(jsReportItem.getThumbImageLink()).isEmpty();
		Assertions.assertThat(jsReportItem.has("type")).isTrue();
		Assertions.assertThat(jsReportItem.has("date")).isTrue();
	}

	@Test
	public void gettersTestOfResultAtGetJsReportItem() throws Exception {
		Date date = new Date();
		SliderReportItem jsReportItem = new SliderReportItem("testCaption", new Object[]{},
				new ScreenShotVO("img1", "img2"),
				"testReportType", date);
		Assertions.assertThat(jsReportItem).isNotNull();
		Assertions.assertThat(jsReportItem.getCaption()).isEqualTo("Test caption");
		Assertions.assertThat(jsReportItem.getDate()).isEqualTo(date.getTime());
		Assertions.assertThat(jsReportItem.getType()).isEqualTo("testReportType");
		Assertions.assertThat(jsReportItem.getImageLink()).isEqualTo("img1");
		Assertions.assertThat(jsReportItem.getThumbImageLink()).isEqualTo("img2");
		Assertions.assertThat(jsReportItem.getDescription()).isNotNull();
	}

	@Test
	public void testDescriptionAtGetJsReportItem() throws Exception {
		Date date = new Date();
		Object[] description = {"Hello", 1, "asd"};
		JSONObject jsReportItem = new SliderReportItem(
				"testCaption", description, new ScreenShotVO(), "testReportType", date
		);
		JSONArray descriptionJsonArray = jsReportItem.getJSONArray("description");
		Assertions.assertThat(descriptionJsonArray).isNotNull();
		Assertions.assertThat(descriptionJsonArray.length()).isEqualTo(3);
		for (int i = 0; i < descriptionJsonArray.length(); i++) {
			Assertions.assertThat(descriptionJsonArray.get(i)).isEqualTo(description[i]);
		}
	}

	@Test
	public void testGetJsReportItemWIthEmptyDescriptionList() throws Exception {
		Date date = new Date();
		JSONObject jsReportItem = new SliderReportItem(
				"testCaption", new Object[]{}, new ScreenShotVO("imgLink1", "imgLink2"), "testReportType", date
		);
		Assertions.assertThat(jsReportItem).isNotNull();
		String expectedCaption = insertSpaceInMultiCaseStringAtCaps("testCaption").replaceAll("_", " ");
		Assertions.assertThat(jsReportItem.getString("caption")).isEqualTo(expectedCaption);
		JSONArray description = jsReportItem.getJSONArray("description");
		Assertions.assertThat(description).isNotNull();
		Assertions.assertThat(description.length()).isEqualTo(0);
		Assertions.assertThat(jsReportItem.getString("imageLink")).isEqualTo("imgLink1");
		Assertions.assertThat(jsReportItem.getString("thumbImageLink")).isEqualTo("imgLink2");
		Assertions.assertThat(jsReportItem.getString("type")).isEqualTo("testReportType");
		Assertions.assertThat(jsReportItem.getLong("date")).isEqualTo(date.getTime());
	}

}