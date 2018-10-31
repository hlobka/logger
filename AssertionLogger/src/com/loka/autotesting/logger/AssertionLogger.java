package com.loka.autotesting.logger;

import com.loka.autotesting.logger.assertions.*;
import com.loka.autotesting.utils.strings.StringAppender;

import java.lang.reflect.Array;
import java.math.BigDecimal;
import java.util.*;
import java.util.function.Consumer;

@SuppressWarnings("ALL")
public class AssertionLogger {
	public static final Character OPENING_CHARACTER = '[';
	public static final Character CLOSING_CHARACTER = ']';

	public static final String ASSERT_LEFT = "expected \t" + OPENING_CHARACTER;
	public static final String ASSERT_LEFT2 = "expected not same " + OPENING_CHARACTER;
	public static final String ASSERT_MIDDLE = CLOSING_CHARACTER + " \nbut found \t" + OPENING_CHARACTER;
	public static final String ASSERT_RIGHT = Character.toString(CLOSING_CHARACTER);
	public static final String ASSERTION_ERROR = "assertion_error";
	public static Consumer<AssertionError> errorListener = assertionError -> {};

	/**
	 * Protect constructor since it is a static only class
	 */
	protected AssertionLogger() {
		// hide constructor
	}

	/**
	 * Fails a test with the given message and wrapping the original exception.
	 *
	 * @param message   the assertion error message
	 * @param realCause the original exception
	 */
	public static void fail(String command, Throwable realCause, String message) {
		AssertionError ae = new AssertionError(getMessage(command, message));
		throwFail(ae, realCause);
	}

	public static void throwFail(AssertionError ae, Throwable realCause) {
		if (realCause != null) {
			ae.initCause(realCause);
		}
		errorListener.accept(ae);
		throw ae;
	}
/*
	static public void fail(Throwable realCause, String message) {
		fail("AssertionError", realCause, message);

	}*/

	/**
	 * Fails a test with no message.
	 */
	static public void fail() {
		fail("fail", null, null);
	}

	protected static String getMessage(String command, String... messages) {
		String result = command;// + messages;
		if (messages.length > 0) {
			result += ": ";
		} else {
			result += " ";
		}

		for (String message : messages) {
			result += "\n\t- " + message;
		}

		result += "\n";
		return result;
	}

	/**
	 * Asserts that a condition is true. If it isn't,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param condition the condition to evaluate
	 * @param message   the assertion error message
	 */
	static public void assertTrue(boolean condition, String message) {
		if (!condition) {
			failNotEquals(Boolean.valueOf(condition), Boolean.TRUE, message);
		}
	}

	/**
	 * Asserts that a condition is true. If it isn't,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param condition the condition to evaluate
	 * @param message   the assertion error message
	 */
	static public void assertTrue(boolean condition, String message, String messageSuccesses) {
		if (!condition) {
			failNotEquals(Boolean.valueOf(condition), Boolean.TRUE, message);
		} else {
			Logger.log("assertTrue", LogType.LOG_USE_SS, messageSuccesses);
		}
	}

	/**
	 * Asserts that a condition is true. If it isn't,
	 * an AssertionError is thrown.
	 *
	 * @param condition the condition to evaluate
	 */
	static public void assertTrue(boolean condition) {
		assertTrue(condition, null);
	}

	/**
	 * Asserts that a condition is false. If it isn't,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param condition the condition to evaluate
	 * @param message   the assertion error message
	 */
	static public void assertFalse(boolean condition, String message) {
		if (condition) {
			failNotEquals(Boolean.valueOf(condition), Boolean.FALSE, message); // TESTNG-81
		}
	}

	static public void assertFalse(boolean condition, String message, String messageSuccesses) {
		if (condition) {
			failNotEquals(Boolean.valueOf(condition), Boolean.FALSE, message); // TESTNG-81
		} else {
			Logger.log("assertFalse", LogType.LOG_USE_SS, messageSuccesses);
		}
	}

