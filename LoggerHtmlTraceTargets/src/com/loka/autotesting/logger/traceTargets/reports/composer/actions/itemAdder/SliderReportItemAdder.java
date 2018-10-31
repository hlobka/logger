package com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder;

import com.loka.autotesting.data.ScreenShotVO;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.Logger;
import com.loka.autotesting.logger.screenShooter.ReportScreenShooter;
import com.loka.autotesting.logger.traceTargets.reports.composer.ReportComposerData;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.ObjectToStringConverter;
import org.apache.commons.lang3.ArrayUtils;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;

import static com.loka.autotesting.logger.utils.StringUtils.insertSpaceInMultiCaseStringAtCaps;

public class SliderReportItemAdder implements ReportItemAdder {
	protected ReportComposerData reportComposerData;
	private ObjectToStringConverter objectToStringConverter;

	public SliderReportItemAdder(ObjectToStringConverter objectToStringConverter) {
		this.objectToStringConverter = objectToStringConverter;
	}

	@Override
	public void initialize(ReportComposerData reportComposerData) {
		this.reportComposerData = reportComposerData;
	}

	@Override
	public void addReportItem(String caption, Date date, LogType logType, Object... descriptionItems) {
		if (logType.equals(LogType.HEADER)) {
			if (descriptionItems.length > 2) {
				Object annotationCaption = descriptionItems[2];
				descriptionItems = ArrayUtils.remove(descriptionItems, 2);
				caption += "." + annotationCaption;
			}
			if (descriptionItems.length > 0 && !(descriptionItems[0] instanceof String)) {
				descriptionItems[0] = descriptionItems[0].getClass().getSimpleName();
			}
		}
		String reportType = logType.geType();
		ScreenShotVO screenShotVO = new ScreenShotVO();
		if (logType.isUseSS() && reportComposerData.hasScreenShooter()) {
			ReportScreenShooter reportScreenShooter = reportComposerData.getScreenShooter();
			try {
				screenShotVO = reportScreenShooter.captureScreenShot(date, descriptionItems);
			} catch (Exception e) {
				Logger.warning(e, "Capturing ScreenShot");
			}
		}
		caption = insertSpaceInMultiCaseStringAtCaps(caption).replaceAll("_", " ").toLowerCase();
		descriptionItems = SliderUtils.beautifyDescriptions(descriptionItems, objectToStringConverter);
		SliderReportItem jsReportItem = new SliderReportItem(caption, descriptionItems, screenShotVO, reportType,
				date);
		writeReportItemToFile(jsReportItem);
	}

	@Override
	public void markCurrentHeaderAs(String tag) {

	}

	protected void writeReportItemToFile(SliderReportItem reportItem) {
		try {
			String str = "\nitems[items.length] = " + reportItem.toString() + ";";
			FileWriter jsFileWriter = reportComposerData.jsFileWriter;
			jsFileWriter.write(str);
			jsFileWriter.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
