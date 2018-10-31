import com.loka.autotesting.logger.AddCondition;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.Logger;
import com.loka.autotesting.logger.traceTargets.LoggerTraceTargetWithReport;
import com.loka.autotesting.logger.traceTargets.console.ConsoleTraceTarget;
import com.loka.autotesting.logger.traceTargets.reports.composer.builder.TreeSliderReportComposerBuilder;

import java.util.Random;

public class Main {
	public Main() {

	}

	public static void main(String[] asd) {
		Logger.getSettings().addTraceTarget(new ConsoleTraceTarget(), AddCondition.ADD);
		Logger.getSettings().addTraceTarget(new LoggerTraceTargetWithReport(
						new TreeSliderReportComposerBuilder()
								.withOpeningReportAfterDestroy(true)
								.withCollapseSimilarLogs(LogType.DEBUG)
								.withStackTraceFor(LogType.DEBUG)
								.withCollapseSimilarLogs(LogType.FORMAT_LOG)
								.withParentOfTree("Test of Tree")
								.build()
				)
		);
		/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(
						new SliderReportComposerBuilder().
								withOpeningReportAfterDestroy(true).
								build()
				)
		);*/
		Logger.log("Start Logger", LogType.HEADER, "some text");

		Logger.debug("WaitTime", "Process execution timeout. (1000 /60000). Script timeOut:  864/1000. Triggered by: DisplayObjectWaiter.isPresent:51");
		Logger.debug("WaitTime", "Process execution timeout. (5465 /60000). Script timeOut:  864/1000. Triggered by: DisplayObjectWaiter.isPresent:51");
		Logger.debug("WaitTime", "Process execution timeout. (21321 /60000). Script timeOut:  864/1000. Triggered by: DisplayObjectWaiter.isPresent:51");
		Logger.debug("WaitTime", "Process execution timeout. (212 /60000). Script timeOut:  864/1000. Triggered by: DisplayObjectWaiter.isPresent:51");
		Logger.debug("WaitTime", "Process execution timeout. (121 /60000). Script timeOut:  864/1000. Triggered by: DisplayObjectWaiter.isPresent:51");
		Logger.debug("WaitTime", "Process execution timeout. (2123 /60000). Script timeOut:  864/1000. Triggered by: DisplayObjectWaiter.isPresent:51");
		Logger.debug("WaitTime", "Process execution timeout. (1232 /60000). Script timeOut:  864/1000. Triggered by: DisplayObjectWaiter.isPresent:51");

		Logger.logF("some caption", "%6d%n%6d%n%6d%n%6d%n%6d%n%6d", 666666, 55555, 4444, 333, 22, 1);
		Logger.logF("some caption", "%6d%n%6d%n%6d%n%6d%n%6d%n%6d", 666666, 55555, 4444, 333, 22, 1);
		Logger.logF("some caption", "%6d%n%6d%n%6d%n%6d%n%6d%n%6d", 666666, 55555, 4444, 333, 22, 1);
		Logger.logF("user score", "user score update to expected values\n" +
						"Win value: %1$.1f\n" +
						"Win value: '%1$.1f'\n" +
						"Win value: '%2$s'\n" +
						"Win value: %3$.1f\n" +
						"Win value: %4$d\n" +
						"Experience value: %5$d\n" +
						"Balance value: %6$.4f\n" +
						"Balance value: 1.0000021E8",
				60.0, "Sheet Happens", -60.0, -1, 12031821050L, 10000021044555.0123);

		Logger.logF("TableCreator", "%-5s%-11s%-25s%-11s%n", "Code", "One point", "Type", "Cost");
		Logger.logF("TableCreator",  "-----------------------------------------------------");
		Logger.logF("TableCreator", "%-5s%-11d%-25s%-11.4f", "AUD", 1, "Australian Back", 20.9883);
		Logger.logF("TableCreator", "%-5s%-11d%-25s%-11.4f", "GBP", 1, "Funt sterling", 30.8429);
		Logger.logF("TableCreator", "%-5s%-11d%-25s%-11.4f", "BYR", 10000, "Belorusha Rub", 13.7716);
		Logger.logF("TableCreator", "%-5s%-11d%-25s%-11.4f", "DKK", 10, "Dotch", 45.9192);
		Logger.logF("TableCreator", "%-5s%-11d%-25s%-11.4f", "USD", 1, "USA back", 24.789);
		Logger.logF("TableCreator", "%-5s%-11d%-25s%-11.4f", "EUR", 1, "Euro", 27.654);
		Logger.logF("TableCreator", "%-5s%-11d%-25s%-11.4f", "KZT", 100, "Kasan", 12.4654);


