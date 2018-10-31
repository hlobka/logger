package com.loka.autotesting.logger.traceTargets.console.printer;

import com.loka.autotesting.logger.LogType;

import java.util.Date;

public interface Printer {
	void print(String x, LogType logType, Date date);
	default String useOneStyleToWrapStringLines(String x) {
		return x.replace("\r\n", "\n").replace("\r", "\n");
	}
}
