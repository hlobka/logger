import com.loka.autotesting.logger.AddCondition;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.Logger;
import com.loka.autotesting.logger.traceTargets.LoggerTraceTargetWithReport;
import com.loka.autotesting.logger.traceTargets.console.ConsoleTraceTarget;
import com.loka.autotesting.logger.traceTargets.reports.composer.builder.TreeSliderReportComposerBuilder;

public class ExampleWithCustomHeaders {

	protected static long autoInc = 0;

	public ExampleWithCustomHeaders() {

	}

	public static void main(String[] asd) throws InterruptedException {
		Logger.getSettings().addTraceTarget(new ConsoleTraceTarget(), AddCondition.ADD);
		Logger.getSettings().addTraceTarget(new LoggerTraceTargetWithReport(
						new TreeSliderReportComposerBuilder().
								withOpeningReportAfterDestroy(true).
								withParentOfTree("Example.With.Custom.Headers").
								build()
				)
		);
		LogType.BLINK.setEnable(true);

		Logger.log("test", LogType.HEADER, "StartTest");
		logTestMsg();
		logTestMsg();
		logTestMsg();
		Logger.log(LogType.HEADER, "Test1");
		logTestMsg();
		logTestMsg();
		Logger.log(">", LogType.HEADER, "comboTag");
		logTestMsg2();
		logTestMsg2();
		Logger.log("<", LogType.HEADER, "comboTag");
		Logger.log(LogType.HEADER, "Test3");
		logTestMsg();
		logTestMsg();
		logTestMsg();

		Logger.log("test", LogType.HEADER, "StartTest");
		logTestMsg();
		logTestMsg();
		logTestMsg();
		Logger.log(LogType.HEADER, "Test1");
		logTestMsg();
		logTestMsg();
		logTestMsg();
		Logger.log(LogType.HEADER, "Test2");
		logTestMsg();
		logTestMsg();
		logTestMsg();


		Logger.destroy();
	}

	private static void logTestMsg2() {
		new Thread(() -> {
			try {
				Thread.currentThread().wait((long) (Math.random()*1000)+1);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			Logger.log(LogType.HEADER, "logTestMsf2_1");
			Logger.log(Thread.currentThread().getName());
			logTestMsg();
			logTestMsg();
			Logger.log(LogType.HEADER, "logTestMsf2_2");
			logTestMsg();
		}).start();

	}

	private static void logTestMsg() {
		Logger.log("test", LogType.LOG, "TestMsg" + autoInc++);
	}

	private static void sleep() {
		try {
			Thread.sleep(10);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}
