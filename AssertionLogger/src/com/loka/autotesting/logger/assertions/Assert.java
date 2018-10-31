package com.loka.autotesting.logger.assertions;

import com.loka.autotesting.logger.LogType;
import com.loka.autotesting.logger.Logger;
import com.loka.autotesting.utils.strings.StringAppender;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unused")
public abstract class Assert<Child extends Assert> {
	public List<String> getMessages() {
		return messages;
	}

	protected List<String> messages;
	protected final Child child;

	@SuppressWarnings("unchecked")
	public Assert(List<String> messages) {
		this.messages = messages;
		child = (Child) this;
	}

	public Assert(List<String> messages, Child child) {
		this.messages = messages;
		this.child = child;
	}

	public void traceMessage(String tag, LogType logType){
		Logger.log(tag, logType, messages.toArray());
	}

	public void traceMessage(String tag){
		traceMessage(tag, LogType.LOG);
	}

	public void traceMessage(String tag, LogType logType, String... descriptions){
		Collections.addAll(messages, descriptions);
		Logger.log(tag, logType, messages.toArray());
	}

	public void traceMessage(String tag, String... descriptions){
		traceMessage(tag, LogType.LOG, descriptions);
	}

	public void traceMessage(LogType logType){
		traceMessage("AssertResult", logType);
	}
	public void traceMessage(){
		traceMessage(LogType.LOG);
	}

	protected void setMessage(List<String> messages) {
		this.messages = messages;
	}

	public Child addMessage(String msg) {
		return addMessage(msg, true);
	}
	public Child addMessage(String msg, Boolean isSuccess) {
		return addMessage(msg, isSuccess, true);
	}

	public Child addMessage(String msg, Boolean isSuccess, Boolean addStatus) {
		if (addStatus) {
			msg = "\t - verifying: " + msg;
			if (isSuccess) {
				msg += " - success";
			} else {
				msg += " - failed";
			}
		}
		messages.add(msg);

		return child;
	}

	protected String getPreviousMessages() {
		StringAppender result = new StringAppender();
		messages.forEach(result::appendLn);

		return result.toString() + "\n";
	}

	protected String format(String message, Object expected, Object actual) {
		String formatted = "";
		if (message != null && !message.equals("")) {
			formatted = message + " ";
		}
		String expectedString = String.valueOf(expected);
		String actualString = String.valueOf(actual);
		if (expectedString.equals(actualString)) {
			return formatted + "expected: "
					+ formatClassAndValue(expected, expectedString)
					+ " but was: " + formatClassAndValue(actual, actualString);
		} else {
			return formatted + "expected:<" + expectedString + "> but was:<"
					+ actualString + ">";
		}
	}

	private String formatClassAndValue(Object value, String valueString) {
		String className = value == null ? "null" : value.getClass().getName();
		return className + "<" + valueString + ">";
	}

	private <T extends Assert> T getAssert(T anAssert) {
		anAssert.setMessage(messages);
		if(messages.size()>0){
			anAssert.addMessage(" AND ", null, false);
		}
		return anAssert;
	}

	public MapAssert andThat(Map map) {
		return getAssert(new MapAssert(map));
	}

	public MapAssert andThat(Map map, String what) {
		return getAssert(new MapAssert(map, what));
	}

	public <T> ObjectAssert<T> andThat(T o) {
		return getAssert(new ObjectAssert<>(o));
	}

	public <T> ObjectAssert<T> andThat(T o, String what) {
		return getAssert(new ObjectAssert<>(o, what));
	}

	public ThrowableAssert andThat(Throwable o) {
		return getAssert(new ThrowableAssert(o));
	}

	public ThrowableAssert andThat(Throwable o, String what) {
		return getAssert(new ThrowableAssert(o, what));
	}

	public ArrayAssert andThat(Integer[] o) {
		return getAssert(new ArrayAssert(o));
	}

	public ArrayAssert andThat(Integer[] o, String what) {
		return getAssert(new ArrayAssert(o, what));
	}

	public CollectionAssert andThat(Collection collection, String what) {
		return getAssert(new CollectionAssert(collection, what));
	}

	public CollectionAssert andThat(Collection collection) {
		return getAssert(new CollectionAssert(collection));
	}

	public <T> ListAssert andThat(List<T> list) {
		return getAssert(new ListAssert(list));
	}

	public ListAssert andThat(List list, String what) {
		return getAssert(new ListAssert(list, what));
	}

	public BooleanAssert andThat(Boolean aBoolean) {
		return getAssert(new BooleanAssert(aBoolean));
	}

	public BooleanAssert andThat(Boolean aBoolean, String what) {
		return getAssert(new BooleanAssert(aBoolean, what));
	}

	public StringAssert andThat(String s) {
		return getAssert(new StringAssert(s));
	}

	public StringAssert andThat(String s, String what) {
		return getAssert(new StringAssert(s, what));
	}

	public <AssertionNumber extends Number> NumberAssert andThat(AssertionNumber assertionNumber, String what) {
		return getAssert(new NumberAssert(assertionNumber, what));
	}

	public <AssertionNumber extends Number> NumberAssert andThat(AssertionNumber assertionNumber) {
		return getAssert(new NumberAssert(assertionNumber));
	}

	public static MapAssert assertThat(Map i) {
		return new MapAssert(i);
	}

	public static MapAssert assertThat(Map i, String what) {
		return new MapAssert(i, what);
	}

	public static <AssertionNumber extends Number> NumberAssert assertThat(AssertionNumber number) {
		return new NumberAssert(number);
	}

	public static <AssertionNumber extends Number> NumberAssert assertThat(AssertionNumber number, String what) {
		return new NumberAssert(number, what);
	}

	public static <T> ObjectAssert<T> assertThat(T o) {
		return new ObjectAssert<>(o);
	}

	public static <T> ObjectAssert<T> assertThat(T o, String what) {
		return new ObjectAssert<>(o, what);
	}


	public static ThrowableAssert assertThat(Throwable o) {
		return new ThrowableAssert(o);
	}

	public static ThrowableAssert assertThat(Throwable o, String what) {
		return new ThrowableAssert(o, what);
	}

	public static ArrayAssert assertThat(Integer[] o) {
		return new ArrayAssert(o);
	}

	public static ArrayAssert assertThat(Integer[] o, String what) {
		return new ArrayAssert(o, what);
	}

	public static CollectionAssert assertThat(Collection collection, String what) {
		return new CollectionAssert(collection, what);
	}

	public static CollectionAssert assertThat(Collection collection) {
		return new CollectionAssert(collection);
	}

	public static ListAssert assertThat(List list) {
		return new ListAssert(list);
	}

	public static ListAssert assertThat(List list, String what) {
		return new ListAssert(list, what);
	}

	public static BooleanAssert assertThat(Boolean aBoolean) {
		return new BooleanAssert(aBoolean);
	}

	public static BooleanAssert assertThat(Boolean aBoolean, String what) {
		return new BooleanAssert(aBoolean, what);
	}

	public static StringAssert assertThat(String s) {
		return new StringAssert(s);
	}

	public static StringAssert assertThat(String s, String what) {
		return new StringAssert(s, what);
	}

}