	/**
	 * Asserts that a condition is false. If it isn't,
	 * an AssertionError is thrown.
	 *
	 * @param condition the condition to evaluate
	 */
	static public void assertFalse(boolean condition) {
		assertFalse(condition, null);
	}
	/**
	 * Fails a test with the given message.
	 * @param message the assertion error message
	 */
	/*static public void fail(null, String message) {
		fail(null, message, null);
	}*/


	/**
	 * Asserts that two BigDecimals are equal. If they are not,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(BigDecimal actual, BigDecimal expected, String message) {
		if ((expected == null) && (actual == null)) {
			return;
		}
		if (expected != null && actual != null) {
			if (expected.compareTo(actual)==0) {
				return;
			}
		}
		failNotEquals(actual, expected, message);
	}

	public static void assertNotEquals(BigDecimal actual1, BigDecimal actual2, String message) {
		if ((actual2 == null) && (actual1 != null)||(actual2 != null) && (actual1 == null)) {
			return;
		}
		if (actual2 != null && actual1 != null) {
			if (actual2.compareTo(actual1) != 0) {
				return;
			}
		}
		failNotEquals(actual1, actual2, message);
	}
	/**
	 * Asserts that two objects are equal. If they are not,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(Object actual, Object expected, String message) {
		if ((expected == null) && (actual == null)) {
			return;
		}
		if (expected != null) {
			if (expected.getClass().isArray()) {
				assertArrayEquals(actual, expected, message);
				return;
			} else if (actual != null && (expected.equals(actual) || actual.equals(expected))) {
				return;
			}
		}
		failNotEquals(actual, expected, message);
	}

	/**
	 * Asserts that two objects are equal. It they are not, an AssertionError,
	 * with given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value (should be an non-null array value)
	 * @param message  the assertion error message
	 */
	private static void assertArrayEquals(Object actual, Object expected, String message) {
		//is called only when expected is an array
		if (actual.getClass().isArray()) {
			int expectedLength = Array.getLength(expected);
			if (expectedLength == Array.getLength(actual)) {
				for (int i = 0; i < expectedLength; i++) {
					Object _actual = Array.get(actual, i);
					Object _expected = Array.get(expected, i);
					try {
						assertEquals(_actual, _expected);
					} catch (AssertionError ae) {
						failNotEquals(actual,
								expected, message == null ? "" : getMessage("assertArrayEquals", message)
										+ " (values as index " + i + " are not the same)");
					}
				}
				//array values matched
				return;
			} else {
				failNotEquals(Array.getLength(actual), expectedLength, message == null ? "" : message
						+ " (Array lengths are not the same)");
			}
		}
		failNotEquals(actual, expected, message);
	}

	/**
	 * Asserts that two objects are equal. If they are not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(Object actual, Object expected) {
		assertEquals(actual, expected, null);
	}

	/**
	 * Asserts that two Strings are equal. If they are not,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(String actual, String expected, String message) {
		assertEquals((Object) actual, (Object) expected, message);
	}

	static public void assertEquals(String actual, String expected, String message, String messageSuccesses) {
		assertEquals(actual, expected, message);
		Logger.log("assertEquals", LogType.LOG_USE_SS, "Actual:\t\t" + actual, "Expected:\t" + expected, messageSuccesses);
	}

	/**
	 * Asserts that two Strings are equal. If they are not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(String actual, String expected) {
		assertEquals(actual, expected, null);
	}

	/**
	 * Asserts that two doubles are equal concerning a delta.  If they are not,
	 * an AssertionError, with the given message, is thrown.  If the expected
	 * value is infinity then the delta value is ignored.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param delta    the absolute tolerable difference between the actual and expected values
	 * @param message  the assertion error message
	 */
	static public void assertEquals(double actual, double expected, double delta, String message) {
		// handle infinity specially since subtracting to infinite values gives NaN and the
		// the following test fails
		if (Double.isInfinite(expected)) {
			if (!(expected == actual)) {
				failNotEquals(new Double(actual), new Double(expected), message);
			}
		} else if (!(Math.abs(expected - actual) <= delta)) { // Because comparison with NaN always returns false
			failNotEquals(new Double(actual), new Double(expected), message);
		}
	}

