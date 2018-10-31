package com.loka.autotesting.logger.assertions;

import com.loka.autotesting.logger.utils.ObjectUtils;

import java.math.BigDecimal;

import static com.loka.autotesting.logger.AssertionLogger.*;

public class NumberAssert extends CommonAssert<NumberAssert, Number> {

	public NumberAssert(Number value, String valueName) {
		super(value, valueName);
	}

	public NumberAssert(Number value) {
		this(value, ObjectUtils.identityToString(value, "Some Number value"));
	}

	@Override
	public NumberAssert isEqualTo(Number expected, String what) {
		assertEquals(getBigDecimal(assertionValue), getBigDecimal(expected), valueName + ": [" + assertionValueString + "] does not equal to expected " + what + ": [" + getBeautifulValueString(expected) + "]");
		addMessage(valueName + ": [" + assertionValueString + "] equals to expected " + what + ": [" + getBeautifulValueString(expected) + "]");
		return child;
	}

	@Override
	public NumberAssert isNotEqualTo(Number expected, String what) {
		String message = valueName + ": [" + assertionValueString + "] equals to expected " + what + ": [" + getBeautifulValueString(expected) + "]";
		assertNotEquals(getBigDecimal(assertionValue), getBigDecimal(expected), message);
		addMessage(valueName + ": [" + assertionValueString + "] does not equal to " + what + ": [" + getBeautifulValueString(expected) + "]");
		return child;
	}

	public NumberAssert isGreaterThan(Number expected) {
		return isGreaterThan(expected, getBeautifulValueName(expected));
	}

	public NumberAssert isGreaterThan(Number expected, String what) {
		isNotNull();
		andThat(expected).isNotNull();
		int result = getCompareResult(expected);
		assertTrue(result > 0, valueName + ": [" + assertionValueString + "] is not greater then " + what + ": [" + getBeautifulValueString(expected) + "]");
		addMessage(valueName + ": [" + assertionValueString + "] is greater then " + what + ": [" + getBeautifulValueString(expected) + "]");
		return this;
	}

	public NumberAssert isGreaterThanOrEqualTo(Number expected) {
		return isGreaterThanOrEqualTo(expected, getBeautifulValueName(expected));
	}

	public NumberAssert isGreaterThanOrEqualTo(Number expected, String what) {
		isNotNull();
		andThat(expected).isNotNull();
		int result = getCompareResult(expected);
		assertTrue(result >= 0, valueName + ": [" + assertionValueString + "] is not greater and not equals to " + what + ": [" + getBeautifulValueString(expected) + "]");
		addMessage(valueName + ": [" + assertionValueString + "] is greater or equals to " + what + ": [" + getBeautifulValueString(expected) + "]");
		return this;
	}

	public NumberAssert isLessThanOrEqualTo(Number expected) {
		return isLessThanOrEqualTo(expected, getBeautifulValueName(expected));
	}

	public NumberAssert isLessThan(Number expected, String what) {
		isNotNull();
		andThat(expected).isNotNull();
		int result = getCompareResult(expected);
		assertTrue(result < 0, valueName + ": [" + assertionValueString + "] is not less at " + what + ": [" + getBeautifulValueString(expected) + "]");
		addMessage(valueName + ": [" + assertionValueString + "] is less at " + what + ": [" + getBeautifulValueString(expected) + "]");
		return this;
	}

	public NumberAssert isLessThan(Number expected) {
		return isLessThan(expected, getBeautifulValueName(expected));
	}

	public NumberAssert isLessThanOrEqualTo(Number expected, String what) {
		isNotNull();
		andThat(expected).isNotNull();
		int result = getCompareResult(expected);
		assertTrue(result <= 0, valueName + ": [" + assertionValueString + "] is not less or equals to " + what + ": [" + getBeautifulValueString(expected) + "]");
		addMessage(valueName + ": [" + assertionValueString + "] is less or equals to " + what + ": [" + getBeautifulValueString(expected) + "]");
		return this;
	}

	public NumberAssert isNegative() {
		isNotNull();
		int result = getCompareResult(0);
		assertTrue(result < 0, valueName + ": [" + assertionValueString + "] is positive");
		addMessage(valueName + ": [" + assertionValueString + "] is negative");
		return this;
	}

	public NumberAssert isPositive() {
		isNotNull();
		int result = getCompareResult(0);
		assertTrue(result > 0, valueName + ": [" + assertionValueString + "] is negative");
		addMessage(valueName + ": [" + assertionValueString + "] is positive");
		return this;
	}

	public NumberAssert isZero() {
		isNotNull();
		int result = getCompareResult(0);
		assertTrue(result == 0, valueName + ": [" + assertionValueString + "] is not zero");
		addMessage(valueName + ": [" + assertionValueString + "] is zero");
		return this;
	}

	public NumberAssert isNotZero() {
		isNotNull();
		int result = getCompareResult(0);
		assertTrue(result != 0, valueName + ": [" + assertionValueString + "] is zero");
		addMessage(valueName + ": [" + assertionValueString + "] is not zero");
		return this;
	}

	private int getCompareResult(Number expected) {
		BigDecimal a = getBigDecimal(assertionValue);
		BigDecimal b = getBigDecimal(expected);
		return a.compareTo(b);
	}

	private BigDecimal getBigDecimal(Number number) {
		if(number == null){
			return null;
		}
		return new BigDecimal(number.toString());
	}

	@Override
	protected String getBeautifulValueString(Number someValue) {
		if (someValue == null){
			return super.getBeautifulValueString(null);
		} else {
			try {
				return getBigDecimal(someValue).toPlainString();
			} catch (NumberFormatException e){
				return super.getBeautifulValueString(null);
			}
		}
	}
}
