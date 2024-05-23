using FieldUsersApplication from '../db/FieldUserSchema';


service fieldUserServices {

    entity fieldUserService {
        username        : String(100); // Assuming a reasonable length for username
        type            : Integer; // Integer for the type field
        createdDateTime : Timestamp; // Timestamp for the createdDateTime field
        imageurl        : String(255) default null; // Assuming a reasonable length for URL
        adminType       : String(100); // Assuming a reasonable length for adminType
        isDeleted       : Boolean default null; // Boolean for isDeleted field
        email           : String(255); // Assuming a reasonable length for email
        name            : String(100); // Assuming a reasonable length for name
        departments     : String;
        userId          : String;
        mobileNo        : Integer;
    }
}
