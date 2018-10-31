package com.loka.autotesting.logger;

public interface LoggerType {
	String geType();
	boolean isEnable();
	void setEnable(boolean enable);

	void setUseSS(boolean useSS);

	boolean isUseSS();
}