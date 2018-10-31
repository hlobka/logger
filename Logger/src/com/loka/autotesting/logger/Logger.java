package com.loka.autotesting.logger;

import com.loka.autotesting.logger.traceTargets.console.ConsoleTraceTarget;
import com.loka.autotesting.utils.objectControllers.DestroyUtils;
import org.apache.commons.lang3.ArrayUtils;

import java.util.*;
import java.util.function.Supplier;

import static com.loka.autotesting.utils.objectControllers.DestroyUtils.destroyObject;
import static org.apache.commons.lang3.ArrayUtils.contains;

public class Logger {
	private static final LoggerSettings loggerSettings = new LoggerSettings();

	private Logger() {
	}

	public static void logBy(Object instance, Object... someData) {
		logBy(instance, LogType.LOG, someData);
	}

	/**
	 * Will delegate some data list with log type: logType at instance face to method: {@link #log(String, LogType, Object...)};
	 *
	 * @param instance target caller
	 * @param logType  type of log
	 * @param someData additional data
	 */
	public static void logBy(Object instance, LogType logType, Object... someData) {
		if (!logType.isEnable()) {
			return;
		}
		log(getSimpleName(instance), logType, someData);
	}

	/**
	 * Work similarly to {@link #log(LogType, Object...)} but without first param;
	 *
	 * @param someData additional data
	 */
	public static void log(Object... someData) {
		log(LogType.LOG, someData);
	}

	/**
	 * Work similarly to String.format(Locale.ENGLISH, format, args);
	 * Returns a formatted string using the specified format string and
	 * arguments.
	 *
	 * @param format A <a href="../util/Formatter.html#syntax">format string</a>
	 * @param args   Arguments referenced by the format specifiers in the format
	 *               string.  If there are more arguments than format specifiers, the
	 *               extra arguments are ignored.  The number of arguments is
	 *               variable and may be zero.  The maximum number of arguments is
	 *               limited by the maximum dimension of a Java array as defined by
	 *               <cite>The Java&trade; Virtual Machine Specification</cite>.
	 *               The behaviour on a
	 *               {@code null} argument depends on the <a
	 *               href="../util/Formatter.html#syntax">conversion</a>.
	 */
	public static void logF(Supplier<String> format, Object... args) {
		if (!LogType.FORMAT_LOG.isEnable()) {
			return;
		}
		String command = generateLogCommandName();
		logF(command, format.get(), args);
	}

	/**
	 * Work similarly to String.format(Locale.ENGLISH, format, args);
	 * Returns a formatted string using the specified format string and
	 * arguments.
	 *
	 * @param command caption log type
	 * @param format  A <a href="../util/Formatter.html#syntax">format string</a>
	 * @param args    Arguments referenced by the format specifiers in the format
	 *                string.  If there are more arguments than format specifiers, the
	 *                extra arguments are ignored.  The number of arguments is
	 *                variable and may be zero.  The maximum number of arguments is
	 *                limited by the maximum dimension of a Java array as defined by
	 *                <cite>The Java&trade; Virtual Machine Specification</cite>.
	 *                The behaviour on a
	 *                {@code null} argument depends on the <a
	 *                href="../util/Formatter.html#syntax">conversion</a>.
	 */
	public static void logF(String command, String format, Object... args) {
		if (!LogType.FORMAT_LOG.isEnable()) {
			return;
		}
		String formatResult;
		try {
			formatResult = String.format(Locale.ENGLISH, format, args);
		} catch (IllegalFormatException e) {
			debug(e);
			formatResult = e.getClass().getSimpleName() + ": " + e.getLocalizedMessage();
		}
		log(command, LogType.FORMAT_LOG, formatResult);
	}

	/**
	 * Work similarly to {@link #logBy(Object, LogType, Object...)} but without first param;
	 *
	 * @param logType  type of log
	 * @param someData additional data
	 */
	public static void log(LogType logType, Object... someData) {
		if (!logType.isEnable()) {
			return;
		}
		String command = generateLogCommandName();
		log(command, logType, someData);
	}

