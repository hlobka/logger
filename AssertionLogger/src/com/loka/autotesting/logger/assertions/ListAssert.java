package com.loka.autotesting.logger.assertions;


import java.util.Collection;
import java.util.List;

import static com.loka.autotesting.logger.AssertionLogger.assertNotEquals;


public class ListAssert extends CollectionAssert {
	public ListAssert(Collection actual, String what) {
		super(actual, what);
	}

	public ListAssert(Collection actual) {
		super(actual, "collection value");
	}

	public CollectionAssert elementsIsNotRepeating() {
		List list = getValue();
		for (int i = 0; i < getValue().size() - 1; i++) {
			for (int j = i + 1; j < getValue().size(); j++) {
				String message = "elements in [" + valueName + "]" +
						"\n has doubled element: [" + list.get(j).toString() + "]" +
						"\n in [" + list.toString() + "]";
				assertNotEquals(list.get(i), list.get(j), message);
			}
		}
		addMessage("elements is not repeating in " + valueName + ": " + list.toString());
		return this;
	}

	@Override
	public List getValue() {
		return (List) super.getValue();
	}
}
