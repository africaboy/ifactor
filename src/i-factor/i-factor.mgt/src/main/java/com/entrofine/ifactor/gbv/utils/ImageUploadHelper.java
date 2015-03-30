package com.entrofine.ifactor.gbv.utils;

import java.sql.Connection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jt.classic.system.database.SystemDataSource;

import org.limp.basework.SimpleBean;
import org.limp.basework.Table;
import org.limp.basework.analyzer.TableRegisterCenter;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;
import org.limp.mine.StringTool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.io.Files;

/**
 * upload image helper
 * 
 * @author hezhch
 * 
 *         2014年7月14日
 */
public class ImageUploadHelper {

	public static void saveDocumentUrls(String bizId, List<String> urls)
			throws Exception {
		Connection conn = SystemDataSource.getInstance().getConnection();
		try {
			for (String url : urls) {
				saveImageInfo(conn, bizId, url);
			}
			SystemDataSource.commitConnection(conn);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			SystemDataSource.rollbackConnection(conn);
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}

	private static final Logger LOG = LoggerFactory
			.getLogger(ImageUploadHelper.class);

	/**
	 * save upload image info
	 * 
	 * @param applyId
	 * @param url
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void saveImageInfo(Connection conn, String applyId, String url)
			throws Exception {
		try {
			int documentIndex = url.indexOf("/document/");
			String path = url.substring(documentIndex + 10);
			String pathArr[] = path.split("/");
			String flowType = pathArr[0];
			String typeName = pathArr[1];
			String itemCode = pathArr[2];
			// get itemsid
			DataTrimmerI trimmer = new DataTrimmerI(conn);
			String sql = "SELECT IMAG_ID FROM IF_MGT_IMAGE_ITEMS WHERE ITEM_CODE = ? AND ITEM_TYPE = ?";
			Map imgItemsInfo = trimmer
					.searchSingleData(sql, itemCode, typeName);
			String itemsid = StringTool
					.checkString(imgItemsInfo.get("IMAG_ID"));
			// save image info
			TableRegisterCenter center = TableRegisterCenter.getInstance();
			// 获取表注册信息
			Table table = center.findTable("IF_MGT_IMAGE_UPLOAD");
			BaseworkUtil util = new BaseworkUtil();
			// 分析表单数据
			SimpleBean bean = new SimpleBeanImpl();
			String imgInfoSql = "SELECT IMAGE_UPLOAD_ID FROM IF_MGT_IMAGE_UPLOAD WHERE IMAGE_ITEM_ID=? AND APPLY_CODE=?";
			Map imageInfo = trimmer.searchSingleData(imgInfoSql, itemsid,
					applyId + "_" + flowType);
			if (imageInfo == null) {
				imageInfo = new HashMap();
				imageInfo.put("IMAGE_ITEM_ID", itemsid);
				imageInfo.put("UPLOAD_TIME", DateTrimmer.getYMDHMS());
				imageInfo.put("APPLY_CODE", applyId + "_" + flowType);
				bean.reload(imageInfo);
				imageInfo = util.manualSave(table, bean, conn);
			}
			// save XSYSTEM_ANNEX
			String fileName = Files.getNameWithoutExtension(url);
			String filePath = pathArr[0] + "." + pathArr[1] + "." + pathArr[2];
			String absolutePath = "/" + pathArr[0] + "/" + pathArr[1] + "/"
					+ pathArr[2] + "/";
			String style = Files.getFileExtension(url);
			table = center.findTable("XSYSTEM_ANNEX");
			Map<String, Object> annexInfo = new HashMap<String, Object>();
			annexInfo.put("fid", imageInfo.get("IMAGE_UPLOAD_ID"));
			annexInfo.put("fname", fileName);
			annexInfo.put("fcname", fileName);
			annexInfo.put("ffolder", filePath);
			annexInfo.put("fpath", absolutePath);
			annexInfo.put("flocation", "free");
			annexInfo.put("fstyle", style);
			annexInfo.put("fobject", "IF_MGT_IMAGE_UPLOAD");
			annexInfo.put("ffield", "IMAGE_UPLOAD_ID");
			annexInfo.put("systime", DateTrimmer.getYMDHMS());
			bean = new SimpleBeanImpl();
			String annexSql = "SELECT XSYSTEM_ANNEX_ID FROM XSYSTEM_ANNEX WHERE FK_ANNEX_ID = ?";
			Map annexInfo1 = trimmer.searchSingleData(annexSql,
					imageInfo.get("IMAGE_UPLOAD_ID"));
			if (annexInfo1 == null) {
				bean.reload(annexInfo);
				util.manualSave(table, bean, conn);
			} else {
				annexInfo.put("pkid", annexInfo1.get("XSYSTEM_ANNEX_ID"));
				bean.reload(annexInfo);
				util.manualUpdate(table, bean, conn);
			}
			conn.commit();
		} catch (Exception e) {
			throw e;
		}
	}

}
