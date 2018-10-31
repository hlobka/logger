package com.loka.autotesting.logger.assertions;

import static com.loka.autotesting.logger.AssertionLogger.assertFalse;
import static com.loka.autotesting.logger.AssertionLogger.assertTrue;


public class StringAssert extends CommonAssert<StringAssert, String> {

	private final String what;

	public StringAssert(String value, String valueName) {
		super(value, valueName);
		what = "string value";
	}

	public StringAssert(String value) {
		this(value, "string value");
	}

	@Override
	public StringAssert isEqualTo(String expected) {
		super.isEqualTo(expected, what);
		return this;
	}

	@Override
	public StringAssert isNotEqualTo(String expected) {
		isNotEqualTo(expected, what);
		return this;
	}

	public StringAssert isContains(String expected) {
		assertTrue(assertionValue.contains(expected), valueName + ": [" + assertionValueString + "] does not contains: [" + getBeautifulValueString(expected) + "] " + what);
		addMessage(valueName + ": [" + assertionValueString + "] contains: [" + getBeautifulValueString(expected) + "] " + what);
		return this;
	}

	public StringAssert isNotEmpty() {
		assertFalse(assertionValue.isEmpty(), valueName + ": [" + assertionValueString + "] is empty string");
		addMessage(valueName + ": [" + assertionValueString + "] is not empty string");
		return this;
	}

	public StringAssert isEmpty() {
		assertTrue(assertionValue.isEmpty(), valueName + ": [" + assertionValueString + "] is not empty string");
		addMessage(valueName + ": [" + assertionValueString + "] is empty string");
		return this;
	}

	public StringAssert isNotContains(Object ...expected) {
		for (Object o : expected) {
			isNotContains(o.toString());
		}
		return this;
	}
	public StringAssert isNotContains(String expected) {
		assertFalse(assertionValue.contains(expected), valueName + ": [" + assertionValueString + "] contains: [" + getBeautifulValueString(expected) + "] " + what);
		addMessage(valueName + ": [" + assertionValueString + "] does not contains: [" + getBeautifulValueString(expected) + "] " + what);
		return this;
	}

	public NumberAssert length() {
		return andThat(assertionValue.length(), valueName + ".length");
	}

	public StringAssert isContains(Object ...values) {
		for (Object o : values) {
			isContains(o.toString());
		}
		return this;
	}

	public StringAssert matches(String regex) {
		assertTrue(assertionValue.matches(regex), valueName + ": [" + assertionValueString + "] does not matches to: [" + regex + "] regex");
		addMessage(valueName + ": [" + assertionValueString + "] matches to: [" + regex + "] regex");
		return this;
	}

	public StringAssert isNotMatches(String regex) {
		assertFalse(assertionValue.matches(regex), valueName + ": [" + assertionValueString + "] matches to: [" + regex + "] regex");
		addMessage(valueName + ": [" + assertionValueString + "] does not matches to: [" + regex + "] regex");
		return this;
	}
}
