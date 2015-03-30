package jt.classic.system.workflow.engine;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import jt.classic.system.ISystemException;
import jt.classic.system.SimpleManager;
import jt.classic.system.context.ISystemContext;
import jt.classic.system.group.IGroup;
import jt.classic.system.log.LogManager;
import jt.classic.system.tableview.TableView;
import jt.classic.system.tableview.TableViewCenter;
import jt.classic.system.tableview.TableViewDataManager;
import jt.classic.system.user.IUser;
import jt.classic.system.user.UserCenter;
import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WFlow;
import jt.classic.system.workflow.WInstance;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WObject;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WStep;
import jt.classic.system.workflow.WorkflowException;
import jt.classic.system.workflow.WorkflowManager;

import org.limp.basework.Column;
import org.limp.basework.MachiningException;
import org.limp.basework.ProcessorException;
import org.limp.basework.SimpleBean;
import org.limp.basework.SimpleBean4Table;
import org.limp.basework.SimpleBeanMachining;
import org.limp.basework.Table;
import org.limp.basework.impl.CommonBean4HSQ;
import org.limp.basework.impl.SimpleBean4TableImpl;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DateTrimmer;
import org.limp.mine.StringTool;

/**
 * 流转引擎
 * 
 * @author mido
 * 
 */
public class GrooveWorkflowEngine extends SimpleManager {
	public GrooveWorkflowEngine(Connection conn) {
		super(conn);
	}

	public GrooveWorkflowEngine() {
		super();
	}

	/**
	 * linger flow
	 * 
	 * @param flow
	 * @param user
	 * @param cbh
	 * @return Map{actId, pkId}
	 * @throws WorkflowException
	 */
	public Map linger(WFlow flow, IUser user, CommonBean4HSQ cbh)
			throws WorkflowException {
		String actId = StringTool.checkString(cbh.getResource().get("actId"));
		String insId = StringTool.checkString(cbh.getResource().get("insId"));

		this.protectMe(insId, actId, user);

		String tableViewID = StringTool.checkString(cbh.getResource().get(
				"tableViewID"));

		TableView tv = TableViewCenter.getInstance().getTableView(tableViewID);

		Map resultMap = new HashMap();

		if (tv == null) {
			throw new WorkflowException("page view(" + tableViewID
					+ ") deletion.");
		} else {
			WInstanceManager wim = new WInstanceManager(this.conn);

			if (wim.getInstanceState(insId) == -3) {
				// update instance state, from abandoned instance
				this.updateInstanceState(insId, user, 0);
			}

			if (wim.getActivityState(actId) == -1) {
				// update instance state
				this.updateActivityState(actId, user, 1);
			}

			resultMap.put("actId", actId);
			resultMap.put("insId", insId);

			WActivity theActivity = wim.getActivityByID(actId);

			cbh.getResource().put("WACTIVITY", theActivity);

			Map result = null;
			TableViewDataManager tvdm = new TableViewDataManager(conn);
			try {
				result = tvdm.remixTableViewData(tv, cbh, null, false);

				resultMap.putAll(result);

			} catch (ISystemException ex) {
				throw new WorkflowException("save workflow view(" + tableViewID
						+ ") error.", ex);
			}

			if (result.containsKey((tv.iprimarytable().getPrimaryKey()[0]))) {
				this.createInstanceObject(insId, flow.iobject().ikey(), tv
						.iprimarytable().getName(), (String) result.get(tv
						.iprimarytable().getPrimaryKey()[0]), tv.id());
			}

			WStep currentStep = theActivity.istep();

			List lingerHandlers = currentStep.iplug4linger();

			if (lingerHandlers != null && !lingerHandlers.isEmpty()) {
				if (lingerHandlers != null && !lingerHandlers.isEmpty()) {
					SimpleBean bean = new SimpleBeanImpl();

					bean.getResource().put("GWE", this);
					bean.getResource().put("CBH", cbh);
					bean.getResource().put("theActivity", theActivity);

					for (int j = 0; j < lingerHandlers.size(); j++) {
						String className = (String) lingerHandlers.get(j);
						WPlugHandler lingerHandler = this
								.initWPlugHandler(className);
						lingerHandler.participate(conn, bean);
					}
				}
			}
		}

		return resultMap;
	}

	/**
	 * 流转过程开始
	 * 
	 * @param flowIdOrKey
	 *            流程id or key
	 * @param user
	 *            会话用户
	 * @param cbh
	 *            请求数据
	 * @return Map{actId, insId}
	 * @throws WorkflowException
	 */
	public Map start(String flowIdOrKey, IUser user, CommonBean4HSQ cbh)
			throws WorkflowException {
		WorkflowManager manager = new WorkflowManager(conn);
		WFlow flow = manager.getWFlowByKey(flowIdOrKey);

		if (flow == null) {
			flow = manager.getWFlowById(flowIdOrKey);
		}

		return this.start(flow, user, cbh);
	}

	/**
	 * 流转过程开始
	 * 
	 * @param flow
	 *            流程
	 * @param user
	 *            会话用户
	 * @param cbh
	 *            请求数据
	 * @return Map{actId, insId}
	 * @throws WorkflowException
	 */
	public Map start(WFlow flow, IUser user, CommonBean4HSQ cbh)
			throws WorkflowException {
		if (flow.isEmpty() || flow.istep4start() == null) {
			throw new WorkflowException("can't start the empty flow("
					+ flow.ikey() + ").");
		}

		// 新生成的流程实例id
		String insId = this.createNewInstance(flow, user,
				(cbh.getRequest() != null ? cbh.getRequest().getRemoteAddr()
						: ""), 0);

		WStep theStep = flow.istep4start();

		String newActId = this.createHoldActivity(insId, theStep, user, cbh,
				user);

		Map map = new HashMap();

		map.put("actId", newActId);
		map.put("insId", insId);

		List<TableView> tableViewList = theStep.ihandleTableView();

		if (tableViewList != null && !tableViewList.isEmpty()) {
			WInstanceManager wim = new WInstanceManager(this.conn);

			WActivity theActivity = wim.getActivityByID(newActId);

			cbh.getResource().put("WACTIVITY", theActivity);

			TableViewDataManager tvdm = new TableViewDataManager(this.conn);

			// tableview返回值
			Map tableViewResultMap = new HashMap();

			map.put(theStep.ikey(), tableViewResultMap);

			for (int i = 0; i < tableViewList.size(); i++) {
				TableView tableView = tableViewList.get(i);

				try {
					Map resultMap = tvdm.remixTableViewData(tableView, cbh,
							null, true);

					Map temp = null;

					if (resultMap.containsKey(tableView.iprimarytable()
							.getPrimaryKey()[0])) {
						String pkId = (String) resultMap.get(tableView
								.iprimarytable().getPrimaryKey()[0]);

						this.createInstanceObject(insId, flow.iobject().ikey(),
								tableView.iprimarytable().getName(), pkId,
								tableView.id());

						temp = tvdm.getTableViewDataByPrimaryTableID(tableView,
								pkId, null);
					}

					tableViewResultMap.put(tableView.id(), temp);
				} catch (ISystemException ex) {
					throw new WorkflowException("start workflow(" + flow.ikey()
							+ ") error.", ex);
				}
			}
		} else {
			throw new WorkflowException("start workflow(" + flow.ikey()
					+ ") error, page views deletion.");
		}

		return map;
	}

	/**
	 * 流转经过开始节点自动进入第二环节
	 * 
	 * @param flowIdOrKey
	 *            流程id or key
	 * @param user
	 *            会话用户
	 * @param cbh
	 *            请求数据
	 * @return Map{actId, insId}
	 * @throws WorkflowException
	 */
	public Map catapult(String flowIdOrKey, IUser user, CommonBean4HSQ cbh)
			throws WorkflowException {
		WorkflowManager manager = new WorkflowManager(conn);
		WFlow flow = manager.getWFlowByKey(flowIdOrKey);

		if (flow == null) {
			flow = manager.getWFlowById(flowIdOrKey);
		}

		return this.catapult(flow, user, cbh);
	}

	/**
	 * 流转经过开始节点自动进入第二环节
	 * 
	 * @param flow
	 *            流程
	 * @param user
	 *            会话用户
	 * @param cbh
	 *            请求数据
	 * @return Map{actId, insId}
	 * @throws WorkflowException
	 */
	public Map catapult(WFlow flow, IUser user, CommonBean4HSQ cbh)
			throws WorkflowException {
		if (flow.isEmpty() || flow.istep4start() == null) {
			throw new WorkflowException(
					"can't automatic start and jump the empty workflow("
							+ flow.ikey() + ").");
		}

		if (flow.istep4start().inextHighHandedSteps().isEmpty()
				&& flow.istep4start().inextSteps().isEmpty()) {
			throw new WorkflowException("automatic start and jump workflow("
					+ flow.ikey() + ") failed, the start node is alone.");
		}

		// 新生成的流程实例id
		String insId = this.createNewInstance(flow, user,
				(cbh.getRequest() != null ? cbh.getRequest().getRemoteAddr()
						: ""), 0);

		WStep theStep = flow.istep4start();

		Map map = new HashMap();

		List<TableView> tableViewList = theStep.ihandleTableView();

		if (tableViewList != null && !tableViewList.isEmpty()) {

			TableViewDataManager tvdm = new TableViewDataManager(this.conn);

			// tableview返回值
			Map tableViewResultMap = new HashMap();

			map.put(theStep.ikey(), tableViewResultMap);

			for (int i = 0; i < tableViewList.size(); i++) {
				TableView tableView = tableViewList.get(i);

				try {
					Map resultMap = tvdm.remixTableViewData(tableView, cbh,
							null, true);

					Map temp = null;

					if (resultMap.containsKey(tableView.iprimarytable()
							.getPrimaryKey()[0])) {
						String pkId = (String) resultMap.get(tableView
								.iprimarytable().getPrimaryKey()[0]);

						this.createInstanceObject(insId, flow.iobject().ikey(),
								tableView.iprimarytable().getName(), pkId,
								tableView.id());

						temp = tvdm.getTableViewDataByPrimaryTableID(tableView,
								pkId, null);
					}

					tableViewResultMap.put(tableView.id(), temp);
				} catch (ISystemException ex) {
					throw new WorkflowException("start and jump workflow("
							+ flow.ikey() + ") error.", ex);
				}
			}

		} else {
			throw new WorkflowException("start and jump workflow("
					+ flow.ikey() + ") error, page views are not operable.");
		}

		String doneActId = this.createHoldActivity(insId, theStep, user, cbh,
				user);

		WInstanceManager wim = new WInstanceManager(this.conn);

		WActivity theActivity = wim.getActivityByID(doneActId);

		cbh.getResource().put("WACTIVITY", theActivity);

		cbh.getResource().put("actId", doneActId);
		cbh.getResource().put("theStepId", theStep.id());

		String newActId = this.run(flow, user, cbh);

		map.put("actId", newActId);
		map.put("insId", insId);

		return map;
	}

	/**
	 * 进入流转
	 * 
	 * @param flowIdOrKey
	 *            流程ID或Key
	 * @param user
	 *            会话用户
	 * @param cbh
	 *            请求数据
	 * @throws WorkflowException
	 */
	public Map inflow(String flowIdOrKey, IUser user, CommonBean4HSQ cbh)
			throws WorkflowException {
		WorkflowManager manager = new WorkflowManager(conn);
		WFlow flow = manager.getWFlowByKey(flowIdOrKey);

		if (flow == null) {
			flow = manager.getWFlowById(flowIdOrKey);
		}

		return this.inflow(flow, user, cbh);
	}

