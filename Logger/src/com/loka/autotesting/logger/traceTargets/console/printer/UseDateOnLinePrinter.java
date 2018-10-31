package com.loka.autotesting.logger.traceTargets.console.printer;

import com.loka.autotesting.logger.LogType;

import java.text.SimpleDateFormat;
import java.util.Date;

public class UseDateOnLinePrinter implements Printer {
	private final SimpleDateFormat dateFormat;

	public UseDateOnLinePrinter() {
		this("HH:mm:ss:SS");
	}
	public UseDateOnLinePrinter(String dateFormat) {
		this.dateFormat = new SimpleDateFormat(dateFormat);
	}

	@Override
	public void print(String x, LogType logType, Date date) {
		String format = dateFormat.format(date);
		switch (logType) {
			case ERROR:
			case THROWABLE_ERROR:
				System.err.print(format + " " + logType.geType() + ": " + useOneStyleToWrapStringLines(x));
				break;
			case EMPTY:
				System.out.println(format + " " + useOneStyleToWrapStringLines(x));
				break;
			default:
				System.out.print(format + " " + logType.geType() + ": " + useOneStyleToWrapStringLines(x));
				break;
		}
	}
}
