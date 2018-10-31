package com.loka.autotesting.logger.assertions;


import java.util.Collection;

import static com.loka.autotesting.logger.AssertionLogger.assertFalse;
import static com.loka.autotesting.logger.AssertionLogger.assertTrue;


@SuppressWarnings("UnusedDeclaration")
public class CollectionAssert extends CommonAssert<CollectionAssert, Collection> {
	public CollectionAssert(Collection  actual, String what) {
		super(actual, what);
	}

	public CollectionAssert(Collection actual) {
		super(actual, "collection value");
	}

	public CollectionAssert isEqualTo(Collection expected) {
		isEqualTo(expected, "collection value");
		return this;
	}

	public CollectionAssert isNotEqualTo(Collection expected) {
		isNotEqualTo(expected, "collection value");
		return this;
	}

	public CollectionAssert doesNotContains(Object...expected) {
		isNotNull();
		for (Object expectedObject : expected) {
			if(expectedObject instanceof Collection){
				doesNotContains(((Collection) expectedObject).toArray());
			} else {
				assertFalse(assertionValue.contains(expectedObject),
					"value: [" + assertionValue.toString().replaceAll(",", ",\n") + "] contains value: " + expectedObject.toString());
				addMessage(valueName + ": contains: " + expectedObject);
			}
		}
		return this;
	}

	public CollectionAssert contains(Object...expected) {
		isNotNull();
		for (Object object : expected) {
			if(object instanceof Collection){
				contains(((Collection) object).toArray());
			} else {
				assertTrue(assertionValue.contains(object));
				addMessage(valueName + ": does not contains: " +  object);
			}
		}
		return this;
	}

	public NumberAssert size() {
		return andThat(assertionValue.size(), valueName + ".size ");
	}

	public NumberAssert isEmpty() {
		return andThat(assertionValue.size(), valueName + ".size ").isZero();
	}

	public NumberAssert isNotEmpty() {
		return andThat(assertionValue.size(), valueName + ".size ").isNotZero();
	}
}
