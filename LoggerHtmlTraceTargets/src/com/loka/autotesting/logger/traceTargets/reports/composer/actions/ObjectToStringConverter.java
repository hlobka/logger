package com.loka.autotesting.logger.traceTargets.reports.composer.actions;
@FunctionalInterface
public interface ObjectToStringConverter {
	String convert(Object o);
	/*default String convert(Object o){
		return o + "";
	}*/
}
