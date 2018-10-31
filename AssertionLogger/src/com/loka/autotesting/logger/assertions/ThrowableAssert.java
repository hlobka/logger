package com.loka.autotesting.logger.assertions;

public class ThrowableAssert extends CommonAssert<ThrowableAssert, Throwable> {

	public ThrowableAssert(Throwable value, String valueName) {
		super(value, valueName);
	}

	public ThrowableAssert(Throwable value) {
		super(value);
	}

	public ThrowableAssert getCause(){
		ThrowableAssert cause = new ThrowableAssert(assertionValue.getCause(), "Cause");
		cause.setMessage(messages);
		return cause;
	}

	public StringAssert getMessage(){
		StringAssert cause = new StringAssert(assertionValue.getMessage(), valueName + " message");
		cause.setMessage(messages);
		return cause;
	}

	public StringAssert getLocalizedMessage() {
		StringAssert cause = new StringAssert(assertionValue.getLocalizedMessage(), valueName + " localizedMessage");
		cause.setMessage(messages);
		return cause;
	}

	public ArrayAssert getStackTrace() {
		ArrayAssert arrayAssert = new ArrayAssert(assertionValue.getStackTrace(), valueName + " stack trace");
		arrayAssert.setMessage(messages);
		return arrayAssert;
	}
}
