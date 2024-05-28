sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.airdit.agpp.fielduser.field',
            componentId: 'fieldUserServiceObjectPage',
            contextPath: '/fieldUserService'
        },
        CustomPageDefinitions
    );
});