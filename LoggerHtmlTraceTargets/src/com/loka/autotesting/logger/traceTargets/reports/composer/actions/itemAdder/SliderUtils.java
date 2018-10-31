package com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder;

import com.loka.autotesting.data.ParaValue;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.ObjectToStringConverter;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SliderUtils {
	public static String[] beautifyDescriptions(Object[] description, ObjectToStringConverter objectToStringConverter) {
		String[] descriptions = new String[description.length];
		for (int i = 0; i < description.length; i++) {
			descriptions[i] = objectToStringConverter.convert(description[i]);
		}
		return descriptions;
	}

	protected static String filterUnsupportedCharacters(String inputStr) {
		return inputStr.replaceAll("!", "").replaceAll("\\$", "S").replaceAll(";", "");
	}

	protected static List<ParaValue<String, String>> getPackages(String caption, Object descriptionItem, String[] subTags) {
		String[] packages = getPackages(descriptionItem);
		List<String> packagesList = Arrays.asList(packages);
		List<ParaValue<String, String>> result = new ArrayList<>();
		ParaValue<String, String> paraValue;
		for (String packageValue:packagesList){
			paraValue = new ParaValue<>(clearString(packageValue), packageValue);
			result.add(paraValue);
		}
		paraValue =  new ParaValue<>(clearString(caption.replaceAll("\\t|\\n|\\r", "")), caption);
		result.add(paraValue);
		for (String subTag : subTags) {
			subTag = subTag.replaceAll("\\t|\\n|\\r", "");
			for (String splitAtSubTagItem : subTag.split("\\.")) {
				if(!splitAtSubTagItem.isEmpty()) {
					paraValue = new ParaValue<>(clearString(splitAtSubTagItem), splitAtSubTagItem);
					result.add(paraValue);
				}
			}
		}
		return result;
	}

	private static String[] getPackages(Object descriptionItem) {
		if(descriptionItem instanceof String){
			return ((String)descriptionItem).split("\\.");
		}
		return descriptionItem.getClass().getName().split("\\.");
	}

	protected static String clearString(String subTag) {
		return subTag.
				replaceAll("(\\W |')", "_").
				replace("(", "").
				replace(")", "").
				replace(",", "_").
				replace("http://", "").
				replace("https://", "").
				replaceAll("/", "_").
				replaceAll(" ", "_").
				replaceAll("\\.", "_").
				replaceAll("\\W", "_");
	}

	protected static JSONObject putNewJsonObjectInJsonObject(JSONObject target, String aPackage, boolean override) {
		JSONObject value = new JSONObject();
		return putJsonObjectInJsonObject(target, aPackage, value, override);
	}

	protected static JSONObject putJsonObjectInJsonObject(JSONObject target, String key, JSONObject value, boolean override) {
		if (!override && target.has(key)) {
			JSONObject innerJsonObject = target.getJSONObject(key);
			if (innerJsonObject != null) {
				return innerJsonObject;
			}
		}
		target.put(key, value);
		return value;
	}
}
