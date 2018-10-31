package com.loka.autotesting.data;

public class ScreenShotVO {
	public final String fullImageLink;
	public final String thumbImageLink;

	public ScreenShotVO() {
		this("", "");
	}
	public ScreenShotVO(String fullImageLink, String thumbImageLink) {
		this.thumbImageLink = thumbImageLink;
		this.fullImageLink = fullImageLink;
	}
}