	/**
	 * Asserts that two doubles are equal concerning a delta. If they are not,
	 * an AssertionError is thrown. If the expected value is infinity then the
	 * delta value is ignored.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param delta    the absolute tolerable difference between the actual and expected values
	 */
	static public void assertEquals(double actual, double expected, double delta) {
		assertEquals(actual, expected, delta, null);
	}

	/**
	 * default delta is 0.0001
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(Float actual, double expected) {
		assertEquals(actual, expected, 0.0001, "");
	}

	/**
	 * default delta is 0.0001
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(double actual, Float expected, String message) {
		assertEquals(actual, expected, 0.0001, message);
	}

	static public void assertEquals(double actual, double expected, String message, String messageSuccesses) {
		assertEquals(actual, expected, 0.0001, message);
		Logger.log("assertEquals", LogType.LOG_USE_SS, "Actual:\t\t" + actual, "Expected:\t" + expected, messageSuccesses);
	}

	/**
	 * default delta is 0.0001
	 *
	 * @param actual           the actual value
	 * @param expected         the expected value
	 * @param message          the assertion error message
	 * @param messageSuccesses the successes assertion message
	 */
	static public void assertEquals(Float actual, Float expected, String message, String messageSuccesses) {
		assertEquals(actual, expected, 0.0001, message);
		Logger.log("assertEquals", LogType.LOG_USE_SS, "Actual:\t\t" + actual, "Expected:\t" + expected, messageSuccesses);
	}

	/**
	 * Asserts that two floats are equal concerning a delta. If they are not,
	 * an AssertionError, with the given message, is thrown.  If the expected
	 * value is infinity then the delta value is ignored.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param delta    the absolute tolerable difference between the actual and expected values
	 * @param message  the assertion error message
	 */
	static public void assertEquals(Float actual, Float expected, Float delta, String message) {
		// handle infinity specially since subtracting to infinite values gives NaN and the
		// the following test fails
		if (Float.isInfinite(expected)) {
			if (!(expected == actual)) {
				failNotEquals(new Float(actual), new Float(expected), message);
			}
		} else if (!(Math.abs(expected - actual) <= delta)) {
			failNotEquals(new Float(actual), new Float(expected), message);
		}
	}

	/**
	 * Asserts that two floats are equal concerning a delta. If they are not,
	 * an AssertionError is thrown. If the expected
	 * value is infinity then the delta value is ignored.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param delta    the absolute tolerable difference between the actual and expected values
	 */
	static public void assertEquals(Float actual, Float expected, Float delta) {
		assertEquals(actual, expected, delta, null);
	}

