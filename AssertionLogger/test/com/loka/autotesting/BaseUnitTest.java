package com.loka.autotesting;

import com.loka.autotesting.logger.Logger;
import com.loka.autotesting.logger.traceTargets.console.ConsoleTraceTarget;
import com.loka.autotesting.logger.traceTargets.console.printer.UnitTestPrinter;
import org.junit.After;
import org.junit.Before;

public class BaseUnitTest {
	@Before
	public void setUp() throws Exception {
		Logger.getSettings().addTraceTarget(new ConsoleTraceTarget(new UnitTestPrinter()));
	}

	@After
	public void tearDown() throws Exception {
		Logger.destroy();
	}
}
