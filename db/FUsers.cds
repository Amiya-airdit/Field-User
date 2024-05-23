namespace FieldUsersApplication;

entity User {
    key id              : String(24); // Using String with length 24 to represent ObjectId
        username        : String(100); // Assuming a reasonable length for username
        type            : Integer; // Integer for the type field
        createdDateTime : Timestamp; // Timestamp for the createdDateTime field
        imageurl        : String(255) default null; // Assuming a reasonable length for URL
        adminType       : String(100); // Assuming a reasonable length for adminType
        isDeleted       : Boolean default null; // Boolean for isDeleted field
        email           : String(255); // Assuming a reasonable length for email
        name            : String(100); // Assuming a reasonable length for name
        departments     : Composition of many Department
                              on departments.user = $self;
        mobileNo        : Integer;
}

entity Department {
    key id   : String(24); // Using String with length 24 to represent ObjectId
        name : String(100); // Assuming a reasonable length for department name
        user : Association to User
}
