package com.loka.autotesting.logger.traceTargets.reports.composer;

import java.io.IOException;

class ReportComposerException extends RuntimeException {
	ReportComposerException(String message, IOException cause) {
		super(message, cause);
	}
}
