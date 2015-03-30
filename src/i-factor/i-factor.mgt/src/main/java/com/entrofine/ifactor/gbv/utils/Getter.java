package com.entrofine.ifactor.gbv.utils;

/**
 * 对象处理类
 * 
 * @author wangweifeng
 * 
 */
public final class Getter {

	private Getter() {
	}

	/**
	 * @param value
	 * @param clazz
	 * @return 类型错误, 返回null
	 */
	public static <T> T object(final Object value, final Class<T> clazz) {
		return Getter.object(value, clazz, null);
	}

	/**
	 * @param value
	 * @param clazz
	 * @param defaultValue
	 * @return 类型错误, 返回默认值
	 */
	public static <T> T object(final Object value, final Class<T> clazz,
			final T defaultValue) {
		if (value != null && clazz.isAssignableFrom(value.getClass())) {
			return clazz.cast(value);
		}
		return defaultValue;
	}

	/**
	 * @param value
	 * @return string value, default is empty[""]
	 */
	public static String string(final Object value) {
		return Getter.string(value, "");
	}

	/**
	 * @param value
	 * @param defaultValue
	 * @return string value
	 */
	public static String string(final Object value, final String defaultValue) {
		if (value != null) {
			try {
				return value.toString();
			} catch (final Exception x) {
			}
		}
		return defaultValue;
	}

	/**
	 * @param value
	 * @return boolean value, default is false
	 */
	public static boolean z(final Object value) {
		return Getter.z(value, false);
	}

	/**
	 * @param value
	 * @param defaultValue
	 * @return boolean value <br>
	 *         value == 1 ? true : false;
	 */
	public static boolean z(final Object value, final boolean defaultValue) {
		if (value != null) {
			if (value instanceof Boolean) {
				return (Boolean) value;
			}

			if (value.toString().equalsIgnoreCase("true")) {
				return true;
			}
			if (value.toString().equalsIgnoreCase("false")) {
				return false;
			}

			// 1: true, other: false
			return Getter.i(value, 0) == 1;
		}
		return defaultValue;
	}

	/**
	 * @param value
	 * @return byte value, default is zero
	 */
	public static byte b(final Object value) {
		return Getter.b(value, (byte) 0);
	}

	/**
	 * @param value
	 * @param defaultValue
	 * @return byte value
	 */
	public static byte b(final Object value, final byte defaultValue) {
		if (value != null) {
			if (value instanceof Byte) {
				return (Byte) value;
			}

			if (value instanceof Number) {
				return ((Number) value).byteValue();
			}

			try {
				return Byte.parseByte(value.toString());
			} catch (final Exception x) {
			}
		}
		return defaultValue;
	}

	/**
	 * @param value
	 * @return char value, default is zero[' ']
	 */
	public static char c(final Object value) {
		return Getter.c(value, (char) 0);
	}

	/**
	 * @param value
	 * @param defaultValue
	 * @return char value
	 */
	public static char c(final Object value, final char defaultValue) {
		if (value != null) {
			if (value instanceof Character) {
				return (Character) value;
			}

			if ((value instanceof String) && !value.toString().isEmpty()) {
				return value.toString().charAt(0);
			}

			if (value instanceof Number) {
				return (char) ((Number) value).intValue();
			}
		}
		return defaultValue;
	}

	/**
	 * @param value
	 * @return short value, default is zero
	 */
	public static short s(final Object value) {
		return Getter.s(value, (short) 0);
	}

	/**
	 * @param value
	 * @param defaultValue
	 * @return short value
	 */
	public static short s(final Object value, final short defaultValue) {
		if (value != null) {
			if (value instanceof Short) {
				return (Short) value;
			}

			if (value instanceof Number) {
				return ((Number) value).shortValue();
			}

			try {
				return Short.parseShort(value.toString());
			} catch (final Exception x) {
			}
		}
		return defaultValue;
	}

	/**
	 * @param value
	 * @return int value, default is zero
	 */
	public static int i(final Object value) {
		return Getter.i(value, 0);
	}

	/**
	 * 
	 * @param value
	 * @param defaultValue
	 * @return int value <br>
	 *         true ? 1 : 0;
	 */
	public static int i(final Object value, final int defaultValue) {
		if (value != null) {
			if (value instanceof Integer) {
				return (Integer) value;
			}

			if (value instanceof Number) {
				return ((Number) value).intValue();
			}

			try {
				return Integer.parseInt(value.toString());
			} catch (final Exception x) {
				if (value instanceof Boolean) {
					return (Boolean) value ? 1 : 0;
				}
			}
		}
		return defaultValue;
	}

	/**
	 * @param value
	 * @return long value, default is zero
	 */
	public static long l(final Object value) {
		return Getter.l(value, 0L);
	}

	/**
	 * @param value
	 * @param defaultValue
	 * @return long value
	 */
	public static long l(final Object value, final long defaultValue) {
		if (value != null) {
			if (value instanceof Long) {
				return (Long) value;
			}

			if (value instanceof Number) {
				return ((Number) value).longValue();
			}

			try {
				return Long.parseLong(value.toString());
			} catch (final Exception x) {
			}
		}
		return defaultValue;
	}

	/**
	 * @param value
	 * @return float value, default is zero
	 */
	public static float f(final Object value) {
		return Getter.f(value, 0F);
	}

	/**
	 * @param value
	 * @param defaultValue
	 * @return float value
	 */
	public static float f(final Object value, final float defaultValue) {
		if (value != null) {
			if (value instanceof Float) {
				return (Float) value;
			}

			if (value instanceof Number) {
				return ((Number) value).floatValue();
			}

			try {
				return Float.parseFloat(value.toString());
			} catch (final Exception x) {
			}
		}
		return defaultValue;
	}

	/**
	 * @param value
	 * @return double value, default is zero
	 */
	public static double d(final Object value) {
		return Getter.d(value, 0D);
	}

	/**
	 * @param value
	 * @param defaultValue
	 * @return double value
	 */
	public static double d(final Object value, final double defaultValue) {
		if (value != null) {
			if (value instanceof Double) {
				return (Double) value;
			}

			if (value instanceof Number) {
				return ((Number) value).doubleValue();
			}

			try {
				return Double.parseDouble(value.toString());
			} catch (final Exception x) {
			}
		}
		return defaultValue;
	}

}
