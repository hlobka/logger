package com.loka.autotesting.logger.traceTargets.console;

import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.TraceTarget;
import com.loka.autotesting.logger.traceTargets.console.printer.DefaultPrinter;
import com.loka.autotesting.logger.traceTargets.console.printer.Printer;
import com.loka.autotesting.utils.strings.StringAppender;
import org.apache.commons.lang3.StringUtils;

import java.util.Date;

import static com.loka.autotesting.logger.LogType.EMPTY;

public class ConsoleTraceTarget implements TraceTarget {
	private static final String HEADER_ICON = "┏(-_-)┛┗(-_- )┓┗(-_-)┛┏(-_-)┓";
	private final Printer printer;
	private static final String HEADER_TEMPLATE = getHeaderTemplate();

	private static String getHeaderTemplate() {
		String tag1 = StringUtils.repeat("=", 40);
		String tag2 = tag1+ HEADER_ICON +tag1 ;
		return tag2+"%n\t%1$s"+StringUtils.repeat("=", tag2.length()-1)+"%n";
	}

	public ConsoleTraceTarget() {
		this.printer = new DefaultPrinter();
	}

	public ConsoleTraceTarget(Printer printer) {
		this.printer = printer;
	}

	@Override
	public void log(String command, Date date, LogType logType, Object... someData) {
		switch (logType) {
			case HEADER:
				logHeader(command, logType, date, someData);
				break;
			default:
				logAll(command, logType, date, someData);
				break;
		}
	}

	@Override
	public void init(Date date) {

	}

	private void logAll(String command, LogType logType, Date date, Object... someData) {
		printLn(getSomeDataText(command, someData), date, logType);
	}

	private void logHeader(String command, LogType logType, Date date, Object... someData) {
		printLn(String.format(HEADER_TEMPLATE, getSomeDataText(command, someData)), date, EMPTY);
	}

	private void printLn(String x, Date date, LogType logType) {
		printer.print(x, logType, date);
	}

	private String getSomeDataText(String commands, Object... someData) {
		StringAppender toTrace = new StringAppender().append(commands);
		if (someData.length > 0) {
			toTrace.append(":");
		}
		for (Object aSomeData : someData) {
			if (aSomeData instanceof Object[]) {
				Object[] objects = (Object[]) aSomeData;
				for (Object object : objects) {
					toTrace.append("\n\t- ", object);
				}
			} else {
				toTrace.append("\n\t- ", aSomeData);
			}
		}
		return toTrace.toString().replaceAll("\\n$", "") + "\n";
	}

	@Override
	public void destroy() {
	}
}
