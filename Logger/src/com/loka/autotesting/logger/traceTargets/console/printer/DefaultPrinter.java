package com.loka.autotesting.logger.traceTargets.console.printer;

import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.utils.strings.StringAppender;

import java.io.PrintStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DefaultPrinter implements Printer {

	private Date initialProgressDate = new Date();
	private String prevHeader = "";
	private LogType prevLogType = LogType.LOG;
	private int countOfProgressLogTypes = 0;

	@Override
	public void print(String x, LogType logType, Date date) {
		String newPrevHeader = x.split("\n", 2)[0];
		String logTypeHeader = new StringAppender().append(logType.geType(), ": ").toString();
		if(prevHeader.equals(newPrevHeader) && !logType.equals(LogType.PROGRESS)){
			x = x.substring(x.indexOf("\n")+1);
			logTypeHeader = "";
		}
		PrintStream printStream = System.out;

		StringAppender stringAppender = new StringAppender();
		if(prevLogType.equals(LogType.PROGRESS)) {
			if (!logType.equals(LogType.PROGRESS) || !prevHeader.equals(newPrevHeader)) {
				stringAppender.appendLn("");
				countOfProgressLogTypes = 0;
				initialProgressDate = date;
			} else {
				countOfProgressLogTypes++;
			}
		}
		switch (logType) {
			case ERROR:
			case THROWABLE_ERROR:
				printStream = System.err;
				stringAppender.append(logTypeHeader, useOneStyleToWrapStringLines(x));
				break;
			case EMPTY:
				stringAppender.append(useOneStyleToWrapStringLines(x));
				break;
			case PROGRESS:
				stringAppender.append("\r");
				if(countOfProgressLogTypes>0) {
					Date differenceDate = new Date(date.getTime() - initialProgressDate.getTime());
					String time = new SimpleDateFormat("m:s", Locale.US).format(differenceDate);
					String initialTime = new SimpleDateFormat("h:m:s", Locale.US).format(initialProgressDate);
					stringAppender.append(initialTime, "/", time, " => ");
				}
				stringAppender.append(logTypeHeader, x.replace("\n", ""));
				break;
			default:
				stringAppender.append(logTypeHeader, useOneStyleToWrapStringLines(x));
				break;
		}

		printStream.print(stringAppender.toString());

		prevLogType = logType;
		prevHeader = newPrevHeader;

	}


}
