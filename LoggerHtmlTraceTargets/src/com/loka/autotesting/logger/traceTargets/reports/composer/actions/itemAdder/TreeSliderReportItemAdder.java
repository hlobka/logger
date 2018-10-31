package com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder;

import com.loka.autotesting.data.ParaValue;
import com.loka.autotesting.data.ScreenShotVO;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.Logger;
import com.loka.autotesting.logger.screenShooter.ReportScreenShooter;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.ObjectToStringConverter;
import com.loka.autotesting.utils.objectControllers.Destroyable;
import org.apache.commons.lang3.ArrayUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Predicate;

import static com.loka.autotesting.logger.utils.StringUtils.insertSpaceInMultiCaseStringAtCaps;

public class TreeSliderReportItemAdder implements ReportItemAdder, Destroyable {
	private static final String JS_ITEM_CAPTION = "caption";
	public static final String COMMAND_TO_MOVE_SUB_TAG_TO_PARENT = "<";
	public static final String COMMAND_TO_RESET_SUB_TAGS = "<<";
	public static final String COMMAND_TO_MOVE_SUB_TAG = ">";
	public static final String COMMAND_TO_MOVE_IN_SUB_TAG = ">>";
	public static final String EMPTY_CAPTION_LABEL = "::";
	protected final JSONObject jsonObject;
	protected static final String PREFIX_FOR_EMPTY_KEY = "to";
	protected ReportComposerData reportComposerData;
	protected ThreadLocal<SubTags> subTagsThreadLocal;

	private ObjectToStringConverter objectToStringConverter;
	private String parentOfReportHeaderTag = "parent";
	private List<LogType> logTypesToCollapseSimilarLogs = Collections.synchronizedList(new ArrayList<>());
	protected List<LogType> logTypesToUseStackTrace = Collections.synchronizedList(new ArrayList<>());

	public TreeSliderReportItemAdder(ObjectToStringConverter objectToStringConverter) {
		this.objectToStringConverter = objectToStringConverter;
		this.jsonObject = new JSONObject();
		subTagsThreadLocal= new ThreadLocal<>();
	}

	@Override
	public void initialize(ReportComposerData reportComposerData) {
		this.reportComposerData = reportComposerData;
	}

	@Override
	public void addReportItem(String caption, Date date, LogType logType, Object... descriptionItems) {
		try {
			tryToAddReportItem(caption, date, logType, descriptionItems);
		} finally {
			whenLogTypeSpecificSaveReportData(logType);
		}
	}

	private void tryToAddReportItem(String caption, Date date, LogType logType, Object[] descriptionItems) {
		if (logType == LogType.HEADER) {
			writeHeader(caption, date, descriptionItems);
			return;
		}
		if (collapseSimilarLogs(caption, date, logType, descriptionItems)){
			return;
		}
		Object[] descriptions;
		descriptions = addStackTrace(logType, descriptionItems);
		ScreenShotVO screenShotVO = getScreenShotVO(date, logType, descriptions);
		descriptions = SliderUtils.beautifyDescriptions(descriptions, objectToStringConverter);
		SliderReportItem reportItem = new SliderReportItem(caption, descriptions, screenShotVO, logType.geType(), date);
		writeReportItemToFile(reportItem, logType);
	}

	private Object[] addStackTrace(LogType logType, Object[] descriptionItems) {
		if (logTypesToUseStackTrace.contains(logType)) {
			String stackTrace = Logger.getSettings().getStackTraceParser().getStackTrace(new RuntimeException());
			return ArrayUtils.add(descriptionItems, stackTrace);
		}
		return descriptionItems;
	}

	private boolean collapseSimilarLogs(String caption, Date date, LogType logType, Object[] descriptionItems) {
		if (logTypesToCollapseSimilarLogs.contains(logType)) {
			if (putInPreviousReportItemWhenItSimilarToNewReportItem(caption, date, logType, descriptionItems)) {
				return true;
			}
		}
		return false;
	}

	private void whenLogTypeSpecificSaveReportData(LogType logType) {
		switch (logType) {
			case HEADER:
			case ERROR:
			case THROWABLE_ERROR:
			case WARNING:
			case WARNING_USE_SS:
			case STRONG_WARNING:
			case BLINK:
				saveReportDataToFile(false);
				break;
			default:
				if (logType.isUseSS()) {
					saveReportDataToFile(false);
				}
		}
	}

