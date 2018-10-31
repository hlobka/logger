package com.loka.autotesting.logger.assertions;

import com.loka.autotesting.logger.AssertionLogger;
import com.loka.autotesting.logger.exceptions.NpeAssertionError;

import java.util.ArrayList;
import java.util.List;

import static com.loka.autotesting.logger.AssertionLogger.*;

public abstract class CommonAssert<Child extends Assert, T> extends GenericAssert<Child, T>{

	protected CommonAssert(T value, String valueName, List<String> messages) {
		super(value, valueName, messages);
	}

	protected CommonAssert(T value, String valueName, List<String> messages, Child child) {
		super(value, valueName, messages, child);
	}

	protected CommonAssert(T value, String valueName) {
		this(value, valueName, new ArrayList<>());
	}

	protected CommonAssert(T value) {
		super(value, new ArrayList<>());
	}

	public <Is> CommonAssert isNot(Class<Is> isClass) {
		isNotNull();
		String isClassSimpleName = isClass.getSimpleName();
		try{
			assertionValue.getClass().asSubclass(isClass);
			AssertionLogger.fail("instance of assertion", null, "value: " + valueName + " is a " + isClassSimpleName);
		} catch (ClassCastException e) {
			//nothing
		}
		addMessage(valueName + ": [" + assertionValueString + "] is not instance of " + isClassSimpleName + ": [" + isClass + "]");
		return this;
	}


	public <Is> CommonAssert is(Class<Is> isClass) {
		isNotNull();
		String isClassSimpleName = isClass.getSimpleName();
		try{
			assertionValue.getClass().asSubclass(isClass);
		} catch (ClassCastException e){
			AssertionLogger.fail("instance of assertion", e, "value: " + valueName + " is not a " + isClassSimpleName);
		}
		addMessage(valueName + ": [" + assertionValueString + "] is instance of " + isClassSimpleName + ": [" + isClass + "]");
		return this;
	}

	public Child isEqualTo(T expected) {
		return isEqualTo(expected, getClassName(expected));
	}

	public Child isNotEqualTo(T expected) {
		return isNotEqualTo(expected, getClassName(expected));
	}

	public Child isEqualTo(T expected, String what) {
		assertEquals(assertionValue, expected, valueName + ": [" + assertionValueString + "] does not equal to expected " + what + ": [" + getBeautifulValueString(expected) + "]");
		addMessage(valueName + ": [" + assertionValueString + "] equals to expected " + what + ": [" + getBeautifulValueString(expected) + "]");
		return child;
	}

	public Child isNotEqualTo(T expected, String what) {
		assertNotEquals(assertionValue, expected, valueName + ": [" + assertionValueString + "] equals to expected " + what + ": [" + getBeautifulValueString(expected) + "]");
		addMessage(valueName + ": [" + assertionValueString + "] does not equal to " + what + ": [" + getBeautifulValueString(expected) + "]");
		return child;
	}

	public Child isNotNull() {
		String detailMessage = getPreviousMessages() + valueName + ": [" + assertionValueString + "] is null";
		if(assertionValue == null){
			AssertionLogger.throwFail(new NpeAssertionError(detailMessage), null);
		}
		addMessage(valueName + ": [" + assertionValueString + "] is not null");
		return child;
	}

	private static String getClassName(Object o) {
		return o == null ? Object.class.getSimpleName() + " value" : o.getClass().getSimpleName() + " value";
	}

	public Child isNull() {
		assertNull(assertionValue, getPreviousMessages() + valueName + ": [" + assertionValueString + "] is not null");
		addMessage(valueName + ": [" + assertionValueString + "] is null");
		return child;
	}
}
