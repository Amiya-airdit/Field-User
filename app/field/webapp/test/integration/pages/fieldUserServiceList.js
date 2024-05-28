sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'com.airdit.agpp.fielduser.field',
            componentId: 'fieldUserServiceList',
            contextPath: '/fieldUserService'
        },
        CustomPageDefinitions
    );
});