	/**
	 * 进入流转
	 * 
	 * @param flow
	 *            流程
	 * @param user
	 *            会话用户
	 * @param cbh
	 *            请求数据
	 * @throws WorkflowException
	 */
	public Map inflow(WFlow flow, IUser user, CommonBean4HSQ cbh)
			throws WorkflowException {
		if (flow.isEmpty() || flow.istep4start() == null) {
			throw new WorkflowException("can't enter the empty workflow("
					+ flow.ikey() + ").");
		}

		// 新生成的流程实例id
		String insId = this.createNewInstance(flow, user,
				(cbh.getRequest() != null ? cbh.getRequest().getRemoteAddr()
						: ""), 0);

		WStep theStep = flow.istep4start();

		String newActId = this.createHoldActivity(insId, theStep, user, cbh,
				user);

		// table-view in step
		List<TableView> tableViewList = flow.iobject().itableView();

		Map tableDataParam = new HashMap();

		if (tableViewList != null && !tableViewList.isEmpty()) {
			TableViewDataManager tvdm = new TableViewDataManager(conn);

			for (int i = 0; i < tableViewList.size(); i++) {
				// return dataBean for viewform
				TableView tableView = tableViewList.get(i);

				String pkId = StringTool.checkString(cbh.getResource().get(
						tableView.iprimarytable().getPrimaryColumn()
								.getFormName()));

				if (!pkId.equals("")) {
					try {
						Map resultMap = tvdm.getTableViewDataByPrimaryTableID(
								tableView, pkId, new BindingWorkflowObjectData(
										this, insId, flow));
						tableDataParam.put(tableView.id(), resultMap);
					} catch (ISystemException ex) {
						throw new WorkflowException("enter the workflow("
								+ flow.ikey() + ") failed.", ex);
					}

				}
			}

		}

		Map map = new HashMap();

		map.put("actId", newActId);
		map.put("insId", insId);
		map.put("beanData", tableDataParam);

		return map;
	}

	/**
	 * 流转过程运行
	 * 
	 * @param flow
	 *            流程
	 * @param user
	 *            会话用户
	 * @param cbh
	 *            请求数据
	 * @return newActId
	 * @throws WorkflowException
	 */
	public String run(WFlow flow, IUser user, CommonBean4HSQ cbh)
			throws WorkflowException {
		String actId = StringTool.checkString(cbh.getResource().get("actId"));

		// 当前环节id
		String theStepId = StringTool.checkString(cbh.getResource().get(
				"theStepId"));

		WStep theStep = flow.istep(theStepId);

		WInstanceManager wim = new WInstanceManager(this.conn);
		WActivity activity = wim.getActivityByID(actId);

		if (activity.istate() == 2) {
			throw new WorkflowException("activity(" + activity.id()
					+ ") has been completed.");
		}

		// 下一环节id
		String nextStepId = StringTool.checkString(cbh.getResource().get(
				"nextStepId"));
		WStep nextStep = !nextStepId.equals("") ? flow.istep(nextStepId) : null;

		String newActId = null;

		// 手动模式
		if (theStep.isenders() == 0) {
			// 手动提交
			// this.remixObjectData(obj, cbh, actId);

			String nextStepUserId = StringTool.checkString(cbh.getResource()
					.get("nextStepUser"));

			if (!nextStepUserId.equals("") && nextStep != null) {
				/*
				 * throw new WorkflowException( "next step user is null,
				 * workflow can't run.");
				 */

				// get next-step-user
				IUser nextStepUser = UserCenter.getInstance().getUserById(
						nextStepUserId);

				// 办结当前活动记录
				this.doneActivity(activity, cbh, nextStep, user);

				newActId = this.createNewActivity(activity, nextStep,
						nextStepUser, nextStepUser.igroup(), "0", "0", "", cbh,
						user);
			} else {
				System.out.println("next step user is null, step("
						+ theStep.ikey() + ") switch to automatic mode.");
			}

		}

		// 转自动模式
		if (newActId == null) {
			// auto submit
			List<WStep> nextSteps = theStep.inextHighHandedSteps();

			/*
			 * if (nextSteps == null || nextSteps.isEmpty()) { throw new
			 * WorkflowException("can't auto-submit-workflow(" + flow.id() + "),
			 * current-step(" + theStep.iname() + ") has not
			 * next-step-bythinking.'."); }
			 */

			// thinking handle result
			boolean rnt = true;

			for (int i = 0; i < nextSteps.size(); i++) {
				// throw it to next step
				nextStep = nextSteps.get(i);

				// go-to end step
				if (nextStep.itype() == -1) {
					boolean doFinish = this.handleEndStep(activity, nextStep,
							cbh, user);

					if (doFinish) {
						rnt = false;
						break;
					}
				} else {
					Object[] resStepUserGroup = wim.getResponseStepUSERGROUP(
							theStep, nextStep, activity);

					newActId = this.createNewActivity(activity, nextStep,
							(IUser) resStepUserGroup[0],
							(IGroup) resStepUserGroup[1], "0", "0", "", cbh,
							user);

					if (newActId != null) {
						this.doneActivity(activity, cbh, nextStep, user);
						rnt = false;
						break;
					}
				}
			}

			// successfully passed review
			if (rnt) {
				if (theStep.iblind()) {
					// auto back to last-activity-step
					WActivity lastActivity = activity.ilast();

					newActId = this.createNewActivity(activity, lastActivity
							.istep(), lastActivity.iexecutor().iuser(),
							lastActivity.iexecutor().iuser().igroup(), "0",
							"0", "", cbh, user);

					if (newActId != null) {
						this.doneActivity(activity, cbh, lastActivity.istep(),
								user);
					} else {
						throw new WorkflowException("return the node("
								+ nextStep.ikey() + ") from the node("
								+ activity.istep().ikey() + ") failed.");
					}
				} else {

					if (!nextStepId.equals("")) {
						// appoint next-step
						nextStep = flow.istep(nextStepId);

						if (nextStep.itype() == -1) {
							boolean canFinish = this.handleEndStep(activity,
									nextStep, cbh, user);

							if (!canFinish) {
								throw new WorkflowException(
										"finish workflow instance("
												+ activity.instance().id()
												+ ") failed at the node("
												+ activity.istep().ikey()
												+ ").");
							}
						} else {
							Object[] resStepUserGroup = wim
									.getResponseStepUSERGROUP(theStep,
											nextStep, activity);

							newActId = this.createNewActivity(activity,
									nextStep, (IUser) resStepUserGroup[0],
									(IGroup) resStepUserGroup[1], "0", "0", "",
									cbh, user);

							if (newActId != null) {
								this
										.doneActivity(activity, cbh, nextStep,
												user);
							} else if (theStep.iback()) {
								// can back, need back
								nextStep = theStep.iflow().istepK(
										theStep.ibackStep());

								if (nextStep == null) {
									throw new WorkflowException(
											"back node was not found("
													+ theStep.ibackStep()
													+ "), can't return the node from the node("
													+ theStep.ikey() + ").");
								}

								resStepUserGroup = wim.getBackStepUSERGROUP(
										nextStep, activity.instance());

								// go back to next step
								newActId = this.createNewActivity(activity,
										nextStep, (IUser) resStepUserGroup[0],
										(IGroup) resStepUserGroup[1], "0", "0",
										"", cbh, user);

								if (newActId != null) {
									this.doneActivity(activity, cbh, nextStep,
											user);
								} else {
									throw new WorkflowException(
											"return the node("
													+ theStep.ibackStep()
													+ ") from the node("
													+ theStep.ikey()
													+ ") error.");
								}
							} else {
								throw new WorkflowException(
										"can't flow to the node("
												+ nextStep.ikey()
												+ ") from the node("
												+ activity.istep().ikey()
												+ "), generate activity error.");
							}
						}
					} else {
						// 未指定下一步环节, 默认将当前环节指定的可退回节点作为下一步环节
						if (theStep.iback()) {
							// can back, need back
							nextStep = theStep.iflow().istepK(
									theStep.ibackStep());

							if (nextStep == null) {
								throw new WorkflowException(
										"perform return operation in unspecified next node case, but the back node("
												+ theStep.ibackStep()
												+ ") was not found, can't flow to the NODE from the node("
												+ theStep.ikey() + ")");
							}

							Object[] resStepUserGroup = wim
									.getBackStepUSERGROUP(nextStep, activity
											.instance());

							// go back to next step
							newActId = this.createNewActivity(activity,
									nextStep, (IUser) resStepUserGroup[0],
									(IGroup) resStepUserGroup[1], "0", "0", "",
									cbh, user);

							if (newActId != null) {
								this
										.doneActivity(activity, cbh, nextStep,
												user);
							} else {
								throw new WorkflowException(
										"perform return operation in unspecified next node case, return the node("
												+ nextStep.ikey()
												+ ") from the node("
												+ activity.istep().ikey()
												+ ") error.");
							}
						} else {
							// not appoint next-step, get(0) as
							// default-next-step 需手工提交的环节
							List<WStep> nextHandSteps = theStep.inextSteps();

							if (!nextHandSteps.isEmpty()) {
								nextStep = nextHandSteps.get(0);
							} else {
								// 将智能提交的环节的最后一个作为默认的跳跃点, 将跳跃点的下一环节[0]作为默认的下一环节
								WStep jumpStep = nextSteps
										.get(nextSteps.size() - 1);

								List<WStep> landSteps = jumpStep.inextSteps();

								if (landSteps.isEmpty()) {
									throw new WorkflowException(
											"worflow("
													+ flow.ikey()
													+ ") automatic flow error in unspecified next node case, nodes can reach was not found from jump node("
													+ jumpStep.ikey() + ").");
								}

								nextStep = landSteps.get(0);
							}

							if (nextStep == null) {
								throw new WorkflowException(
										"worflow("
												+ flow.ikey()
												+ ") automatic flow error in unspecified next node case, nodes can reach was not found.");
							}

							// jump to next step
							if (nextStep.itype() == -1) {
								boolean canFinish = this.handleEndStep(
										activity, nextStep, cbh, user);

								if (!canFinish) {
									throw new WorkflowException(
											"finish workflow instance("
													+ activity.instance().id()
													+ ") failed at the node ("
													+ activity.istep().ikey()
													+ ") in unspecified next node case.");
								}
							} else {
								Object[] resStepUserGroup = wim
										.getResponseStepUSERGROUP(theStep,
												nextStep, activity);

								newActId = this.createNewActivity(activity,
										nextStep, (IUser) resStepUserGroup[0],
										(IGroup) resStepUserGroup[1], "0", "0",
										"", cbh, user);

								if (newActId != null) {
									this.doneActivity(activity, cbh, nextStep,
											user);
								} else {
									throw new WorkflowException(
											"in unspecified next node case, automatic flow to the node("
													+ activity.istep().ikey()
													+ ") from the node("
													+ nextStep.ikey()
													+ ") failed.");
								}
							}
						}
					}
				}
			}
		}

		return newActId;
	}

