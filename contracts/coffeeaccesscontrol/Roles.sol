pragma solidity ^0.5.0;

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
  struct Role {
    // to access a specific bearer we call on the bearer[address]
    // this returns a boolean as we have previously mapped the address to a boolean with mapping (address => bool) bearer
    // in order to use this mechanism with different roles we created here a library which assignes it to a struct named Role
    // by using in contracts "Roles.Role private farmers" we access this Roles library and the name of the struct will be farmers
    // for a library to function universal we must access the specific name of the new struct name by setting Role to a new variable
    // called role: "Role storage role"  (="Role storage farmers")
    // Now we can access the right stuct Role ("farmers") by using role
    mapping (address => bool) bearer;
  }

  /**
   * @dev give an account access to this role
   */
  function add(Role storage role, address account) internal {
    require(account != address(0));
    require(!has(role, account));

    role.bearer[account] = true;
  }

  /**
   * @dev remove an account's access to this role
   */
  function remove(Role storage role, address account) internal {
    require(account != address(0));
    require(has(role, account));

    role.bearer[account] = false;
  }

  /**
   * @dev check if an account has this role
   * @return bool
    View keyword makes ot clear that the function only shows a state of a contract but does not modify it!
   */
  function has(Role storage role, address account)
    internal
    view
    returns (bool)
  {
    require(account != address(0));
    return role.bearer[account];
  }
}