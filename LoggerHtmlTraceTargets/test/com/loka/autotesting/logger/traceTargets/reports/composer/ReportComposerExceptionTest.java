package com.loka.autotesting.logger.traceTargets.reports.composer;

import com.loka.autotesting.BaseUnitTest;
import org.fest.assertions.Assertions;
import org.junit.Test;

import java.io.IOException;

public class ReportComposerExceptionTest extends BaseUnitTest {
	@Test
	public void testConstructor() throws Exception {
		IOException cause = new IOException();
		ReportComposerException exception =
				new ReportComposerException("message", cause);
		Assertions.assertThat(exception.getCause()).isEqualTo(cause);
		Assertions.assertThat(exception.getLocalizedMessage()).isEqualTo("message");
	}
}