	/**
	 * 流转过程运行
	 * 
	 * @param theActivity
	 *            当前环节
	 * @param nextStep
	 *            下一环节
	 * @param user
	 *            会话用户
	 * @param cbh
	 *            请求数据
	 * @return newActId
	 * @throws WorkflowException
	 */
	public String run(WActivity activity, IUser user, WStep nextStep,
			IUser nextStepUser, CommonBean4HSQ cbh) throws WorkflowException {
		if (activity.istate() == 2) {
			throw new WorkflowException("activity(" + activity.id()
					+ ") has been completed.");
		}

		WFlow flow = activity.instance().iflow();

		WStep theStep = activity.istep();

		String newActId = null;

		// 手动模式
		if (theStep.isenders() == 0) {
			// 手动提交
			// this.remixObjectData(obj, cbh, actId);

			if (nextStepUser != null) {
				/*
				 * throw new WorkflowException( "next step user is null,
				 * workflow can't run.");
				 */

				// 办结当前活动记录
				this.doneActivity(activity, cbh, nextStep, user);

				newActId = this.createNewActivity(activity, nextStep,
						nextStepUser, nextStepUser.igroup(), "0", "0", "", cbh,
						user);
			} else {
				System.out.println("next step user is null, step("
						+ theStep.ikey() + ") switch to automatic mode.");
			}

		}

		// 转自动模式
		if (newActId == null) {
			WInstanceManager wim = new WInstanceManager(this.conn);

			// auto submit
			List<WStep> nextSteps = theStep.inextHighHandedSteps();

			/*
			 * if (nextSteps == null || nextSteps.isEmpty()) { throw new
			 * WorkflowException("can't auto-submit-workflow(" + flow.id() + "),
			 * current-step(" + theStep.iname() + ") has not
			 * next-step-bythinking.'."); }
			 */

			// thinking handle result
			boolean rnt = true;

			for (int i = 0; i < nextSteps.size(); i++) {
				// throw it to next step
				nextStep = nextSteps.get(i);

				if (nextStep.itype() == -1) {
					boolean doFinish = this.handleEndStep(activity, nextStep,
							cbh, user);

					if (doFinish) {
						rnt = false;
						break;
					}
				} else {
					Object[] resStepUserGroup = wim.getResponseStepUSERGROUP(
							theStep, nextStep, activity);

					newActId = this.createNewActivity(activity, nextStep,
							(IUser) resStepUserGroup[0],
							(IGroup) resStepUserGroup[1], "0", "0", "", cbh,
							user);

					if (newActId != null) {
						this.doneActivity(activity, cbh, nextStep, user);
						rnt = false;
						break;
					}
				}
			}

			// successfully passed review
			if (rnt) {
				if (theStep.iblind()) {
					// auto back to last-activity-step
					WActivity lastActivity = activity.ilast();

					newActId = this.createNewActivity(activity, lastActivity
							.istep(), lastActivity.iexecutor().iuser(),
							lastActivity.iexecutor().iuser().igroup(), "0",
							"0", "", cbh, user);

					if (newActId != null) {
						this.doneActivity(activity, cbh, lastActivity.istep(),
								user);
					} else {
						throw new WorkflowException("fail to reutrn the node("
								+ nextStep.ikey() + ") from the node("
								+ activity.istep().ikey() + ").");
					}
				} else {

					if (nextStep != null) {
						// appoint next-step
						if (nextStep.itype() == -1) {
							boolean canFinish = this.handleEndStep(activity,
									nextStep, cbh, user);

							if (!canFinish) {
								throw new WorkflowException(
										"finish workflow instance("
												+ activity.instance().id()
												+ ") failed at the node("
												+ activity.istep().ikey()
												+ ").");
							}
						} else {
							Object[] resStepUserGroup = wim
									.getResponseStepUSERGROUP(theStep,
											nextStep, activity);

							newActId = this.createNewActivity(activity,
									nextStep, (IUser) resStepUserGroup[0],
									(IGroup) resStepUserGroup[1], "0", "0", "",
									cbh, user);

							if (newActId != null) {
								this
										.doneActivity(activity, cbh, nextStep,
												user);
							} else if (theStep.iback()) {
								// can back, need back
								nextStep = theStep.iflow().istepK(
										theStep.ibackStep());

								if (nextStep == null) {
									throw new WorkflowException(
											"the back node was not found("
													+ theStep.ibackStep()
													+ "), can't return the Node from the node("
													+ theStep.ikey() + ").");
								}

								resStepUserGroup = wim.getBackStepUSERGROUP(
										nextStep, activity.instance());

								// go back to next step
								newActId = this.createNewActivity(activity,
										nextStep, (IUser) resStepUserGroup[0],
										(IGroup) resStepUserGroup[1], "0", "0",
										"", cbh, user);

								if (newActId != null) {
									this.doneActivity(activity, cbh, nextStep,
											user);
								} else {
									throw new WorkflowException(
											"fail to return the node ("
													+ theStep.ibackStep()
													+ ") from the node("
													+ theStep.ikey() + ").");
								}
							} else {
								throw new WorkflowException(
										"fail to flow to the node("
												+ nextStep.ikey()
												+ ") from the node("
												+ activity.istep().ikey()
												+ ").");
							}
						}
					} else {
						// 可退回指定节点
						if (theStep.iback()) {
							// can back, need back
							nextStep = theStep.iflow().istepK(
									theStep.ibackStep());

							if (nextStep == null) {
								throw new WorkflowException(
										"in unspecified next node case, the back node("
												+ theStep.ibackStep()
												+ ") was not found, can't return the NODE from the node("
												+ theStep.ikey() + ").");
							}

							Object[] resStepUserGroup = wim
									.getBackStepUSERGROUP(nextStep, activity
											.instance());

							// go back to next step
							newActId = this.createNewActivity(activity,
									nextStep, (IUser) resStepUserGroup[0],
									(IGroup) resStepUserGroup[1], "0", "0", "",
									cbh, user);

							if (newActId != null) {
								this
										.doneActivity(activity, cbh, nextStep,
												user);
							} else {
								throw new WorkflowException(
										"in unspecified next node case, can't return the node("
												+ nextStep.ikey()
												+ ") from the node("
												+ activity.istep().ikey()
												+ "), fail to generate activity.");
							}
						} else {
							// not appoint next-step, get(0) as
							// default-next-step
							List<WStep> nextHandSteps = theStep.inextSteps();

							if (!nextHandSteps.isEmpty()) {
								nextStep = nextHandSteps.get(0);
							} else {
								WStep jumpStep = nextSteps
										.get(nextSteps.size() - 1);

								List<WStep> landSteps = jumpStep.inextSteps();

								if (landSteps.isEmpty()) {
									throw new WorkflowException(
											"workflow("
													+ flow.ikey()
													+ ") fail to automatic flow in unspecified next node case, nodes can reach not found from the jump-node("
													+ jumpStep.ikey() + ").");
								}

								nextStep = landSteps.get(0);
							}

							if (nextStep == null) {
								throw new WorkflowException(
										"workflow("
												+ flow.ikey()
												+ ") fail to automatic flow in unspecified next node case, nodes can reach not found.");
							}

							// jump to next step
							if (nextStep.itype() == -1) {
								boolean canFinish = this.handleEndStep(
										activity, nextStep, cbh, user);

								if (!canFinish) {
									throw new WorkflowException(
											"fail to finish workflow instance("
													+ activity.instance().id()
													+ ") at the node("
													+ activity.istep().ikey()
													+ ") in unspecified next node case.");
								}
							} else {
								Object[] resStepUserGroup = wim
										.getResponseStepUSERGROUP(theStep,
												nextStep, activity);

								newActId = this.createNewActivity(activity,
										nextStep, (IUser) resStepUserGroup[0],
										(IGroup) resStepUserGroup[1], "0", "0",
										"", cbh, user);

								if (newActId != null) {
									this.doneActivity(activity, cbh, nextStep,
											user);
								} else {
									throw new WorkflowException(
											"fail to flow to the node("
													+ nextStep.ikey()
													+ ") from the node("
													+ activity.istep().ikey()
													+ ") in unspecified next node case.");
								}
							}
						}
					}
				}
			}
		}

		return newActId;
	}

	/**
	 * 流转过程运行
	 * 
	 * @param flow
	 *            流程
	 * @param user
	 *            会话用户
	 * @param cbh
	 *            请求数据
	 * @throws WorkflowException
	 */
	public void back(WFlow flow, IUser user, CommonBean4HSQ cbh)
			throws WorkflowException {
		String actId = StringTool.checkString(cbh.getResource().get("actId"));

		WInstanceManager wim = new WInstanceManager(this.conn);
		WActivity activity = wim.getActivityByID(actId);

		if (activity.ilast() == null) {
			throw new WorkflowException("workflow(" + activity.id()
					+ ") fail to reurn, can't find last activity.");
		}

		WStep nextStep = activity.ilast().istep();

		// get next-step-user
		IUser nextStepUser = activity.ilast().iexecutor().iuser();

		// get next-step-group
		IGroup nextStepGroup = activity.ilast().iexecutor().iunit();

		// 办结当前活动记录
		this.doneActivity(activity, cbh, nextStep, user);

		String newActId = this.createNewActivity(activity, nextStep,
				nextStepUser, nextStepGroup, "0", "0", "", cbh, user);
	}

	/**
	 * finish flow instance
	 * 
	 * @param flow
	 * @param user
	 * @param cbh
	 * @param yesorno
	 * @throws WorkflowException
	 */
	public void finish(WFlow flow, IUser user, CommonBean4HSQ cbh,
			String yesorno) throws WorkflowException {
		String actId = StringTool.checkString(cbh.getResource().get("actId"));
		String insId = StringTool.checkString(cbh.getResource().get("insId"));

		WInstanceManager wim = new WInstanceManager(this.conn);
		WActivity activity = wim.getActivityByID(actId);

		activity.instance().iyesorno(yesorno);

		this.doneActivity(activity, cbh, activity.instance().iflow()
				.istep4end(), user);

		this.updateInstanceStateYESORNO(insId, user, 1, activity.instance()
				.iyesorno());

		this.updateInstanceStatus(insId, user, activity.instance().iflow()
				.istep4end());
	}

	/**
	 * finish flow instance at current-activity
	 * 
	 * @param flow
	 * @param user
	 * @param cbh
	 * @param yesorno
	 * @throws WorkflowException
	 */
	public void finish(WActivity activity, IUser user, CommonBean4HSQ cbh,
			String yesorno) throws WorkflowException {
		activity.instance().iyesorno(yesorno);

		this.doneActivity(activity, cbh, activity.instance().iflow()
				.istep4end(), user);

		this.updateInstanceStateYESORNO(activity.instance().id(), user, 1,
				activity.instance().iyesorno());

		this.updateInstanceStatus(activity.instance().id(), user, activity
				.instance().iflow().istep4end());
	}

	/**
	 * finish flow instance from external range
	 * 
	 * @param insId
	 * @param yesorno
	 * @param user
	 * @throws WorkflowException
	 */
	public void finish(String insId, String yesorno, IUser user)
			throws WorkflowException {
		WInstanceManager wim = new WInstanceManager(this.conn);

		WInstance instance = wim.getInstanceByID(insId);

		if (instance.istate() == 1) {
			throw new WorkflowException("fail to finish instance(" + insId
					+ "), instanc has been finished.");
		}

		instance.iyesorno(yesorno);

		if (instance.imaxactivity() != null
				&& instance.imaxactivity().istate() != 2) {
			this.doneActivity(instance.imaxactivity(), null, instance.iflow()
					.istep4end(), user);
		}

		this.updateInstanceStateYESORNO(insId, user, 1, instance.iyesorno());

		this.updateInstanceStatus(insId, user, instance.iflow().istep4end());
	}

	/**
	 * finish flow instance from external range
	 * 
	 * @param insId
	 * @param yesorno
	 * @param user
	 * @throws WorkflowException
	 */
	public void finish(WInstance instance, String yesorno, IUser user)
			throws WorkflowException {
		if (instance == null) {
			throw new WorkflowException(
					"fail to finish instance, instance is null.");
		}

		if (instance.istate() == 1) {
			throw new WorkflowException("fail to finish instance("
					+ instance.id() + "), instanc has been finished.");
		}

		instance.iyesorno(yesorno);

		if (instance.imaxactivity() != null
				&& instance.imaxactivity().istate() != 2) {
			this.doneActivity(instance.imaxactivity(), null, instance.iflow()
					.istep4end(), user);
		}

		this.updateInstanceStateYESORNO(instance.id(), user, 1, instance
				.iyesorno());

		this.updateInstanceStatus(instance.id(), user, instance.iflow()
				.istep4end());
	}

