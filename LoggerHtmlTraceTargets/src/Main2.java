import com.loka.autotesting.logger.AddCondition;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.Logger;
import com.loka.autotesting.logger.traceTargets.LoggerTraceTargetWithReport;
import com.loka.autotesting.logger.traceTargets.console.ConsoleTraceTarget;
import com.loka.autotesting.logger.traceTargets.reports.composer.builder.TreeSliderReportComposerBuilder;

import java.util.Random;

public class Main2 {
	public Main2() {

	}

	public static void main(String[] asd) throws InterruptedException {
		Logger.getSettings().addTraceTarget(new ConsoleTraceTarget(), AddCondition.ADD);
		Logger.getSettings().addTraceTarget(new LoggerTraceTargetWithReport(
						new TreeSliderReportComposerBuilder().
								withOpeningReportAfterDestroy(true).
								build()
				)
		);
		Logger.log("Start Logger", LogType.HEADER, "some text");
		int times = 5;
		for (int i = 0; i < times; i++) {
			Logger.log("Start Logger", LogType.HEADER, "some text" + i);
			for (int j = 0; j < times*3; j++) {
				if(j==1||j==5||j==10) {
//					Logger.log("action" + j, LogType.HEADER);
					Logger.log(LogType.HEADER, "StartAction" + j);
//					Logger.log(LogType.HEADER, "StartAction");
//					Logger.log("Start Logger", LogType.HEADER, "some text" + i, "action" + j);
				}
				if(i%2==1||j%2==1) {
					Logger.log("test msg", i + "_" + j);
				}
				Thread.sleep(100);
			}
		}

		Logger.destroy();
	}
}
