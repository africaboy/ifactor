package com.entrofine.ifactor.gbv.utils;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.limp.mine.StringTool;

public class Tools {

	public static String getValue(HSSFCell hssfCell) {
		if (hssfCell != null) {
			if (hssfCell.getCellType() == 4)
				return String.valueOf(hssfCell.getBooleanCellValue());
			if (hssfCell.getCellType() == 0) {
				DecimalFormat df = new DecimalFormat("#");
				if (HSSFDateUtil.isCellDateFormatted(hssfCell)) {
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					return sdf.format(
							HSSFDateUtil.getJavaDate(hssfCell
									.getNumericCellValue())).toString();
				}

				return df.format(hssfCell.getNumericCellValue());
			}

			return StringTool.checkString(String.valueOf(hssfCell
					.getStringCellValue()));
		}

		return "";
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map cloneMap(Map map1, Map map2) {
		for (Iterator it = map1.keySet().iterator(); it.hasNext();) {
			String key = it.next().toString();
			map2.put(key, map1.get(key));
		}
		return map2;
	}
}
