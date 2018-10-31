package com.loka.autotesting.logger.traceTargets.reports.composer.actions.starter;

import com.loka.autotesting.logger.traceTargets.reports.composer.actions.ReportInitializer;

import java.io.IOException;

public interface ReportStarter extends ReportInitializer {
	void startReport() throws IOException;
}
