package com.loka.autotesting.logger;

import com.loka.autotesting.logger.traceTargets.console.ConsoleTraceTarget;
import com.loka.autotesting.logger.utils.StringUtils;
import org.fest.assertions.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import java.util.Date;
import java.util.function.Supplier;

import static org.fest.assertions.Assertions.assertThat;

public class LoggerTest {
	@Before
	public void setUp() throws Exception {
		Logger.getSettings().addTraceTarget(new ConsoleTraceTarget());
	}

	@After
	public void tearDown() throws Exception {
		Logger.destroy();
	}

	@Test
	public void testLogBy() throws Exception {
		Logger.getSettings().addTraceTarget(new TraceTargetDelegate(
				(command, date, logType, someData) -> {
					assertThat(command).isEqualTo(this.getClass().getSimpleName());
					assertThat(logType).isEqualTo(LogType.LOG);
					assertThat(someData[0]).isEqualTo("test1");
					assertThat(someData[1]).isEqualTo("test2");
				}
		));
		Logger.logBy(this, "test1", "test2");
	}

	@Test
	public void testLogWithOneMsg() throws Exception {
		Logger.getSettings().addTraceTarget(new TraceTargetDelegate(
				(command, date, logType, someData) -> {
					assertThat(command).isEqualTo(this.getClass().getSimpleName() + "::testLogWithOneMsg");
					assertThat(logType).isEqualTo(LogType.LOG);
					assertThat(someData[0]).isEqualTo("testMessage");
				}
		));
		Logger.log("testMessage");
	}

	@Test
	public void testGetTargets() throws Exception {
		Assertions.assertThat(Logger.getSettings().getTargets()).hasSize(1);
	}

	@Test
	public void testConditionLogWithEmptyDatas() throws Exception {
		Logger.getSettings().addTraceTarget(new TraceTargetDelegate(
				(command, date, logType, someData) -> {
					assertThat(command).isEqualTo("testMessage");
					assertThat(logType).isEqualTo(LogType.LOG);
					assertThat(someData.length).isZero();
				}
		));
		Logger.conditionLog("testMessage", LogType.LOG, true);
	}

	@Test
	public void testConditionLogWithDatas() throws Exception {
		Logger.getSettings().addTraceTarget(new TraceTargetDelegate(
				(command, date, logType, someData) -> {
					assertThat(command).isEqualTo("testMessage");
					assertThat(logType).isEqualTo(LogType.LOG);
					assertThat(someData.length).isPositive();
					assertThat(someData[0]).isEqualTo("log 1");
					assertThat(someData[1]).isEqualTo("log 2");
					assertThat(someData[2]).isEqualTo("log 3");
					assertThat(someData[3]).isEqualTo("log 4");
				}
		));
		Logger.conditionLog("testMessage", LogType.LOG, true,
				"log 1",
				"log 2",
				"log 3",
				"log 4"
		);
	}

	@Test
	public void testConditionLogWithSupplierDatas() throws Exception {
		Logger.getSettings().addTraceTarget(new TraceTargetDelegate(
				(command, date, logType, someData) -> {
					assertThat(command).isEqualTo("testMessage");
					assertThat(logType).isEqualTo(LogType.LOG);
					assertThat(someData.length).isPositive();
					assertThat(someData[0]).isEqualTo("log 1");
					assertThat(someData[1]).isEqualTo("log 2");
					assertThat(someData[2]).isEqualTo("log 3");
					assertThat(someData[3]).isEqualTo("log 4");
					assertThat(someData[4]).isEqualTo("log 5");
				}
		));
		Supplier supplierMock = Mockito.mock(Supplier.class);
		Mockito.when(supplierMock.get()).thenReturn("log 5");

		Logger.conditionLog("testMessage", LogType.LOG, true,
				() -> "log 1",
				() -> "log 2",
				() -> "log 3",
				() -> "log 4",
				supplierMock
		);
		Mockito.verify(supplierMock, Mockito.times(1)).get();
	}

