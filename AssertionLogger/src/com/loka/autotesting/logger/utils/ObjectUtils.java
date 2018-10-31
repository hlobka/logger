package com.loka.autotesting.logger.utils;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public class ObjectUtils {
	public static String identityToString(Object someValue) {
		return identityToString(someValue, "Null");
	}

	public static String identityToString(Object someValue, String defaultNameWhenNull) {
		if(someValue == null){
			return defaultNameWhenNull;
		}
		if(someValue instanceof List){
			return "List";
		}
		if(someValue instanceof Map){
			return "Map";
		}
		if(someValue instanceof Collection){
			return "Collection";
		}
		if(someValue.getClass().isArray()){
			return "Array";
		}
		if(someValue instanceof Integer){
			return "Integer number";
		}
		if(someValue instanceof Long){
			return "Long number";
		}
		if(someValue instanceof Float){
			return "Float number";
		}
		if(someValue instanceof Double){
			return "Double number";
		}
		if(someValue instanceof Byte){
			return "Byte number";
		}
		if(someValue instanceof Short){
			return "Short number";
		}
		if(someValue instanceof Number){
			return "Number";
		}
		return someValue.getClass().getSimpleName();
	}
}
