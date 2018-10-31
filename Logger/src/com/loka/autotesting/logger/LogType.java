package com.loka.autotesting.logger;

public enum LogType implements LoggerType {
	/**
	 * default log
	 */
	LOG("log", true),
	/**
	 * This log type added possibility to wrote log in one line with it replacing in next time
	 */
	PROGRESS("progress", true),
	/**
	 * log with screen shot
	 */
	LOG_USE_SS("log", true, true),
	/**
	 * warning log with screen shot
	 */
	WARNING_USE_SS("warning", true, true),
	/**
	 * default warning log with screen shot
	 */
	WARNING("warning", true),
	/**
	 * strong warning log with screen shot
	 */
	STRONG_WARNING("strong_warning", true, true),
	/**
	 * default error log
	 */
	ERROR("error", true, true),
	/**
	 * throwable error log
	 */
	THROWABLE_ERROR("throwable_error", true, true),
	/**
	 * header log (need to splice log)
	 */
	HEADER("header", true),
	/**
	 * log only on debug mode(need for developers)
	 */
	DEBUG("debug", true),
	/**
	 * need for log more information
	 */
	INFO("info", true),
	/**
	 * need for log without tags
	 */
	EMPTY("", true),
	/**
	 * Need for log blink tags; Not Supported by default;
	 * Possible color: All rainbow colors;
	 */
	BLINK("blink", false, true),
	/**
	 * Need for log custom tags template 1; Not Supported by default;<br>
	 * Possible color: red
	 */
	CUSTOM_1("custom_1", false, true),
	/**
	 * Need for log custom tags template 2; Not Supported by default;<br>
	 * Possible color: orange
	 */
	CUSTOM_2("custom_2", false, true),
	/**
	 * Need for log custom tags template 3; Not Supported by default;<br>
	 * Possible color: yellow
	 */
	CUSTOM_3("custom_3", false, true),
	/**
	 * Need for log custom tags template 4; Not Supported by default;<br>
	 * Possible color: green
	 */
	CUSTOM_4("custom_4", false, true),
	/**
	 * Need for log custom tags template 5; Not Supported by default;<br>
	 * Possible color: light blue
	 */
	CUSTOM_5("custom_5", false, true),
	/**
	 * Need for log custom tags template 6; Not Supported by default;<br>
	 * Possible color: blue
	 */
	CUSTOM_6("custom_6", false, true),
	/**
	 * Need for log custom tags template 7; Not Supported by default;<br>
	 * Possible color: violet
	 */
	CUSTOM_7("custom_7", false, true),
	/**
	 * Need for log format text;<br>
	 */
	FORMAT_LOG("logF", true, false);

	private String type;
	private boolean enable;
	private boolean useSS;

	LogType(String type, boolean enable) {
		this(type, enable, false);
	}


	LogType(String type, boolean enable, boolean useSS) {
		this.type = type;
		this.enable = enable;
		this.useSS = useSS;
	}

	@Override
	public String geType() {
		return type;
	}

	@Override
	public boolean isEnable() {
		return enable;
	}

	@Override
	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	@Override
	public boolean isUseSS() {
		return useSS;
	}

	@Override
	public void setUseSS(boolean useSS) {
		this.useSS = useSS;
	}

	public static void initializeAllLogs() {
		for (LogType logType : values()) {
			logType.setEnable(true);
		}
	}
}