	/**
	 * reboot flow instance
	 * 
	 * @param flow
	 * @param user
	 * @param cbh
	 * @param yesorno
	 * @throws WorkflowException
	 */
	public void reboot(String insId, IUser user) throws WorkflowException {
		this.updateInstanceState(insId, user, 0);
	}

	/**
	 * 工作流程任务分配
	 * 
	 * @param actId
	 * @param userIds
	 *            待分配人员ID
	 * @param sessionUser
	 * @param ip
	 * @param source
	 * @param loanId
	 * @throws WorkflowException
	 */
	public void assignWorkTask(String actId, String source, String loanId,
			String userId, IUser sessionUser, String ip)
			throws WorkflowException {
		IUser user = UserCenter.getInstance().getUserById(userId);

		if (user == null) {
			throw new WorkflowException(
					"the assignment of personnel is empty, can't assign the task.");
		}

		if (this.trimmerI.haveMoreData(
				"SELECT A_ID FROM WF_ACTIVITY WHERE A_ID = ? AND A_STATE = 2",
				actId)) {
			// throw new WorkflowException("当前任务已办理结束,不能进行任务分配.");
		} else {
			// 获取操作前的流程记录
			WInstanceManager wim = new WInstanceManager(this.conn);
			WActivity theActivity = wim.getActivityByID(actId);

			this.relockActivity(actId, ip, user);

			saveAssignLog(theActivity, sessionUser, user, ip, source, loanId);
		}

	}

	/**
	 * 保存分配日志
	 * 
	 * @param theActivity
	 * @param sessionUser
	 * @param user
	 * @param ip
	 * @param loanId
	 * @param loanStatus
	 */
	@SuppressWarnings("unchecked")
	private void saveAssignLog(WActivity theActivity, IUser sessionUser,
			IUser user, String ip, String source, String loanId)
			throws WorkflowException {

		SimpleBean4TableImpl bean = new SimpleBean4TableImpl("WF_ASSIGN_LOG");
		bean.getResource().put("A_ID", theActivity.id());
		bean.getResource().put("LOANID", loanId);
		bean.getResource().put("LOAN_STATUS",
				theActivity.instance().icurrntStatus());
		bean.getResource().put(
				"OLD_PROCESSER_ID",
				theActivity.iexecutor().iuser() == null ? "" : theActivity
						.iexecutor().iuser().id());
		bean.getResource().put(
				"OLD_PROCESSER_NAME",
				theActivity.iexecutor().iuser() == null ? "" : theActivity
						.iexecutor().iuser().iname());
		bean.getResource().put("ASSIGN_USER_ID", sessionUser.id());
		bean.getResource().put("ASSIGN_USER_NAME", sessionUser.iname());
		bean.getResource().put("ASSIGN_TIME", DateTrimmer.getYMDHMS());
		bean.getResource().put("ASSIGN_IP", ip);
		bean.getResource().put("NEW_PROCESSER_ID", user.id());
		bean.getResource().put("NEW_PROCESSER_NAME", user.iname());
		bean.getResource().put("SOURCE", source);

		try {
			this.bwutil.manualSave1(bean, this.conn);
		} catch (Exception ex) {
			throw new WorkflowException("fail to assign activity("
					+ theActivity.id() + ").", ex);
		}
	}

	/**
	 * remix object data
	 * 
	 * @param flow
	 * @param cbh
	 * @param actId
	 *            活动记录ID
	 * @return Map
	 * @throws WorkflowException
	 */
	public Map remixObjectData(WObject obj, CommonBean4HSQ cbh, String actId)
			throws WorkflowException {

		List tables = obj.itables();

		Map result = new HashMap();

		if (tables != null && !tables.isEmpty()) {
			for (int i = 0; i < tables.size(); i++) {
				Table table = (Table) tables.get(i);

				if (obj.handleTable(table) == 0) {
					SimpleBean sb = BaseworkUtil.analyzerSimpleBean(table, cbh);

					if (!result.isEmpty()) {
						/* 去除脏主键数据 */
						if (table.hasPrimaryKey()) {
							result.remove(table.getPrimaryKey()[0]);
						}

						List colsList = table.foreignKeyColumns();
						Iterator iter = colsList.iterator();

						/* 设置外键 */
						while (iter.hasNext()) {
							Column column = (Column) iter.next();

							/* 结果集存在外键值 */
							if (result.containsKey(column.getForeignColumn())) {
								Object value = result.get(column
										.getForeignColumn());
								sb.getResource().put(column.getFormName(),
										value);
							}
						}

						sb.getResource().putAll(result);
					}

					try {

						Map temp = this.bwutil.manualRemix(table, sb, conn);

						result.putAll(temp);

						// create flow activity with object data
						this.createActivityObject(actId, obj.ikey(), table
								.getName(), (String) temp.get(table
								.getPrimaryKey()[0]), "");
					} catch (Exception ex) {
						throw new WorkflowException(
								"fail to save data of table(" + table.getName()
										+ ") of object(" + obj.ikey() + ").",
								ex);
					}
				} else if (obj.handleTable(table) == 1) {
					String counterName = obj.countName(table);

					List list = BaseworkUtil.analyzerSimpleBean(table,
							counterName, cbh);

					if ((list != null) && !list.isEmpty()) {
						for (int j = 0; j < list.size(); j++) {
							SimpleBean sb = (SimpleBean) list.get(j);

							if (!result.isEmpty()) {
								List colsList = table.foreignKeyColumns();
								Iterator iter = colsList.iterator();

								/* 设置外键 */
								while (iter.hasNext()) {
									Column column = (Column) iter.next();

									/* 结果集存在外键值 */
									if (result.containsKey(column
											.getForeignColumn())) {
										Object value = result.get(column
												.getForeignColumn());
										sb.getResource().put(
												column.getFormName(), value);
									}
								}
							}

							try {
								Map temp = this.bwutil.manualRemix(table, sb,
										conn);

								// create flow activity with object data
								this.createActivityObject(actId, obj.ikey(),
										table.getName(), (String) temp
												.get(table.getPrimaryKey()[0]),
										"");
							} catch (Exception ex) {
								throw new WorkflowException(
										"fail to save data of table("
												+ table.getName()
												+ ") of object(" + obj.ikey()
												+ ").", ex);
							}

						}
					}
				}
			}
		}

		return result;
	}

	/**
	 * flow keep data
	 * 
	 * @param flow
	 * @param cbh
	 * @return Map
	 * @throws WorkflowException
	 */
	public Map keepData(TableView view, CommonBean4HSQ cbh)
			throws WorkflowException {

		List tableList = new ArrayList();

		tableList.add(view.iprimarytable());

		Table[] tables = view.iforeigntables();

		if (tables != null && tables.length > 0) {
			for (int i = 0; i < tables.length; i++) {
				tableList.add(tables[i]);
			}
		}

		Map result = new HashMap();

		if (tableList != null && !tableList.isEmpty()) {
			for (int i = 0; i < tableList.size(); i++) {
				Table table = (Table) tableList.get(i);

				if (view.ihandletype(table.getFakeName()).equals("single")) {
					SimpleBean sb = BaseworkUtil.analyzerSimpleBean(table, cbh);

					if (!result.isEmpty()) {
						/* 去除脏主键数据 */
						if (table.hasPrimaryKey()) {
							result.remove(table.getPrimaryKey()[0]);
						}

						List colsList = table.foreignKeyColumns();
						Iterator iter = colsList.iterator();

						/* 设置外键 */
						while (iter.hasNext()) {
							Column column = (Column) iter.next();

							/* 结果集存在外键值 */
							if (result.containsKey(column.getForeignColumn())) {
								Object value = result.get(column
										.getForeignColumn());
								sb.getResource().put(column.getFormName(),
										value);
							}
						}

						sb.getResource().putAll(result);
					}

					try {

						Map temp = this.bwutil.manualRemix(table, sb, conn);

						result.putAll(temp);
					} catch (Exception ex) {
						throw new WorkflowException(
								"fail to save data of table(" + table.getName()
										+ ").", ex);
					}
				} else if (view.ihandletype(table.getFakeName())
						.equals("multi")) {
					String counterName = view.icountername(table.getFakeName());

					List list = BaseworkUtil.analyzerSimpleBean(table,
							counterName, cbh);

					if ((list != null) && !list.isEmpty()) {
						for (int j = 0; j < list.size(); j++) {
							SimpleBean sb = (SimpleBean) list.get(j);

							if (!result.isEmpty()) {
								List colsList = table.foreignKeyColumns();
								Iterator iter = colsList.iterator();

								/* 设置外键 */
								while (iter.hasNext()) {
									Column column = (Column) iter.next();

									/* 结果集存在外键值 */
									if (result.containsKey(column
											.getForeignColumn())) {
										Object value = result.get(column
												.getForeignColumn());
										sb.getResource().put(
												column.getFormName(), value);
									}
								}
							}

							try {
								Map temp = this.bwutil.manualRemix(table, sb,
										conn);

							} catch (Exception ex) {
								throw new WorkflowException(
										"fail to save data of table("
												+ table.getName() + ").", ex);
							}

						}
					}
				}
			}
		}

		return result;
	}

	/**
	 * 创建流程实例
	 * 
	 * @param flow
	 *            流程类别
	 * @param user
	 *            办理人员
	 * @param ip
	 *            ip
	 * @param state
	 *            实例状态
	 * @throws WorkflowException
	 */
	public String createNewInstance(WFlow flow, IUser user, String ip, int state)
			throws WorkflowException {

		IGroup group = user.igroup();

		SimpleBean bean = new SimpleBeanImpl();

		if (flow.itype().equals("free")) {
			bean.getResource().put("gid", "0");
		} else {
			bean.getResource().put("gid", flow.id());
		}

		String theDate = DateTrimmer.getYMDHMS();

		bean.getResource().put("insstime", theDate);
		bean.getResource().put("insutime", theDate);
		bean.getResource().put("insetime", "");
		bean.getResource().put("insltime", "");
		bean.getResource().put("insstate", state);
		bean.getResource().put("inscreatorid", user.id());
		bean.getResource().put("inscreatorname", user.iname());
		bean.getResource().put("inscunitid", (group != null) ? group.id() : "");
		bean.getResource().put("inscunitname",
				(group != null) ? group.iname() : "");

		bean.getResource().put("instype", flow.itype());
		bean.getResource().put("insobject", flow.iobject().ikey());
		bean.getResource().put("insempty", 0);

		String id = null;

		try {
			Map info = this.bwutil.manualSave("WF_INSTANCE", bean, conn);
			id = (String) info.get("INS_ID");

			LogManager lm = new LogManager(conn);

			lm.log(user, ip, "", "", "WF_INSTANCE", "save", StringTool
					.checkString(info));
		} catch (ProcessorException ex) {
			throw new WorkflowException("fail to generate instance.", ex);
		}

		return id;
	}

	/**
	 * 更新实例状态
	 * 
	 * @param insId
	 *            实例ID
	 * @param user
	 *            办理人员
	 * @param state
	 *            实例状态
	 * @throws WorkflowException
	 */
	private void updateInstanceState(String insId, IUser user, int state)
			throws WorkflowException {
		SimpleBean bean = new SimpleBeanImpl();

		bean.getResource().put("insid", insId);
		bean.getResource().put("insstate", state);

		try {
			this.bwutil.manualUpdate("WF_INSTANCE", bean, conn);
		} catch (ProcessorException ex) {
			throw new WorkflowException("fail to update instance(" + insId
					+ ") status.", ex);
		}
	}

