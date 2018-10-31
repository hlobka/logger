package com.loka.autotesting.logger.assertions;

import java.util.List;
import java.util.Map;

@SuppressWarnings("UnusedDeclaration")
public class MapAssert extends CommonAssert<MapAssert, Map> {
	private final String what = "int value";
	public MapAssert(Map intValue, String intValueName) {
		super(intValue, intValueName);
	}

	public MapAssert(Map intValue) {
		this(intValue, "Map value");
	}

	public MapAssert(Map value, String valueName, List<String> messages) {
		super(value, valueName, messages);
	}

	public CollectionAssert values(Map value) {
		return andThat(value.values(), valueName + ".values ");
	}

	public BooleanAssert isEmpty(Map value) {
		return andThat(value.isEmpty(), valueName + ".isEmpty ");
	}

	public BooleanAssert containsValue(Object value) {
		return andThat(this.assertionValue.containsValue(value), valueName + ".containsValue ");
	}

	public BooleanAssert containsKey(Object key) {
		return andThat(assertionValue.containsKey(key), valueName + ".containsKey ");
	}

	public NumberAssert size() {
		return andThat(assertionValue.size(), valueName + ".size ");
	}

}
