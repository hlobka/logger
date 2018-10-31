package com.loka.autotesting.logger.assertions;

import com.loka.autotesting.logger.assertions.modifiers.AssertionValueModifier;
import com.loka.autotesting.logger.utils.ObjectUtils;

import java.util.ArrayList;
import java.util.List;

public abstract class GenericAssert<Child extends Assert, T> extends Assert<Child>{

	protected final T assertionValue;
	protected final String assertionValueString;
	protected final String valueName;

	public GenericAssert(T assertionValue, String valueName, List<String> messages) {
		super(messages);
		this.assertionValue = assertionValue;
		this.valueName = valueName;
		assertionValueString = getBeautifulValueString(assertionValue);
	}

	public GenericAssert(T assertionValue, String valueName, List<String> messages, Child child) {
		super(messages, child);
		this.assertionValue = assertionValue;
		this.valueName = valueName;
		assertionValueString = getBeautifulValueString(assertionValue);
	}

	public GenericAssert(T assertionValue, List<String> messages) {
		super(messages);
		this.assertionValue = assertionValue;
		this.valueName = getBeautifulValueName(assertionValue);
		assertionValueString = getBeautifulValueString(assertionValue);
	}

	protected String getBeautifulValueString(T someValue) {
		return someValue + "";
	}

	protected String getBeautifulValueName(T someValue) {
		return ObjectUtils.identityToString(someValue);
	}

	protected GenericAssert(T assertionValue, String valueName) {
		this(assertionValue, valueName, new ArrayList<>());
	}

	public T getValue() {
		return assertionValue;
	}


	public Child modify(AssertionValueModifier<T> assertionValueModifier) {
		assertionValueModifier.run(assertionValue);
		return child;
	}

	public <AssertionValue> Child modify(AssertionValue assertionValue, AssertionValueModifier<AssertionValue> assertionValueModifier) {
		assertionValueModifier.run(assertionValue);
		return child;
	}
}