	/**
	 * Asserts that two longs are equal. If they are not,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(long actual, long expected, String message, String messageSuccesses) {
		assertEquals(Long.valueOf(actual), Long.valueOf(expected), message);
		Logger.log("assertEquals", LogType.LOG_USE_SS, "Actual:\t\t" + actual, "Expected:\t" + expected, messageSuccesses);
	}

	static public void assertEquals(long actual, long expected, String message) {
		assertEquals(Long.valueOf(actual), Long.valueOf(expected), message);
	}

	/**
	 * Asserts that two longs are equal. If they are not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(long actual, long expected) {
		assertEquals(actual, expected, null);
	}

	/**
	 * Asserts that two booleans are equal. If they are not,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(boolean actual, boolean expected, String message) {
		assertEquals(Boolean.valueOf(actual), Boolean.valueOf(expected), message);
	}

	/**
	 * Asserts that two booleans are equal. If they are not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(boolean actual, boolean expected) {
		assertEquals(actual, expected, null);
	}

	/**
	 * Asserts that two bytes are equal. If they are not,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(byte actual, byte expected, String message) {
		assertEquals(Byte.valueOf(actual), Byte.valueOf(expected), message);
	}

	/**
	 * Asserts that two bytes are equal. If they are not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(byte actual, byte expected) {
		assertEquals(actual, expected, "assertEquals");
	}

	/**
	 * Asserts that two chars are equal. If they are not,
	 * an AssertionFailedError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(char actual, char expected, String message) {
		assertEquals(Character.valueOf(actual), Character.valueOf(expected), message);
	}

	/**
	 * Asserts that two chars are equal. If they are not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(char actual, char expected) {
		assertEquals(actual, expected, "assertEquals");
	}

	/**
	 * Asserts that two shorts are equal. If they are not,
	 * an AssertionFailedError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(short actual, short expected, String message) {
		assertEquals(Short.valueOf(actual), Short.valueOf(expected), message);
	}

	/**
	 * Asserts that two shorts are equal. If they are not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(short actual, short expected) {
		assertEquals(actual, expected, "assertEquals");
	}

	/**
	 * Asserts that two ints are equal. If they are not,
	 * an AssertionFailedError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(int actual, int expected, String message) {
		assertEquals(Integer.valueOf(actual), Integer.valueOf(expected), message);
	}

	static public void assertEquals(int actual, int expected, String message, String messageSuccesses) {
		assertEquals(Integer.valueOf(actual), Integer.valueOf(expected), message);
		Logger.log("assertEquals", LogType.LOG_USE_SS, "Actual:\t\t" + actual, "Expected:\t" + expected, messageSuccesses);
	}

	/**
	 * Asserts that two ints are equal. If they are not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(int actual, int expected) {
		assertEquals(actual, expected, null);
	}

	/**
	 * Asserts that an object isn't null. If it is,
	 * an AssertionError is thrown.
	 *
	 * @param object the assertion object
	 */
	static public void assertNotNull(Object object) {
		assertNotNull(object, null);
	}

	/**
	 * Asserts that an object isn't null. If it is,
	 * an AssertionFailedError, with the given message, is thrown.
	 *
	 * @param object  the assertion object
	 * @param message the assertion error message
	 */
	static public void assertNotNull(Object object, String message) {
		if (object == null) {
			fail("assertNotNull", null, message + "\n" + "expected object to not be null");
		}
		assertTrue(object != null, message);
	}

	static public void assertNotNull(Object object, String message, String messageSuccesses) {
		assertNotNull(object, message);
		Logger.log("assertEquals", LogType.LOG_USE_SS, messageSuccesses);
	}

	/**
	 * Asserts that an object is null. If it is not,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param object the assertion object
	 */
	static public void assertNull(Object object) {
		assertNull(object, null);
	}

	/**
	 * Asserts that an object is null. If it is not,
	 * an AssertionFailedError, with the given message, is thrown.
	 *
	 * @param object  the assertion object
	 * @param message the assertion error message
	 */
	static public void assertNull(Object object, String message) {
		if (object != null) {
			failNotSame(object, null, message);
		}
	}

