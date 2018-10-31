package com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder;

import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import com.loka.autotesting.utils.strings.StringAppender;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;

public class TableReportItemAdder implements ReportItemAdder {
	protected final JSONObject jsonObject = new JSONObject();
	protected StringAppender description = new StringAppender();
	protected ReportComposerData reportComposerData;

	@Override
	public void initialize(ReportComposerData reportComposerData) {
		this.reportComposerData = reportComposerData;
	}

	@Override
	public void addReportItem(String caption, Date date, LogType logType, Object... descriptionItems) {
		String testName = getTestNameAtDescriptionItems(descriptionItems);
		String rowName = getRowNameAtDescriptionItems(descriptionItems);
		switch (caption) {
			case "StartTest":
				description = new StringAppender().appendLn("StartTest: ", testName, "for: ", rowName + ";");
				break;
			case "StopTest":
				Boolean isSuccess = getStatusAtDescriptionItems(descriptionItems);

				JSONObject stage = new JSONObject();
				try {
					stage.put("description", description.toString());
					stage.put("status", isSuccess);
					if(!jsonObject.has(testName)){
						jsonObject.put(testName, new JSONObject());
					}
					jsonObject.getJSONObject(testName).put(rowName, stage);
				} catch (JSONException e) {
					e.printStackTrace();
				}
				break;
			default:
				description.appendLn(caption);
				for (Object descriptionItem : descriptionItems) {
					description.appendLn("\t", descriptionItem);
				}
		}
		try {
			FileWriter jsFileWriter = reportComposerData.createNewJsFileWriter(false);
			jsFileWriter.write("var items = " + jsonObject.toString());
			jsFileWriter.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	protected Boolean getStatusAtDescriptionItems(Object[] descriptionItems) {
		if(descriptionItems.length<3){
			return false;
		}
		return (Boolean) descriptionItems[2];
	}

	protected String getTestNameAtDescriptionItems(Object[] descriptionItems) {
		return getStringArDescriptionItem(descriptionItems, 0);
	}

	protected String getRowNameAtDescriptionItems(Object[] descriptionItems) {
		return getStringArDescriptionItem(descriptionItems, 1);
	}

	protected String getStringArDescriptionItem(Object[] descriptionItems, int index) {
		if(descriptionItems.length<index + 1){
			return "";
		}
		return (String) descriptionItems[index];
	}

	@Override
	public void markCurrentHeaderAs(String tag) {

	}
}
