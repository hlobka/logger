package com.loka.autotesting.logger.assertions;

import com.loka.autotesting.BaseUnitTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collection;

@RunWith(Parameterized.class)
public class NumberAssertTest extends BaseUnitTest {
	private TestValue testValue;

	public NumberAssertTest(TestValue testValue
	) {
		this.testValue = testValue;
	}

	@SuppressWarnings("RedundantArrayCreation")
	@Parameterized.Parameters()
	public static Collection primeNumbers() {
		return Arrays.asList(new Object[][]{
				{new TestValue(new BigDecimal("1000"), 0, 1000, 999, 1001, 1, -1)},
				{new TestValue(new BigDecimal("1000"), 0L, 1000L, 999L, 1001L, 1L, -1L)},
				{new TestValue(new BigDecimal("1000"), 0D, 1000D, 999D, 1001D, 1D, -1D)},
				{new TestValue(new BigDecimal("1000.10"), 0D, 1000.10, 999D, 1001D, 1D, -1D)},
				{new TestValue(1000, 0, new BigDecimal("1000"), new BigDecimal("999"), new BigDecimal("1001"), new BigDecimal("1"), new BigDecimal("-1"))},
				{new TestValue(1000, 0, new BigDecimal("1000"), new BigDecimal("999"), new BigDecimal("1001"), new BigDecimal("1"), new BigDecimal("-1"))},
				{new TestValue(1000, 0, 1000, 999, 1001, 1, -1)},
				{new TestValue(1000, 0D, 1000D, 999D, 1001D, 1D, -1D)},
				{new TestValue(1000.10, 0D, 1000.10D, 999D, 1001D, 1D, -1D)},
				{new TestValue(1000.10, 0D, 1000.10D, 999D, 1001D, 0.1D, -1D)},
		});
	}

	@Test
	public void testIsEquals() throws Exception {
		Assert.assertThat(testValue.assertionValue).isEqualTo(testValue.expectedEqualsValue);
	}

	@Test
	public void testIsNotEquals() throws Exception {
		Assert.assertThat(testValue.assertionValue).isNotEqualTo(testValue.expectedGreaterValue);
	}

	@Test
	public void testIsGreatThan() throws Exception {
		Assert.assertThat(testValue.assertionValue).isGreaterThan(testValue.expectedLessValue);
	}

	@Test
	public void testIsGreaterThanOrEqualTo() throws Exception {
		Assert.assertThat(testValue.assertionValue).isGreaterThanOrEqualTo(testValue.expectedLessValue);
		Assert.assertThat(testValue.assertionValue).isGreaterThanOrEqualTo(testValue.expectedEqualsValue);
	}

	@Test
	public void testIsLessThan() throws Exception {
		Assert.assertThat(testValue.assertionValue).isLessThan(testValue.expectedGreaterValue);
	}

	@Test
	public void testIsLessThanOrEqualTo() throws Exception {
		Assert.assertThat(testValue.assertionValue).isLessThanOrEqualTo(testValue.expectedGreaterValue);
		Assert.assertThat(testValue.assertionValue).isLessThanOrEqualTo(testValue.expectedEqualsValue);
	}

	@Test
	public void testIsPositive() throws Exception {
		Assert.assertThat(testValue.expectedPositiveValue).isPositive();
	}

	@Test
	public void testIsNegative() throws Exception {
		Assert.assertThat(testValue.expectedNegativeValue).isNegative();
	}

	@Test
	public void testIsZero() throws Exception {
		Assert.assertThat(testValue.assertionZeroValue).isZero();
	}

	@Test
	public void testIsNotZero() throws Exception {
		Assert.assertThat(testValue.expectedNegativeValue).isNotZero();
		Assert.assertThat(testValue.expectedPositiveValue).isNotZero();
	}

	//-=-=-=-=-=-=-=-=-=-=-=-=NEGATIVE TESTS-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

