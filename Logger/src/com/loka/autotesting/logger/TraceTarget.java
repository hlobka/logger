package com.loka.autotesting.logger;

import com.loka.autotesting.utils.objectControllers.Destroyable;

import java.util.Date;

public interface TraceTarget extends Destroyable {
	void log(String command, Date date, LogType logType, Object ...someData);
	void init(Date date);
}