	private void writeHeader(String caption, Date date, Object[] descriptionItems) {
		if (descriptionItems.length > 1 && !(descriptionItems[0] instanceof String) && (descriptionItems[1] instanceof String)) {
			String[] subTags = new String[descriptionItems.length - 1];
			for (int subTagKey = 1; subTagKey < descriptionItems.length; subTagKey++) {
				subTags[subTagKey - 1] = descriptionItems[subTagKey] + "";
			}
			startNewTag(caption, descriptionItems[0], date, subTags);
		} else if (descriptionItems.length == 1 && (descriptionItems[0] instanceof String) && caption.contains(EMPTY_CAPTION_LABEL)) {
			putSubTagInCurrentTag(String.valueOf(descriptionItems[0]), date, false);
		} else if (descriptionItems.length == 1 && (descriptionItems[0] instanceof String) && COMMAND_TO_MOVE_SUB_TAG.equals(caption)) {
			putSubTagInCurrentTag(String.valueOf(descriptionItems[0]), date, true);
		} else if (descriptionItems.length == 1 && (descriptionItems[0] instanceof String) && COMMAND_TO_MOVE_IN_SUB_TAG.equals(caption)) {
			putSubTagInCurrentSubTag(String.valueOf(descriptionItems[0]), date, false);
		} else if (descriptionItems.length == 0 && COMMAND_TO_RESET_SUB_TAGS.equals(caption)) {
			resetSubTags();
		} else if (descriptionItems.length == 0 && COMMAND_TO_MOVE_SUB_TAG_TO_PARENT.equals(caption)) {
			moveSubTagToParent();
		} else if (descriptionItems.length == 1 && COMMAND_TO_MOVE_SUB_TAG_TO_PARENT.equals(caption)) {
			moveSubTagToParent(String.valueOf(descriptionItems[0]));
		} else if (descriptionItems.length > 0 && !(descriptionItems[0] instanceof String)) {
			startNewTag(caption, descriptionItems[0], date);
		} else {
			startNewTag(caption, parentOfReportHeaderTag, date, SliderUtils.beautifyDescriptions(descriptionItems, objectToStringConverter));
		}
	}

	private boolean putInPreviousReportItemWhenItSimilarToNewReportItem(String caption, Date date, LogType logType, Object[] descriptionItems) {
		SliderReportItem prevReportItem = getLastSliderReportItem();
		if (descriptionItems.length > 0 && prevReportItem != null && prevReportItem.getDescription().length() > 0) {
			boolean reportItemsIsSimilar = isReportItemsIsSimilar(caption, logType, prevReportItem);
			if (reportItemsIsSimilar) {
				String prevFirstDesc = prevReportItem.getDescription().getString(0).replaceAll("[\\W\\d]+", "");
				String firstDesc = (descriptionItems[0] + "").replaceAll("[\\W\\d]+", "");
				if (prevFirstDesc.equals(firstDesc)) {
					putDescItemsToReportItem(date, descriptionItems, prevReportItem);
					return true;
				}
			}
		}
		return false;
	}

	private boolean isReportItemsIsSimilar(String caption, LogType logType, SliderReportItem prevReportItem) {
		String convertedCaption = insertSpaceInMultiCaseStringAtCaps(caption).replaceAll("_", " ");
		boolean captionsIsSimilar = convertedCaption.equals(prevReportItem.getCaption());
		boolean typesIsSimilar = prevReportItem.getType().equals(logType.geType());
		return captionsIsSimilar && typesIsSimilar;
	}

	private void putDescItemsToReportItem(Date date, Object[] descriptionItems, SliderReportItem prevReportItem) {
		Object removedElement = prevReportItem.getDescription().remove(prevReportItem.getDescription().length() - 1);
		for (String desc : SliderUtils.beautifyDescriptions(descriptionItems, objectToStringConverter)) {
			prevReportItem.getDescription().put("[" + getDate(date) + "]" + " => " + desc);
		}
		prevReportItem.getDescription().put(removedElement);
	}

	private String getDate(Date date) {
		return new SimpleDateFormat("HH:mm:ss", Locale.US).format(date);
	}