	/**
	 * Asserts that two objects refer to the same object. If they do not,
	 * an AssertionFailedError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertSame(Object actual, Object expected, String message) {
		if (expected == actual) {
			return;
		}
		failNotSame(actual, expected, message);
	}

	/**
	 * Asserts that two objects refer to the same object. If they do not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertSame(Object actual, Object expected) {
		assertSame(actual, expected, null);
	}

	/**
	 * Asserts that two objects do not refer to the same objects. If they do,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertNotSame(Object actual, Object expected, String message) {
		if (expected == actual) {
			failSame(actual, expected, message);
		}
	}

	/**
	 * Asserts that two objects do not refer to the same object. If they do,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertNotSame(Object actual, Object expected) {
		assertNotSame(actual, expected, null);
	}

	static private void failSame(Object actual, Object expected, String message) {
		fail("failSame", null, formatNotSame(actual, expected, message));
	}

	static private void failNotSame(Object actual, Object expected, String message) {
		fail("failNotSame", null, format(actual, expected, message));
	}

	static private void failNotEquals(Object actual, Object expected, String message) {
		fail("failNotEquals", null, format(actual, expected, message));
	}

	static String formatNotSame(Object actual, Object expected, String message) {
		return new StringAppender().append(message, "\n", ASSERT_LEFT2, clearString(expected), ASSERT_MIDDLE, clearString(actual), ASSERT_RIGHT).toString();
	}

	static String format(Object actual, Object expected, String message) {
		return new StringAppender().append(message, "\n", ASSERT_LEFT, clearString(expected), ASSERT_MIDDLE, clearString(actual), ASSERT_RIGHT).toString();
	}

	static String clearString(Object o) {
		if (o instanceof String) {
			return (o + "").replace("\n", "");
		}
		if (o instanceof Number) {
			return new BigDecimal(o + "").toPlainString();
		}
		return o + "";
	}

	/**
	 * Asserts that two collections contain the same elements in the same order. If they do not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(Collection<?> actual, Collection<?> expected) {
		assertEquals(actual, expected, "");
	}

	static public void assertEquals(Collection<?> actual, Collection<?> expected, String message, String messageSuccesses) {
		assertEquals(actual, expected, message);
		Logger.log("assertEquals", LogType.LOG_USE_SS, messageSuccesses);
	}

	/**
	 * Asserts that two collections contain the same elements in the same order. If they do not,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(Collection<?> actual, Collection<?> expected, String message) {
		if (actual == expected) {
			return;
		}

		if (actual == null || expected == null) {
			if (message != null) {
				fail("assertEquals", null, message);
			} else {
				fail("assertEquals", null, "Collections not equal: expected: " + expected + " and actual: " + actual);
			}
		}

		assertEquals(actual.size(), expected.size(), getMessage("", message) + ": lists don't have the same size");

		Iterator<?> actIt = actual.iterator();
		Iterator<?> expIt = expected.iterator();
		int i = -1;
		while (actIt.hasNext() && expIt.hasNext()) {
			i++;
			Object e = expIt.next();
			Object a = actIt.next();
			String explanation = "Lists differ at element [" + i + "]: " + e + " != " + a;
			String errormessage = message == null ? explanation : getMessage("", message) + ": " + explanation;

			assertEquals(a, e, errormessage);
		}
	}

	/**
	 * Asserts that two iterators return the same elements in the same order. If they do not,
	 * an AssertionError is thrown.
	 * Please note that this assert iterates over the elements and modifies the state of the iterators.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(Iterator<?> actual, Iterator<?> expected) {
		assertEquals(actual, expected, "");
	}

	/**
	 * Asserts that two iterators return the same elements in the same order. If they do not,
	 * an AssertionError, with the given message, is thrown.
	 * Please note that this assert iterates over the elements and modifies the state of the iterators.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(Iterator<?> actual, Iterator<?> expected, String message) {
		if (actual == expected) {
			return;
		}

		if (actual == null || expected == null) {
			if (message != null) {
				fail("assertEquals", null, message);
			} else {
				fail("assertEquals", null, "Iterators not equal: expected: " + expected + " and actual: " + actual);
			}
		}

		int i = -1;
		String messageMessage = getMessage("", message);
		while (actual.hasNext() && expected.hasNext()) {

			i++;
			Object e = expected.next();
			Object a = actual.next();
			String explanation = "Iterators differ at element [" + i + "]: " + e + " != " + a;
			String errormessage = message == null ? explanation : messageMessage + ": " + explanation;

			assertEquals(a, e, errormessage);

		}

		if (actual.hasNext()) {

			String explanation = "Actual iterator returned more elements than the expected iterator.";
			String errormessage = message == null ? explanation : messageMessage + ": " + explanation;
			fail("assertEquals", null, errormessage);

		} else if (expected.hasNext()) {

			String explanation = "Expected iterator returned more elements than the actual iterator.";
			String errormessage = message == null ? explanation : messageMessage + ": " + explanation;
			fail("assertEquals", null, errormessage);

		}

	}

	/**
	 * Asserts that two iterables return iterators with the same elements in the same order. If they do not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(Iterable<?> actual, Iterable<?> expected) {
		assertEquals(actual, expected, "");
	}

	/**
	 * Asserts that two iterables return iterators with the same elements in the same order. If they do not,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(Iterable<?> actual, Iterable<?> expected, String message) {
		if (actual == expected) {
			return;
		}

		if (actual == null || expected == null) {
			if (message != null) {
				fail("assertEquals", null, message);
			} else {
				fail("assertEquals", null, "Iterables not equal: expected: " + expected + " and actual: " + actual);
			}
		}

		Iterator<?> actIt = actual.iterator();
		Iterator<?> expIt = expected.iterator();

		assertEquals(actIt, expIt, message);
	}


	/**
	 * Asserts that two arrays contain the same elements in the same order. If they do not,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(Object[] actual, Object[] expected, String message) {
		if (actual == expected) {
			return;
		}

		if ((actual == null && expected != null) || (actual != null && expected == null)) {
			if (message != null) {
				fail("assertEquals", null, message);
			} else {
				fail("assertEquals", null, "Arrays not equal: " + Arrays.toString(expected) + " and " + Arrays.toString(actual));
			}
		}
		assertEquals(Arrays.asList(actual), Arrays.asList(expected), message);
	}



	private static void failAssertNoEqual(String defaultmessage, String message) {
		if (message != null) {
			fail("failAssertNoEqual", null, message);
		} else {
			fail("failAssertNoEqual", null, defaultmessage);
		}
	}

	/**
	 * Asserts that two arrays contain the same elements in the same order. If they do not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(Object[] actual, Object[] expected) {
		assertEquals(actual, expected, null);
	}

	/**
	 * Asserts that two arrays contain the same elements in the same order. If they do not,
	 * an AssertionError is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 */
	static public void assertEquals(final byte[] actual, final byte[] expected) {
		assertEquals(actual, expected, "");
	}

