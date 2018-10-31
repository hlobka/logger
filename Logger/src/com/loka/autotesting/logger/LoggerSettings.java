package com.loka.autotesting.logger;

import com.loka.autotesting.logger.traceTargets.console.ConsoleTraceTarget;
import com.loka.autotesting.utils.objectControllers.Destroyable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.loka.autotesting.logger.AddCondition.ADD_IF_EMPTY;
import static com.loka.autotesting.utils.objectControllers.DestroyUtils.destroyObject;
import static org.apache.commons.lang3.ArrayUtils.contains;

public class LoggerSettings implements Destroyable {
	private static final Date initializeDate = new Date();

	protected final ArrayList<TraceTarget> traceTargets = new ArrayList<>();
	protected final ArrayList<Throwable> errors = new ArrayList<>();

	protected StackTraceParser stackTraceParser = e -> com.loka.autotesting.logger.StackTraceUtils.getStackTrace(e, "com.loka.autotesting.logger", "com.loka", "TestCase");

	public ArrayList<TraceTarget> getTraceTargets() {
		return traceTargets;
	}

	public void removeTraceTarget(Class<? extends TraceTarget> aClass) {
		for (TraceTarget traceTarget : getTraceTargets()) {
			if (aClass.isInstance(traceTarget)) {
				traceTargets.remove(traceTarget);
				removeTraceTarget(aClass);
				return;
			}
		}
	}

	public void addTraceTarget(TraceTarget traceTarget) {
		addTraceTarget(traceTarget, ADD_IF_EMPTY);
	}

	public void addTraceTarget(TraceTarget traceTarget, AddCondition condition) {
		switch (condition) {
			case REPLACE_ON_NEW:
				for (TraceTarget target : traceTargets) {
					if (isEquals(traceTarget, target)) {
						target.destroy();
						traceTargets.remove(traceTargets.indexOf(target));
						break;
					}
				}
				traceTargets.add(traceTarget);
				break;
			case ADD:
				traceTargets.add(traceTarget);
				break;
			case ADD_IF_EMPTY:
				boolean empty = true;
				for (TraceTarget target : traceTargets) {
					if (isEquals(traceTarget, target)) {
						empty = false;
					}
				}
				if (empty) {
					traceTargets.add(traceTarget);
				}
				break;
		}
		traceTarget.init(initializeDate);
	}

	public StackTraceParser getStackTraceParser() {
		return stackTraceParser;
	}

	public void setStackTraceParser(StackTraceParser stackTraceParser) {
		if (stackTraceParser != null) {
			this.stackTraceParser = stackTraceParser;
		}
	}

	private boolean isEquals(TraceTarget traceTarget, TraceTarget target) {
		return target.getClass().getName().equals(traceTarget.getClass().getName());
	}

	@SuppressWarnings("unchecked")
	public List<TraceTarget> getTargets() {
		return (List<TraceTarget>) traceTargets.clone();
	}

	public void initializeLogTypes(String logType) {
		String[] types = logType.split(",");
		boolean withoutScreenShots = "true".equals(System.getProperty("withoutScreenShots"));
		for (LogType type : LogType.values()) {
			type.setEnable(contains(types, type.geType()));
			type.setUseSS(!withoutScreenShots && type.isUseSS() || type.geType().contains("error"));
			if(System.getProperty("log." + type.geType()) != null) {
				type.setEnable(true);
			}
		}
	}

	@Override
	public void destroy() {
		ArrayList<TraceTarget> clone = (ArrayList<TraceTarget>) traceTargets.clone();
		for (TraceTarget target : clone) {
			traceTargets.remove(target);
			destroyObject(target);
		}
		traceTargets.clear();
		errors.clear();
	}

	public void addDefaultTraceTargetIfItEmpty() {
		if (traceTargets.isEmpty()) {
			addTraceTarget(new ConsoleTraceTarget());
		}
	}
}