	private ScreenShotVO getScreenShotVO(Date date, LogType logType, Object[] descriptionItems) {
		ScreenShotVO screenShotVO = new ScreenShotVO();
		if (logType.isUseSS() && reportComposerData.hasScreenShooter()) {
			ReportScreenShooter reportScreenShooter = reportComposerData.getScreenShooter();
			screenShotVO = reportScreenShooter.captureScreenShot(date, descriptionItems);
		}
		return screenShotVO;
	}

	@Override
	public void markCurrentHeaderAs(String tag) {
		if (getSubTags().parentAtCurrentObject != null) {
			Object caption = getSubTags().parentAtCurrentObject.get(JS_ITEM_CAPTION);
			getSubTags().parentAtCurrentObject.put(JS_ITEM_CAPTION, caption + tag);
		}
	}

	private void startNewTag(String caption, Object descriptionItem, Date date, String... subTags) {
		resetSubTags();
		getSubTags().parentAtCurrentSubObject = null;
		JSONObject currentTagOfJsObject = jsonObject;
		List<ParaValue<String, String>> packages = SliderUtils.getPackages(caption, descriptionItem, subTags);
		if (getSubTags().parentAtCurrentObject != null && getSubTags().parentAtCurrentObject.has("data")) {
			getSubTags().parentAtCurrentObject.put("executionTime", new Date().getTime() - getSubTags().timeOfStartNewTag);
		}
		for (ParaValue<String, String> tagKey : packages) {
			String key = tagKey.getKey().isEmpty() ? PREFIX_FOR_EMPTY_KEY + tagKey.getKey() : tagKey.getKey();
			key = SliderUtils.filterUnsupportedCharacters(key);
			int indexOf = packages.indexOf(tagKey);
			key = getNewKeyWhenCurrentObjectHasKey(currentTagOfJsObject, packages, key, indexOf);
			currentTagOfJsObject = putSubTagInCurrentTag(date, currentTagOfJsObject, tagKey, key);
		}
		getSubTags().parentAtCurrentObject = currentTagOfJsObject;

		getSubTags().timeOfStartNewTag = new Date().getTime();
	}

	private void putSubTagInCurrentTag(String descriptionItem, Date date, Boolean setAsNewParent) {
		if(getSubTags().parentAtCurrentObject== null){
			startNewEmptyCaption(descriptionItem, date);
			return;
		}
		if (getSubTags().parentsAtCurrentSubObject == null) {
			getSubTags().parentsAtCurrentSubObject = new ArrayList<>();
		}
		if (!getSubTags().parentsAtCurrentSubObject.isEmpty()) {
			getSubTags().parentAtCurrentSubObject = getSubTags().parentsAtCurrentSubObject.get(getSubTags().parentsAtCurrentSubObject.size() - 1);
		} else {
			getSubTags().parentAtCurrentSubObject = getSubTags().parentAtCurrentObject;
		}
		if (!getSubTags().parentsAtCurrentSubObject.contains(getSubTags().parentAtCurrentSubObject)) {
			getSubTags().parentsAtCurrentSubObject.add(getSubTags().parentAtCurrentSubObject);
		}
		String subTag = insertSpaceInMultiCaseStringAtCaps(descriptionItem);
		String key = SliderUtils.clearString(subTag);
		key = getNewKeyWhenCurrentObjectHasKey(getSubTags().parentAtCurrentSubObject, key);
		getSubTags().parentAtCurrentSubObject = putSubTagInCurrentTag(date, getSubTags().parentAtCurrentSubObject, new ParaValue<>(key, subTag), key);
		if (setAsNewParent && !getSubTags().parentsAtCurrentSubObject.contains(getSubTags().parentAtCurrentSubObject)) {
			getSubTags().parentsAtCurrentSubObject.add(getSubTags().parentAtCurrentSubObject);
		}
		getSubTags().parentAtCurrentSubObject.put("subTag", true);
	}

	private void startNewEmptyCaption(String descriptionItem, Date date) {
		startNewTag("empty caption[caption: "+ descriptionItem+"; ThreadName: "+ Thread.currentThread().getName() +"; ThreadId: " + Thread.currentThread().getId() +"]", descriptionItem, date);
	}