	/**
	 * Asserts that two arrays contain the same elements in the same order. If they do not,
	 * an AssertionError, with the given message, is thrown.
	 *
	 * @param actual   the actual value
	 * @param expected the expected value
	 * @param message  the assertion error message
	 */
	static public void assertEquals(final byte[] actual, final byte[] expected, final String message) {
		if (expected == actual) {
			return;
		}
		String messageMessage = getMessage("", message);
		if (null == expected) {
			fail("assertEquals", null, "expected a null array, but not null found. " + messageMessage);
		}
		if (null == actual) {
			fail("assertEquals", null, "expected not null array, but null found. " + messageMessage);
		}

		assertEquals(actual.length, expected.length, "arrays don't have the same size. " + messageMessage);

		for (int i = 0; i < expected.length; i++) {
			if (expected[i] != actual[i]) {
				String messageMessageI = messageMessage;
				fail("assertEquals", null, "arrays differ firstly at element [" + i + "]; "
						+ "expected value is <" + expected[i] + "> but was <"
						+ actual[i] + ">. "
						+ messageMessageI);
			}
		}
	}

	/**
	 * Asserts that two sets are equal.
	 */
	static public void assertEquals(Set<?> actual, Set<?> expected) {
		assertEquals(actual, expected, null);
	}

