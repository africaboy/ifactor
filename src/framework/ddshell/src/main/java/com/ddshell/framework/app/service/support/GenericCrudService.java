package com.ddshell.framework.app.service.support;

import java.io.Serializable;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 支持基本的数据CRUD
 * 
 * @author DUAN
 * 
 * @param <T>
 *            实体类型
 * @param <ID>
 *            实体主键类型
 */
public abstract class GenericCrudService<T, ID extends Serializable> {

	protected final Logger LOG = LoggerFactory.getLogger(getClass());

	@Autowired
	protected PageableSupport pageableSupport;

	public <S extends T> S save(S entity) {
		return getRepository().save(entity);
	}

	public List<T> findAll() {
		return getRepository().findAll();
	}

	public Page<T> findAll(Integer pageNumber, Integer pageSize, Sort sort) {
		return getRepository().findAll(
				pageableSupport.getPageable(pageNumber, pageSize, sort));
	}

	public List<T> findAll(Sort sort) {
		return getRepository().findAll(sort);
	}

	public Page<T> findAll(Pageable pageable) {
		return getRepository().findAll(pageable);
	}

	public T findOne(ID id) {
		return getRepository().findOne(id);
	}

	public List<T> findAll(Iterable<ID> ids) {
		return getRepository().findAll(ids);
	}

	public <S extends T> List<S> save(Iterable<S> entities) {
		return getRepository().save(entities);
	}

	public boolean exists(ID id) {
		return getRepository().exists(id);
	}

	public void flush() {
		getRepository().flush();
	}

	public T saveAndFlush(T entity) {
		return getRepository().saveAndFlush(entity);
	}

	public void deleteInBatch(Iterable<T> entities) {
		getRepository().deleteInBatch(entities);
	}

	public long count() {
		return getRepository().count();
	}

	public void deleteAllInBatch() {
		getRepository().deleteAllInBatch();
	}

	public void delete(ID id) {
		getRepository().delete(id);
	}

	public void delete(List<ID> ids) {
		getRepository().delete(getRepository().findAll(ids));
	}

	public void delete(T entity) {
		getRepository().delete(entity);
	}

	public void delete(Iterable<? extends T> entities) {
		getRepository().delete(entities);
	}

	public void deleteAll() {
		getRepository().deleteAll();
	}

	protected abstract JpaRepository<T, ID> getRepository();

}
