package com.loka.autotesting.logger.assertions;


import com.loka.autotesting.logger.AddCondition;
import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.Logger;
import com.loka.autotesting.logger.TraceTarget;
import com.loka.autotesting.utils.Debug;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static com.loka.autotesting.logger.AssertionLogger.assertThat;

public class StringAssertTest {

	private MessageCollector traceTarget;

	@Before
	public void setUp() throws Exception {
		Logger.destroy();
		traceTarget = new MessageCollector();
		Logger.getSettings().addTraceTarget(traceTarget, AddCondition.REPLACE_ON_NEW);
		for (LogType logType : LogType.values()) {
			logType.setEnable(true);
		}
	}

	@After
	public void tearDown() throws Exception {
		Logger.destroy();
	}

	@Test
	public void testIsEqualTo() throws Exception {
		assertThat("asd").isEqualTo("asd");
		assertThat("asd asd", "some text 1").isEqualTo("asd asd", "some text 2").traceMessage();
		String expected = "AssertResultlog\t - verifying: some text 1: [asd asd] equals to expected some text 2: [asd asd] - success";
		assertThat(traceTarget.getLastMsg(), "LastMsg").isEqualTo(expected, "some text 2");
		assertThat("asd asd 1").isEqualTo("asd asd 1");
	}

	@Test(expected = AssertionError.class)
	public void testIsEqualToNegativeTest() throws Exception {
		try {
			assertThat("asd").isEqualTo("asd1");
		} catch (AssertionError assertionError) {
			String expected = "failNotEquals: \n" +
					"\t- string value: [asd] does not equal to expected string value: [asd1]\n" +
					"expected \t[asd1] \n" +
					"but found \t[asd]\n";
			assertThat(assertionError, "assertionError").getLocalizedMessage().isEqualTo(expected);
			throw assertionError;
		}
	}

	@Test
	public void testIsNotEqualTo() throws Exception {
		assertThat("asd").isNotEqualTo("asd2");
		assertThat("asd asd", "some text 1").isNotEqualTo("asd asd2", "some text 2").traceMessage();
		String expected = "AssertResultlog\t - verifying: some text 1: [asd asd] does not equal to some text 2: [asd asd2] - success";
		assertThat(traceTarget.getLastMsg(), "LastMsg").isEqualTo(expected, "some text 2").traceMessage();
		assertThat("asd asd 1").isNotEqualTo("asd asd 2");
	}

	@Test
	public void testIsContains() throws Exception {
		assertThat("asd").isContains("asd");
		assertThat("asd asd", "some text 1").isContains("asd").traceMessage();
		String expected = "AssertResultlog\t - verifying: some text 1: [asd asd] contains: [asd] string value - success";
		assertThat(traceTarget.getLastMsg(), "LastMsg").isEqualTo(expected, "some text 2").traceMessage();
		assertThat("asd asd 1").isContains("asd ");
	}

	@Test
	public void testIsNotEmpty() throws Exception {
		assertThat("asd").isNotEmpty();
		assertThat("asd").isNotEmpty().traceMessage();
		String expected = "AssertResultlog\t - verifying: string value: [asd] is not empty string - success";
		assertThat(traceTarget.getLastMsg(), "LastMsg").isEqualTo(expected, "some text 2").traceMessage();
	}

	@Test
	public void testIsEmpty() throws Exception {
		assertThat("").isEmpty();
		assertThat("").isEmpty().traceMessage();
		String expected = "AssertResultlog\t - verifying: string value: [] is empty string - success";
		assertThat(traceTarget.getLastMsg(), "LastMsg").isEqualTo(expected, "some text 2");
	}

	@Test
	public void testIsNotContains() throws Exception {
		assertThat("asd").isNotContains("asd2");
		assertThat("asd asd", "some text 1").isNotContains("asdd").traceMessage();
		String expected = "AssertResultlog\t - verifying: some text 1: [asd asd] does not contains: [asdd] string value - success";
		assertThat(traceTarget.getLastMsg(), "LastMsg").isEqualTo(expected, "some text 2");
	}

	@Test
	public void testIsNotContains1() throws Exception {
		assertThat("asd").isNotContains("asd2", "asd3");
		assertThat("asd asd", "some text 1").isNotContains("asdd", "asdf3").traceMessage();
		String expected = "AssertResultlog\t - verifying: some text 1: [asd asd] does not contains: [asdd] string value - success\t - verifying: some text 1: [asd asd] does not contains: [asdf3] string value - success";
		assertThat(traceTarget.getLastMsg(), "LastMsg").isEqualTo(expected, "some text 2");
	}

	@Test
	public void testLength() throws Exception {
		assertThat("asd").length().isNotNull().isGreaterThanOrEqualTo(1).isLessThan(6).isEqualTo(3);
		assertThat("asd3").length().isEqualTo(4).traceMessage();
		String expected = "AssertResultlog\t - verifying: string value.length: [4] equals to expected Integer value: [4] - success";
		assertThat(traceTarget.getLastMsg(), "LastMsg").isEqualTo(expected, "some text 2");
	}

	@Test
	public void testIsContains1() throws Exception {
		assertThat("asd").isContains("asd", "as");
		assertThat("asd asd", "some text 1").isContains("asd", "as").traceMessage();
		String expected = "AssertResultlog\t - verifying: some text 1: [asd asd] contains: [asd] string value - success\t - verifying: some text 1: [asd asd] contains: [as] string value - success";
		assertThat(traceTarget.getLastMsg(), "LastMsg").isEqualTo(expected, "some text 2");
	}

	@Test
	public void testMatches() throws Exception {
		assertThat("asd").matches("asd");
		assertThat("00:00", "some text 1").matches("\\d\\d:\\d\\d").traceMessage();
		String expected = "AssertResultlog\t - verifying: some text 1: [00:00] matches to: [\\d\\d:\\d\\d] regex - success";
		assertThat(traceTarget.getLastMsg(), "LastMsg").isEqualTo(expected, "some text 2");
	}

	@Test
	public void testIsNotMatches() throws Exception {
		assertThat("asd").isNotMatches("asf");
		assertThat("00:00", "some text 1").isNotMatches("\\d\\d\\d\\d").traceMessage();
		String expected = "AssertResultlog\t - verifying: some text 1: [00:00] does not matches to: [\\d\\d\\d\\d] regex - success";
		assertThat(traceTarget.getLastMsg(), "LastMsg").isEqualTo(expected, "some text 2");
	}

	public class MessageCollector implements TraceTarget {
		private String msg = "";
		@Override
		public void log(String command, Date date, LogType logType, Object... someData) {

			msg = command + logType.geType();
			for (Object o : someData) {
				msg += o;
			}
			if(Debug.isDebugging()) {
				System.out.print("\nprint: " + msg);
			}
		}

		@Override
		public void init(Date date) {

		}

		@Override
		public void destroy() {

		}

		public String getLastMsg() {
			return msg;
		}
	}
}