	/**
	 * 更新实例决议
	 * 
	 * @param insId
	 *            实例ID
	 * @param user
	 *            办理人员
	 * @param state
	 *            实例状态
	 * @throws WorkflowException
	 */
	private void updateInstanceYESORNO(String insId, IUser user, String yesorno)
			throws WorkflowException {
		SimpleBean bean = new SimpleBeanImpl();

		bean.getResource().put("insid", insId);
		bean.getResource().put("insyesorno", yesorno);

		try {
			this.bwutil.manualUpdate("WF_INSTANCE", bean, conn);
		} catch (ProcessorException ex) {
			throw new WorkflowException("fail to update instance(" + insId
					+ ") handle status.", ex);
		}
	}

	/**
	 * 更新实例状态
	 * 
	 * @param insId
	 *            实例ID
	 * @param user
	 *            办理人员
	 * @param state
	 *            实例状态
	 * @throws WorkflowException
	 */
	private void updateInstanceStateYESORNO(String insId, IUser user,
			int state, String yesorno) throws WorkflowException {
		SimpleBean bean = new SimpleBeanImpl();

		bean.getResource().put("insid", insId);
		bean.getResource().put("insstate", state);
		bean.getResource().put("insyesorno", yesorno);
		bean.getResource().put("insutime", DateTrimmer.getYMDHMS());
		if (state == 1) {
			bean.getResource().put("insetime", DateTrimmer.getYMDHMS());
		}

		try {
			this.bwutil.manualUpdate("WF_INSTANCE", bean, conn);
		} catch (ProcessorException ex) {
			throw new WorkflowException("fail to update instance(" + insId
					+ ") all status.", ex);
		}
	}

	/**
	 * update instance current-status
	 * 
	 * @param insId
	 * @param user
	 * @param nowStep
	 * @throws WorkflowException
	 */
	private void updateInstanceStatus(String insId, IUser user, WStep nowStep)
			throws WorkflowException {
		SimpleBean bean = new SimpleBeanImpl();

		bean.getResource().put("insid", insId);
		bean.getResource().put("inscrstid", nowStep.id());
		bean.getResource().put("inscrst", nowStep.iname());
		bean.getResource().put("insutime", DateTrimmer.getYMDHMS());

		try {
			this.bwutil.manualUpdate("WF_INSTANCE", bean, conn);
		} catch (ProcessorException ex) {
			throw new WorkflowException("fail to update instance(" + insId
					+ ") status.", ex);
		}
	}

	/**
	 * 更新活动记录状态
	 * 
	 * @param actId
	 *            记录ID
	 * @param user
	 *            会话用户
	 * @param state
	 *            记录状态
	 * @throws WorkflowException
	 */
	private void updateActivityState(String actId, IUser user, int state)
			throws WorkflowException {
		SimpleBean bean = new SimpleBeanImpl();

		bean.getResource().put("aid", actId);
		bean.getResource().put("astate", state);

		if (state == 1) {
			bean.getResource().put("alocktime", DateTrimmer.getYMDHMS());
		} else if (state == 2) {
			bean.getResource().put("aetime", DateTrimmer.getYMDHMS());
		}

		try {
			this.bwutil.manualUpdate("WF_ACTIVITY", bean, conn);
		} catch (ProcessorException ex) {
			throw new WorkflowException("fail to update activity(" + actId
					+ ") status.", ex);
		}
	}

	/**
	 * 初始化工作流（多用于删除已存在的工作流测试数据）
	 * 
	 * @param flow
	 *            工作流
	 * @param user
	 *            操作用户（必须具有admin权限）
	 * @throws WorkflowException
	 */
	public void reinit(WFlow flow, IUser user) throws WorkflowException {
		if (!ISystemContext.isAdmin(user)) {
			throw new WorkflowException(
					"no permissions to initialize the workflow(" + flow.ikey()
							+ ").");
		}

		String sql = "SELECT INS_ID FROM WF_INSTANCE WHERE CG_ID = "
				+ flow.id();

		List list = this.trimmer.searchMultiData(sql);

		if ((list != null) && !list.isEmpty()) {
			WInstanceManager wim = new WInstanceManager(conn);

			for (int i = 0; i < list.size(); i++) {
				Map info = (Map) list.get(i);

				String insId = (String) info.get("INS_ID");

				WInstance instance = wim.getInstanceByID(insId);

				wim.deleteInstance(instance, user);

			}
		}
	}

	/**
	 * 锁定活动记录
	 * 
	 * @param aid
	 *            记录ID
	 * @param user
	 *            锁定人
	 */
	public boolean hasLockActivity(String aid) {
		String sql = "SELECT A_LOCKID FROM WF_ACTIVITY WHERE A_ID = ? AND A_LOCK = 1";

		return this.trimmerI.haveMoreData(sql, aid);
	}

	/**
	 * 锁定活动记录
	 * 
	 * @param aid
	 *            记录ID
	 * @param user
	 *            锁定人
	 */
	public void lockActivity(String aid, String ip, IUser user)
			throws WorkflowException {
		String sql = "SELECT A_STATE,A_LOCK,WF_ACTIVITY.USER_ID FROM WF_ACTIVITY WHERE WF_ACTIVITY.A_ID = ?";

		Map info = this.trimmerI.searchSingleData(sql, aid);

		if (info != null) {
			String lock = (String) info.get("A_LOCK");
			String userId = (String) info.get("USER_ID");

			if (!user.id().equals(userId) && !userId.equals("-1")) {
				throw new WorkflowException(
						"activity("
								+ aid
								+ ") has been locked by others, you have no permission to relock it.");
			}

			if (lock.equals("0")) {
				sql = "UPDATE WF_ACTIVITY SET A_LOCK = 1, A_LOCKID = ? ,A_LOCKNAME = ?, A_LOCKTIME = ?, A_STATE = 1, E_IP = ? WHERE A_ID = ?";

				if (!this.trimmerI.execute(sql, user.id(), user.iname(),
						DateTrimmer.getYMDHMS(), ip, aid)) {
					throw new WorkflowException("fail to lock activity(" + aid
							+ ").");
				}

				if (userId.equals("-1")) {
					sql = "UPDATE WF_ACTIVITY SET USER_ID = ?, USER_NAME = ?, UNIT_ID = ?, UNIT_NAME = ?  WHERE A_ID = ?";

					if (!this.trimmerI.execute(sql, user.id(), user.iname(),
							user.igroup().id(), user.igroup().iname(), aid)) {
						throw new WorkflowException(
								"fail to lock activity("
										+ aid
										+ "), an error occurred when update locker info.");
					}
				}

				WInstanceManager wim = new WInstanceManager(this.conn);

				WActivity theActivity = wim.getActivityByID(aid);

				WStep currentStep = theActivity.istep();

				List lockedHandlers = currentStep.iplug4locked();

				if (lockedHandlers != null && !lockedHandlers.isEmpty()) {
					if (lockedHandlers != null && !lockedHandlers.isEmpty()) {
						SimpleBean bean = new SimpleBeanImpl();

						bean.getResource().put("GWE", this);
						bean.getResource().put("theActivity", theActivity);

						for (int j = 0; j < lockedHandlers.size(); j++) {
							String className = (String) lockedHandlers.get(j);
							WPlugHandler lockedHandler = this
									.initWPlugHandler(className);
							lockedHandler.participate(conn, bean);
						}
					}
				}
			}
		} else {
			throw new WorkflowException("fail to lock activity(" + aid
					+ "), activity is null.");
		}
	}

	/**
	 * 重新锁定活动记录
	 * 
	 * @param aid
	 *            记录ID
	 * @param user
	 *            锁定人
	 */
	public void relockActivity(String aid, String ip, IUser user)
			throws WorkflowException {
		String sql = "UPDATE WF_ACTIVITY SET A_LOCK = 1, A_LOCKID = ? ,A_LOCKNAME = ?, A_LOCKTIME = ?, A_STATE = 1, USER_ID = ?, USER_NAME = ?, UNIT_ID = ?, UNIT_NAME= ?, E_IP = ? WHERE A_ID = ?";

		if (!this.trimmerI.execute(sql, user.id(), user.iname(), DateTrimmer
				.getYMDHMS(), user.id(), user.iname(), user.igroup().id(), user
				.igroup().iname(), ip, aid)) {
			throw new WorkflowException("fail to relock activity(" + aid + ").");
		}
	}

	/**
	 * 办结活动记录
	 * 
	 * @param activity
	 * @param cbh
	 * @param nextStep
	 * @param user
	 * @throws WorkflowException
	 */
	public void doneActivity(WActivity activity, CommonBean4HSQ cbh,
			WStep nextStep, IUser user) throws WorkflowException {
		this.updateActivityState(activity.id(), user, 2);

		List outroHandlers = activity.istep().iplug4outro();

		if (outroHandlers != null && !outroHandlers.isEmpty()) {
			if (outroHandlers != null && !outroHandlers.isEmpty()) {
				SimpleBean sbean = new SimpleBeanImpl();

				sbean.getResource().put("GWE", this);
				sbean.getResource().put("CBH", cbh);
				sbean.getResource().put("USER", user);
				sbean.getResource().put("nextStep", nextStep);
				sbean.getResource().put("theActivity", activity);

				for (int j = 0; j < outroHandlers.size(); j++) {
					String className = (String) outroHandlers.get(j);

					WPlugHandler outroHandler = this
							.initWPlugHandler(className);

					outroHandler.participate(conn, sbean);
				}
			}
		}
	}

	/**
	 * 锁定上一活动记录
	 * 
	 * @param aid
	 *            记录ID
	 * @param user
	 *            锁定人
	 * 
	 * public void releaseActivity(String aid, IUser user) { String sql =
	 * "SELECT A_LASTID FROM WF_ACTIVITY WHERE A_ID = " + aid;
	 * 
	 * Map info = this.trimmer.searchSingleData(sql);
	 * 
	 * String lastid = (String) info.get("A_LASTID");
	 * 
	 * if (!lastid.equals("") && !lastid.equals("0")) { sql = "UPDATE
	 * WF_ACTIVITY SET A_LOCK = 1,A_LOCKID='" + user.id() + "',A_LOCKNAME='" +
	 * user.iname() + "',A_STATE=0 WHERE A_ID = ?";
	 * 
	 * this.trimmerI.execute(sql, aid); } }
	 */

	public void deleteInstance(String insId, IUser user)
			throws WorkflowException {
		WInstanceManager wim = new WInstanceManager(conn);
		WInstance instance = wim.getInstanceByID(insId);

		if (instance == null) {
			throw new WorkflowException("failt to delete instance, instance("
					+ insId + ") is null.");
		}

		// 仅在开始节点
		if (instance.iactivitylist() != null
				&& instance.iactivitylist().size() == 1
				&& instance.icreatorid().equals(user.id())) {
			wim.deleteInstance(instance, user);
		}
		// 草稿
		else if (instance.istate() == -3
				&& instance.icreatorid().equals(user.id())) {
			wim.deleteInstance(instance, user);
		} else if (ISystemContext.matchrole(user, "workflowmanager")) {
			wim.deleteInstance(instance, user);
			// other role do it
		}
	}

	/**
	 * 撤销流程实例
	 * <p>
	 * INS_STATE = -1
	 * </p>
	 * 
	 * @param insId
	 * @param user
	 * @throws WorkflowException
	 */
	public void cancelInstance(String insId, IUser user)
			throws WorkflowException {
		this.updateInstanceStateYESORNO(insId, user, -1, "no");
	}

