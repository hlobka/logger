package com.loka.autotesting.data;

public class ParaValue<Key, Value> {
	private Key key;
	private Value value;

	public ParaValue(Key key, Value value) {
		this.key = key;
		this.value = value;
	}

	public Key getKey(){
		return key;
	}

	public Value getValue(){
		return value;
	}
}
