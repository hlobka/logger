package com.loka.autotesting.logger.assertions;

import java.util.List;

public class ObjectAssert<AssertionValue> extends CommonAssert<ObjectAssert<AssertionValue>, AssertionValue>{
	private String what = "obj value";
	public ObjectAssert(AssertionValue value, String valueName, List<String> messages) {
		super(value, valueName, messages);
	}

	public ObjectAssert(AssertionValue value, String valueName) {
		super(value, valueName);
	}

	public ObjectAssert(AssertionValue value) {
		super(value, "obj value");
	}

	@Override
	public ObjectAssert<AssertionValue> isEqualTo(AssertionValue expected) {
		super.isEqualTo(expected, what);
		return this;
	}

	@Override
	public ObjectAssert<AssertionValue> isNotEqualTo(AssertionValue expected) {
		isNotEqualTo(expected, what);
		return this;
	}

}
