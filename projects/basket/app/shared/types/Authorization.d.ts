declare namespace Authorization {
  /**
   * AccessTokenResponse
   */
  export interface AccessTokenResponse {
    accessToken?: string
  }
  /**
   * AccountClaim
   */
  export interface AccountClaim {
    /**
     * category of Account.
     */
    category?: string
    /**
     * Account Id of Account.
     */
    id?: string
    /**
     * NumberOfSubscriptions of Account.
     */
    number_of_subscriptions?: string
    /**
     * ParentAccountId of Account.
     */
    parent_account_id?: string
    /**
     * Role of Account.
     */
    roles?: string
    /**
     * Status of Account.
     */
    status?: string
    /**
     * SubCategory of Account.
     */
    sub_category?: string
    /**
     * Account type of Account.
     */
    type?: string
  }
  /**
   * AccountDetails
   */
  export interface AccountDetails {
    accountRole?: string
    billingPaymentMethod?: string
    category?: string
    id?: string
    idHash?: string
    name?: string
    parentAccountId?: string
    role?: string
    status?: string
    subCategory?: string
    type?: string
    vfBlackAccount?: boolean
  }
  /**
   * AccountSubscriptions
   */
  export interface AccountSubscriptions {
    numberOfSubscriptions?: string
    subscriptionDetails?: Authorization.SubscriptionDetails[]
  }
  /**
   * AgentAuthTokenResponse
   */
  export interface AgentAuthTokenResponse {
    authorizationToken?: string
    subscriptionId?: string
    subscriptionIdHash?: string
  }
  /**
   * AuthContext
   */
  export interface AuthContext {
    /**
     * Account of the user.
     */
    account?: Authorization.AccountClaim
    /**
     * Id of contact authenticated
     */
    accountName?: string
    /**
     * Agent id for MVA test agent
     */
    agentId?: string
    /**
     * assuranceLevel of Authentication.
     */
    assuranceLevel?: string
    /**
     * DigitalChannels that authenticated
     */
    channelId?: string
    /**
     * Id of contact authenticated
     */
    contactId?: string
    /**
     * Given Name of the user
     */
    givenName?: string
    /**
     * List of accounts authenticated.
     */
    numberOfAccounts?: string
    /**
     * PhoneNumber of the user.
     */
    phoneNumber?: string
    /**
     * username of the contact authenticated
     */
    platformSessionId?: string
    /**
     * Subscription of the user.
     */
    subscription?: Authorization.SubscriptionClaim
    /**
     * username of the contact authenticated
     */
    userName?: string
  }
  /**
   * AuthIdentityDatagramRequest
   */
  export interface AuthIdentityDatagramRequest {
    /**
     * The datagram
     */
    datagram?: string
  }
  /**
   * AuthIdentityRequest
   */
  export interface AuthIdentityRequest {
    /**
     * contactId
     */
    contactId?: string
    /**
     * password encrypted using the keystore (which shall be provided). Encrypted password shall be preappended with randomly generated IV of128 bits
     */
    password?: string
    /**
     * pin encrypted using the keystore (which shall be provided). Encrypted pin shall be preappended with randomly generated IV of128 bits
     */
    pin?: string
    /**
     * The user's username
     */
    username?: string
  }
  /**
   * AuthenticateDeviceRequest
   */
  export interface AuthenticateDeviceRequest {
    /**
     * The subjectId for the user
     */
    deviceId?: string
    /**
     * The ID for the users selected account
     */
    encryptedMsisdn?: string
  }
  namespace AuthenticateDeviceUsingPOST {
    export interface BodyParameters {
      request: Authorization.AuthenticateDeviceUsingPOST.Parameters.Request
    }
    namespace Parameters {
      export type Request = Authorization.AuthenticateDeviceRequest
    }
    namespace Responses {
      export type $200 = Authorization.RegisteredDeviceResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace AuthenticateDeviceUsingPOST1 {
    export interface BodyParameters {
      request: Authorization.AuthenticateDeviceUsingPOST1.Parameters.Request
    }
    namespace Parameters {
      export type Request = Authorization.AuthenticateDeviceRequest
    }
    namespace Responses {
      export type $200 = Authorization.RegisteredDeviceResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * AuthenticateIdentityPINResponse
   */
  export interface AuthenticateIdentityPINResponse {
    /**
     * Active/Inactive
     */
    accountStatus?: string
    /**
     * If error root cause of the error 500 Internal Server Error
     */
    errorMessage?: string
    /**
     * Http error code
     */
    httpCode?: number // int32
    /**
     * Count of invalid attempts
     */
    invalidPinCount?: number // int32
    /**
     * Returns true if user is login first time into application otherwise false
     */
    isFirstTimeLogin?: boolean
    /**
     * Returns the OAM Online Session Token ID stored in OnePortal identity and access management system
     */
    onlineSessionToken?: string
    /**
     * Is valid pin
     */
    pinValid?: boolean
    /**
     * 0 for Success or Error Code for Failures
     */
    reasonCode?: number // int32
    /**
     * 'Success' or 'Failure'
     */
    status?: string
    /**
     * User name
     */
    userName?: string
  }
  /**
   * AuthenticateIdentityPasswordResponse
   */
  export interface AuthenticateIdentityPasswordResponse {
    /**
     * Returns Active/Inactive
     */
    accountStatus?: string
    /**
     * If error root cause of the error 500 Internal Server Error
     */
    errorMessage?: string
    /**
     * Http error code
     */
    httpCode?: number // int32
    /**
     * Count of invalid attempts
     */
    invalidPasswordCount?: number // int32
    /**
     * Returns true 2FA is enabled otherwise false
     */
    is2FAEnabled?: boolean
    /**
     * Returns true if user is login first time into application otherwise false
     */
    isFirstTimeLogin?: boolean
    /**
     * Returns the OAM Online Session Token ID stored in OnePortal identity and access management system
     */
    onlineSessionToken?: string
    /**
     * 0 for Success or Error Code for Failures
     */
    reasonCode?: number // int32
    /**
     * 'Success' or 'Failure'
     */
    status?: string
  }
  /**
   * AuthenticateIdentityRequest
   */
  export interface AuthenticateIdentityRequest {
    /**
     * Identity object
     */
    identity?: Authorization.PasswordPinIdentity
  }
  namespace AuthenticateIdentityUsingPOST {
    export interface BodyParameters {
      authenticateIdentityRequest: Authorization.AuthenticateIdentityUsingPOST.Parameters.AuthenticateIdentityRequest
    }
    namespace Parameters {
      export type AuthenticateIdentityRequest = Authorization.AuthenticateIdentityRequest
    }
    namespace Responses {
      export type $200 = Authorization.AuthenticateIdentityPasswordResponse
      export type $400 = Authorization.Error
      export type $401 = Authorization.Error
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.Error
      export type $500 = Authorization.Error
      export type $503 = Authorization.Error
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace AuthenticateUserUsingPOST {
    export interface BodyParameters {
      authenticateRequest: Authorization.AuthenticateUserUsingPOST.Parameters.AuthenticateRequest
    }
    namespace Parameters {
      export type AuthenticateRequest = Authorization.AuthIdentityRequest
    }
    namespace Responses {
      export type $200 = Authorization.Contact
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace AuthenticateUserUsingPOST1 {
    export interface BodyParameters {
      authenticateRequest: Authorization.AuthenticateUserUsingPOST1.Parameters.AuthenticateRequest
    }
    namespace Parameters {
      export type AuthenticateRequest = Authorization.AuthIdentityRequest
    }
    namespace Responses {
      export type $200 = Authorization.Contact
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace AuthenticateUserWithDatagramUsingPOST {
    export interface BodyParameters {
      datagram: Authorization.AuthenticateUserWithDatagramUsingPOST.Parameters.Datagram
    }
    namespace Parameters {
      export type Datagram = Authorization.AuthIdentityDatagramRequest
    }
    namespace Responses {
      export type $200 = Authorization.Contact
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace AuthenticateUserWithDatagramUsingPOST1 {
    export interface BodyParameters {
      datagram: Authorization.AuthenticateUserWithDatagramUsingPOST1.Parameters.Datagram
    }
    namespace Parameters {
      export type Datagram = Authorization.AuthIdentityDatagramRequest
    }
    namespace Responses {
      export type $200 = Authorization.Contact
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * AuthorizationTokenResponse
   */
  export interface AuthorizationTokenResponse {
    accountId?: string
    accountIdHash?: string
    authorizationToken?: string
    pin?: string
    subscriptionId?: string
    subscriptionIdHash?: string
  }
  /**
   * ChangePinRequest
   */
  export interface ChangePinRequest {
    pin?: string
  }
  /**
   * ChangeTempPassword
   */
  export interface ChangeTempPassword {
    permanentPassword?: string
    temperoryPassword?: string
    temporaryPassword?: string
    userName?: string
  }
  namespace ChangeTempPasswordUsingPOST {
    export interface BodyParameters {
      changePass: Authorization.ChangeTempPasswordUsingPOST.Parameters.ChangePass
    }
    namespace Parameters {
      export type ChangePass = Authorization.ChangeTempPassword
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace ChangeTempPasswordUsingPOST1 {
    export interface BodyParameters {
      changePass: Authorization.ChangeTempPasswordUsingPOST1.Parameters.ChangePass
    }
    namespace Parameters {
      export type ChangePass = Authorization.ChangeTempPassword
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace ChangeTempPasswordUsingPOST2 {
    export interface BodyParameters {
      changePass: Authorization.ChangeTempPasswordUsingPOST2.Parameters.ChangePass
    }
    namespace Parameters {
      export type ChangePass = Authorization.ChangeTempPassword
    }
    namespace Responses {
      export type $200 = Authorization.AuthorizationTokenResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * ChangeUserNameRequest
   * A request data model to internal request of changing user username
   */
  export interface ChangeUserNameRequest {
    /**
     * Current username
     */
    currentUsername?: string
    /**
     * New username
     */
    newUsername?: string
  }
  /**
   * CheckUniqueUserNameRequest
   */
  export interface CheckUniqueUserNameRequest {
    /**
     * Identity object
     */
    identity?: Authorization.UserNameIdentity
  }
  /**
   * CheckUniqueUserNameResponse
   */
  export interface CheckUniqueUserNameResponse {
    /**
     * If error root cause of the error 500 Internal Server Error
     */
    errorMessage?: string
    /**
     * Http error code
     */
    httpCode?: number // int32
    /**
     * Returns true if User is available in the IDAM otherwise false
     */
    matchFound?: boolean
    /**
     * 0 for Success or Error Code for Failures
     */
    reasonCode?: number // int32
    /**
     * 'Success' or 'Failure'
     */
    status?: string
  }
  /**
   * CheckUniqueUsernameResponse
   */
  export interface CheckUniqueUsernameResponse {
    uniqueUserName?: boolean
  }
  namespace CheckUniqueUsernameUsingPOST {
    export interface BodyParameters {
      checkUniqueUserNameRequest: Authorization.CheckUniqueUsernameUsingPOST.Parameters.CheckUniqueUserNameRequest
    }
    namespace Parameters {
      export type CheckUniqueUserNameRequest = Authorization.CheckUniqueUserNameRequest
    }
    namespace Responses {
      export type $200 = Authorization.CheckUniqueUserNameResponse
      export type $400 = Authorization.Error
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.Error
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.Error
      export type $500 = Authorization.Error
      export type $503 = Authorization.Error
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * Contact
   */
  export interface Contact {
    /**
     * The accountId for the user.
     */
    accountId?: string
    /**
     * accountId hash
     */
    accountIdHash?: string
    /**
     * Flag to indicate temporary password reset
     */
    forcePasswordReset?: boolean
    /**
     * User session token stored in VF identity and access management system. This token enables user to switch across channels (from app to web, web to IVR so on) without requiring to authenticate again
     */
    onlineSessionToken?: string
    /**
     * The subjectId for the user
     */
    subjectId: string
    /**
     * hash of the subject id.
     */
    subjectIdHash: string
    /**
     * The subscriptionId for the user.
     */
    subscriptionId?: string
    /**
     * subscriptionIdHash
     */
    subscriptionIdHash?: string
    /**
     * Migration status of the customer.
     */
    userStatus?: 'NOT_MIGRATED' | 'MIGRATED' | 'PENDING_MIGRATION'
    /**
     * username
     */
    username?: string
  }
  /**
   * ContactAccounts
   */
  export interface ContactAccounts {
    accountDetails?: Authorization.AccountDetails[]
    numberOfAccounts?: string
  }
  /**
   * CreateIdentitySessionRequest
   */
  export interface CreateIdentitySessionRequest {
    /**
     * Identity object
     */
    identity?: Authorization.UserNameIdentity
  }
  /**
   * CreateIdentitySessionResponse
   */
  export interface CreateIdentitySessionResponse {
    /**
     * Returns Active/Inactive
     */
    accountStatus?: string
    /**
     * If error root cause of the error 500 Internal Server Error
     */
    errorMessage?: string
    /**
     * Http error code
     */
    httpCode?: number // int32
    /**
     * Returns true if user is login first time into application otherwise false
     */
    isFirstTimeLogin?: boolean
    /**
     * Returns the OAM Online Session Token ID stored in OnePortal identity and access management system
     */
    onlineSessionToken?: string
    /**
     * 0 for Success or Error Code for Failures
     */
    reasonCode?: number // int32
    /**
     * 'Success' or 'Failure'
     */
    status?: string
  }
  namespace CreateIdentitySessionUsingPOST {
    export interface BodyParameters {
      createIdentitySessionRequest: Authorization.CreateIdentitySessionUsingPOST.Parameters.CreateIdentitySessionRequest
    }
    namespace Parameters {
      export type CreateIdentitySessionRequest = Authorization.CreateIdentitySessionRequest
    }
    namespace Responses {
      export type $200 = Authorization.CreateIdentitySessionResponse
      export type $400 = Authorization.Error
      export type $401 = Authorization.Error
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.Error
      export type $500 = Authorization.Error
      export type $503 = Authorization.Error
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace CreateJourneyUsingPOST {
    namespace Responses {
      export type $200 = Authorization.JourneyResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace DoesUsernameExistUsingPOST {
    export interface BodyParameters {
      userNameRequest: Authorization.DoesUsernameExistUsingPOST.Parameters.UserNameRequest
    }
    namespace Parameters {
      export type UserNameRequest = Authorization.UserNameRequest
    }
    namespace Responses {
      export type $200 = Authorization.CheckUniqueUsernameResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace DoesUsernameExistUsingPOST1 {
    export interface BodyParameters {
      userNameRequest: Authorization.DoesUsernameExistUsingPOST1.Parameters.UserNameRequest
    }
    namespace Parameters {
      export type UserNameRequest = Authorization.UserNameRequest
    }
    namespace Responses {
      export type $200 = Authorization.CheckUniqueUsernameResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * Error
   */
  export interface Error {
    errorCode?: string
    errorMessage?: string
    referenceId?: string
  }
  /**
   * ErrorResponse
   */
  export interface ErrorResponse {
    errorCode?: string
    errorMessage?: string
    referenceId?: string
  }
  /**
   * FavCustomerIDUsernameIdentity
   */
  export interface FavCustomerIDUsernameIdentity {
    /**
     * Customer ID to set Eg :- 123456
     */
    favCustomerID?: string
    userName?: string
  }
  namespace GenerateOTPForSubscriptionUsingPOST {
    export interface BodyParameters {
      registeredNumberId: Authorization.GenerateOTPForSubscriptionUsingPOST.Parameters.RegisteredNumberId
    }
    namespace Parameters {
      export type RegisteredNumberId = string
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $204 = Authorization.Error
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GenerateOTPForSubscriptionUsingPOST1 {
    export interface BodyParameters {
      registeredNumberId: Authorization.GenerateOTPForSubscriptionUsingPOST1.Parameters.RegisteredNumberId
    }
    namespace Parameters {
      export type RegisteredNumberId = string
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GenerateOTPForSubscriptionUsingPOST2 {
    export interface BodyParameters {
      registeredNumberId: Authorization.GenerateOTPForSubscriptionUsingPOST2.Parameters.RegisteredNumberId
    }
    namespace Parameters {
      export type RegisteredNumberId = string
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetAccessTokenUsingGET {
    namespace Responses {
      export type $200 = Authorization.AccessTokenResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetAccountDetailsUsingGET {
    namespace Responses {
      export type $200 = Authorization.ContactAccounts
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetAccountsUsingGET {
    namespace Responses {
      export type $200 = Authorization.ContactAccounts
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetAccountsUsingGET1 {
    namespace Responses {
      export type $200 = Authorization.ContactAccounts
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetAgentAuthTokenUsingGET {
    namespace Responses {
      export type $200 = Authorization.AgentAuthTokenResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetAuthorizationTokenUsingGET {
    namespace Responses {
      export type $200 = Authorization.AuthorizationTokenResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetClaimsUsingGET {
    namespace Responses {
      export type $200 = Authorization.AuthContext
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetClaimsUsingGET1 {
    namespace Responses {
      export type $200 = Authorization.AuthContext
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetClaimsUsingGET2 {
    namespace Responses {
      export type $200 = Authorization.AuthContext
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetClaimsUsingGET3 {
    namespace Responses {
      export type $200 = Authorization.AuthContext
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetIdentityByContactIdUsingGET {
    namespace Responses {
      export type $200 = Authorization.GetIdentityResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetIdentityByContactIdUsingGET1 {
    namespace Responses {
      export type $200 = Authorization.GetIdentityResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetIdentityByUsernameUsingGET {
    namespace Responses {
      export type $200 = Authorization.GetIdentityResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetIdentityByUsernameUsingGET1 {
    namespace Responses {
      export type $200 = Authorization.GetIdentityResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * GetIdentityMigrationStatusRequest
   */
  export interface GetIdentityMigrationStatusRequest {
    /**
     * subscriotion Id of the Identity. E.g: 447798227722
     */
    subscriptionId?: number // int64
    /**
     * User name of the Identity. E.g: username123
     */
    username?: string
  }
  /**
   * GetIdentityMigrationStatusResponse
   */
  export interface GetIdentityMigrationStatusResponse {
    /**
     * description
     */
    migrationStatus?: 'migrated' | 'not-migrated' | 'pending-migration' | 'newco-created'
  }
  namespace GetIdentityMigrationStatusUsingPOST {
    export interface BodyParameters {
      getIdentityMigrationStatusRequest: Authorization.GetIdentityMigrationStatusUsingPOST.Parameters.GetIdentityMigrationStatusRequest
    }
    namespace Parameters {
      export type GetIdentityMigrationStatusRequest = Authorization.GetIdentityMigrationStatusRequest
    }
    namespace Responses {
      export type $200 = Authorization.GetIdentityMigrationStatusResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetIdentityMigrationStatusUsingPOST1 {
    export interface BodyParameters {
      getIdentityMigrationStatusRequest: Authorization.GetIdentityMigrationStatusUsingPOST1.Parameters.GetIdentityMigrationStatusRequest
    }
    namespace Parameters {
      export type GetIdentityMigrationStatusRequest = Authorization.GetIdentityMigrationStatusRequest
    }
    namespace Responses {
      export type $200 = Authorization.GetIdentityMigrationStatusResponse
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * GetIdentityResponse
   */
  export interface GetIdentityResponse {
    /**
     * The following attributes provides identity details of the customer.
     */
    contactId?: string
    /**
     * Contains the Additional Information returned as part of Identity, plain text(not encrypted)
     */
    memorableWordHint?: string
    /**
     * Contains the Additional Information returned as part of Identity
     */
    pinSet?: boolean
    /**
     * Contains the Additional Information returned as part of Identity
     */
    status?: string
    /**
     * Unique Username of the Identity. E.g: JOHNDOE@GMAIL.COM
     */
    username?: string
  }
  namespace GetPinUsingGET {
    namespace Responses {
      export type $200 = Authorization.PinDto
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetPinUsingGET1 {
    namespace Responses {
      export type $200 = Authorization.PinDto
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetPinUsingGET2 {
    namespace Responses {
      export type $200 = Authorization.PinDto
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetRegisteredNumbersUsingGET {
    namespace Responses {
      export type $200 = Authorization.MobileNumber[]
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetRegisteredNumbersUsingGET1 {
    namespace Responses {
      export type $200 = Authorization.MobileNumber[]
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetRegisteredNumbersUsingGET2 {
    namespace Responses {
      export type $200 = Authorization.MobileNumber[]
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetSubscriptionDetailsUsingGET {
    namespace Responses {
      export type $200 = Authorization.AccountSubscriptions
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetSubscriptionsUsingGET {
    namespace Responses {
      export type $200 = Authorization.AccountSubscriptions
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetSubscriptionsUsingGET1 {
    namespace Responses {
      export type $200 = Authorization.AccountSubscriptions
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace GetUserIdentityDetailsUsingGET {
    namespace Responses {
      export type $200 = Authorization.UserIdentityInfo
      export type $400 = Authorization.Error
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.Error
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.Error
      export type $500 = Authorization.Error
      export type $503 = Authorization.Error
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * JourneyResponse
   */
  export interface JourneyResponse {
    journeyId?: string
  }
  namespace MapPhoneNumbersToMaskedNumbersForOtpChallengeUsingPOST {
    export interface BodyParameters {
      phoneNumbers: Authorization.MapPhoneNumbersToMaskedNumbersForOtpChallengeUsingPOST.Parameters.PhoneNumbers
    }
    namespace Parameters {
      export type PhoneNumbers = string[]
    }
    namespace Responses {
      export type $200 = Authorization.MobileNumber[]
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * MobileNumber
   */
  export interface MobileNumber {
    id?: string
    maskedMobileId?: string
  }
  /**
   * MultiFactorAuthenticationRequest
   */
  export interface MultiFactorAuthenticationRequest {
    /**
     * OneTimePassword received to customer's selected mobile number
     */
    otp?: string
    /**
     * RegisteredNumberId is the unique id created against each customer's mobile number
     */
    registeredNumberId?: string
  }
  /**
   * NewPasswordUsernameIdentity
   */
  export interface NewPasswordUsernameIdentity {
    /**
     * New Password –This string needs to be encrypted using AES algorithm.
     */
    newPassword?: string
    userName?: string
  }
  /**
   * OrgInfo
   */
  export interface OrgInfo {
    orgId?: string
    orgName?: string
  }
  /**
   * PartialPin
   */
  export interface PartialPin {
    /**
     * Pin position
     */
    position?: number // int32
    /**
     * Value of the of the pin in encrypted form
     */
    value?: string
  }
  /**
   * PasswordPinIdentity
   */
  export interface PasswordPinIdentity {
    /**
     * Credential value to authenticate the PIN/Password Type.
     */
    password?: string
    /**
     * Represents the value of the pin in encrypted form and its position
     */
    pin?: Authorization.PartialPin[]
    userName?: string
  }
  /**
   * PinDto
   */
  export interface PinDto {
    pin?: string
  }
  namespace RegisterDeviceUsingPOST {
    export interface BodyParameters {
      deviceId: Authorization.RegisterDeviceUsingPOST.Parameters.DeviceId
    }
    namespace Parameters {
      export type DeviceId = string
    }
    namespace Responses {
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * RegisteredDeviceResponse
   */
  export interface RegisteredDeviceResponse {
    /**
     * The ID for the users selected account
     */
    accountId?: string
    /**
     * The contactId for the user
     */
    contactId?: string
    /**
     * The ID for the users selected subscription
     */
    subscriptionId?: string
    vodafoneSimDevice?: boolean
  }
  /**
   * ResetPasswordRequest
   * A request data model to reset current user password
   */
  export interface ResetPasswordRequest {
    /**
     * Memorable word for password reset usage
     */
    memorableWord?: string
    /**
     * Pin encrypted by public key
     */
    pin?: string
    /**
     * Identity username
     */
    username?: string
  }
  namespace ResetPasswordUsingPOST {
    export interface BodyParameters {
      request: Authorization.ResetPasswordUsingPOST.Parameters.Request
    }
    namespace Parameters {
      export type Request = Authorization.ResetPasswordRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * ResetPinRequest
   */
  export interface ResetPinRequest {
    /**
     * Identity object
     */
    identity?: Authorization.UserNameIdentity
  }
  /**
   * ResetPinResponse
   */
  export interface ResetPinResponse {
    /**
     * If error root cause of the error 500 Internal Server Error
     */
    errorMessage?: string
    /**
     * Http error code
     */
    httpCode?: number // int32
    /**
     * 0 for Success or Error Code for Failures
     */
    reasonCode?: number // int32
    /**
     * Returns true if user pin updated successful otherwise false.
     */
    resetPinStatus?: boolean
    /**
     * 'Success' or 'Failure'
     */
    status?: string
  }
  namespace ResetPinUsingPOST {
    export interface BodyParameters {
      resetPinRequest: Authorization.ResetPinUsingPOST.Parameters.ResetPinRequest
    }
    namespace Parameters {
      export type ResetPinRequest = Authorization.ResetPinRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResetPinResponse
      export type $400 = Authorization.Error
      export type $401 = Authorization.Error
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.Error
      export type $500 = Authorization.Error
      export type $503 = Authorization.Error
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * ResponseEntity
   */
  export interface ResponseEntity {
    body?: {}
    statusCode?:
      | '100 CONTINUE'
      | '101 SWITCHING_PROTOCOLS'
      | '102 PROCESSING'
      | '103 CHECKPOINT'
      | '200 OK'
      | '201 CREATED'
      | '202 ACCEPTED'
      | '203 NON_AUTHORITATIVE_INFORMATION'
      | '204 NO_CONTENT'
      | '205 RESET_CONTENT'
      | '206 PARTIAL_CONTENT'
      | '207 MULTI_STATUS'
      | '208 ALREADY_REPORTED'
      | '226 IM_USED'
      | '300 MULTIPLE_CHOICES'
      | '301 MOVED_PERMANENTLY'
      | '302 FOUND'
      | '302 MOVED_TEMPORARILY'
      | '303 SEE_OTHER'
      | '304 NOT_MODIFIED'
      | '305 USE_PROXY'
      | '307 TEMPORARY_REDIRECT'
      | '308 PERMANENT_REDIRECT'
      | '400 BAD_REQUEST'
      | '401 UNAUTHORIZED'
      | '402 PAYMENT_REQUIRED'
      | '403 FORBIDDEN'
      | '404 NOT_FOUND'
      | '405 METHOD_NOT_ALLOWED'
      | '406 NOT_ACCEPTABLE'
      | '407 PROXY_AUTHENTICATION_REQUIRED'
      | '408 REQUEST_TIMEOUT'
      | '409 CONFLICT'
      | '410 GONE'
      | '411 LENGTH_REQUIRED'
      | '412 PRECONDITION_FAILED'
      | '413 PAYLOAD_TOO_LARGE'
      | '413 REQUEST_ENTITY_TOO_LARGE'
      | '414 URI_TOO_LONG'
      | '414 REQUEST_URI_TOO_LONG'
      | '415 UNSUPPORTED_MEDIA_TYPE'
      | '416 REQUESTED_RANGE_NOT_SATISFIABLE'
      | '417 EXPECTATION_FAILED'
      | '418 I_AM_A_TEAPOT'
      | '419 INSUFFICIENT_SPACE_ON_RESOURCE'
      | '420 METHOD_FAILURE'
      | '421 DESTINATION_LOCKED'
      | '422 UNPROCESSABLE_ENTITY'
      | '423 LOCKED'
      | '424 FAILED_DEPENDENCY'
      | '426 UPGRADE_REQUIRED'
      | '428 PRECONDITION_REQUIRED'
      | '429 TOO_MANY_REQUESTS'
      | '431 REQUEST_HEADER_FIELDS_TOO_LARGE'
      | '451 UNAVAILABLE_FOR_LEGAL_REASONS'
      | '500 INTERNAL_SERVER_ERROR'
      | '501 NOT_IMPLEMENTED'
      | '502 BAD_GATEWAY'
      | '503 SERVICE_UNAVAILABLE'
      | '504 GATEWAY_TIMEOUT'
      | '505 HTTP_VERSION_NOT_SUPPORTED'
      | '506 VARIANT_ALSO_NEGOTIATES'
      | '507 INSUFFICIENT_STORAGE'
      | '508 LOOP_DETECTED'
      | '509 BANDWIDTH_LIMIT_EXCEEDED'
      | '510 NOT_EXTENDED'
      | '511 NETWORK_AUTHENTICATION_REQUIRED'
    statusCodeValue?: number // int32
  }
  /**
   * ResponseMarkerInterface
   */
  export interface ResponseMarkerInterface {}
  /**
   * SetFavCustomerIDRequest
   */
  export interface SetFavCustomerIDRequest {
    /**
     * Identity object
     */
    identity?: Authorization.FavCustomerIDUsernameIdentity
  }
  /**
   * SetFavCustomerIDResponse
   */
  export interface SetFavCustomerIDResponse {
    /**
     * If error root cause of the error 500 Internal Server Error
     */
    errorMessage?: string
    /**
     * Http error code
     */
    httpCode?: number // int32
    /**
     * 0 for Success or Error Code for Failures
     */
    reasonCode?: number // int32
    /**
     * 'Success' or 'Failure'
     */
    status?: string
    /**
     * Returns true if favourite organization update is successful otherwise false
     */
    updatedFavCustomerId?: boolean
    /**
     * User name
     */
    userName?: string
  }
  namespace SetFavCustomerIDUsingPOST {
    export interface BodyParameters {
      setFavCustomerIDRequest: Authorization.SetFavCustomerIDUsingPOST.Parameters.SetFavCustomerIDRequest
    }
    namespace Parameters {
      export type SetFavCustomerIDRequest = Authorization.SetFavCustomerIDRequest
    }
    namespace Responses {
      export type $200 = Authorization.SetFavCustomerIDResponse
      export type $400 = Authorization.Error
      export type $401 = Authorization.Error
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.Error
      export type $500 = Authorization.Error
      export type $503 = Authorization.Error
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * SetMemorablePairRequest
   * A request data model to set memorable pair
   */
  export interface SetMemorablePairRequest {
    /**
     * Current user hint
     */
    hint?: string
    /**
     * Memorable word
     */
    memorableWord?: string
  }
  namespace SetMemorablePairUsingPUT {
    export interface BodyParameters {
      request: Authorization.SetMemorablePairUsingPUT.Parameters.Request
    }
    namespace Parameters {
      export type Request = Authorization.SetMemorablePairRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace SetMemorablePairUsingPUT1 {
    export interface BodyParameters {
      request: Authorization.SetMemorablePairUsingPUT1.Parameters.Request
    }
    namespace Parameters {
      export type Request = Authorization.SetMemorablePairRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * SetPasswordRequest
   */
  export interface SetPasswordRequest {
    /**
     * Identity object
     */
    identity?: Authorization.NewPasswordUsernameIdentity
  }
  /**
   * SetPasswordResponse
   */
  export interface SetPasswordResponse {
    /**
     * If error root cause of the error 500 Internal Server Error
     */
    errorMessage?: string
    /**
     * Http error code
     */
    httpCode?: number // int32
    /**
     * 0 for Success or Error Code for Failures
     */
    reasonCode?: number // int32
    /**
     * 'Success' or 'Failure'
     */
    status?: string
    /**
     * Returns true if update is successful otherwise false.
     */
    updatedPassword?: boolean
  }
  namespace SetPasswordUsingPOST {
    export interface BodyParameters {
      setPasswordRequest: Authorization.SetPasswordUsingPOST.Parameters.SetPasswordRequest
    }
    namespace Parameters {
      export type SetPasswordRequest = Authorization.SetPasswordRequest
    }
    namespace Responses {
      export type $200 = Authorization.SetPasswordResponse
      export type $400 = Authorization.Error
      export type $401 = Authorization.Error
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.Error
      export type $503 = Authorization.Error
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace SetPasswordUsingPUT {
    export interface BodyParameters {
      request: Authorization.SetPasswordUsingPUT.Parameters.Request
    }
    namespace Parameters {
      export type Request = Authorization.UpdatePasswordRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace SetPasswordUsingPUT1 {
    export interface BodyParameters {
      request: Authorization.SetPasswordUsingPUT1.Parameters.Request
    }
    namespace Parameters {
      export type Request = Authorization.UpdatePasswordRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * SetPinRequest
   * A request data model to set current pin
   */
  export interface SetPinRequest {
    /**
     * Current Identity pin encrypted by public key
     */
    currentPin?: string
    /**
     * New user pin encrypted by public key
     */
    newPin?: string
  }
  namespace SetPinUsingPOST {
    export interface BodyParameters {
      changePinRequest: Authorization.SetPinUsingPOST.Parameters.ChangePinRequest
    }
    namespace Parameters {
      export type ChangePinRequest = Authorization.ChangePinRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace SetPinUsingPOST1 {
    export interface BodyParameters {
      changePinRequest: Authorization.SetPinUsingPOST1.Parameters.ChangePinRequest
    }
    namespace Parameters {
      export type ChangePinRequest = Authorization.ChangePinRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace SetPinUsingPOST2 {
    export interface BodyParameters {
      changePinRequest: Authorization.SetPinUsingPOST2.Parameters.ChangePinRequest
    }
    namespace Parameters {
      export type ChangePinRequest = Authorization.ChangePinRequest
    }
    namespace Responses {
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace SetPinUsingPUT {
    export interface BodyParameters {
      request: Authorization.SetPinUsingPUT.Parameters.Request
    }
    namespace Parameters {
      export type Request = Authorization.SetPinRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace SetPinUsingPUT1 {
    export interface BodyParameters {
      request: Authorization.SetPinUsingPUT1.Parameters.Request
    }
    namespace Parameters {
      export type Request = Authorization.SetPinRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace SetUsernameUsingPUT {
    export interface BodyParameters {
      request: Authorization.SetUsernameUsingPUT.Parameters.Request
    }
    namespace Parameters {
      export type Request = Authorization.ChangeUserNameRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  /**
   * SubscriptionClaim
   */
  export interface SubscriptionClaim {
    /**
     * Subscription's billingAccountId.
     */
    billing_account_id?: string
    /**
     * Subscription's billingProfileId.
     */
    billing_profile_id?: string
    /**
     * Subscription Id.
     */
    id?: string
    /**
     * Subscription's owner account id.
     */
    owning_account_id?: string
    /**
     * Subscription paymentType.
     */
    payment_type?: string
    /**
     * Subscription role.
     */
    roles?: string
    /**
     * Subscription status.
     */
    status?: string
    /**
     * Subscription type.
     */
    type?: string
  }
  /**
   * SubscriptionDetails
   */
  export interface SubscriptionDetails {
    accountName?: string
    name?: string
    oneNumberPrimary?: string
    /**
     * Suggest if the subscription is one number primary or secondary
     */
    oneNumberType?: string
    paymentType?: string
    phoneNumber?: string
    redPlusLeader?: boolean
    redPlusSharer?: boolean
    /**
     * Primary CTN/msisdn is populated in case of secondary subscription
     */
    relatedOneNumberPrimary?: string
    status?: string
    subscriptionId?: string
    subscriptionIdHash?: string
    subscriptionRole?: string
    type?: string
  }
  /**
   * UpdatePasswordRequest
   * A request data model to update current user password
   */
  export interface UpdatePasswordRequest {
    /**
     * Current user password encrypted by public key
     */
    currentPassword?: string
    /**
     * New user password encrypted by public key
     */
    newPassword?: string
    /**
     * Identity username
     */
    username?: string
  }
  /**
   * UserIdentitityInfo
   */
  export interface UserIdentitityInfo {
    accountStatus?: string
    email?: string
    favCustomer?: Authorization.OrgInfo
    firstName?: string
    lastName?: string
    portalUserName?: string
    primaryCustomer?: Authorization.OrgInfo
    reasonCode?: number // int32
    roles?: string[]
    secondaryCustomers?: Authorization.OrgInfo[]
    status?: string
    userType?: string
  }
  /**
   * UserIdentityInfo
   */
  export interface UserIdentityInfo {
    accountStatus?: string
    email?: string
    /**
     * If error root cause of the error 500 Internal Server Error
     */
    errorMessage?: string
    favCustomer?: Authorization.OrgInfo
    firstName?: string
    lastName?: string
    portalUserName?: string
    primaryCustomer?: Authorization.OrgInfo
    reasonCode?: number // int32
    roles?: string[]
    secondaryCustomers?: Authorization.OrgInfo[]
    /**
     * 'Success' or 'Failure'
     */
    status?: string
    userType?: string
  }
  /**
   * UserNameIdentity
   */
  export interface UserNameIdentity {
    userName?: string
  }
  /**
   * UserNameRequest
   */
  export interface UserNameRequest {
    userName?: string
  }
  /**
   * ValidationFailedResponse
   */
  export interface ValidationFailedResponse {
    errorCode?: string
    errorMessage?: string
    referenceId?: string
    validationMessages?: Authorization.ValidationMessage[]
  }
  /**
   * ValidationMessage
   */
  export interface ValidationMessage {
    parameter?: string
    reason?: string
  }
  namespace VerifyOTPUsingPOST {
    export interface BodyParameters {
      multiFactorAuthenticationRequest: Authorization.VerifyOTPUsingPOST.Parameters.MultiFactorAuthenticationRequest
    }
    namespace Parameters {
      export type MultiFactorAuthenticationRequest = Authorization.MultiFactorAuthenticationRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
  namespace VerifyOTPUsingPOST1 {
    export interface BodyParameters {
      multiFactorAuthenticationRequest: Authorization.VerifyOTPUsingPOST1.Parameters.MultiFactorAuthenticationRequest
    }
    namespace Parameters {
      export type MultiFactorAuthenticationRequest = Authorization.MultiFactorAuthenticationRequest
    }
    namespace Responses {
      export type $200 = Authorization.ResponseEntity
      export type $400 = Authorization.ValidationFailedResponse
      export type $401 = Authorization.ErrorResponse
      export type $403 = Authorization.ErrorResponse
      export type $404 = Authorization.ErrorResponse
      export type $405 = Authorization.ErrorResponse
      export type $408 = Authorization.ErrorResponse
      export type $500 = Authorization.ErrorResponse
      export type $503 = Authorization.ErrorResponse
      export type $504 = Authorization.ErrorResponse
    }
  }
}
