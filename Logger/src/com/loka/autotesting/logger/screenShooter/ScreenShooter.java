package com.loka.autotesting.logger.screenShooter;

import com.loka.autotesting.data.ScreenShotVO;

import java.util.Date;

public interface ScreenShooter {
	ScreenShotVO captureScreenShot(Date date, Object[] descriptionItems);
}
