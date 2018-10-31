package com.loka.autotesting.logger.traceTargets;

import com.loka.autotesting.logger.AssertionLogger;
import org.junit.Test;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertTrue;


public class AssertionLoggerTest {

	public static Collection<Object[]> equalsParaValues() {
		return Arrays.asList(new Object[][]{
				{1, 1},
				{"1", "1"},
				{true, true},
				{false, false},
				{"asd", "asd"},
				{'d', 'd'},
				{1l, 1l},
				{1d, 1d},
				{1.1, 1.1}
		});
	}
	public static Collection<Object[]> notEqualsParaValues() {
		return Arrays.asList(new Object[][]{
				{1, 2},
				{"1", "2"},
				{"asd", "dsa"},
				{1.1, 1.2},
				{1, "asd"},
				{1, 1.1},
				{true, false},
				{false, true},
				{'a', 'b'},
				{"a", null},
				{null, "a"},
				{1l, 2l},
				{1d, 2d},
				{1.1, "asd"}
		});
	}

	@Test
	public void assertEqualsObjWithObjWhenEqualsObjectsThenDoNotAssertEquals() throws Exception {
		for (Object[] o : equalsParaValues()) {
			AssertionLogger.assertEquals(o[0], o[1]);
		}
	}

	@Test()
	public void assertNotEqualsObjWithObjWhenEqualsObjectsThenAssertNotEquals() throws Exception {
		Collection<Object[]> objects = equalsParaValues();
		int actualErrorCont = 0;
		int expectedErrorCont = objects.size();
		for (Object[] o : objects) {
			try {
				AssertionLogger.assertNotEquals(o[0], o[1]);
			} catch (AssertionError error){
				actualErrorCont++;
			}
		}
		assertTrue("count of assertions error do not equals", actualErrorCont == expectedErrorCont);
	}

	@Test
	public void assertEqualsObjWithObjWhenNotEqualsObjectsThenDoNotAssertEquals() throws Exception {
		for (Object[] o : notEqualsParaValues()) {
			AssertionLogger.assertNotEquals(o[0], o[1]);
		}
	}

	@Test()
	public void assertNotEqualsObjWithObjWhenNotEqualsObjectsThenAssertNotEquals() throws Exception {
		Collection<Object[]> objects = notEqualsParaValues();
		int actualErrorCont = 0;
		int expectedErrorCont = objects.size();
		for (Object[] o : objects) {
			try {
				AssertionLogger.assertEquals(o[0], o[1]);
			} catch (AssertionError error){
				actualErrorCont++;
			}
		}
		assertTrue("count of assertions error do not equals", actualErrorCont == expectedErrorCont);
	}
}
