import com.loka.autotesting.logger.AddCondition;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.Logger;
import com.loka.autotesting.logger.traceTargets.LoggerTraceTargetWithReport;
import com.loka.autotesting.logger.traceTargets.console.ConsoleTraceTarget;
import com.loka.autotesting.logger.traceTargets.reports.composer.builder.TreeSliderReportComposerBuilder;

public class ExampleWithAnyIncludedHeaders2 {
	public ExampleWithAnyIncludedHeaders2() {

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
		Logger.log("Start Logger", LogType.HEADER, ExampleWithAnyIncludedHeaders2.class.getSimpleName());
		Logger.log("Start Logger", LogType.HEADER, ExampleWithAnyIncludedHeaders2.class.getSimpleName() + "asd1.test1");
		Logger.log("asd");
		Logger.log("Start Logger", LogType.HEADER, ExampleWithAnyIncludedHeaders2.class.getSimpleName() + "asd2");
		Logger.log("asd1");
		Logger.log("Start Logger", LogType.HEADER, ExampleWithAnyIncludedHeaders2.class.getSimpleName() + "asd2.test2");
		Logger.log("asd2");

		Logger.destroy();
	}
}
