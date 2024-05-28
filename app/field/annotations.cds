using fieldUserServices as service from '../../srv/FUsers';

annotate service.fieldUserService with @(
    UI.HeaderInfo                : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'User',
        TypeNamePlural: 'Users'
    },
    UI.SelectionFields           : [
        username,
        departments,
        createdDateTime,
        createdBy
    ],
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'User Name',
                Value: username
            },
            {
                $Type: 'UI.DataField',
                Label: 'Fiel. User Name',
                Value: name
            },
            {
                $Type: 'UI.DataField',
                Label: 'Account Name',
                Value: departments
            },
            {
                $Type: 'UI.DataField',
                Label: 'Created On',
                Value: createdDateTime
            },
            {
                $Type: 'UI.DataField',
                Label: 'Created By',
                Value: createdBy
            },
        ]
    },
    UI.Facets                    : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup'
    }],
    UI.LineItem                  : [
            {
                $Type: 'UI.DataField',
                Label: 'User Name',
                Value: username
            },
            {
                $Type: 'UI.DataField',
                Label: 'Fiel. User Name',
                Value: name
            },
            {
                $Type: 'UI.DataField',
                Label: 'Account Name',
                Value: departments
            },
            {
                $Type: 'UI.DataField',
                Label: 'Created On',
                Value: createdDateTime
            },
            {
                $Type: 'UI.DataField',
                Label: 'Created By',
                Value: createdBy
            },
        ]
);

annotate service.fieldUserService with {
    username @Common.Label: 'User Name'
};

annotate service.fieldUserService with {
    adminType @Common.Label: 'Name'
};

annotate service.fieldUserService with {
    departments @Common.Label: 'Account Name'
};
annotate service.fieldUserService with {
    createdDateTime @Common.Label: 'Created On'
};
annotate service.fieldUserService with {
    createdBy @Common.Label: 'Created By'
};

annotate service.fieldUserService with {
    username @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'fieldUserService',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: username,
                ValueListProperty: 'username',
            }, ],
            Label         : 'User Name',
        },
    )
};

annotate service.fieldUserService with {
    adminType @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'fieldUserService',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: adminType,
                ValueListProperty: 'adminType',
            }, ],
            Label         : 'Name',
        },
        Common.ValueListWithFixedValues: true
    )
};

annotate service.fieldUserService with {
    departments @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'fieldUserService',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: departments,
                ValueListProperty: 'departments',
            }, ],
            Label         : 'Account Name',
        },
    )
};

annotate service.fieldUserService with {
    createdDateTime @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'fieldUserService',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: createdDateTime,
                ValueListProperty: 'createdDateTime',
            }, ],
            Label         : 'Created On',
        },
    )
};

annotate service.fieldUserService with {
    createdBy @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'fieldUserService',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: createdBy,
                ValueListProperty: 'createdBy',
            }, ],
            Label         : 'Created By',
        },
    )
};