	/**
	 * 清空流程活动记录
	 * 
	 * @param actid
	 *            活动记录ID
	 * @param user
	 *            操作用户
	 * @throws WorkflowException
	 */
	private void cleanActivity(WFlow flow, String actId, IUser user)
			throws WorkflowException {
		String sql = "SELECT * FROM WF_ACTIVITY_OBJ WHERE A_ID = ?";

		List contents = this.trimmerI.searchMultiData(sql, actId);

		if (contents != null && !contents.isEmpty()) {
			for (int i = 0; i < contents.size(); i++) {
				Map map = (Map) contents.get(i);
				String tableName = (String) map.get("TABLENAME");
				String keyValue = (String) map.get("KEYVALUE");

				SimpleBean4Table bean = new SimpleBean4TableImpl(tableName);
				bean.getResource().put(
						bean.getTable().getPrimaryColumn().getFormName(),
						keyValue);
				try {
					this.bwutil.manualDelete1(bean, conn);
				} catch (Exception ex) {
					throw new WorkflowException(
							"清理流转记录(" + actId + ")相关数据出现异常", ex);
				}
			}
		}

		StringBuffer sqlString = new StringBuffer();

		sqlString.append(";");
		sqlString.append("DELETE FROM WF_ACTIVITY WHERE A_ID = " + actId);
		sqlString.append(";");
		sqlString.append("DELETE FROM WF_ACTIVITY_OBJ WHERE A_ID = " + actId);

		if (!this.trimmer.executeBatch(sqlString.toString())) {
			throw new WorkflowException(
					"fail to purge business data of activity(" + actId + ").");
		}
	}

	/**
	 * 创建未办理的流程活动记录
	 * 
	 * @param currentActivity
	 *            当前活动记录
	 * @param sid
	 *            环节ID
	 * @param user
	 *            办理人员
	 * @param title
	 *            活动记录标题
	 * @param process
	 *            过程
	 * @param group
	 *            组
	 * @param backmemo
	 *            返回说明
	 * @param sessionUser
	 *            session user
	 * @param cbh
	 *            CommonBean4HSQ
	 * @return String
	 * @throws WorkflowException
	 */
	public String createNewActivity(WActivity theActivity, WStep nextStep,
			IUser user, IGroup group, String process, String agroup,
			String backmemo, CommonBean4HSQ cbh, IUser sessionUser)
			throws WorkflowException {
		Object[] receiver = new Object[2];
		receiver[0] = user;
		receiver[1] = group;

		List introHandlers = nextStep.iplug4intro();

		boolean rnt = true;

		SimpleBean participateBean = new SimpleBeanImpl();

		participateBean.getResource().put("receiver", receiver);
		participateBean.getResource().put("nextStep", nextStep);

		if (introHandlers != null && !introHandlers.isEmpty()) {
			participateBean.getResource().put("GWE", this);
			participateBean.getResource().put("CBH", cbh);
			participateBean.getResource().put("theStep", theActivity.istep());
			participateBean.getResource().put("theActivity", theActivity);

			for (int j = 0; j < introHandlers.size(); j++) {
				String className = (String) introHandlers.get(j);

				WPlugHandler introHandler = this.initWPlugHandler(className);

				rnt = introHandler.participate(conn, participateBean);

				if (rnt == false) {
					break;
				}
			}
		}

		String id = null;

		if (rnt) {
			if (receiver == null || receiver.length < 2) {
				// (such as[IUser, IGroup])
				throw new WorkflowException(
						"failt to create activity, executor is invalid.");
			}

			// 下一环节, 存在在intro-handler中动态改变nextStep的可能(例如同一环节递归)
			WStep _nextStep = (WStep) participateBean.getResource().get(
					"nextStep");

			if (_nextStep == null) {
				throw new WorkflowException(
						"failt to create activity, next node is null.");
			}

			String opinionId = StringTool.checkString(cbh.getResource().get(
					"opinionId"));
			String opinionName = StringTool.checkString(cbh.getResource().get(
					"opinionName"));

			SimpleBean bean = new SimpleBeanImpl();
			bean.getResource().put("insid", theActivity.instance().id());
			bean.getResource().put("atitle", _nextStep.iname());
			bean.getResource().put("sid", _nextStep.id());
			bean.getResource().put("astime", DateTrimmer.getYMDHMS());
			bean.getResource().put("astate", "0");
			bean.getResource().put("atype", "0");
			bean.getResource().put("alock", "0");
			bean.getResource().put("euserid",
					(receiver[0] != null ? ((IUser) receiver[0]).id() : "-1"));
			bean.getResource().put("eusername",
					(receiver[0] != null ? ((IUser) receiver[0]).iname() : ""));
			bean.getResource().put("eunitid",
					(receiver[1] != null ? ((IGroup) receiver[1]).id() : "-1"));
			bean.getResource()
					.put(
							"eunitname",
							(receiver[1] != null ? ((IGroup) receiver[1])
									.iname() : ""));
			bean.getResource().put("alastid", theActivity.id());
			bean.getResource().put("alaststep", theActivity.istep().iname());
			bean.getResource().put("alaststepkey", theActivity.istep().ikey());
			bean.getResource().put("alockid", "");
			bean.getResource().put("alockname", "");
			bean.getResource().put("aprocess", process);
			bean.getResource().put("agroup", agroup);
			bean.getResource().put("abackmemo", backmemo);
			bean.getResource().put("aopinion", opinionId);
			bean.getResource().put("aopinionmemo", opinionName);
			bean.getResource().put("alastecrid", sessionUser.id());
			bean.getResource().put("alastecr", sessionUser.iname());
			bean.getResource().put("alastecrunitid", sessionUser.igroup().id());
			bean.getResource()
					.put("alastecrunit", sessionUser.igroup().iname());

			// 设置活动时限
			bean.getResource().put(
					"altime",
					StringTool.defaultForEmpty(StringTool.checkString(cbh
							.getResource().get("altime")), "-1"));

			try {
				Map info = (Map) this.bwutil.manualSave("WF_ACTIVITY", bean,
						conn);
				id = (String) info.get("A_ID");
			} catch (ProcessorException ex) {
				throw new WorkflowException("failt to create activity.", ex);
			}

			this.updateInstanceStatus(theActivity.instance().id(), sessionUser,
					_nextStep);
		}

		return id;
	}

	/**
	 * 创建已完成的活动记录
	 * 
	 * @param insid
	 *            实例ID
	 * @param sid
	 *            环节ID
	 * @param user
	 *            办理人员
	 * @param title
	 *            活动记录标题
	 * @param ip
	 *            IP
	 * @return String
	 */
	public String createDoneActivity(String insid, WStep nextStep, IUser user,
			String ip, IUser sessionUser) throws WorkflowException {

		SimpleBean bean = new SimpleBeanImpl();
		bean.getResource().put("insid", insid);
		bean.getResource().put("atitle", nextStep.iname());
		bean.getResource().put("sid", nextStep.id());
		bean.getResource().put("astime", DateTrimmer.getYMDHMS());
		bean.getResource().put("aetime", DateTrimmer.getYMDHMS());
		bean.getResource().put("altime", "-1");
		bean.getResource().put("alocktime", DateTrimmer.getYMDHMS());
		bean.getResource().put("astate", "2");
		bean.getResource().put("alock", "1");
		bean.getResource().put("atype", "0");
		bean.getResource().put("alastid", "0");
		bean.getResource().put("alockid", user.id());
		bean.getResource().put("alockname", user.iname());
		bean.getResource().put("aprocess", "0");
		bean.getResource().put("agroup", "0");
		bean.getResource().put("euserid", (user != null ? user.id() : "-1"));
		bean.getResource().put("eusername", (user != null ? user.iname() : ""));
		bean.getResource().put(
				"eunitid",
				(user != null && user.igroup() != null ? user.igroup().id()
						: "-1"));
		bean.getResource().put(
				"eunitname",
				(user != null && user.igroup() != null ? user.igroup().iname()
						: ""));
		bean.getResource().put("eip", ip);
		bean.getResource().put("alastecrid", sessionUser.id());
		bean.getResource().put("alastecr", sessionUser.iname());
		bean.getResource().put("alastecrunitid", sessionUser.igroup().id());
		bean.getResource().put("alastecrunit", sessionUser.igroup().iname());

		String id = null;

		try {
			Map info = (Map) this.bwutil.manualSave("WF_ACTIVITY", bean, conn);
			id = (String) info.get("A_ID");
		} catch (ProcessorException ex) {
			throw new WorkflowException("failt to create the done-activity.",
					ex);
		}

		this.updateInstanceStatus(insid, user, nextStep);

		return id;
	}

	/**
	 * (创建新流程时)创建暂存的活动记录
	 * 
	 * @param insid
	 *            实例ID
	 * @param sid
	 *            环节ID
	 * @param user
	 *            办理人员
	 * @param title
	 *            活动记录标题
	 * @param ip
	 *            IP
	 * @return String
	 */
	public String createHoldActivity(String insid, WStep nextStep, IUser user,
			CommonBean4HSQ cbh, IUser sessionUser) throws WorkflowException {
		SimpleBean bean = new SimpleBeanImpl();
		bean.getResource().put("insid", insid);
		bean.getResource().put("atitle", nextStep.iname());
		bean.getResource().put("sid", nextStep.id());
		bean.getResource().put("astime", DateTrimmer.getYMDHMS());
		bean.getResource().put("aetime", DateTrimmer.getYMDHMS());
		bean.getResource().put("altime", "-1");
		bean.getResource().put("alocktime", DateTrimmer.getYMDHMS());
		bean.getResource().put("astate", "1");// -1
		bean.getResource().put("alock", "1");
		bean.getResource().put("atype", "0");
		bean.getResource().put("alastid", "0");
		bean.getResource().put("alockid", user != null ? user.id() : "-1");
		bean.getResource().put("alockname", (user != null) ? user.iname() : "");
		bean.getResource().put("euserid", (user != null ? user.id() : "-1"));
		bean.getResource().put("eusername", (user != null ? user.iname() : ""));
		bean.getResource().put(
				"eunitid",
				(user != null && user.igroup() != null ? user.igroup().id()
						: "-1"));
		bean.getResource().put(
				"eunitname",
				(user != null && user.igroup() != null ? user.igroup().iname()
						: ""));
		bean.getResource().put(
				"eip",
				(cbh.getRequest() != null ? cbh.getRequest().getRemoteAddr()
						: ""));
		bean.getResource().put("aprocess", "0");
		bean.getResource().put("agroup", "0");
		bean.getResource().put("auserid", user.id());
		bean.getResource().put("aunitid",
				(user.igroup() != null ? user.igroup().id() : "-1"));
		bean.getResource().put("alastecrid", sessionUser.id());
		bean.getResource().put("alastecr", sessionUser.iname());
		bean.getResource().put("alastecrunitid", sessionUser.igroup().id());
		bean.getResource().put("alastecrunit", sessionUser.igroup().iname());

		// 设置活动时限
		bean.getResource().put(
				"altime",
				StringTool.defaultForEmpty(StringTool.checkString(cbh
						.getResource().get("altime")), "-1"));

		String id = null;

		try {
			Map info = (Map) this.bwutil.manualSave("WF_ACTIVITY", bean, conn);
			id = (String) info.get("A_ID");
		} catch (ProcessorException ex) {
			throw new WorkflowException("fail to create the doing-activity.",
					ex);
		}

		this.updateInstanceStatus(insid, user, nextStep);

		List introHandlers = nextStep.iplug4intro();

		if (introHandlers != null && !introHandlers.isEmpty()) {
			WInstanceManager wim = new WInstanceManager(this.conn);

			WActivity theActivity = wim.getActivityByID(id);

			SimpleBean sBean = new SimpleBeanImpl();

			sBean.getResource().put("GWE", this);
			sBean.getResource().put("CBH", cbh);
			sBean.getResource().put("theActivity", theActivity);

			for (int j = 0; j < introHandlers.size(); j++) {
				String className = (String) introHandlers.get(j);

				WPlugHandler introHandler = this.initWPlugHandler(className);

				introHandler.participate(conn, sBean);
			}

		}

		return id;
	}