	/**
	 * Assert set equals
	 */
	static public void assertEquals(Set<?> actual, Set<?> expected, String message) {
		if (actual == expected) {
			return;
		}

		if (actual == null || expected == null) {
			// Keep the back compatible
			if (message == null) {
				fail("assertEquals", null, "Sets not equal: expected: " + expected + " and actual: " + actual);
			} else {
				failNotEquals(actual, expected, message);
			}
		}

		if (!actual.equals(expected)) {
			if (message == null) {
				fail("assertEquals", null, "Sets differ: expected " + expected + " but got " + actual);
			} else {
				failNotEquals(actual, expected, message);
			}
		}
	}

	/**
	 * Asserts that two maps are equal.
	 */
	static public void assertEquals(Map<?, ?> actual, Map<?, ?> expected) {
		if (actual == expected) {
			return;
		}

		if (actual == null || expected == null) {
			fail("assertEquals", null, "Maps not equal: expected: " + expected + " and actual: " + actual);
		}

		if (actual.size() != expected.size()) {
			fail("assertEquals", null, "Maps do not have the same size:" + actual.size() + " != " + expected.size());
		}

		Set<?> entrySet = actual.entrySet();
		for (Iterator<?> iterator = entrySet.iterator(); iterator.hasNext(); ) {
			Map.Entry<?, ?> entry = (Map.Entry<?, ?>) iterator.next();
			Object key = entry.getKey();
			Object value = entry.getValue();
			Object expectedValue = expected.get(key);
			assertEquals(value, expectedValue, "Maps do not match for key:" + key + " actual:" + value
					+ " expected:" + expectedValue);
		}

	}

	public static void assertNotEquals(Object actual1, Object actual2, String message) {
		if ((actual2 == null) && (actual1 == null)) {
			Logger.warning("assertNotEquals", LogType.ERROR, "actual1 and actual2 are null");
			return;
		}
		if (actual2 != null) {
			if (!actual2.equals(actual1)) {
				return;
			}
		}
		if (actual1 != null) {
			if (!actual1.equals(actual2)) {
				return;
			}
		}
		failNotEquals(actual1, actual2, message);
	}

	public static void assertNotEquals(Object actual1, Object actual2, String message, String messageSucsess) {
		if ((actual2 == null) && (actual1 == null)) {
			Logger.warning("assertNotEquals", LogType.ERROR, "actual1 and actual2 are null");
			return;
		}
		if (actual2 != null) {
			if (!actual2.equals(actual1)) {
				Logger.log("assertNotEquals", LogType.LOG_USE_SS,
						"actual1: " + actual1.toString(),
						"actual2: " + actual2.toString(),
						messageSucsess);
				return;
			}
		}
		failNotEquals(actual1, actual2, message);
	}

	public static void assertNotEquals(Object actual1, Object actual2) {
		assertNotEquals(actual1, actual2, null);
	}

	static void assertNotEquals(String actual1, String actual2, String message) {
		assertNotEquals((Object) actual1, (Object) actual2, message);
	}

	static void assertNotEquals(String actual1, String actual2) {
		assertNotEquals(actual1, actual2, null);
	}

	static void assertNotEquals(long actual1, long actual2, String message) {
		assertNotEquals(Long.valueOf(actual1), Long.valueOf(actual2), message);
	}

	static void assertNotEquals(long actual1, long actual2) {
		assertNotEquals(actual1, actual2, null);
	}

	static void assertNotEquals(boolean actual1, boolean actual2, String message) {
		assertNotEquals(Boolean.valueOf(actual1), Boolean.valueOf(actual2), message);
	}

	static void assertNotEquals(boolean actual1, boolean actual2) {
		assertNotEquals(actual1, actual2, null);
	}

	static void assertNotEquals(byte actual1, byte actual2, String message) {
		assertNotEquals(Byte.valueOf(actual1), Byte.valueOf(actual2), message);
	}

	static void assertNotEquals(byte actual1, byte actual2) {
		assertNotEquals(actual1, actual2, null);
	}

	static void assertNotEquals(char actual1, char actual2, String message) {
		assertNotEquals(Character.valueOf(actual1), Character.valueOf(actual2), message);
	}

	static void assertNotEquals(char actual1, char actual2) {
		assertNotEquals(actual1, actual2, null);
	}

