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
import jt.classic.system.wordbook.WordBookUtil;

import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entrofine.ifactor.api.entity.TableSyncEvent;
import com.entrofine.ifactor.api.service.TableSyncService;
import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * invoice auction handle class
 * 
 * @author wangweifeng
 * 
 */
@Controller
@RequestMapping(value = "auction")
public class InvoiceAuctionController {

	@Autowired
	private TableSyncService tableSyncService;

	/**
	 * current user can lock the invoice auction？
	 * 
	 * @return
	 */
	@RequestMapping(value = "canlock", method = RequestMethod.POST)
	@ResponseBody
	public Object canLock(
			@RequestParam(value = "iidatPkId", required = true) String iidatPkId,
			HttpServletRequest request) {

		Map<String, Object> resultMap = new HashMap<String, Object>();

		Connection conn = null;

		try {

			conn = SystemDataSource.getInstance().getConnection();

			switch (ifCanLockAuction(conn, iidatPkId,
					ISystemContext.getSessionUser(request))) {
			case 1:// no body lock
				lockAuction(conn, iidatPkId,
						ISystemContext.getSessionUser(request));
				resultMap.put("success", true);
				break;
			case 2:// locked by self
				resultMap.put("success", true);
				break;
			case 3:// locked by others
				resultMap.put("success", false);
				resultMap.put("message", "auction has locked by other user!");
				break;
			default:
				break;
			}

			conn.commit();

		} catch (Exception e) {
			resultMap.put("success", false);
			resultMap.put("message", "auction lock has a error!");
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}

		return resultMap;

	}

	/**
	 * trading team decede the invoice`s status
	 * 
	 * @param iidatPkId
	 * @param iidaPkId
	 * @param handleFlag
	 * @return
	 */
	@RequestMapping(value = "/decideStatus")
	@ResponseBody
	public Object decideAuctionStatus(
			@RequestParam(value = "iidatPkId", required = true) String iidatPkId,
			@RequestParam(value = "appPkId", required = true) String appPkId,
			@RequestParam(value = "handleFlag", required = true) int handleFlag) {

		Map<String, Object> resultMap = new HashMap<String, Object>();

		Connection conn = null;

		try {

			conn = SystemDataSource.getInstance().getConnection();

			List<TableSyncEvent> events = new ArrayList<TableSyncEvent>();

			switch (handleFlag) {
			case 1:// Accept Ready to sell

				// TODO generates automatically Sub-contract

				// TODO automatically sends out notification to Seller

				// update auction status
				updateAuctionStatus(conn, iidatPkId, "IAS_04");

				events.add(new TableSyncEvent("IF_MGT_INVOICE_AUCTION",
						appPkId, "AUCTION_STATUS", "IAS_04"));

				break;
			case 2:// Place a bid

				// TODO Immediately a notification is sent to Seller
				// (sms/e-mail) informing to check the bid details

				// update auction status
				updateAuctionStatus(conn, iidatPkId, "IAS_02");

				events.add(new TableSyncEvent("IF_MGT_INVOICE_AUCTION",
						appPkId, "AUCTION_STATUS", "IAS_02"));

				break;
			case 3:// Open to investors

				updateAuctionStatus(conn, iidatPkId, "IAS_03");

				events.add(new TableSyncEvent("IF_MGT_INVOICE_AUCTION",
						appPkId, "AUCTION_STATUS", "IAS_03"));

				break;
			case 4:// Keep with VPBank

				updateAuctionStatus(conn, iidatPkId, "IAS_02");

				events.add(new TableSyncEvent("IF_MGT_INVOICE_AUCTION",
						appPkId, "AUCTION_STATUS", "IAS_02"));

				break;
			default:
				break;
			}

			tableSyncService.execute(events);
			resultMap.put("success", true);
			conn.commit();

		} catch (Exception e) {
			resultMap.put("success", false);
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}

		return resultMap;

	}

	private void updateAuctionStatus(Connection conn, String iidatPkId,
			String iaStatus) {

		// String sql =
		// "	UPDATE IF_MGT_INVOICE_AUCTION SET AUCTION_STATUS=?,AUCTION_STATUS_VAL=? WHERE IIDAT_PK_ID=? ";
		//
		// DataTrimmerI trimmerI = new DataTrimmerI(conn);
		//
		// trimmerI.execute(sql, auctionStatus,
		// WordBookUtil.getWordBookItemName(
		// "auction_status", auctionStatus), iidatPkId);
		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		String iaStatusVal = WordBookUtil.getWordBookItemName("auction_status",
				iaStatus);
		String sql = "";
		String nowDate = DateTrimmer.getYMDHMS();
		if (iaStatus.equals("IAS_02")) {
			sql = "UPDATE IF_MGT_INVOICE_AUCTION SET AUCTION_STATUS=?,AUCTION_STATUS_VAL=?,VIP_DATE=? WHERE IIDAT_PK_ID=?";
			trimmerI.execute(sql, iaStatus, iaStatusVal, nowDate, iidatPkId);
		} else if (iaStatus.equals("IAS_03")) {
			sql = "UPDATE IF_MGT_INVOICE_AUCTION SET AUCTION_STATUS=?,AUCTION_STATUS_VAL=?,PUBLIC_DATE=? WHERE IIDAT_PK_ID=?";
			trimmerI.execute(sql, iaStatus, iaStatusVal, nowDate, iidatPkId);
		} else if (iaStatus.equals("IAS_04")) {
			trimmerI.execute(
					"UPDATE IF_MGT_INVOICE_AUCTION SET AUCTION_STATUS=?,AUCTION_STATUS_VAL=?,SIGNED_DATE=? WHERE IIDAT_PK_ID=?",
					iaStatus, iaStatusVal, nowDate, iidatPkId);
		}
	}

	/**
	 * check auction is locked by other user
	 * 
	 * @param conn
	 * @param iidatPkId
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private int ifCanLockAuction(Connection conn, String iidatPkId, IUser iuser) {

		String sql = "	SELECT LOCKER_ID FROM IF_MGT_INVOICE_AUCTION WHERE IIDAT_PK_ID=?";

		DataTrimmerI trimmerI = new DataTrimmerI(conn);

		Map result = trimmerI.searchSingleData(sql, iidatPkId);

		if ("".equals(Getter.string(result.get("LOCKER_ID")))) {
			return 1;
		} else if (Getter.string(result.get("LOCKER_ID")).equals(iuser.id())) {
			return 2;
		} else {
			return 3;
		}

	}

	/**
	 * current user will lock auction
	 * 
	 * @param conn
	 * @param iidatPkId
	 * @param iuser
	 */
	private void lockAuction(Connection conn, String iidatPkId, IUser iuser) {

		String sql = "UPDATE IF_MGT_INVOICE_AUCTION SET LOCKER_ID=?,LOCKER_NAME=? WHERE IIDAT_PK_ID=?";

		DataTrimmerI trimmerI = new DataTrimmerI(conn);

		trimmerI.execute(sql, iuser.id(), iuser.iname(), iidatPkId);
	}

}