	@Test
	public void testConditionLogWithWithFalseConditionAndSupplierDatas() throws Exception {
		Logger.getSettings().addTraceTarget(new TraceTargetDelegate(
				(command, date, logType, someData) -> {
					assertThat(command).isEqualTo("testMessage");
					assertThat(logType).isEqualTo(LogType.LOG);
					assertThat(someData.length).isPositive();
					assertThat(someData[0]).isEqualTo("log 1");
					assertThat(someData[1]).isEqualTo("log 2");
					assertThat(someData[2]).isEqualTo("log 3");
				}
		));
		Supplier supplierMock = Mockito.mock(Supplier.class);
		Mockito.when(supplierMock.get()).thenReturn("log 4");

		Logger.conditionLog("testMessage", LogType.LOG, false,
				() -> "log 1",
				() -> "log 2",
				() -> "log 3",
				supplierMock
		);
		Mockito.verify(supplierMock, Mockito.never()).get();
	}

	@Test
	public void testLogError() throws Exception {
		Logger.getSettings().addTraceTarget(new TraceTargetDelegate(
				(command, date, logType, someData) -> {
					assertThat(command).isEqualTo("RuntimeException");
					assertThat(logType).isEqualTo(LogType.THROWABLE_ERROR);
					assertThat(someData[2]).isEqualTo("testMessage");
				}
		));
		Logger.error(new RuntimeException(), "testMessage");
	}

	@Test
	public void testLogErrorWithDifferentStackTraceParser() throws Exception {
		Logger.getSettings().setStackTraceParser(StringUtils::getDefaultStackTrace);
		Logger.getSettings().addTraceTarget(new TraceTargetDelegate(
				(command, date, logType, someData) -> {
					assertThat(command).isEqualTo("RuntimeException");
					assertThat(logType).isEqualTo(LogType.THROWABLE_ERROR);
					assertThat(someData[2]).isEqualTo("testMessage");
					assertThat((someData[3] + "").split("\n")[1]).
							contains("\tat "+LoggerTest.class.getName() +
							".testLogErrorWithDifferentStackTraceParser(" +LoggerTest.class.getSimpleName()+
							".java:");
				}
		));
		Logger.error(new RuntimeException(), "testMessage");
	}

	@Test
	public void testGetSimpleName() throws Exception {
		assertThat(Logger.getSimpleName(new PopupController())).isEqualTo("PopupController");
		assertThat(Logger.getSimpleName(new PopupControllerImpl())).isEqualTo("PopupController");
		assertThat(Logger.getSimpleName(new PopupControlNewImpl())).isEqualTo("PopupNew");
		assertThat(Logger.getSimpleName(new PopupControllerNewImpl())).isEqualTo("PopupControllerNew");
		assertThat(Logger.getSimpleName(new PopupImpl())).isEqualTo("Popup");
		assertThat(Logger.getSimpleName(new GameState())).isEqualTo("Game");
		assertThat(Logger.getSimpleName(new GameStateImpl())).isEqualTo("Game");
		assertThat(Logger.getSimpleName(new GameCreateStaterNew())).isEqualTo("GameCreateStaterNew");
		assertThat(Logger.getSimpleName(new GameStateNew())).isEqualTo("GameNew");
	}

	private class PopupController {
	}

	private class PopupControllerImpl {
	}

	private class PopupImpl {
	}

	private class GameState {
	}

	private class PopupControlNewImpl {
	}

	private class GameStateImpl {
	}

	private class PopupControllerNewImpl {
	}

	private class GameCreateStaterNew {
	}

	private class GameStateNew {
	}

	private class TraceTargetDelegate implements TraceTarget {
		private SimpleTraceTarget simpleTraceTarget;

		public TraceTargetDelegate(SimpleTraceTarget simpleTraceTarget) {
			this.simpleTraceTarget = simpleTraceTarget;
		}

		@Override
		public void log(String command, Date date, LogType logType, Object ...someData){
			simpleTraceTarget.log(command, date, logType, someData);
		}

		@Override
		public void init(Date date) {}

		@Override
		public void destroy() {}
	}

	private interface SimpleTraceTarget {
		void log(String command, Date date, LogType logType, Object ...someData);
	}
}
