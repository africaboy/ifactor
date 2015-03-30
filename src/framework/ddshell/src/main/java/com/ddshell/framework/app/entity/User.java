package com.ddshell.framework.app.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.ddshell.framework.app.shiro.entity.ShiroUser;
import com.ddshell.framework.jpa.UserEntity;
import com.entrofine.ifactor.jpa.Schema;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.collect.Sets;

@Table(name = User.TABLE)
@Entity
public class User extends UserEntity implements ShiroUser {

	private static final long serialVersionUID = -1885973931994846376L;

	private String loginName;
	private String password;
	private String salt;

	@Transient
	private String plainPassword;
	@Transient
	private boolean disabled;
	@Transient
	private Set<String> roleNames;
	@Transient
	private Set<String> permissionNames;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = Schema.T_USERROLE, joinColumns = @JoinColumn(name = Schema.T_USERROLE_COL_USERID), inverseJoinColumns = @JoinColumn(name = Schema.T_USERROLE_COL_ROLEID))
	@JsonIgnore
	private Set<Role> roles = new HashSet<Role>();

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getPlainPassword() {
		return plainPassword;
	}

	public void setPlainPassword(String plainPassword) {
		this.plainPassword = plainPassword;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public boolean isDisabled() {
		return super.isDisabled();
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
		super.setDisabled(disabled);
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Set<String> getRoleNames() {
		if (roleNames == null) {
			roleNames = Sets.newHashSet();
			if (getRoles() != null) {
				for (Role role : getRoles()) {
					roleNames.add(role.getName());
				}
			}
		}
		return roleNames;
	}

	@Override
	public Set<String> getPermissionNames() {
		return permissionNames;
	}

}