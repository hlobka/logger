import com.loka.autotesting.logger.AddCondition;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.Logger;
import com.loka.autotesting.logger.traceTargets.LoggerTraceTargetWithReport;
import com.loka.autotesting.logger.traceTargets.console.ConsoleTraceTarget;
import com.loka.autotesting.logger.traceTargets.reports.composer.builder.TreeSliderReportComposerBuilder;

import java.math.BigDecimal;

public class ExampleWithAnyIncludedHeaders {
	public ExampleWithAnyIncludedHeaders() {

	}

	public static void main(String[] asd) throws InterruptedException {
		Logger.getSettings().addTraceTarget(new ConsoleTraceTarget(), AddCondition.ADD);
		Logger.getSettings().addTraceTarget(new LoggerTraceTargetWithReport(
						new TreeSliderReportComposerBuilder().
								withOpeningReportAfterDestroy(true).
								build()
				)
		);
		LogType.BLINK.setEnable(true);


		logOneLevelOfSubActions();
		logAnyLevelOfSubActions();


		Logger.destroy();
	}

	private static void logOneLevelOfSubActions() {
		Logger.log("Start Logger", LogType.HEADER, ExampleWithAnyIncludedHeaders.class.getSimpleName());
		Logger.log(">", LogType.HEADER, "firstAction");
		logAnySubActions("1");
		Logger.log("<", LogType.HEADER);
		Logger.log(">", LogType.HEADER, "secondAction");
		logAnySubActions("2");
		Logger.log("<", LogType.HEADER);
	}

	private static void logAnyLevelOfSubActions() {
		Logger.log("Start Logger", LogType.HEADER, ExampleWithAnyIncludedHeaders.class.getSimpleName());
		Logger.log(">", LogType.HEADER, "firstAction");
		logAnyIncludedSubActions(1);
		Logger.log("<", LogType.HEADER);
		Logger.log(">", LogType.HEADER, "secondAction");
		logAnyIncludedSubActions(2);
		Logger.log("<", LogType.HEADER);
		Logger.log(">", LogType.HEADER, "thirdAction");
		logAnyIncludedSubActions(3);
		Logger.log("<", LogType.HEADER);
	}

	private static void logAnyIncludedSubActions(int i) {
		Logger.log(">", LogType.HEADER, "SubAction"+i+"_1");
		logAnySubActions(i+"_1");
		Logger.log("<", LogType.HEADER);
		Logger.log(">", LogType.HEADER, "SubAction"+i+"_2");
		logAnySubActions(i+"_2");
		Logger.log("<", LogType.HEADER);
		Logger.log(">", LogType.HEADER, "SubAction"+i+"_3");
		logAnySubActions(i+"_4");
		Logger.log("<", LogType.HEADER);
	}

	private static void logAnySubActions(String tag) {
		Logger.log(">", LogType.HEADER, "logAnySubActions" + tag + "_1");
		logSomeActions(tag + 1);
		Logger.log("<", LogType.HEADER);
		Logger.log(">", LogType.HEADER, "logAnySubActions" + tag + "_1");
		logSomeActions(tag + 2);
		Logger.log("<", LogType.HEADER);
		Logger.log(">", LogType.HEADER, "logAnySubActions" + tag + "_2") ;
		logSomeActions(tag + 3);
		Logger.log("<", LogType.HEADER);
		Logger.log(">", LogType.HEADER, "logAnySubActions" + tag+ "_3");
		logAnySubActions2();
		Logger.log("<", LogType.HEADER);
	}

	private static void logAnySubActions2() {
		Logger.log(">", LogType.HEADER, "SubAction1");
		logSomeActions("1");
		Logger.log("<", LogType.HEADER);
		Logger.log(">", LogType.HEADER, "SubAction2");
		logSomeActions("2");
		Logger.log("<", LogType.HEADER);
		Logger.log(">", LogType.HEADER, "SubAction3");
		logSomeActions("3");
		Logger.log("<", LogType.HEADER);
	}

	private static void logSomeActions(String tag) {
		Logger.log("test", LogType.LOG, "Action" + tag + "_1");
		sleep();
		Logger.log("test", LogType.LOG, "Action" + tag + "_2");
		sleep();
//		Logger.log(LogType.HEADER, "Reopen"/* machine 'Furocious football' ready to spin"*/);
		Logger.log(/*">", */LogType.HEADER, "Reopen");
		sleep();
		Logger.log("test", LogType.LOG, "Action" + tag + "_3");
		sleep();
//		Logger.log("<", LogType.HEADER);
//		sleep();
		Logger.log(LogType.HEADER, "Reopen");
		sleep();
		Logger.log("test", LogType.LOG, "Action" + tag + "_3");
		sleep();
		Logger.log("<", LogType.HEADER);
		sleep();
		Logger.log("test", LogType.LOG, "Action" + tag + "_4");
		sleep();
	}

	private static void sleep() {
		try {
			Thread.sleep(1);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}
