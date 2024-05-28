sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/airdit/agpp/fielduser/field/test/integration/FirstJourney',
		'com/airdit/agpp/fielduser/field/test/integration/pages/fieldUserServiceList',
		'com/airdit/agpp/fielduser/field/test/integration/pages/fieldUserServiceObjectPage'
    ],
    function(JourneyRunner, opaJourney, fieldUserServiceList, fieldUserServiceObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/airdit/agpp/fielduser/field') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThefieldUserServiceList: fieldUserServiceList,
					onThefieldUserServiceObjectPage: fieldUserServiceObjectPage
                }
            },
            opaJourney.run
        );
    }
);