package com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder;

import com.loka.autotesting.BaseUnitTest;
import com.loka.autotesting.data.ParaValue;
import org.fest.assertions.Assertions;
import org.json.JSONObject;
import org.junit.Test;

import java.util.List;

public class SliderUtilsTest extends BaseUnitTest {

	@Test
	public void testBeautifyDescriptions() throws Exception {
		String[] description = {"", "asd", ""};
		String[] strings = SliderUtils.beautifyDescriptions(description, o -> o + "");
		Assertions.assertThat(strings).isEqualTo(description);
	}

	@Test
	public void testInitializing() throws Exception {
		new SliderUtils();
	}

	@Test
	public void testBeautifyDescriptionsWithSomeObjects() throws Exception {
		Object[] description = {"", "asd", new SomeObject("*?name:dog")};
		String[] strings = SliderUtils.beautifyDescriptions(
				description,
				o -> o instanceof SomeObject?((SomeObject)o).type:""
		);
		Assertions.assertThat(description[0]).isInstanceOf(strings[0].getClass());
		Assertions.assertThat(description[1]).isInstanceOf(strings[1].getClass());
		Assertions.assertThat(description[2].getClass()).isNotEqualTo(strings[2].getClass());
		Assertions.assertThat(((SomeObject)description[2]).type).isEqualTo(strings[2]);
	}

	@Test
	public void testFilterUnsupportedCharacters() throws Exception {
		String result = SliderUtils.filterUnsupportedCharacters("Find Friend! or backs $ om end line symbol;");
		Assertions.assertThat(result).isEqualTo("Find Friend or backs S om end line symbol");
	}

	@Test
	public void testGetPackages() throws Exception {
		List<ParaValue<String, String>> packages = SliderUtils.getPackages("TestCaption", this, new String[]{"1", "dog"});
//		String[] packages = SliderUtils.getPackages("TestCaption", this, new String[]{"1", "dog"});
		int startIndex = this.getClass().getName().split("\\.").length;
		Assertions.assertThat(packages.get(startIndex).getKey()).isEqualTo("TestCaption");
		Assertions.assertThat(packages.get(startIndex + 1).getKey()).isEqualTo("1");
		Assertions.assertThat(packages.get(startIndex + 2).getKey()).isEqualTo("dog");
	}

	@Test
	public void testGetPackagesWithSpacesInDescItems() throws Exception {
		List<ParaValue<String, String>> packages = SliderUtils.getPackages("TestCaption", this, new String[]{"1 2", "dog"});
//		String[] testCaptions = SliderUtils.getPackages("TestCaption", this, new String[]{"1 2", "dog"});
		int startIndex = this.getClass().getName().split("\\.").length;
		Assertions.assertThat(packages.get(startIndex).getKey()).isEqualTo("TestCaption");
		Assertions.assertThat(packages.get(startIndex+1).getKey()).isEqualTo("1_2");
		Assertions.assertThat(packages.get(startIndex+2).getKey()).isEqualTo("dog");
	}

	@Test
	public void testPutJsonObjectInJsonObjectWithOutOverride() throws Exception {
		JSONObject target = new JSONObject();
		JSONObject newJsObj = new JSONObject();
		newJsObj.put("test", 1);
		JSONObject result = SliderUtils.putJsonObjectInJsonObject(target, "testKey", newJsObj, false);
		Assertions.assertThat(result.has("test")).isTrue();
	}

	@Test
	public void testPutJsonObjectInJsonObjectWithOutOverrideButWithObjectInKey() throws Exception {
		JSONObject target = new JSONObject();
		JSONObject newJsObj = new JSONObject();
		newJsObj.put("test", 1);
		JSONObject result = SliderUtils.putJsonObjectInJsonObject(target, "testKey", newJsObj, false);
		Assertions.assertThat(result.has("test")).isTrue();
		newJsObj = new JSONObject();
		result = SliderUtils.putJsonObjectInJsonObject(target, "testKey", newJsObj, false);
		Assertions.assertThat(result.has("test")).isTrue();
	}

	@Test
	public void testPutNewJsonObjectInJsonObject() throws Exception {
		JSONObject target = new JSONObject();
		JSONObject newJsObj = new JSONObject();
		newJsObj.put("test", 1);
		JSONObject result = SliderUtils.putNewJsonObjectInJsonObject(target, "testKey", false);
		Assertions.assertThat(target.has("testKey")).isTrue();
		Assertions.assertThat(target.getJSONObject("testKey")).isEqualTo(result);
	}

	@Test
	public void testPutJsonObjectInJsonObjectWithOverride() throws Exception {
		JSONObject target = new JSONObject();
		JSONObject newJsObj = new JSONObject();
		newJsObj.put("test", 1);
		JSONObject result = SliderUtils.putJsonObjectInJsonObject(target, "testKey", newJsObj, true);
		Assertions.assertThat(result.has("test")).isTrue();
		newJsObj = new JSONObject();
		result = SliderUtils.putJsonObjectInJsonObject(target, "testKey", newJsObj, true);
		Assertions.assertThat(result.has("test")).isFalse();
	}

	@Test
	public void testClearString() throws Exception {
		Assertions.assertThat(SliderUtils.clearString("http://google.com")).isEqualTo("google_com");
		Assertions.assertThat(SliderUtils.clearString("")).isEqualTo("");
		Assertions.assertThat(SliderUtils.clearString("(")).isEqualTo("");
		Assertions.assertThat(SliderUtils.clearString("()")).isEqualTo("");
		Assertions.assertThat(SliderUtils.clearString("(package/innerPackage)")).isEqualTo("package_innerPackage");
		Assertions.assertThat(SliderUtils.clearString(" ")).isEqualTo("_");
		Assertions.assertThat(SliderUtils.clearString("'Test'")).isEqualTo("_Test_");
		Assertions.assertThat(SliderUtils.clearString("9 ")).isEqualTo("9_");
		Assertions.assertThat(SliderUtils.clearString("9")).isEqualTo("9");
	}

	private class SomeObject {
		protected String type;

		public SomeObject(String type) {
			this.type = type;
		}
	}
}