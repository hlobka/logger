package com.loka.autotesting.utils;

import java.io.*;
import java.util.function.Function;


public class Utils {

	public static boolean purgeDirectory(File dir, final String mask) {
		boolean delete = true;
		File[] files = dir.listFiles(pathname -> {
			return pathname.getName().contains(mask);
		});
		if (dir.exists() && files != null) {
			for (File file : files) {
				if (file.isDirectory()) purgeDirectory(file, "");
				delete &= file.delete();
			}
		}
		return delete;
	}

	public static boolean makeDir(String name) throws IOException {
		if (name == null) {
			throw new IOException("file or folder is null");
		}
		if (name.contains(".")) {
			name = name.replaceAll("((/).\\w+\\.(\\w)+$)", "");
		}
		File folderExisting = new File(name);

		return !folderExisting.exists() && folderExisting.mkdirs();
	}

	public static boolean moveFile(String targetFilePath, String newFilePath, boolean deleteAfterMove) throws
			IOException {
		InputStream inStream;
		OutputStream outStream;
		Function<String, Boolean> isFilePathNotValid =
				filePath -> filePath == null || filePath.contains("null") || filePath.isEmpty();
		if (isFilePathNotValid.apply(targetFilePath) || isFilePathNotValid.apply(newFilePath)) {
			throw new IOException("" +
					" One of file paths is failure. " +
					" targetFilePath: " + targetFilePath +
					" newFilePath: " + newFilePath);
		}
		File afile = new File(targetFilePath);

		inStream = getInputStream(targetFilePath, afile);
		outStream = getFileOutputStream(newFilePath);

		byte[] buffer = new byte[1024];
		int length;
		while ((length = inStream.read(buffer)) > 0) {
			outStream.write(buffer, 0, length);
		}
		inStream.close();
		outStream.close();
		if (deleteAfterMove) {
			afile.delete();
		}
		return true;
	}

	private static FileOutputStream getFileOutputStream(String filePath) throws IOException {
		File bfile = new File(filePath);
		if (!bfile.exists()) {
			makeDir(filePath);
			bfile.createNewFile();
		}
		return new FileOutputStream(bfile);
	}

	private static InputStream getInputStream(String filePath, File afile) throws FileNotFoundException {
		InputStream inStream;
		if (afile.exists()) {
			inStream = new FileInputStream(afile);
		} else {
			inStream = Utils.class.getResourceAsStream(filePath);
		}
		return inStream;
	}
}
