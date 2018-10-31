package com.loka.autotesting.utils;

import java.awt.*;
import java.io.IOException;

public class FileOpenerHelper {

	public static FileOpener getFileOpenerForDifferentOS() {
		switch (OSType.getOS()){
			case WIN:
				return url -> {
					try {
						Desktop.getDesktop().browse(url);
					} catch (IOException e) {
						e.printStackTrace();
					}
				};
			case MAC:
				return url -> {
					Runtime rt = Runtime.getRuntime();
					try {
						rt.exec("open" + url.getPath());
					} catch (IOException e) {
						e.printStackTrace();
					}
				};
			case NIX:
			case NUX:
			case AIX:
				return url -> {
					Runtime rt = Runtime.getRuntime();
					String[] browsers = {"epiphany", "firefox", "mozilla", "konqueror",
							"netscape","opera","links","lynx"};
					StringBuilder cmd = new StringBuilder();
					for (int i=0; i<browsers.length; i++) {
						cmd.append(i == 0 ? "" : " || ").append(browsers[i]).append(" \"").append(url.getPath()).append("\" ");
					}
					try {
						rt.exec(new String[] { "sh", "-c", cmd.toString() });
					} catch (IOException e) {
						e.printStackTrace();
					}
				};
			default:
				return url -> {};
		}
	}
}