	/**
	 * 创建办理中的活动记录
	 * 
	 * @param insid
	 *            实例ID
	 * @param sid
	 *            环节ID
	 * @param user
	 *            办理人员
	 * @param title
	 *            活动记录标题
	 * @param ip
	 *            IP
	 * @return String
	 */
	public String createLingerActivity(String insid, WStep nextStep,
			IUser user, String ip, IUser sessionUser) throws WorkflowException {

		SimpleBean bean = new SimpleBeanImpl();
		bean.getResource().put("insid", insid);
		bean.getResource().put("atitle", nextStep.iname());
		bean.getResource().put("sid", nextStep.id());
		bean.getResource().put("astime", DateTrimmer.getYMDHMS());
		bean.getResource().put("aetime", DateTrimmer.getYMDHMS());
		bean.getResource().put("altime", "-1");
		bean.getResource().put("alocktime", DateTrimmer.getYMDHMS());
		bean.getResource().put("astate", "1");
		bean.getResource().put("alock", "1");
		bean.getResource().put("atype", "0");
		bean.getResource().put("alastid", "0");
		bean.getResource().put("alockid", user.id());
		bean.getResource().put("alockname", user.iname());
		bean.getResource().put("aprocess", "0");
		bean.getResource().put("agroup", "0");
		bean.getResource().put("auserid", user != null ? user.id() : "-1");
		bean.getResource().put(
				"aunitid",
				(user != null && user.igroup() != null ? user.igroup().id()
						: "-1"));
		bean.getResource().put("euserid", (user != null ? user.id() : "-1"));
		bean.getResource().put("eusername", (user != null ? user.iname() : ""));
		bean.getResource().put(
				"eunitid",
				(user != null && user.igroup() != null ? user.igroup().id()
						: "-1"));
		bean.getResource().put(
				"eunitname",
				(user != null && user.igroup() != null ? user.igroup().iname()
						: ""));
		bean.getResource().put("eip", ip);
		bean.getResource().put("alastecrid", sessionUser.id());
		bean.getResource().put("alastecr", sessionUser.iname());
		bean.getResource().put("alastecrunitid", sessionUser.igroup().id());
		bean.getResource().put("alastecrunit", sessionUser.igroup().iname());

		String id = null;

		try {
			Map info = (Map) this.bwutil.manualSave("WF_ACTIVITY", bean, conn);
			id = (String) info.get("A_ID");
		} catch (ProcessorException ex) {
			throw new WorkflowException("fail to create the doing-activity.",
					ex);
		}

		return id;
	}

	/**
	 * 建立活动记录并与对象内容关联
	 * 
	 * @param aid
	 *            活动记录ID
	 * @param objkey
	 *            对象KEY
	 * @param tableName
	 *            对象关联表名称
	 * @param keyvalue
	 *            表主键值
	 * @throws WorkflowException
	 */
	public void createActivityObject(String aid, String objkey,
			String tableName, String keyvalue, String tableViewID)
			throws WorkflowException {
		String sql = "SELECT A_ID FROM WF_ACTIVITY_OBJ WHERE A_ID = ? AND OBJ_KEY = ? AND TABLENAME = ? AND KEYVALUE = ?";

		if (!this.trimmerI.haveMoreData(sql, aid, objkey, tableName, keyvalue)) {
			SimpleBean bean = new SimpleBeanImpl();
			bean.getResource().put("aid", aid);
			bean.getResource().put("okey", objkey);
			bean.getResource().put("otname", tableName);
			bean.getResource().put("otkvalue", keyvalue);
			bean.getResource().put("otview", tableViewID);

			try {
				this.bwutil.manualSave("WF_ACTIVITY_OBJ", bean, conn);
			} catch (ProcessorException ex) {
				throw new WorkflowException(
						"fail to create related object for activity.", ex);
			}
		}
	}

	/**
	 * 存在实例与对象内容关联
	 * 
	 * @param insId
	 *            流程实例ID
	 * @param objkey
	 *            对象KEY
	 * @param tableName
	 *            对象关联表名称
	 * @throws WorkflowException
	 */
	public boolean containsInstanceObject(String insId, String objkey,
			String tableName, String tableViewID) throws WorkflowException {
		String sql = "SELECT INS_ID FROM WF_INSTANCE_OBJ WHERE INS_ID = ? AND OBJ_KEY = ? AND TABLENAME = ?";

		return this.trimmerI.haveMoreData(sql, insId, objkey, tableName);
	}

	/**
	 * 建立实例与对象内容关联
	 * 
	 * @param insId
	 *            流程实例ID
	 * @param objkey
	 *            对象KEY
	 * @param tableName
	 *            对象关联表名称
	 * @param keyvalue
	 *            表主键值
	 * @throws WorkflowException
	 */
	public void createInstanceObject(String insId, String objkey,
			String tableName, String keyvalue, String tableViewID)
			throws WorkflowException {
		String sql = "SELECT INS_ID FROM WF_INSTANCE_OBJ WHERE INS_ID = ? AND OBJ_KEY = ? AND TABLENAME = ? AND KEYVALUE = ?";

		if (!this.trimmerI
				.haveMoreData(sql, insId, objkey, tableName, keyvalue)) {
			SimpleBean bean = new SimpleBeanImpl();
			bean.getResource().put("insId", insId);
			bean.getResource().put("okey", objkey);
			bean.getResource().put("otname", tableName);
			bean.getResource().put("otkvalue", keyvalue);
			bean.getResource().put("otview", tableViewID);

			try {
				this.bwutil.manualSave("WF_INSTANCE_OBJ", bean, conn);
			} catch (ProcessorException ex) {
				throw new WorkflowException(
						"fail to create related object for instance.", ex);
			}
		}
	}

	/**
	 * 建立实例与对象内容关联
	 * 
	 * @param insId
	 *            流程实例ID
	 * @param objkey
	 *            对象KEY
	 * @param tableName
	 *            对象关联表名称
	 * @param keyvalue
	 *            表主键值
	 * @throws WorkflowException
	 */
	public void resetInstanceObject(String insId, String objkey,
			String tableName, String keyvalue, String tableViewID)
			throws WorkflowException {
		String sql = "UPDATE WF_INSTANCE_OBJ SET KEYVALUE = ? WHERE INS_ID = ? AND OBJ_KEY = ? AND TABLENAME = ? AND TABLEVIEW = ?";

		if (!this.trimmerI.execute(sql, keyvalue, insId, objkey, tableName,
				tableViewID)) {
			throw new WorkflowException(
					"fail to reset related object for instance.");
		}
	}

	/**
	 * 删除实例与对象内容关联
	 * 
	 * @param insId
	 *            流程实例ID
	 * @param objkey
	 *            对象KEY
	 * @param tableName
	 *            对象关联表名称
	 * @param keyvalue
	 *            表主键值
	 * @throws WorkflowException
	 */
	public void removeInstanceObject(String insId, String objkey,
			String tableName, String tableViewID) throws WorkflowException {
		String sql = "DELETE FROM WF_INSTANCE_OBJ WHERE INS_ID = ? AND OBJ_KEY = ? AND TABLENAME = ? AND TABLEVIEW = ?";

		if (!this.trimmerI.execute(sql, insId, objkey, tableName, tableViewID)) {
			throw new WorkflowException("fail to remove object of instance.");
		}
	}

	/**
	 * init worflow-plughandler
	 * 
	 * @param className
	 * @return WPlugHandler
	 * @throws WorkflowException
	 */
	private WPlugHandler initWPlugHandler(String className)
			throws WorkflowException {
		WPlugHandler handler = null;

		try {
			handler = (WPlugHandler) Class.forName(className).newInstance();
		} catch (Exception ex) {
			throw new WorkflowException(
					"fail to initialize the node interface(" + className + ").",
					ex);
		}

		return handler;
	}

	/**
	 * 执行结束环节
	 * 
	 * @param activity
	 * @param nextStep
	 * @param cbh
	 * @param user
	 * @return boolean
	 * @throws WorkflowException
	 */
	private boolean handleEndStep(WActivity activity, WStep nextStep,
			CommonBean4HSQ cbh, IUser user) throws WorkflowException {
		if (nextStep.itype() != -1) {
			throw new WorkflowException(
					"fail to handle the end-node, the current node is not end-node.");
		}

		List introHandlers = nextStep.iplug4intro();

		boolean canFinish = true;

		if (introHandlers != null && !introHandlers.isEmpty()) {
			SimpleBean bean = new SimpleBeanImpl();

			bean.getResource().put("GWE", this);
			bean.getResource().put("CBH", cbh);
			bean.getResource().put("theStep", activity.istep());
			bean.getResource().put("nextStep", nextStep);
			bean.getResource().put("theActivity", activity);

			for (int j = 0; j < introHandlers.size(); j++) {
				String className = (String) introHandlers.get(j);

				WPlugHandler introHandler = this.initWPlugHandler(className);

				canFinish = introHandler.participate(conn, bean);

				if (canFinish == false) {
					break;
				}
			}
		}

		if (canFinish) {
			String yesorno = activity.istep().iyesorno(nextStep.id());

			this.finish(activity, user, cbh, yesorno);
		}

		return canFinish;
	}

	/**
	 * Binding-WorkflowObjectData
	 * 
	 * @author mido
	 * 
	 */
	private class BindingWorkflowObjectData implements SimpleBeanMachining {
		private GrooveWorkflowEngine gwf;

		private WFlow flow;

		private String insId;

		public BindingWorkflowObjectData(GrooveWorkflowEngine gwf,
				String insId, WFlow flow) {
			this.gwf = gwf;
			this.insId = insId;
			this.flow = flow;
		}

		public SimpleBean machining(SimpleBean bean, Table table,
				CommonBean4HSQ cbh, Connection conn, int type)
				throws MachiningException {
			TableView thizTableView = (TableView) bean.getResource().get(
					"THIZTABLEVIEW");

			if (table.hasPrimaryKey()
					&& bean.getResource().containsKey(table.getPrimaryKey()[0])) {
				try {
					this.gwf.createInstanceObject(this.insId, this.flow
							.iobject().ikey(), table.getName(), (String) bean
							.getResource().get(table.getPrimaryKey()[0]),
							thizTableView.id());
				} catch (WorkflowException ex) {
					throw new MachiningException("fail to binding instance("
							+ this.insId + ") to related table("
							+ table.getName() + ").", ex);
				} finally {
					bean.getResource().remove("THIZTABLEVIEW");
				}
			}

			return null;
		}
	}

	/**
	 * protect instance & activity todo
	 * 
	 * @param insId
	 * @param actId
	 * @param user
	 * @throws WorkflowException
	 */
	public void protectMe(String insId, String actId, IUser user)
			throws WorkflowException {
		if (insId == null && actId == null) {
			throw new WorkflowException(
					"please provide the right parameters(insId and actId).");
		}

		WInstanceManager wim = new WInstanceManager(this.conn);

		Map actMap = null;

		// 未指明流转实例ID
		if (insId == null) {
			// 从流转记录中获取实例ID
			actMap = wim.getActivityMap(actId);

			insId = (String) actMap.get("INS_ID");
		}

		// 校验实例状态
		int instanceState = wim.getInstanceState(insId);

		if (instanceState == 1) {
			throw new WorkflowException("instance(" + insId
					+ ") has been finished.");
		} else if (instanceState == -1) {
			throw new WorkflowException("instance(" + insId
					+ ") has been abandoned.");
		} else if (instanceState != 0) {
			throw new WorkflowException("instance(" + insId
					+ ") has been readonly(" + instanceState + ").");
		}

		// 获取流转记录内容信息
		if (actMap == null && actId != null) {
			actMap = wim.getActivityMap(actId);

			// 未找到指定的流转记录信息
			if (actMap == null) {
				throw new WorkflowException(
						"please provide the right parameters(actMap).");
			}
		}

		if (actMap != null) {
			// activity state
			int activityState = Integer
					.parseInt((String) actMap.get("A_STATE"));

			if (activityState < 0) {
				throw new WorkflowException("activity(" + actId
						+ ") is i a non normal state(" + activityState + ").");
			} else if (activityState == 2) {
				throw new WorkflowException("activity(" + actId
						+ ") has been completed.");
			}

			if (actMap.get("A_LOCK").equals("1")
					&& !wim.checkActivityLocker(actId, user)) {
				// has lock, check activity lock
				throw new WorkflowException(
						"activity has been locked by others.");
			}
		}
	}

