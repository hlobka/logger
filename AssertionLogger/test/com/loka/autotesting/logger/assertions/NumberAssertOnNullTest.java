package com.loka.autotesting.logger.assertions;

import com.loka.autotesting.BaseUnitTest;
import com.loka.autotesting.logger.exceptions.NpeAssertionError;
import org.junit.Test;

public class NumberAssertOnNullTest extends BaseUnitTest {
	Number nullNumber = null;
	@Test
	public void testIsEqualsNullOnNull() throws Exception {
		Assert.assertThat(nullNumber).isEqualTo(nullNumber);
	}

	@Test(expected = AssertionError.class)
	public void testIsEqualsNullOnNotNull() throws Exception {
		Assert.assertThat(nullNumber).isEqualTo(1);
	}

	@Test(expected = AssertionError.class)
	public void testIsEqualsNotNullOnNull() throws Exception {
		Assert.assertThat(1).isEqualTo(nullNumber);
	}

	@Test(expected = AssertionError.class)
	public void testIsNotEqualsNullOnNull() throws Exception {
		Assert.assertThat(nullNumber).isNotEqualTo(nullNumber);
	}

	@Test
	public void testIsNotEqualsNullOnNotNull() throws Exception {
		Assert.assertThat(nullNumber).isNotEqualTo(1);
	}
	@Test
	public void testIsNotEqualsNotNullOnNull() throws Exception {
		Assert.assertThat(1).isNotEqualTo(nullNumber);
	}

	@Test(expected = NpeAssertionError.class)
	public void testIsGreatThan() throws Exception {
		Assert.assertThat(nullNumber).isGreaterThan(nullNumber);
	}

	@Test(expected = NpeAssertionError.class)
	public void testIsNotNullGreatThanNull() throws Exception {
		Assert.assertThat(1).isGreaterThan(nullNumber);
	}

	@Test(expected = NpeAssertionError.class)
	public void testIsGreaterThanOrEqualTo() throws Exception {
		Assert.assertThat(nullNumber).isGreaterThanOrEqualTo(nullNumber);
	}

	@Test(expected = NpeAssertionError.class)
	public void testIsNotNullGreaterThanOrEqualToNull() throws Exception {
		Assert.assertThat(1).isGreaterThanOrEqualTo(nullNumber);
	}

	@Test(expected = NpeAssertionError.class)
	public void testIsLessThan() throws Exception {
		Assert.assertThat(nullNumber).isLessThan(nullNumber);
	}

	@Test(expected = NpeAssertionError.class)
	public void testIsNotNullLessThanNull() throws Exception {
		Assert.assertThat(1).isLessThan(nullNumber);
	}

	@Test(expected = NpeAssertionError.class)
	public void testIsLessThanOrEqualTo() throws Exception {
		Assert.assertThat(nullNumber).isLessThanOrEqualTo(nullNumber);
	}

	@Test(expected = NpeAssertionError.class)
	public void testIsNotNullLessThanOrEqualToNull() throws Exception {
		Assert.assertThat(1).isLessThanOrEqualTo(nullNumber);
	}

	@Test(expected = NpeAssertionError.class)
	public void testIsPositive() throws Exception {
		Assert.assertThat(nullNumber).isPositive();
	}

	@Test(expected = NpeAssertionError.class)
	public void testIsNegative() throws Exception {
		Assert.assertThat(nullNumber).isNegative();
	}

	@Test(expected = NpeAssertionError.class)
	public void testIsZero() throws Exception {
		Assert.assertThat(nullNumber).isZero();
	}

	@Test(expected = NpeAssertionError.class)
	public void testIsNotZero() throws Exception {
		Assert.assertThat(nullNumber).isNotZero();
	}
}