		Logger.logF(() -> 	"%-5s%-11s%-25s%-11s%n", "Code", "One point", "Type", "Cost");
		Logger.logF(() -> 	 "-----------------------------------------------------");
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "AUD", 1, "Australian Back", 20.9883);
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "GBP", 1, "Funt sterling", 30.8429);
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "BYR", 10000, "Belorusha Rub", 13.7716);
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "DKK", 10, "Dotch", 45.9192);
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "USD", 1, "USA back", 24.789);
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "EUR", 1, "Euro", 27.654);
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "KZT", 100, "Kasan", 12.4654);
		Logger.log("line");
		Logger.logF(() -> 	"%-5s%-11s%-25s%-11s%n", "Code", "One point", "Type", "Cost");
		Logger.logF(() -> 	 "-----------------------------------------------------");
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "AUD", 1, "Australian Back", 20.9883);
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "GBP", 1, "Funt sterling", 30.8429);
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "BYR", 10000, "Belorusha Rub", 13.7716);
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4d", "DKK", 10, "Dotch", 45.9192);
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "USD", 1, "USA back", 24.789);
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "EUR", 1, "Euro", 27.654);
		Logger.logF(() -> 	"%-5s%-11d%-25s%-11.4f", "KZT", 100, "Kasan", 12.4654);
		Logger.log("Start Logger", LogType.HEADER, "some text");
		LogType.initializeAllLogs();
		for (LogType logType : LogType.values()) {
			if(logType == LogType.HEADER) continue;
			if(logType == LogType.ERROR) continue;
			if(logType == LogType.THROWABLE_ERROR) continue;
			Logger.log(logType.name(), logType, logType.geType(), getString());
		}

		Logger.log("Start Logger", LogType.HEADER, "some text 2");
		for (LogType logType : LogType.values()) {
			if(logType == LogType.HEADER) continue;
			Logger.log(logType.name(), logType, logType.geType(), getString());
		}

		Logger.log("Start Logger", LogType.HEADER, "some text 3");
		for (LogType logType : LogType.values()) {
			if(logType == LogType.HEADER) continue;
			if(logType == LogType.ERROR) continue;
			if(logType == LogType.THROWABLE_ERROR) continue;
			if(logType == LogType.BLINK) continue;
			Logger.log(logType.name(), logType, logType.geType(), getString());
		}
		Logger.log("Start Logger", LogType.HEADER, "some text 4");
		for (LogType logType : LogType.values()) {
			if(logType == LogType.HEADER) continue;
			if(logType == LogType.ERROR) continue;
			if(logType == LogType.THROWABLE_ERROR) continue;
			if(logType == LogType.BLINK) continue;
			Logger.log(logType.name(), logType, logType.geType(), getString());
		}
		Logger.log("Start Logger", LogType.HEADER, "some text 5");
		for (LogType logType : LogType.values()) {
			if(logType == LogType.HEADER) continue;
			if(logType == LogType.ERROR) continue;
			if(logType == LogType.THROWABLE_ERROR) continue;
			if(logType == LogType.BLINK) continue;
			Logger.log(logType.name(), logType, logType.geType(), getString());
		}

		Logger.log("Start Logger", LogType.HEADER, "some text 4");
		Logger.log(LogType.LOG, LogType.LOG, getString());
		Logger.log("Start Logger2", LogType.HEADER, "some text 4");
		Logger.log(LogType.LOG, LogType.LOG, getString());
		Logger.log("Start Logger2", LogType.HEADER, "some text 4");
		Logger.log(LogType.LOG, LogType.LOG, getString());

		Logger.log("Start Logger3", LogType.HEADER, "some text 4");
		Logger.log(LogType.LOG, LogType.LOG, getString());
		Logger.log(LogType.WARNING_USE_SS, LogType.WARNING_USE_SS, getString());
		Logger.log("Start Logger3", LogType.HEADER, "some text 4");
		Logger.log(LogType.BLINK, LogType.BLINK, getString());

		Logger.log("Start Logger3_1", LogType.HEADER, "some text 4");
		Logger.log(LogType.LOG, LogType.LOG, getString());
		Logger.log(LogType.WARNING_USE_SS, LogType.WARNING_USE_SS, getString());
		Logger.log("Start Logger3_1", LogType.HEADER, "some text 4");
		Logger.log(LogType.LOG, LogType.LOG, getString());

		Logger.log("Start Logger3_2", LogType.HEADER, "some text 4");
		Logger.log(LogType.LOG, LogType.LOG, getString());
		Logger.log(LogType.WARNING_USE_SS, LogType.WARNING_USE_SS, getString());
		Logger.log("Start Logger3_2", LogType.HEADER, "some text 4");
		Logger.log(LogType.STRONG_WARNING, LogType.STRONG_WARNING, getString());

		Logger.log("Start Logger4", LogType.HEADER, "some text 4");
		Logger.log(LogType.ERROR, LogType.ERROR, getString());
		Logger.log(LogType.ERROR, LogType.ERROR, getString());
		Logger.log(LogType.ERROR, LogType.ERROR, getString());
		Logger.log(LogType.ERROR, LogType.ERROR, getString());
		Logger.log(LogType.ERROR, LogType.ERROR, getString());
		Logger.log(LogType.ERROR, LogType.ERROR, getString());
		Logger.log(LogType.ERROR, LogType.ERROR, getString());
		Logger.log(LogType.ERROR, LogType.ERROR, getString());
		Logger.log("Start Logger4", LogType.HEADER, "some text 4");
		Logger.log(LogType.BLINK, LogType.BLINK, getString());

		Logger.log("Start Logger5", LogType.HEADER, "some text 5");
		Logger.log(LogType.THROWABLE_ERROR, LogType.THROWABLE_ERROR, getString());
		Logger.log(LogType.THROWABLE_ERROR, LogType.THROWABLE_ERROR, getString());
		Logger.log(LogType.THROWABLE_ERROR, LogType.THROWABLE_ERROR, getString());
		Logger.log(LogType.THROWABLE_ERROR, LogType.THROWABLE_ERROR, getString());
		Logger.log(LogType.THROWABLE_ERROR, LogType.THROWABLE_ERROR, getString());
		Logger.log("Start Logger5", LogType.HEADER, "some text 6");
		Logger.log(LogType.STRONG_WARNING, LogType.STRONG_WARNING, getString());

		Logger.log("Start Logger6", LogType.HEADER, "some text 7");
		Logger.log(LogType.LOG, LogType.LOG, getString());
		Logger.log("Start Logger6", LogType.HEADER, "some text 8");
		Logger.log(LogType.STRONG_WARNING, LogType.STRONG_WARNING, getString());

		Logger.log("Start Logger7", LogType.HEADER, "some text 7");
		Logger.log(LogType.LOG, LogType.LOG, getString());
		Logger.log("Start Logger7", LogType.HEADER, "some text 8");
		Logger.log(LogType.STRONG_WARNING, LogType.STRONG_WARNING, getString());

		Logger.log("Start Logger8", LogType.HEADER, "some text 7");
		Logger.log(LogType.LOG, LogType.LOG, getString());
		Logger.log("Start Logger8", LogType.HEADER, "some text 8");
		Logger.log(LogType.STRONG_WARNING, LogType.STRONG_WARNING, getString());

		Logger.log("End Logger", LogType.HEADER/*, "some text"*/);
		Logger.log(LogType.STRONG_WARNING, null);
		Logger.destroy();
	}

	private static String getString() {
		int random = new Random().nextInt(8);
		switch (random) {
			case 1:
				return "Lotto Bonus dialog is present";
			case 2:
				return "Actual:\t\t100\n" +
						"Expected:\t100\n" +
						"Bonus value in Lotto Bonus dialog is equal to expected value for level 1";
			case 3:
				return  "\t - verifying: 'Weekly' tab is opened: [true] equals to expected boolean value: [true] - success\n" +
						" AND \n" +
						"\t - verifying: Place of user is present on tab: [true] equals to expected boolean value: [true] - success";
			case 4:
				return "Trying to login with user: user1@gmail.com";
			case 5:
				return "Process execution timeout. (200 /5000). Script timeOut:  93/200. Triggered by: SwfDriverApiExecutor.waitWhenClickEnded:193";
			case 6:
				return "Press Key: \"J\" (keyNumber: 74)";
			case 7:
				return "user score update to expected values\n" +
						"Win value: 60.0\n" +
						"Win value: '60.0'\n" +
						"Win value: 'Sheet Happens'\n" +
						"Win value: -60.0\n" +
						"Win value: -1\n" +
						"Experience value: 12031821050\n" +
						"Balance value: 1.0000021E8";
			default:
				return "/*Logger.addTraceTarget(new LoggerTraceTargetWithReport(\n" +
						"\t\t\t\t\t\tnew SliderReportComposerBuilder().\n" +
						"\t\t\t\t\t\t\t\twithOpeningReportAfterDestroy(true).\n" +
						"\t\t\t\t\t\t\t\tbuild()\n" +
						"\t\t\t\t)\n" +
						"\t\t);*/";
		}
	}
}