	private static String generateLogCommandName() {
		RuntimeException exception = new RuntimeException();
		StackTraceElement[] stackTraces = exception.getStackTrace();
		int i = 0;
		String loggerSimpleClassName = Logger.class.getSimpleName();
		String className = loggerSimpleClassName;
		String methodName = "log";
		StackTraceElement stackTrace = stackTraces[i];
		while (i++ < stackTraces.length) {
			className = stackTrace.getFileName().replaceAll("\\.java", "");
			methodName = stackTrace.getMethodName();
			if (!className.equals(loggerSimpleClassName)) {
				break;
			}
			stackTrace = stackTraces[i];
		}
		return className + "::" + methodName;
	}

	public static void log(String command, LogType logType, Object... someData) {
		if (logType.isEnable()) {
			Object[] extractedSomeData = new Object[1];
			if(someData != null) {
				for (Object o : someData) {
					if (o instanceof Object[]) {
						extractedSomeData = ArrayUtils.addAll(extractedSomeData, (Object[]) o);
					} else {
						extractedSomeData = ArrayUtils.add(extractedSomeData, o);
					}
				}
			}
			int index;
			while ((index = ArrayUtils.indexOf(extractedSomeData, null)) >= 0) {
				extractedSomeData = ArrayUtils.remove(extractedSomeData, index);
			}
			Date date = new Date();
			loggerSettings.addDefaultTraceTargetIfItEmpty();
			for (TraceTarget target : loggerSettings.getTraceTargets()) {
				target.log(command, date, logType, extractedSomeData.clone());
			}
		}
	}

	public static void error(Throwable e, Object... someData) {
		logError(e, LogType.THROWABLE_ERROR, someData);
	}

	public static void error(String command, Object... someData) {
		log(command, LogType.ERROR, someData);
	}

	public static void warning(Throwable e, Object... someData) {
		logError(e, LogType.WARNING_USE_SS, someData);
	}

	public static void warning(String command, Object... someData) {
		log(command, LogType.WARNING, someData);
	}

	public static void debug(Throwable e, Object... someData) {
		logError(e, LogType.DEBUG, someData);
	}

	private static void logError(Throwable e, LogType logType, Object... someData) {
		if (!logType.isEnable()) {
			return;
		}
		if (loggerSettings.errors.contains(e)) {
			return;
		}
		if (!LogType.DEBUG.equals(logType) && !LogType.INFO.equals(logType)) {
			loggerSettings.errors.add(e);
		}
		String errorMessage = e.getMessage();
		String causeErrorMessage = e.getCause() == null ? "Absent" : e.getCause().getMessage();
		String command = e.getClass().getSimpleName();
		String stackTrace = loggerSettings.stackTraceParser.getStackTrace(e);
		String stackTrace2 = "Cause stackTrace: ";
		if (e.getCause() != null) {
			stackTrace2 += loggerSettings.stackTraceParser.getStackTrace(e);
		} else {
			stackTrace2 += "empty";
		}
		log(command, logType,
				"Error message: " + errorMessage,
				"Cause error message: " + causeErrorMessage,
				someData,
				stackTrace,
				stackTrace2
		);
	}

	public static void debug(String command, Object... someData) {
		log(command, LogType.DEBUG, someData);
	}

	public static void info(Object... someData) {
		if (!LogType.INFO.isEnable()) {
			return;
		}
		log("info", LogType.INFO, someData);
	}

	public static void conditionLog(String command, LogType logType, boolean condition, Object... someData) {
		if (condition) {
			log(command, logType, someData);
		}
	}

	public static void conditionLog(String command, LogType logType, boolean condition, Supplier... someData) {
		if (condition && logType.isEnable()) {
			Object[] someDataArray = new Object[someData.length];
			for (int i = 0; i < someData.length; i++) {
				someDataArray[i] = someData[i].get();
			}
			log(command, logType, someDataArray);
		}
	}

	static String getSimpleName(Object instance) {
		return instance.getClass().getSimpleName().replaceAll("(Impl|State|Control)($|(?=[A-Z]))", "");
	}

	public static LoggerSettings getSettings() {
		return loggerSettings;
	}

	public static void destroy() {
		DestroyUtils.destroyObject(loggerSettings);
	}
}