	static void assertNotEquals(short actual1, short actual2, String message) {
		assertNotEquals(Short.valueOf(actual1), Short.valueOf(actual2), message);
	}

	static void assertNotEquals(short actual1, short actual2) {
		assertNotEquals(actual1, actual2, null);
	}

	public static void assertNotEquals(int actual1, int actual2, String message) {
		assertNotEquals(Integer.valueOf(actual1), Integer.valueOf(actual2), message);
	}

	public static void assertNotEquals(int actual1, int actual2) {
		assertNotEquals(actual1, actual2, null);
	}

	static public void assertNotEquals(float actual1, float actual2, float delta, String message) {
		boolean fail = false;
		try {
			AssertionLogger.assertEquals(actual1, actual2, delta, message);
			fail = true;
		} catch (AssertionError e) {

		}

		if (fail) {
			AssertionLogger.fail("assertNotEquals", null, message);
		}
	}

	static public void assertNotEquals(float actual1, float actual2, float delta) {
		assertNotEquals(actual1, actual2, delta, null);
	}

	static public void assertNotEquals(double actual1, double actual2, double delta, String message) {
		boolean fail = false;
		try {
			AssertionLogger.assertEquals(actual1, actual2, delta, message);
			fail = true;
		} catch (AssertionError e) {

		}

		if (fail) {
			AssertionLogger.fail("assertNotEquals", null, message);
		}
	}

	static public void assertNotEquals(double actual1, double actual2, double delta) {
		assertNotEquals(actual1, actual2, delta, null);
	}
	public static NumberAssert assertThat(Number i) {
		return new NumberAssert(i);
	}

	public static NumberAssert assertThat(Number i, String what) {
		return new NumberAssert(i, what);
	}

	public static MapAssert assertThat(Map i) {
		return new MapAssert(i);
	}

	public static MapAssert assertThat(Map i, String what) {
		return new MapAssert(i, what);
	}

	public static <T> ObjectAssert<T> assertThat(T o) {
		return new ObjectAssert<>(o);
	}

	public static <T> ObjectAssert<T> assertThat(T o, String what) {
		return new ObjectAssert<>(o, what);
	}

	public static ThrowableAssert assertThat(Throwable o) {
		return new ThrowableAssert(o);
	}

	public static ThrowableAssert assertThat(Throwable o, String what) {
		return new ThrowableAssert(o, what);
	}

	public static ArrayAssert assertThat(Integer[] o) {
		return new ArrayAssert(o);
	}

	public static ArrayAssert assertThat(Integer[] o, String what) {
		return new ArrayAssert(o, what);
	}

	public static ArrayAssert assertThat(Float[] o) {
		return new ArrayAssert(o);
	}

	public static ArrayAssert assertThat(Float[] o, String what) {
		return new ArrayAssert(o, what);
	}

	public static ArrayAssert assertThat(Double[] o) {
		return new ArrayAssert(o);
	}

	public static ArrayAssert assertThat(Double[] o, String what) {
		return new ArrayAssert(o, what);
	}

	public static CollectionAssert assertThat(Collection collection, String what) {
		return new CollectionAssert(collection, what);
	}

	public static CollectionAssert assertThat(Collection collection) {
		return new CollectionAssert(collection);
	}

	public static ListAssert assertThat(List list) {
		return new ListAssert(list);
	}

	public static ListAssert assertThat(List list, String what) {
		return new ListAssert(list, what);
	}

	public static BooleanAssert assertThat(Boolean aBoolean) {
		return new BooleanAssert(aBoolean);
	}

	public static BooleanAssert assertThat(Boolean aBoolean, String what) {
		return new BooleanAssert(aBoolean, what);
	}

	public static StringAssert assertThat(String s) {
		return new StringAssert(s);
	}

	public static StringAssert assertThat(String s, String what) {
		return new StringAssert(s, what);
	}

}