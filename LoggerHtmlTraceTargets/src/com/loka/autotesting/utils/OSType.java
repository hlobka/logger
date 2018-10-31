package com.loka.autotesting.utils;

public enum OSType {
	WIN("win"),
	MAC("mac"),
	NIX("nix"),
	NUX("nux"),
	AIX("aix"),
	SOLARIS("sunos");

	protected String value;

	OSType(String value) {
		this.value = value;
	}

	public static OSType getOS() {
		String OS = System.getProperty("os.name").toLowerCase();
		for (OSType osType : OSType.values()) {
			if (OS.contains(osType.value)) {
				return osType;
			}
		}
		throw new IllegalArgumentException("Current operation system [" + OS + "] not supported");
	}
}