	@Test(expected = IllegalArgumentException.class)
	public void testIsEqualsNegativeTest() throws Exception {
		try {
			Assert.assertThat(testValue.assertionValue).isEqualTo(testValue.expectedLessValue);
		} catch (AssertionError assertionError) {
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.assertionValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.expectedLessValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains("not equal"));
			throw new IllegalArgumentException("Valid test Point");
		}
	}

	@Test(expected = IllegalArgumentException.class)
	public void testIsNotEqualsNegativeTest() throws Exception {
		try {
			Assert.assertThat(testValue.assertionValue).isNotEqualTo(testValue.expectedEqualsValue);
		} catch (AssertionError assertionError) {
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.assertionValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.expectedEqualsValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains("equals to expected"));
			throw new IllegalArgumentException("Valid test Point");
		}
	}


	@Test(expected = IllegalArgumentException.class)
	public void testIsGreatThanNegativeTest() throws Exception {
		try {
			Assert.assertThat(testValue.assertionValue).isGreaterThan(testValue.expectedGreaterValue);
		} catch (AssertionError assertionError) {
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.assertionValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.expectedGreaterValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains("is not greater then"));
			throw new IllegalArgumentException("Valid test Point");
		}
	}

	@Test(expected = IllegalArgumentException.class)
	public void testIsGreaterThanOrEqualToNegativeTest() throws Exception {
		try {
			Assert.assertThat(testValue.assertionValue).isGreaterThanOrEqualTo(testValue.expectedGreaterValue);
		} catch (AssertionError assertionError) {
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.assertionValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.expectedGreaterValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains("is not greater and not equals to"));
			throw new IllegalArgumentException("Valid test Point");
		}
	}

	@Test(expected = IllegalArgumentException.class)
	public void testIsLessThanNegativeTest() throws Exception {
		try {
			Assert.assertThat(testValue.assertionValue).isLessThan(testValue.expectedLessValue);
		} catch (AssertionError assertionError) {
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.assertionValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.expectedLessValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains("is not less at"));
			throw new IllegalArgumentException("Valid test Point");
		}
	}

	@Test(expected = IllegalArgumentException.class)
	public void testIsLessThanOrEqualToNegativeTest() throws Exception {
		try {
			Assert.assertThat(testValue.assertionValue).isLessThanOrEqualTo(testValue.expectedLessValue);
		} catch (AssertionError assertionError) {
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.assertionValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.expectedLessValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains("is not less or equals to"));
			throw new IllegalArgumentException("Valid test Point");
		}
	}

	@Test(expected = IllegalArgumentException.class)
	public void testIsPositiveNegativeTest() throws Exception {
		try {
			Assert.assertThat(testValue.expectedNegativeValue).isPositive();
		} catch (AssertionError assertionError) {
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.expectedNegativeValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains("is negative"));
			throw new IllegalArgumentException("Valid test Point");
		}
	}

	@Test(expected = IllegalArgumentException.class)
	public void testIsNegativeNegativeTest() throws Exception {
		try {
			Assert.assertThat(testValue.expectedPositiveValue).isNegative();
		} catch (AssertionError assertionError) {
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.expectedPositiveValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains("is positive"));
			throw new IllegalArgumentException("Valid test Point");
		}
	}

	@Test(expected = IllegalArgumentException.class)
	public void testIsZeroNegativeTest() throws Exception {
		try {
			Assert.assertThat(testValue.assertionValue).isZero();
		} catch (AssertionError assertionError) {
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.assertionValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains("is not zero"));
			throw new IllegalArgumentException("Valid test Point");
		}
	}

	@Test(expected = IllegalArgumentException.class)
	public void testIsNotZeroNegativeTest() throws Exception {
		try {
			Assert.assertThat(testValue.assertionZeroValue).isNotZero();
		} catch (AssertionError assertionError) {
			org.junit.Assert.assertTrue(assertionError.getMessage().contains(testValue.assertionZeroValue.toString()));
			org.junit.Assert.assertTrue(assertionError.getMessage().contains("is zero"));
			throw new IllegalArgumentException("Valid test Point");
		}
	}

	private static class TestValue {
		private final Number assertionValue;
		private final Number assertionZeroValue;
		private final Number expectedEqualsValue;
		private final Number expectedLessValue;
		private final Number expectedGreaterValue;
		private final Number expectedPositiveValue;
		private final Number expectedNegativeValue;

		TestValue(Number assertionValue,
				  Number assertionZeroValue,
				  Number expectedEqualsValue,
				  Number expectedLessValue,
				  Number expectedGreaterValue,
				  Number expectedPositiveValue,
				  Number expectedNegativeValue) {
			this.assertionValue = assertionValue;
			this.assertionZeroValue = assertionZeroValue;
			this.expectedEqualsValue = expectedEqualsValue;
			this.expectedLessValue = expectedLessValue;
			this.expectedGreaterValue = expectedGreaterValue;
			this.expectedPositiveValue = expectedPositiveValue;
			this.expectedNegativeValue = expectedNegativeValue;
		}
	}
}