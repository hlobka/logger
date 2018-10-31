package com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder;

import com.loka.autotesting.data.ScreenShotVO;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Date;

import static com.loka.autotesting.logger.utils.StringUtils.insertSpaceInMultiCaseStringAtCaps;

public class SliderReportItem extends JSONObject {
	public SliderReportItem(String caption, Object[] descriptions, ScreenShotVO screenShot, String reportType, Date date) {
		put("caption", insertSpaceInMultiCaseStringAtCaps(caption).replaceAll("_", " "));
		put("description", new JSONArray(descriptions));
		if(!screenShot.fullImageLink.isEmpty()) {
			put("imageLink", screenShot.fullImageLink);
		}
		if(!screenShot.thumbImageLink.isEmpty()) {
			put("thumbImageLink", screenShot.thumbImageLink);
		}
		put("type", reportType);
		put("date", date.getTime());
	}

	public Long getDate(){
		return getLong("date");
	}

	public String getType(){
		return getString("type");
	}

	public String getImageLink(){
		if(has("imageLink")) {
			return getString("imageLink");
		}
		return "";
	}

	public String getThumbImageLink(){
		if(has("thumbImageLink")) {
			return getString("thumbImageLink");
		}
		return "";
	}

	public String getCaption(){
		return getString("caption");
	}

	public JSONArray getDescription(){
		return getJSONArray("description");
	}
}
