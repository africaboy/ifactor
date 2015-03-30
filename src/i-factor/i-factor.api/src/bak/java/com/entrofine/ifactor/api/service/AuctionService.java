package com.entrofine.ifactor.api.service;

/**
 * 
 * @author LiZhichao
 * @date 2014-6-28 下午17：43
 */
public interface AuctionService {

	/**
	 * Chapter 4 Auction Process
	 * 
	 * 2.1 Invoices from “In public auction” status can be seen by VPBank and by
	 * investors (buyers) and both can place bids. Seller has to accept best bid
	 * for auction to be closed.
	 * 
	 * @param auctionid
	 */
	public void closeAuction(String auctionid);
}
