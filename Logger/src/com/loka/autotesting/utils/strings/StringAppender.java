package com.loka.autotesting.utils.strings;

public class StringAppender {

	private StringBuilder stringBuilder;

	public StringAppender() {
		this.stringBuilder = new StringBuilder();
	}

	public StringAppender append(Object... strings) {
		for(Object string : strings){
			stringBuilder.append(string);
		}
		return this;
	}

	public StringAppender append(String... strings) {
		for(String string : strings){
			stringBuilder.append(string);
		}
		return this;
	}

	public StringAppender appendLn(Object... strings) {
		for(Object string : strings){
			stringBuilder.append(string).append("\n");
		}
		return this;
	}

	public StringAppender appendLn(String... strings) {
		for(String string : strings){
			stringBuilder.append("\n").append(string);
		}
		return this;
	}

	public String toString(){
		return stringBuilder.toString();
	}


}
