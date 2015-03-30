// listen layout
function if_scoring_result_layout(resultJson, thiz, formLoadData, options) {
	if (thiz.getForm().findField('RISKLEVEL').getValue() == 'L') {
		thiz.getForm().findField('RISKLEVELLABEL').fieldLabel = '<font class="low_risk">'
				+ thiz.getForm().findField('RISKLEVELLABEL').fieldLabel
				+ '</font>';
		thiz.getForm().findField('RISKLEVELLABEL').addClass('low_risk');
	} else if (thiz.getForm().findField('RISKLEVEL').getValue() == 'H') {
		thiz.getForm().findField('RISKLEVELLABEL').fieldLabel = '<font class="high_risk">'
				+ thiz.getForm().findField('RISKLEVELLABEL').fieldLabel
				+ '</font>';
		thiz.getForm().findField('RISKLEVELLABEL').addClass('high_risk');
	}
}