	/**
	 * protect activity toview
	 * 
	 * @param actId
	 * @param user
	 * @throws WorkflowException
	 */
	public void accessMe(String actId, IUser user) throws WorkflowException {
		WInstanceManager wim = new WInstanceManager(this.conn);

		if (actId != null) {
			Map actMap = wim.getActivityMap(actId);

			// activity state
			int activityState = Integer
					.parseInt((String) actMap.get("A_STATE"));

			// has lock, check activity lock
			if (!ISystemContext.matchrole(user, "workflowmanager")
					&& !wim.checkActivityLocker(actId, user)) {
				throw new WorkflowException(
						"you do not have permission to access.");
			}
		}
	}

	/**
	 * 创建流程实例
	 * 
	 * @param flow
	 *            流程类别
	 * @param user
	 *            办理人员
	 * @param ip
	 *            ip
	 * @param state
	 *            实例状态
	 * @throws WorkflowException
	 */
	public String staticCreateNewInstance(WFlow flow, IUser user, String ip,
			int state, String startTime) throws WorkflowException {

		IGroup group = user.igroup();

		SimpleBean bean = new SimpleBeanImpl();

		if (flow.itype().equals("free")) {
			bean.getResource().put("gid", "0");
		} else {
			bean.getResource().put("gid", flow.id());
		}

		String theDate = StringTool.defaultForEmpty(startTime, DateTrimmer
				.getYMDHMS());

		bean.getResource().put("insstime", theDate);
		bean.getResource().put("insutime", theDate);
		bean.getResource().put("insetime", "");
		bean.getResource().put("insltime", "");
		bean.getResource().put("insstate", state);
		bean.getResource().put("inscreatorid", user.id());
		bean.getResource().put("inscreatorname", user.iname());
		bean.getResource().put("inscunitid", (group != null) ? group.id() : "");
		bean.getResource().put("inscunitname",
				(group != null) ? group.iname() : "");

		bean.getResource().put("instype", flow.itype());
		bean.getResource().put("insobject", flow.iobject().ikey());
		bean.getResource().put("insempty", 1);

		String id = null;

		try {
			Map info = this.bwutil.manualSave("WF_INSTANCE", bean, conn);
			id = (String) info.get("INS_ID");
		} catch (ProcessorException ex) {
			throw new WorkflowException(
					"exception occurs in process of creating instance.", ex);
		}

		return id;
	}

	/**
	 * finish flow instance from external range
	 * 
	 * @param insId
	 * @param yesorno
	 * @param user
	 * @throws WorkflowException
	 */
	public void staticFinishInstance(WInstance instance, String yesorno,
			IUser user) throws WorkflowException {
		if (instance == null) {
			throw new WorkflowException(
					"finish worflow instance failed, instance is null.");
		}

		if (instance.istate() == 1) {
			throw new WorkflowException("finish worflow instance("
					+ instance.id() + ") failed, instance is over.");
		}

		instance.iyesorno(yesorno);

		SimpleBean bean = new SimpleBeanImpl();

		bean.getResource().put("insid", instance.id());
		bean.getResource().put("insstate", "1");
		bean.getResource().put("insempty", "0");
		bean.getResource().put("insyesorno", yesorno);
		bean.getResource().put("inscrstid", instance.iflow().istep4end().id());
		bean.getResource().put("inscrst", instance.iflow().istep4end().iname());
		bean.getResource().put("insutime", instance.imaxactivity().iendtime());
		bean.getResource().put("insetime", instance.imaxactivity().iendtime());

		try {
			this.bwutil.manualUpdate("WF_INSTANCE", bean, conn);
		} catch (ProcessorException ex) {
			throw new WorkflowException("update instance stateYESORNO failed.",
					ex);
		}
	}

	/**
	 * (创建新流程时)创建暂存的活动记录
	 * 
	 * @param insid
	 *            实例ID
	 * @param sid
	 *            环节ID
	 * @param user
	 *            办理人员
	 * @param title
	 *            活动记录标题
	 * @param ip
	 *            IP
	 * @return String
	 */
	public String staticCreateStartActivity(String insid, WStep nextStep,
			IUser user, CommonBean4HSQ cbh, IUser sessionUser,
			String startTime, String lockTime, String endTime)
			throws WorkflowException {
		SimpleBean bean = new SimpleBeanImpl();
		bean.getResource().put("insid", insid);
		bean.getResource().put("atitle", nextStep.iname());
		bean.getResource().put("sid", nextStep.id());
		bean.getResource().put("astime", startTime);
		bean.getResource().put("aetime", endTime);
		bean.getResource().put("alocktime", lockTime);
		bean.getResource().put("astate", "2");// -1
		bean.getResource().put("alock", "1");
		bean.getResource().put("atype", "0");
		bean.getResource().put("alastid", "0");
		bean.getResource().put("alockid", user.id());
		bean.getResource().put("alockname", user.iname());
		bean.getResource().put("aprocess", "0");
		bean.getResource().put("agroup", "0");
		bean.getResource().put("euserid", (user != null ? user.id() : "-1"));
		bean.getResource().put("eusername", (user != null ? user.iname() : ""));
		bean.getResource().put(
				"eunitid",
				(user != null && user.igroup() != null ? user.igroup().id()
						: "-1"));
		bean.getResource().put(
				"eunitname",
				(user != null && user.igroup() != null ? user.igroup().iname()
						: ""));
		bean.getResource().put(
				"eip",
				(cbh.getRequest() != null ? cbh.getRequest().getRemoteAddr()
						: ""));
		bean.getResource().put("alastecrid", sessionUser.id());
		bean.getResource().put("alastecr", sessionUser.iname());
		bean.getResource().put("alastecrunitid", sessionUser.igroup().id());
		bean.getResource().put("alastecrunit", sessionUser.igroup().iname());

		String id = null;

		try {
			Map info = (Map) this.bwutil.manualSave("WF_ACTIVITY", bean, conn);
			id = (String) info.get("A_ID");
		} catch (ProcessorException ex) {
			throw new WorkflowException("create activity failed.", ex);
		}

		return id;
	}

	/**
	 * 创建未办理的流程活动记录
	 * <p>
	 * 只是静态生成流程活动记录,插件不参与处理
	 * </p>
	 * 
	 * @param currentActivity
	 *            当前活动记录
	 * @param sid
	 *            环节ID
	 * @param user
	 *            办理人员
	 * @param title
	 *            活动记录标题
	 * @param process
	 *            过程
	 * @param group
	 *            组
	 * @param backmemo
	 *            返回说明
	 * @param sessionUser
	 *            session user
	 * @param cbh
	 *            CommonBean4HSQ
	 * @return String
	 * @throws WorkflowException
	 */
	public String staticCreateNewActivity(WActivity theActivity,
			WStep nextStep, IUser user, IGroup group, String process,
			String agroup, String backmemo, CommonBean4HSQ cbh,
			IUser sessionUser, String startTime, String lockTime,
			String doneTime) throws WorkflowException {
		Object[] receiver = new Object[2];
		receiver[0] = user;
		receiver[1] = group;

		String id = null;

		String opinionId = StringTool.checkString(cbh.getResource().get(
				"opinionId"));
		String opinionName = StringTool.checkString(cbh.getResource().get(
				"opinionName"));

		SimpleBean bean = new SimpleBeanImpl();
		bean.getResource().put("insid", theActivity.instance().id());
		bean.getResource().put("atitle", nextStep.iname());
		bean.getResource().put("sid", nextStep.id());
		bean.getResource().put("astime",
				StringTool.defaultForEmpty(startTime, DateTrimmer.getYMDHMS()));
		bean.getResource().put("alocktime",
				StringTool.defaultForEmpty(lockTime, DateTrimmer.getYMDHMS()));
		bean.getResource().put("aetime",
				StringTool.defaultForEmpty(doneTime, DateTrimmer.getYMDHMS()));
		bean.getResource().put("astate", "2");
		bean.getResource().put("atype", "0");
		bean.getResource().put("alock", "1");
		bean.getResource().put("euserid", (user != null ? user.id() : "-1"));
		bean.getResource().put("eusername", (user != null ? user.iname() : ""));
		bean.getResource().put(
				"eunitid",
				(user != null && user.igroup() != null ? user.igroup().id()
						: "-1"));
		bean.getResource().put(
				"eunitname",
				(user != null && user.igroup() != null ? user.igroup().iname()
						: ""));
		bean.getResource().put(
				"eip",
				(cbh.getRequest() != null ? cbh.getRequest().getRemoteAddr()
						: ""));
		bean.getResource().put("alastid", theActivity.id());
		bean.getResource().put("alaststep", theActivity.istep().iname());
		bean.getResource().put("alaststepkey", theActivity.istep().ikey());
		bean.getResource().put("alockid", user == null ? "0" : user.id());
		bean.getResource().put("alockname", user == null ? "" : user.iname());
		bean.getResource().put("aprocess", process);
		bean.getResource().put("agroup", agroup);
		bean.getResource().put("abackmemo", backmemo);
		bean.getResource().put("aopinion", opinionId);
		bean.getResource().put("aopinionmemo", opinionName);
		bean.getResource().put("alastecrid", sessionUser.id());
		bean.getResource().put("alastecr", sessionUser.iname());
		bean.getResource().put("alastecrunitid", sessionUser.igroup().id());
		bean.getResource().put("alastecrunit", sessionUser.igroup().iname());

		try {
			Map info = (Map) this.bwutil.manualSave("WF_ACTIVITY", bean, conn);
			id = (String) info.get("A_ID");
		} catch (ProcessorException ex) {
			throw new WorkflowException("create activity failed.", ex);
		}

		return id;
	}

	public void staticLockActivity(String aid, String ip, IUser user,
			String lockTime) throws WorkflowException {
		String sql = "UPDATE WF_ACTIVITY SET A_LOCK = 1, A_LOCKID = ? ,A_LOCKNAME = ?, A_LOCKTIME = ?, A_STATE = 1 WHERE A_ID = ?";

		if (!this.trimmerI.execute(sql, user.id(), user.iname(), StringTool
				.defaultForEmpty(lockTime, DateTrimmer.getYMDHMS()), aid)) {
			throw new WorkflowException("lock activity(" + aid + ") failed.");
		}
	}

	/**
	 * 办结活动记录
	 * 
	 * @param activity
	 * @param cbh
	 * @param nextStep
	 * @param user
	 * @throws WorkflowException
	 */
	public void staticDoneActivity(String actId, CommonBean4HSQ cbh,
			WStep nextStep, IUser user, String doneTime)
			throws WorkflowException {
		SimpleBean bean = new SimpleBeanImpl();

		bean.getResource().put("aid", actId);
		bean.getResource().put("astate", 2);
		bean.getResource().put("aetime",
				StringTool.defaultForEmpty(doneTime, DateTrimmer.getYMDHMS()));

		try {
			this.bwutil.manualUpdate("WF_ACTIVITY", bean, conn);
		} catch (ProcessorException ex) {
			throw new WorkflowException("update activity state failed.", ex);
		}
	}
}
