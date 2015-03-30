package com.entrofine.ifactor.mgt.controller;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import jt.classic.system.ISystem;
import jt.classic.system.database.SystemDataSource;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.limp.basework.SimpleBean;
import org.limp.basework.Table;
import org.limp.basework.analyzer.TableRegisterCenter;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DataTrimmerI;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.entrofine.ifactor.gbv.utils.Tools;

/**
 * blacklist controller
 * 
 * @author hezhch
 */
@Controller
@RequestMapping(value = "/blacklist")
public class BlackListController {
	/**
	 * import blacklist data
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "importData", method = RequestMethod.POST)
	@ResponseBody
	public Object importBlacklistData(HttpServletRequest request) {
		Connection conn = null;
		try {
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			MultipartFile multipartFile = multipartRequest.getFile("file1");
			conn = SystemDataSource.getInstance().getConnection();
			String cpnumber = "";
			String cpname = "";
			int bltypeid = 0;
			String bltype = "";
			String bldate = "";
			String blcause = "";
			int blstatus = 0;
			String flowType = "";
			InputStream is = multipartFile.getInputStream();
			HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);

			for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); ++numSheet) {
				HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
				if (hssfSheet == null) {
					continue;
				}

				for (int rowNum = 0; rowNum <= hssfSheet.getLastRowNum(); ++rowNum) {
					HSSFRow hssfRow = hssfSheet.getRow(rowNum);
					if (hssfRow == null) {
						continue;
					}
					cpnumber = Tools.getValue(hssfRow.getCell(0));
					cpname = Tools.getValue(hssfRow.getCell(1));
					bltypeid = Integer.parseInt(Tools.getValue(hssfRow
							.getCell(2)));
					bltype = Tools.getValue(hssfRow.getCell(3));
					bldate = Tools.getValue(hssfRow.getCell(4));
					blcause = Tools.getValue(hssfRow.getCell(5));
					blstatus = Integer.parseInt(Tools.getValue(hssfRow
							.getCell(6)));
					flowType = Tools.getValue(hssfRow.getCell(7));
					TableRegisterCenter center = TableRegisterCenter
							.getInstance();
					// 获取表注册信息
					Table table = center.findTable("IF_MGT_BLACKLIST");
					BaseworkUtil util = new BaseworkUtil();
					// 分析表单数据
					SimpleBean bean = new SimpleBeanImpl();
					Map<String, Object> mapInfo = new HashMap<String, Object>();
					mapInfo.put("CPNUMBER", cpnumber);
					mapInfo.put("CPNAME", cpname);
					mapInfo.put("BLTYPEID", bltypeid);
					mapInfo.put("BLTYPE", bltype);
					mapInfo.put("BLDATE", bldate);
					mapInfo.put("BLCAUSE", blcause);
					mapInfo.put("BLSTATUS", blstatus);
					mapInfo.put("FLOWTYPE", flowType);
					bean.reload(mapInfo);
					// 保存表数据
					util.manualSave(table, bean, conn);
				}

			}

			conn.commit();
			request.setAttribute("result", "{success: true}");
		} catch (Exception e) {
			try {
				conn.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
			}
			request.setAttribute("result", "{success: false}");
			ISystem.catchException(this, e);
		} finally {
			SystemDataSource.closeConnection(conn);
		}
		return new ModelAndView("result");
	}

	@RequestMapping(value = "getCheckResult")
	@ResponseBody
	public Object getCheckResult(
			@RequestParam(value = "pkid", required = true) String pkid) {
		Connection conn = null;
		boolean info = false;
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmer = new DataTrimmerI(conn);
			String sql = "SELECT DUPTYPE FROM IF_MGT_BLACKLIST_RESULT WHERE PKID=?";
			info = trimmer.haveMoreData(sql, pkid);
			Map map = new HashMap();
			map.put("info", info);
			resultMap.put("data", map);
			resultMap.put("success", true);
		} catch (Exception e) {
			resultMap.put("success", false);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
		return resultMap;
	}
}