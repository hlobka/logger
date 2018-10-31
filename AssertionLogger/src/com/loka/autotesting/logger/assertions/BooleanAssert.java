package com.loka.autotesting.logger.assertions;

public class BooleanAssert extends CommonAssert<BooleanAssert, Boolean> {
	private String what = "boolean value";
	public BooleanAssert(Boolean value) {
		this(value, "boolean value");
	}

	public BooleanAssert(Boolean value, String valueName) {
		super(value, valueName);
	}

	/**
	 * Verifies that the actual <code>boolean</code> value is <code>true</code>.
	 * @throws AssertionError if the actual <code>boolean</code> value is <code>false</code>.
	 */
	public BooleanAssert isTrue(String what) {
		return isEqualTo(true, what);
	}

	/**
	 * Verifies that the actual <code>boolean</code> value is <code>true</code>.
	 * @throws AssertionError if the actual <code>boolean</code> value is <code>false</code>.
	 */
	public BooleanAssert isTrue() {
		return isEqualTo(true, what);
	}

	/**
	 * Verifies that the actual <code>boolean</code> value is <code>false</code>.
	 * @throws AssertionError if the actual <code>boolean</code> value is <code>true</code>.
	 */
	public BooleanAssert isFalse(String what) {
		return isEqualTo(false, what);
	}
	/**
	 * Verifies that the actual <code>boolean</code> value is <code>false</code>.
	 * @throws AssertionError if the actual <code>boolean</code> value is <code>true</code>.
	 */
	public BooleanAssert isFalse() {
		return isEqualTo(false, what);
	}

	@Override
	public BooleanAssert isEqualTo(Boolean expected) {
		isEqualTo(expected, what);
		return this;
	}

	@Override
	public BooleanAssert isNotEqualTo(Boolean expected) {
		isNotEqualTo(expected, what);
		return this;
	}
}
