package com.entrofine.ifactor.mgt.controller;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
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
import org.limp.mine.DateTrimmer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.ddshell.framework.app.entity.User;
import com.entrofine.ifactor.api.service.VPBankService;
import com.entrofine.ifactor.gbv.utils.Tools;

/**
 * VPBank controller
 * 
 * @author hezhch
 * 
 */
@Controller
@RequestMapping(value = "/vpbank")
public class VPBankController {

	@Autowired
	VPBankService vPBankService;

	/**
	 * import vpbank data
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "importData", method = RequestMethod.POST)
	@ResponseBody
	public Object importBlacklistData(HttpServletRequest request,
			@RequestParam("file1") MultipartFile multipartFile) {
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			List<User> userList = new ArrayList<User>();
			String loginName = "";
			String password = "";
			String status = "";
			String title = "";
			String firstName = "";
			String lastName = "";
			String gender = "";
			String position = "";
			String email = "";
			String mobileCountryCode = "";
			String mobilePhone = "";
			String workCountryCode = "";
			String workPhone = "";
			String defaultLocale = "";
			InputStream is = multipartFile.getInputStream();
			HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);

			for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); ++numSheet) {
				HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
				if (hssfSheet == null) {
					continue;
				}

				for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); ++rowNum) {
					HSSFRow hssfRow = hssfSheet.getRow(rowNum);
					if (hssfRow == null) {
						continue;
					}
					loginName = Tools.getValue(hssfRow.getCell(0));
					password = Tools.getValue(hssfRow.getCell(1));
					status = Tools.getValue(hssfRow.getCell(2));
					title = Tools.getValue(hssfRow.getCell(3));
					firstName = Tools.getValue(hssfRow.getCell(4));
					lastName = Tools.getValue(hssfRow.getCell(5));
					gender = Tools.getValue(hssfRow.getCell(6));
					position = Tools.getValue(hssfRow.getCell(7));
					email = Tools.getValue(hssfRow.getCell(8));
					mobileCountryCode = Tools.getValue(hssfRow.getCell(9));
					mobilePhone = Tools.getValue(hssfRow.getCell(10));
					workCountryCode = Tools.getValue(hssfRow.getCell(11));
					workPhone = Tools.getValue(hssfRow.getCell(12));
					defaultLocale = Tools.getValue(hssfRow.getCell(13));
					TableRegisterCenter center = TableRegisterCenter
							.getInstance();
					// 获取表注册信息
					Table table = center.findTable("IF_MGT_VPBANK_USER");
					BaseworkUtil util = new BaseworkUtil();
					// 分析表单数据
					SimpleBean bean = new SimpleBeanImpl();
					Map<String, Object> mapInfo = new HashMap<String, Object>();
					mapInfo.put("LOGIN_NAME", loginName);
					mapInfo.put("PASSWORD", password);
					mapInfo.put("CREATE_TIME", DateTrimmer.getYMDHMS());
					mapInfo.put("UPDATE_TIME", DateTrimmer.getYMDHMS());
					mapInfo.put("STATUS", status);
					mapInfo.put("TITLE", title);
					mapInfo.put("FIRST_NAME", firstName);
					mapInfo.put("LAST_NAME", lastName);
					mapInfo.put("GENDER", gender);
					mapInfo.put("POSITION", position);
					mapInfo.put("EMAIL", email);
					mapInfo.put("MOBILE_COUNTRY_CODE", mobileCountryCode);
					mapInfo.put("MOBILE_PHONE", mobilePhone);
					mapInfo.put("WORK_COUNTRY_CODE", workCountryCode);
					mapInfo.put("WORK_PHONE", workPhone);
					mapInfo.put("DEFAULT_LOCALE", defaultLocale);
					bean.reload(mapInfo);
					// 保存表数据
					util.manualSave(table, bean, conn);

					User user = new User();
					user.setLoginName(loginName);
					user.setPlainPassword(password);
					user.setStatus(status);
					user.setTitle(title);
					user.setFirstName(firstName);
					user.setLastName(lastName);
					user.setGender(gender);
					user.setPosition(position);
					user.setEmail(email);
					user.setMobileCountryCode(mobileCountryCode);
					user.setMobilePhone(mobilePhone);
					user.setWorkCountryCode(workCountryCode);
					user.setWorkPhone(workPhone);
					user.setDefaultLocale(defaultLocale);
					user.setUpdateTime(new Date());
					user.setCreateTime(new Date());
					userList.add(user);
				}

			}
			conn.commit();
			request.setAttribute("result", "{success: true}");
			vPBankService.saveVPBankUsers(userList);
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

}