	private void putSubTagInCurrentSubTag(String descriptionItem, Date date, Boolean isSubtagAsParent) {
		if(getSubTags().parentAtCurrentObject== null){
			startNewEmptyCaption(descriptionItem, date);
			return;
		}
		if (getSubTags().parentAtCurrentSubObject == null) {
			getSubTags().parentAtCurrentSubObject = getSubTags().parentAtCurrentObject;
		}
		if (getSubTags().parentsAtCurrentSubObject == null) {
			getSubTags().parentsAtCurrentSubObject = new ArrayList<>();
		}
		String subTag = insertSpaceInMultiCaseStringAtCaps(descriptionItem);
		String key = SliderUtils.clearString(subTag);
		key = getNewKeyWhenCurrentObjectHasKey(getSubTags().parentAtCurrentSubObject, key);
		if (!getSubTags().parentsAtCurrentSubObject.contains(getSubTags().parentAtCurrentSubObject)) {
			getSubTags().parentsAtCurrentSubObject.add(getSubTags().parentAtCurrentSubObject);
		}
		getSubTags().parentAtCurrentSubObject = putSubTagInCurrentTag(date, getSubTags().parentAtCurrentSubObject, new ParaValue<>(key, subTag), key);
		if (isSubtagAsParent && !getSubTags().parentsAtCurrentSubObject.contains(getSubTags().parentAtCurrentSubObject)) {
			getSubTags().parentsAtCurrentSubObject.add(getSubTags().parentAtCurrentSubObject);
		}
		getSubTags().parentAtCurrentSubObject.put("subTag", true);
	}

	private void moveSubTagToParent(String parentTag) {
		if (getSubTags().parentsAtCurrentSubObject != null && !getSubTags().parentsAtCurrentSubObject.isEmpty()) {
			JSONObject remove = getSubTags().parentsAtCurrentSubObject.remove(getSubTags().parentsAtCurrentSubObject.size() - 1);
			if (insertSpaceInMultiCaseStringAtCaps(parentTag).equals(remove.getString(JS_ITEM_CAPTION))) {
				getSubTags().parentAtCurrentSubObject = remove;
				getSubTags().currentObject = getSubTags().parentAtCurrentSubObject.getJSONArray("data");
				moveSubTagToParent();
			} else {
				moveSubTagToParent(parentTag);
			}
		} else {
			resetSubTags();
		}
	}

	private void moveSubTagToParent() {
		if (getSubTags().parentsAtCurrentSubObject != null && !getSubTags().parentsAtCurrentSubObject.isEmpty()) {
			if (!getSubTags().parentsAtCurrentSubObject.get(getSubTags().parentsAtCurrentSubObject.size() - 1).equals(getSubTags().parentAtCurrentSubObject)) {
				getSubTags().parentAtCurrentSubObject = getSubTags().parentsAtCurrentSubObject.get(getSubTags().parentsAtCurrentSubObject.size() - 1);
				getSubTags().currentObject = getSubTags().parentAtCurrentSubObject.getJSONArray("data");
				return;
			}
			JSONObject remove = getSubTags().parentsAtCurrentSubObject.remove(getSubTags().parentsAtCurrentSubObject.size() - 1);
			if (getSubTags().parentsAtCurrentSubObject.isEmpty()) {
				resetSubTags();
				return;
			}
			if (getSubTags().parentAtCurrentSubObject == remove) {
				getSubTags().parentAtCurrentSubObject = getSubTags().parentsAtCurrentSubObject.get(getSubTags().parentsAtCurrentSubObject.size() - 1);
				getSubTags().currentObject = getSubTags().parentAtCurrentSubObject.getJSONArray("data");
			} else {
				getSubTags().parentAtCurrentSubObject = remove;
				getSubTags().currentObject = getSubTags().parentAtCurrentSubObject.getJSONArray("data");
			}
		}
	}

	private void resetSubTags() {
		getSubTags().parentAtCurrentSubObject = null;
		getSubTags().parentsAtCurrentSubObject = null;
		if (getSubTags().parentAtCurrentObject != null) {
			getSubTags().currentObject = getSubTags().parentAtCurrentObject.getJSONArray("data");
		}
	}

