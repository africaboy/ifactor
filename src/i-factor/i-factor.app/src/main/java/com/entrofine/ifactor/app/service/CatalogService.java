package com.entrofine.ifactor.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.ddshell.framework.app.service.support.GenericCrudService;
import com.entrofine.ifactor.app.entity.Catalog;
import com.entrofine.ifactor.app.repository.CatalogRepository;

@Component
public class CatalogService extends GenericCrudService<Catalog, Long> {

	@Autowired
	private CatalogRepository catalogRep;

	@Override
	protected JpaRepository<Catalog, Long> getRepository() {
		return catalogRep;
	}

	public List<Catalog> findByName(String name) {
		return catalogRep.findByName(name);
	}

	public Catalog findSysVars() {
		for (Catalog catalog : catalogRep.findByName("sysVars")) {
			return catalog;
		}
		return null;
	}

	public Catalog findNearestSmeCenter() {
		for (Catalog catalog : catalogRep.findByName("nearestSmeCenter")) {
			return catalog;
		}
		return null;
	}

	public Catalog findInvoiceAvgAmountOption() {
		for (Catalog catalog : catalogRep.findByName("invoiceAvgAmountOption")) {
			return catalog;
		}
		return null;
	}

	public Catalog findTitle() {
		for (Catalog catalog : catalogRep.findByName("title")) {
			return catalog;
		}
		return null;
	}

	public Catalog findInvestAs() {
		for (Catalog catalog : catalogRep.findByName("investas")) {
			return catalog;
		}
		return null;
	}

	public Catalog findFromChannels() {
		for (Catalog catalog : catalogRep.findByName("fromChannels")) {
			return catalog;
		}
		return null;
	}

	public Catalog findIdType() {
		for (Catalog catalog : catalogRep.findByName("idType")) {
			return catalog;
		}
		return null;
	}

	public Catalog findComDurationInVt() {
		for (Catalog catalog : catalogRep.findByName("comDurationInVt")) {
			return catalog;
		}
		return null;
	}

	public Catalog findEntityType() {
		for (Catalog catalog : catalogRep.findByName("entityType")) {
			return catalog;
		}
		return null;
	}

	public Catalog findComType() {
		for (Catalog catalog : catalogRep.findByName("comType")) {
			return catalog;
		}
		return null;
	}

	public Catalog findComIndustry() {
		for (Catalog catalog : catalogRep.findByName("comIndustry")) {
			return catalog;
		}
		return null;
	}

	public Catalog findPosition() {
		for (Catalog catalog : catalogRep.findByName("position")) {
			return catalog;
		}
		return null;
	}

	public Catalog findGender() {
		for (Catalog catalog : catalogRep.findByName("gender")) {
			return catalog;
		}
		return null;
	}

	public Catalog findCountry() {
		for (Catalog catalog : catalogRep.findByName("country")) {
			return catalog;
		}
		return null;
	}

	public Catalog findIndustry() {
		for (Catalog catalog : catalogRep.findByName("industry")) {
			return catalog;
		}
		return null;
	}

	public Catalog findBusinessFrom() {
		for (Catalog catalog : catalogRep.findByName("businessFrom")) {
			return catalog;
		}
		return null;
	}

	public Catalog findFinObjOfInv() {
		for (Catalog catalog : catalogRep.findByName("finObjOfInv")) {
			return catalog;
		}
		return null;
	}

	public Catalog findIsComVietnam() {
		for (Catalog catalog : catalogRep.findByName("isComVietnam")) {
			return catalog;
		}
		return null;
	}

	public Catalog findHaveTradingOther() {
		for (Catalog catalog : catalogRep.findByName("haveEverTradingOther")) {
			return catalog;
		}
		return null;
	}

	public Catalog findWhatIsAsset() {
		for (Catalog catalog : catalogRep.findByName("whatIsAsset")) {
			return catalog;
		}
		return null;
	}

	public Catalog findReadyToAdv() {
		for (Catalog catalog : catalogRep.findByName("readyToAdv")) {
			return catalog;
		}
		return null;
	}

	public Catalog findReadyToInt() {
		for (Catalog catalog : catalogRep.findByName("readyToInt")) {
			return catalog;
		}
		return null;
	}

	public Catalog findDebtorName() {
		for (Catalog catalog : catalogRep.findByName("debtorName")) {
			return catalog;
		}
		return null;
	}
}
