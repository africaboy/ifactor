package com.entrofine.ifactor.api.service;

import java.util.List;

import com.entrofine.ifactor.api.entity.TableSyncEvent;

public interface TableSyncService {

	public void execute(List<TableSyncEvent> events);

}
