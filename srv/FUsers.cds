service fieldUserServices {
    entity fieldUserService {

            username        : String(100); // username
            type            : Integer; // no need
            createdDateTime : Timestamp; // created on
            imageurl        : String(255) default null; // not avail
            adminType       : String(100); // AdminType
            isDeleted       : Boolean default null; // 
        key email           : String(255); // email
            name            : String(100); // Field. user name
            departments     : String; // Account Name
            // userId          : String; //
            phone           : String; // mob
            createdBy       : String; // created by
    }
}