	private JSONObject putSubTagInCurrentTag(Date date, JSONObject currentTagOfJsObject, ParaValue<String, String> tagKey, String key) {
		JSONArray data = new JSONArray();
		JSONObject newTagOfJsObject = SliderUtils.putNewJsonObjectInJsonObject(currentTagOfJsObject, key, false);
		newTagOfJsObject.put(JS_ITEM_CAPTION, tagKey.getValue());
		if (!newTagOfJsObject.has("date")) {
			newTagOfJsObject.put("date", date.getTime());
		}
		if (!newTagOfJsObject.has("data")) {
			newTagOfJsObject.put("data", data);
		} else {
			data = newTagOfJsObject.getJSONArray("data");
		}
		this.getSubTags().currentObject = data;
		return newTagOfJsObject;
	}

	private String getNewKeyWhenCurrentObjectHasKey(JSONObject currentObject, List<ParaValue<String, String>> packages, String key, int indexOf) {
		Predicate<String> isCurrentObjectHasKey = s ->
				currentObject.has(s) && (!(currentObject.get(s) instanceof JSONObject) || indexOf == packages.size() - 1);
		return getNewKeyWhenItPresent(key, isCurrentObjectHasKey);
	}

	private String getNewKeyWhenCurrentObjectHasKey(JSONObject currentObject, String key) {
		if(currentObject == null){
			return key;
		}
		return getNewKeyWhenItPresent(key, currentObject::has);
	}

	private String getNewKeyWhenItPresent(String key, Predicate<String> isCurrentObjectHasKey) {
		String result = key;
		if (isCurrentObjectHasKey.test(key)) {
			int iterator = 1;
			String possibleKey = key + "__" + iterator;
			while (isCurrentObjectHasKey.test(possibleKey)) {
				iterator++;
				possibleKey = key + "__" + iterator;
			}
			result = possibleKey;
		}
		return result;
	}

	protected void writeReportItemToFile(SliderReportItem reportItem, LogType logType) {
		if (logType == LogType.FORMAT_LOG) {
			SliderReportItem lastSliderReportItem = getLastSliderReportItem();
			if (lastSliderReportItem != null) {
				if (lastSliderReportItem.getCaption().equals(reportItem.getCaption()) && lastSliderReportItem.getType().equals(reportItem.getType())) {
					JSONArray reportItemDescription = reportItem.getDescription();
					for (int i = 0; i < reportItemDescription.length(); i++) {
						lastSliderReportItem.getDescription().put(reportItemDescription.get(i));
					}
					return;
				}
			}
		}
		getSubTags().currentObject.put(reportItem);
	}

	private SliderReportItem getLastSliderReportItem() {
		if (getSubTags().currentObject.length() > 0) {
			return (SliderReportItem) getSubTags().currentObject.getJSONObject(getSubTags().currentObject.length() - 1);
		}
		return null;
	}

	private void saveReportDataToFile(Boolean isReportFinished) {
		try {
			String str = "\nvar items = " + jsonObject.toString() + ";";
			FileWriter jsFileWriter = reportComposerData.createNewJsFileWriter(false);
			jsFileWriter.write("var suiteName = \"" + reportComposerData.suiteName + "\";\n");
			jsFileWriter.write("var isReportFinished = " + isReportFinished.toString() + ";\n");
			jsFileWriter.write(str);
			jsFileWriter.flush();
		} catch (IOException ignore) {
			ignore.printStackTrace();
		}
	}

	@Override
	public void destroy() {
		if (getSubTags().parentAtCurrentObject != null && getSubTags().parentAtCurrentObject.has("data")) {
			getSubTags().parentAtCurrentObject.put("executionTime", new Date().getTime() - getSubTags().timeOfStartNewTag);
		}
		try {
			new JSONObjectDataCollapser().collapseTags(jsonObject);
		} finally {
			saveReportDataToFile(true);
		}
	}

	public SubTags getSubTags() {
		if(subTagsThreadLocal.get()==null){
			subTagsThreadLocal.set(new SubTags());
		}
		return subTagsThreadLocal.get();
	}

	public void setParentOfReportHeaderTag(String parentOfReportHeaderTag) {
		if(parentOfReportHeaderTag != null){
			this.parentOfReportHeaderTag = parentOfReportHeaderTag;
		}
	}

	public void setLogTypesToCollapseSimilarLogs(List<LogType> logTypesToCollapseSimilarLogs) {
		this.logTypesToCollapseSimilarLogs = Collections.synchronizedList(new ArrayList<>(logTypesToCollapseSimilarLogs));
	}

