namespace FieldUsersApplication;


//only read and update:-   Users Table // only show whose {type:2} i.e field user

entity Users {
    name                              : String;
    email                             : String;
    phone                             : String;
    // departments                       : Association to many Departments
    //                                         on departments.ID = $self.departments.ID;
    isDeleted                         : Boolean;
    adminType                         : Integer;
    // privilege                        : Privilege;
    imageurl                          : String;
    isUserLocatorActive               : Boolean;
    selectedGroupList                 : array of String;
    isUserUpdatePermissionActive      : Boolean;
    admingroup                        : String;
    assignedLayers                    : array of String;
    zone                              : String;
    vender                            : String;
    adminlist                         : array of String;
    createdBy                         : String;
    createdByMailID                   : String;
    isFirstLogin                      : Boolean;
    deviceDetails                     : array of String;
    lastLoggedInTime                  : DateTime;
    username                          : String;
    type                              : Integer;
    password                          : String;
    doj                               : DateTime;
    dob                               : DateTime;
    createdDateTime                   : DateTime;
    accountLockedOn                   : DateTime;
    numberOfAttemptsWithWrongPassword : Integer;
    isAccountLocked                   : Boolean;
}

entity Departments {
    key name            : String;
        groupadminList  : array of String;
        isMdpeQU        : Boolean;
        isSteelQU       : Boolean;
        isQUAssigned    : Boolean;
        postalcode      : String;
        applicationType : String;
        mapType         : String;
        createdDateTime : DateTime;
        isDeleted       : Boolean default false;
        description     : String;
}
