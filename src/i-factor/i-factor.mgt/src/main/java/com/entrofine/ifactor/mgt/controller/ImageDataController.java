package com.entrofine.ifactor.mgt.controller;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import jt.classic.system.context.ISystemContext;
import jt.classic.system.database.SystemDataSource;
import jt.classic.system.user.IUser;
import jt.classic.system.utils.AnnexTool;

import org.limp.mine.DataTrimmerI;
import org.limp.mine.QueryJack;
import org.limp.mine.QueryJackFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entrofine.ifactor.mgt.parambean.ImageItemQueryBean;

/**
 * image data handle controller
 * 
 * @author wangweifeng
 * 
 */
@Controller
@RequestMapping(value = "image")
public class ImageDataController {
	/**
	 * 影像资料项上传列表
	 * 
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "imageuploaditemlist")
	@ResponseBody
	public Object imageUploadItemList(
			@ModelAttribute ImageItemQueryBean queryBean) {

		Map<String, Object> resultMap = new HashMap<String, Object>();

		String basesqlcount = "SELECT COUNT(*) FROM "
				+ "IF_MGT_IMAGE_ITEMS A WHERE 1=1 ";

		String basesql = "SELECT * FROM IF_MGT_IMAGE_ITEMS A "
				+ "LEFT JOIN (SELECT  IMAGE_UPLOAD_ID,UPLOAD_TIME,"
				+ "(SELECT COUNT(*) FROM XSYSTEM_ANNEX WHERE FK_ANNEX_ID = B.IMAGE_UPLOAD_ID) AS IMAGE_NUM, "
				+ "IMAGE_ITEM_ID FROM IF_MGT_IMAGE_UPLOAD B WHERE APPLY_CODE='"
				+ queryBean.getLoanId() + "') C ON A.IMAG_ID=C.IMAGE_ITEM_ID "
				+ "WHERE 1=1 ";

		String orderBySql = " ORDER BY C.UPLOAD_TIME DESC,A.ITEM_CODE ASC ";

		Connection conn = null;
		try {
			SystemDataSource ds = SystemDataSource.getInstance();
			conn = ds.getConnection();

			QueryJack plus = QueryJackFactory.getInstance().createQueryJack(
					false);
			String pageNO = String.valueOf(queryBean.getStart()
					/ queryBean.getLimit() + 1);

			// 设置
			plus.setParameter(QueryJackFactory.PAGINATION_SQL1, basesqlcount
					+ getQueryStr(queryBean));
			plus.setParameter(QueryJackFactory.PAGINATION_SQL2, basesql
					+ getQueryStr(queryBean) + orderBySql);
			plus.setParameter(QueryJackFactory.DATABASE_CONNECTION, conn);
			plus.setParameter(QueryJackFactory.PAGINATION_LINKSTRING, "");
			plus.setParameter(QueryJackFactory.PAGINATION_COUNT,
					queryBean.getLimit());
			plus.setParameter(QueryJackFactory.PAGINATION_PAGENO, pageNO);

			List resultList = plus.work();
			resultMap.put("success", true);
			resultMap.put("totalCount", plus.getLabel().totaldata());
			resultMap.put("imageUploadItemList", resultList);
		} catch (Exception e) {
			resultMap.put("success", false);
			resultMap.put("message", e.getMessage());
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
		return resultMap;
	}

	/**
	 * 获取申请单已上传的类别信息
	 * 
	 * @param fileType
	 * @param applyCode
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "getImageItemId", method = RequestMethod.POST)
	@ResponseBody
	public Object getImageItemId(
			@RequestParam(value = "fileType", required = true) String fileType,
			@RequestParam(value = "applyCode", required = true) String applyCode)
			throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();

		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();

			StringBuilder sqlBuilder = new StringBuilder();
			sqlBuilder
					.append("SELECT A.IMAG_ID,A.ITEM_TYPE,B.IMAGE_UPLOAD_ID ")
					.append("FROM IF_MGT_IMAGE_ITEMS A  LEFT JOIN IF_MGT_IMAGE_UPLOAD B ON A.IMAG_ID = B.IMAGE_ITEM_ID AND B.APPLY_CODE=? ")
					.append("WHERE A.ITEM_CODE=?");

			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			Map result = trimmerI.searchSingleData(sqlBuilder.toString(),
					applyCode, fileType);

			if (result != null) {
				resultMap.put("success", true);
				resultMap.put("imageItemId", result.get("IMAG_ID"));
				resultMap.put("imageUploadId", result.get("IMAGE_UPLOAD_ID"));
				resultMap.put("imageItemType", result.get("ITEM_TYPE"));
			} else {
				resultMap.put("success", false);
			}
		} catch (Exception e) {
			resultMap.put("success", false);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}

		return resultMap;
	}

	/**
	 * 获取 toolbar json
	 * 
	 * @param applyCode
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "getToolBarJson", method = RequestMethod.POST)
	@ResponseBody
	public Object getToolBarJson(
			@RequestParam(value = "applyCode", required = true) String applyCode)
			throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();

		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder
				.append("SELECT * FROM IF_MGT_IMAGE_UPLOAD A,IF_MGT_IMAGE_ITEMS B ")
				.append("WHERE A.IMAGE_ITEM_ID=B.IMAG_ID AND A.APPLY_CODE=? ")
				.append("ORDER BY B.ITEM_CODE ASC");

		Map<String, List> itemMap = new HashMap<String, List>();
		List<String> typeList = new ArrayList<String>();
		List<Map> restrutMap = new ArrayList<Map>();

		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			List resultList = trimmerI.searchMultiData(sqlBuilder.toString(),
					applyCode);
			if (resultList != null && !resultList.isEmpty()) {
				for (int i = 0; i < resultList.size(); i++) {
					Map temp = (Map) resultList.get(i);
					String itemType = (String) temp.get("ITEM_TYPE");
					String itemTypeName = (String) temp.get("ITEM_TYPE_NAME");

					String typeStr = itemType + "-" + itemTypeName;
					if (!typeList.contains(typeStr)) {
						typeList.add(typeStr);
					}

					List itemList = itemMap.get(itemType);
					if (itemList == null) {
						itemList = new ArrayList();
						itemMap.put(itemType, itemList);
					}

					Map tempItemMap = new HashMap();
					tempItemMap.put("menuName", temp.get("ITEM_CODE") + "-"
							+ temp.get("ITEM_NAME"));
					tempItemMap.put("itemType", itemType);
					tempItemMap.put("itemCode", temp.get("ITEM_CODE"));
					tempItemMap.put("imageUploadId",
							temp.get("IMAGE_UPLOAD_ID"));
					itemList.add(tempItemMap);

				}
			}

			for (String temp : typeList) {
				String[] tempArr = temp.split("-");
				Map result = new HashMap();
				result.put("tbarText", tempArr[1]);
				result.put("tbarType", tempArr[0]);
				result.put("tbarMenu", itemMap.get(tempArr[0]));
				restrutMap.add(result);
			}

			resultMap.put("success", true);
			resultMap.put("tbarJson", restrutMap);

		} catch (Exception e) {
			resultMap.put("success", false);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
		return resultMap;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "menutree", method = RequestMethod.POST)
	@ResponseBody
	public Object getMenuTree(
			@RequestParam(value = "applyCode", required = true) String applyCode) {

		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder
				.append("SELECT * FROM IF_MGT_IMAGE_UPLOAD A,IF_MGT_IMAGE_ITEMS B ")
				.append("WHERE A.IMAGE_ITEM_ID=B.IMAG_ID AND A.APPLY_CODE=? ")
				.append("ORDER BY B.ITEM_CODE ASC");

		Map<String, List> itemMap = new HashMap<String, List>();
		List<String> typeList = new ArrayList<String>();
		List<Map> restrutList = new ArrayList<Map>();

		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);

			List resultList = trimmerI.searchMultiData(sqlBuilder.toString(),
					applyCode);

			if (resultList != null && !resultList.isEmpty()) {
				for (int i = 0; i < resultList.size(); i++) {
					Map temp = (Map) resultList.get(i);
					String itemType = (String) temp.get("ITEM_TYPE");
					String itemTypeName = (String) temp.get("ITEM_TYPE_NAME");

					String typeStr = itemType + "-" + itemTypeName;
					if (!typeList.contains(typeStr)) {
						typeList.add(typeStr);
					}

					List itemList = itemMap.get(itemType);
					if (itemList == null) {
						itemList = new ArrayList();
						itemMap.put(itemType, itemList);
					}

					Map tempItemMap = new HashMap();
					tempItemMap.put("text", temp.get("ITEM_NAME"));
					tempItemMap.put("leaf", true);
					tempItemMap.put("menuName", temp.get("ITEM_CODE") + "-"
							+ temp.get("ITEM_NAME"));
					tempItemMap.put("itemType", itemType);
					tempItemMap.put("itemCode", temp.get("ITEM_CODE"));
					tempItemMap.put("imageUploadId",
							temp.get("IMAGE_UPLOAD_ID"));
					itemList.add(tempItemMap);

				}
			}

			for (String temp : typeList) {
				String[] tempArr = temp.split("-");
				Map result = new HashMap();
				result.put("text", tempArr[1]);
				result.put("expanded", true);
				result.put("tbarType", tempArr[0]);
				result.put("children", itemMap.get(tempArr[0]));
				restrutList.add(result);
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
		return restrutList;

	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "traceinfo")
	@ResponseBody
	public Object getTraceInfo(
			@RequestParam(value = "actId", required = true) String actId,
			HttpServletRequest request) {
		String sql = "SELECT * FROM IF_MGT_IMAGE_TRACE WHERE ACT_ID = ? AND USER_ID = ?";

		IUser user = ISystemContext.getSessionUser(request);

		Map resultMap = new HashMap();

		if (user != null) {
			Connection conn = null;
			try {
				conn = SystemDataSource.getInstance().getConnection();
				DataTrimmerI trimmerI = new DataTrimmerI(conn);

				Map map = trimmerI.searchSymmetricalData(sql, "ANNEX_ID",
						"TRACE_TIME", actId, user.id());

				resultMap.put("success", true);
				resultMap.put("resultData", map);
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				SystemDataSource.closeConnection(conn);
			}
		} else {
			resultMap.put("success", false);
		}

		return resultMap;
	}

	/**
	 * 删除影像类数据
	 * @param fileType
	 * @param applyCode
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "delete")
	@ResponseBody
	public Object deleteImageData(
			@RequestParam(value = "fileType", required = true) String fileType,
			@RequestParam(value = "applyCode", required = true) String applyCode) {

		String sql = "SELECT XSYSTEM_ANNEX_ID FROM XSYSTEM_ANNEX WHERE FK_ANNEX_ID=(SELECT A.IMAGE_UPLOAD_ID FROM IF_MGT_IMAGE_UPLOAD A LEFT JOIN IF_MGT_IMAGE_ITEMS B ON A.IMAGE_ITEM_ID=B.IMAG_ID WHERE A.APPLY_CODE=? AND B.ITEM_CODE=?)";

		Map resultMap = new HashMap();

		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);

			List result = trimmerI.searchMultiData(sql, applyCode, fileType);
			if (result != null && !result.isEmpty()) {
				for (int i = 0; i < result.size(); i++) {
					Map temp = (Map)result.get(i);
					AnnexTool annexTool = new AnnexTool(conn);
					annexTool.deleteAnnex((String)temp.get("XSYSTEM_ANNEX_ID"));
					trimmerI.execute("DELETE FROM XSYSTEM_ANNEX WHERE XSYSTEM_ANNEX_ID=?", temp.get("XSYSTEM_ANNEX_ID"));
				}
			}
			
			conn.commit();

			resultMap.put("success", true);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}

		return resultMap;
	}

	public String getQueryStr(ImageItemQueryBean queryBean) {
		StringBuilder sb = new StringBuilder();

		if (queryBean.getItemName() != null
				&& !"".equals(queryBean.getItemName())) {
			sb.append(" AND A.ITEM_NAME LIKE '%" + queryBean.getItemName()
					+ "%'");
		}

		if (queryBean.getItemCode() != null
				&& !"".equals(queryBean.getItemCode())) {
			sb.append(" AND A.ITEM_CODE IN(");

			String[] codeStr = queryBean.getItemCode().split(",");
			for (int i = 0; i < codeStr.length; i++) {
				if (i != 0) {
					sb.append(",");
				}
				sb.append("'" + codeStr[i] + "'");
			}

			sb.append(")");

		}

		if (queryBean.getQueryItemCode() != null
				&& !"".equals(queryBean.getQueryItemCode())) {
			sb.append(" AND A.ITEM_CODE='" + queryBean.getQueryItemCode() + "'");
		}

		return sb.toString();
	}

}
