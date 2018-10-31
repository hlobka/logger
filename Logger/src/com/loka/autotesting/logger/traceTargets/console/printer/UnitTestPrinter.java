package com.loka.autotesting.logger.traceTargets.console.printer;

import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.utils.Debug;

import java.util.Date;

public class UnitTestPrinter implements Printer {
	private String preveHeader = "";
	@Override
	public void print(String x, LogType logType, Date date) {
		switch (logType) {
			case ERROR:
			case THROWABLE_ERROR:
				System.err.print(logType.geType() + ": " + useOneStyleToWrapStringLines(x));
				return;
		}
		if(Debug.isDebugging()) {
			String newHeader = logType.geType() + ": " + useOneStyleToWrapStringLines(x).split("\n")[0];

			switch (logType) {
				case EMPTY:
					System.out.println(useOneStyleToWrapStringLines(x));
					break;
				default:
					if(!preveHeader.equals(newHeader)){
						System.out.print(logType.geType() + ": " + useOneStyleToWrapStringLines(x));
					} else {
						System.out.print(useOneStyleToWrapStringLines(x).split("\n", 2)[1]);
					}
					preveHeader = newHeader;
					break;
			}
		}
	}
}
