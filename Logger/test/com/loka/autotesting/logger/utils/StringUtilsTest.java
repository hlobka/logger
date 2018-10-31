package com.loka.autotesting.logger.utils;

import org.fest.assertions.Assertions;
import org.junit.Test;

public class StringUtilsTest {
	@Test
	public void testInsertSpaceInMultiCaseStringAtCaps() throws Exception {
		Assertions.assertThat(StringUtils.insertSpaceInMultiCaseStringAtCaps("FaceBookUsers")).
				isEqualTo("Face book users");
		Assertions.assertThat(StringUtils.insertSpaceInMultiCaseStringAtCaps("faceBookUsers")).
				isEqualTo("Face book users");
		Assertions.assertThat(StringUtils.insertSpaceInMultiCaseStringAtCaps("FBUsers")).
				isEqualTo("FBUsers");
		Assertions.assertThat(StringUtils.insertSpaceInMultiCaseStringAtCaps("IOException")).
				isEqualTo("IOException");
		Assertions.assertThat(StringUtils.insertSpaceInMultiCaseStringAtCaps("UserDTPossibleObject")).
				isEqualTo("User DTPossible object");
	}

	@Test
	public void testInsertSpaceInMultiCaseStringAtCaps2() throws Exception {
		Assertions.assertThat(StringUtils.insertSpaceInMultiCaseStringAtCaps("make Spin by using cheat: {2,8,7,9,9};{11,11,11,10,7};{8,7,9,1,10};")).
				isEqualTo("Make spin by using cheat: {2,8,7,9,9};{11,11,11,10,7};{8,7,9,1,10};");
	}

	@Test
	public void testInsertSpaceInMultiCaseStringAtCaps3() throws Exception {
		Assertions.assertThat(StringUtils.insertSpaceInMultiCaseStringAtCaps("increase SlotomaniaBetValuePicker (2) times")).
				isEqualTo("Increase slotomania bet value picker (2) times");
	}

	@Test
	public void testInsertSpaceInMultiCaseStringAtCaps4() throws Exception {
		Assertions.assertThat(StringUtils.insertSpaceInMultiCaseStringAtCaps("wait Until Win Updated To:4.0")).
				isEqualTo("Wait until win updated to:4.0");
	}

	@Test
	public void testInsertSpaceInMultiCaseStringAtCaps5() throws Exception {
		Assertions.assertThat(StringUtils.insertSpaceInMultiCaseStringAtCaps("CAME_CASE_CONSTANT")).
				isEqualTo("CAME_CASE_CONSTANT");
	}
}