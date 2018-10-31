package com.loka.autotesting.logger.traceTargets.reports.composer.actions.itemAdder;

import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.traceTargets.reports.composer.actions.ReportInitializer;

import java.util.Date;

public interface ReportItemAdder extends ReportInitializer {
	void addReportItem(String caption, Date date, LogType logType, Object... descriptionItems);

	void markCurrentHeaderAs(String tag);
}
