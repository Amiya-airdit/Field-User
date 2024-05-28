sap.ui.define(['sap/ui/core/mvc/ControllerExtension', "sap/m/MessageBox"], function (ControllerExtension, MessageBox) {
	'use strict';

	return ControllerExtension.extend('com.airdit.agpp.fielduser.field.ext.controller.FieldUserExt', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf com.airdit.agpp.fielduser.field.ext.controller.FieldUserExt
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			}
		},
		onEditFieldUser: function () {
			
			let aContexts = this.base.getExtensionAPI().getSelectedContexts();
			if (aContexts.length === 1) {
				let oContext = aContexts[0];
				let oData = oContext.getObject();
				this.updateFragment = sap.ui.xmlfragment(
					"com.airdit.agpp.fielduser.field.ext.fragments.EditFieldUser",
					this
				);
				this.getView().addDependent(this.updateFragment);
				this.updateFragment.open();

				sap.ui.getCore().byId("userName").setValue(oData.username);
				sap.ui.getCore().byId("emailId").setValue(oData.email);
				sap.ui.getCore().byId("account").setSelectedKey(oData.departments);
				sap.ui.getCore().byId("name").setValue(oData.name);
				sap.ui.getCore().byId("mobileNo").setValue(oData.phone);
			} else {
				sap.m.MessageBox.error("Please Select only One User");
				return;
			}

		}, onSumbit: function () {
			var that = this;
			const userName = sap.ui.getCore().byId("userName").getValue();
			const emailId = sap.ui.getCore().byId("emailId").getValue();
			const account = sap.ui.getCore().byId("account").getSelectedKey();
			const name = sap.ui.getCore().byId("name").getValue();
			const mobileNo = sap.ui.getCore().byId("mobileNo").getValue();
			let filterName = this.base.getExtensionAPI().getSelectedContexts()[0].getValue().username;
			// debugger;

			if (userName === "") {
				sap.ui.getCore().byId("userName").setValueState("Error");
				sap.ui.getCore().byId("userName").setValueStateText("User Name is Mandatory");
			}
			else if (mobileNo === "") {
				sap.ui.getCore().byId("mobileNo").setValueState("Error");
				sap.ui.getCore().byId("mobileNo").setValueStateText("Mobile No. is Mandatory");
			}
			else {

				let oModel = this.getView().getModel();
				let oBindList = oModel.bindList("/fieldUserService");
				let aFilter = new sap.ui.model.Filter(
					"username",
					sap.ui.model.FilterOperator.EQ,
					filterName
				);

				oBindList
					.filter(aFilter)
					.requestContexts()
					.then(function (aContexts) {
						aContexts[0].setProperty("username", userName);
						aContexts[0].setProperty("email", emailId);
						aContexts[0].setProperty("departments", account);
						aContexts[0].setProperty("name", name);
						aContexts[0].setProperty("phone", mobileNo);
						that.updateFragment.destroy();
						that.getView().getModel().refresh();
						MessageBox.success("User Updated successful");
						that.getView().setBusy(false);
					})
					.catch((err) => { MessageBox.error("Error is : " + err); that.getView().setBusy(false); });

			}
		}, onClose: function () {
			this.updateFragment.destroy();
		}
	});
});
