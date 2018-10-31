package com.loka.autotesting.utils.objectControllers;

import com.loka.autotesting.logger.Logger;

public class DestroyUtils {
	private DestroyUtils() {
	}

	public static void destroyObject(Object obj) {
		if (obj instanceof Destroyable) {
			destroyObject((Destroyable) obj);
		}
	}

	public static void destroyObject(Destroyable obj) {
		try {
			if (obj != null) {
				obj.destroy();
			}
		} catch (RuntimeException e) {
			Logger.warning(e, "destroyObject", obj.toString());
		}
	}
}