	public void setLogTypesToUseStackTrace(List<LogType> logTypesToUseStackTrace) {
		this.logTypesToUseStackTrace = logTypesToUseStackTrace;
	}

	private class JSONObjectDataCollapser {
		protected void collapseTags(JSONObject jsonObject) {
			while (getNumberOfJsObjects(jsonObject) == 1) {
				ParaValue<String, JSONObject> jsonObjectParaValue = getInnerJsonObject(jsonObject);
				JSONObject innerJsonObject = jsonObjectParaValue.getValue();
				String key = jsonObjectParaValue.getKey();
				String key2 = getKeyOfFirstJsChild(jsonObject);
				int numberOfJsObjects = getNumberOfJsObjects(innerJsonObject);
				if (innerJsonObject.has("subTag")) {
					break;
				}
				if(numberOfJsObjects==1){
					jsonObject.remove(key2);
					if(jsonObject.has(JS_ITEM_CAPTION)) {
						jsonObject.put(JS_ITEM_CAPTION, innerJsonObject.getString(JS_ITEM_CAPTION));
					}
					jsonObject.put(key, innerJsonObject.getJSONObject(key));
				} else if(numberOfJsObjects>1){
					if (!jsonObject.has("data")|| jsonObject.getJSONArray("data").length() == 0) {
						jsonObject.remove(key2);
						if(jsonObject.has(JS_ITEM_CAPTION)) {
							jsonObject.put(JS_ITEM_CAPTION, jsonObject.getString(JS_ITEM_CAPTION) + "." + innerJsonObject.getString(JS_ITEM_CAPTION));
							for (String s : innerJsonObject.keySet()) {
								if (innerJsonObject.get(s) instanceof JSONObject) {
									jsonObject.put(s, innerJsonObject.getJSONObject(s));
									collapseTags(innerJsonObject.getJSONObject(s));
								}
							}
							break;
						} else {
							jsonObject.put(key2, innerJsonObject);
							collapseInChilds(innerJsonObject);
						}
					}
					break;
				} else {
					if (jsonObject.has(JS_ITEM_CAPTION) && (!jsonObject.has("data") || jsonObject.getJSONArray("data").length() == 0) && (innerJsonObject.has("data") && innerJsonObject.getJSONArray("data").length() > 0)) {
						jsonObject.put(JS_ITEM_CAPTION, jsonObject.optString(JS_ITEM_CAPTION, "emptyCaption2") + "." + innerJsonObject.optString(JS_ITEM_CAPTION, "emptyCaption2"));
						jsonObject.put("data", innerJsonObject.opt("data"));
						jsonObject.put("executionTime", innerJsonObject.opt("executionTime"));
						jsonObject.remove(key2);
					}
					break;
				}
			}
		}

		private void collapseInChilds(JSONObject innerJsonObject) {
			for (String s : innerJsonObject.keySet()) {
				if (innerJsonObject.get(s) instanceof JSONObject) {
					collapseTags(innerJsonObject.getJSONObject(s));
				}
			}
		}

		private int getNumberOfJsObjects(JSONObject innerJsonObject) {
			int result = 0;
			for (String s : innerJsonObject.keySet()) {
				if (innerJsonObject.get(s) instanceof JSONObject) {
					result++;
				}
			}
			return result;
		}

		private ParaValue<String, JSONObject> getInnerJsonObject(JSONObject jsonObject) {
			JSONObject result = null;
			String key;
			for (String s : jsonObject.keySet()) {
				if (jsonObject.get(s) instanceof JSONObject) {
					result = jsonObject.getJSONObject(s);
					break;
				}
			}
			key = getKeyOfFirstJsChild(result);
			return new ParaValue<>(key, result);
		}

		private String getKeyOfFirstJsChild(JSONObject result) {
			String key = "";
			for (String s1 : result.keySet()) {
				if (result.get(s1) instanceof JSONObject) {
					key = s1;
				}
			}
			return key;
		}
	}

	public static class SubTags {
		protected JSONArray currentObject = new JSONArray();
		protected JSONObject parentAtCurrentObject;
		protected List<JSONObject> parentsAtCurrentSubObject;
		protected JSONObject parentAtCurrentSubObject;
		protected long timeOfStartNewTag;
	}
}
