package com.loka.autotesting.logger.assertions;

import com.loka.autotesting.logger.AssertionLogger;
import org.apache.commons.lang3.ArrayUtils;

import java.util.List;

public class ArrayAssert extends CommonAssert<ArrayAssert, Object[]> {
	private String what = "array value";
	public ArrayAssert(Object[] value, String valueName, List<String> messages) {
		super(value, valueName, messages);
	}

	public ArrayAssert(Object[] value, String what) {
		super(value, what);
	}

	public ArrayAssert(Object[] value) {
		super(value, "array value");
	}

	@Override
	public ArrayAssert isEqualTo(Object[] expected) {
		super.isEqualTo(expected, what);
		return this;
	}

	public ArrayAssert contains(Object expected, String what) {
		String stringValue = ArrayUtils.toString(assertionValue);
		AssertionLogger.assertTrue(ArrayUtils.contains(assertionValue, expected),
				valueName + ": [" + stringValue + "] does not contain expected " + what + ": [" + expected + "]");
		addMessage(valueName + ": [" + stringValue + "] contains expected " + what + ": [" + expected + "]");
		return this;
	}

	public ArrayAssert contains(Object expected) {
		return contains(expected, what);
	}

	@Override
	public ArrayAssert isNotEqualTo(Object[] expected) {
		isNotEqualTo(expected, what);
		return this;
	}
}
