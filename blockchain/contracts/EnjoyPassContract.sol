pragma solidity < 0.6.0;


contract EnjoyPassContract {
    address public root;
    address public owner;
    
    struct Disease {
        bool created;
        mapping (address => uint) users;
    }
    
    mapping(address => bool) doctors;

    mapping(uint => Disease) diseases;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, 'Only owner can perform this action');
        _;
    }

    modifier onlyRoot {
        require(msg.sender == root, 'Only root can perform this action');
        _;
    }

    modifier onlyDoctor {
        require(doctors[msg.sender], 'Only root can perform this action');
        _;
    }

    function addDoctor(address doctorAddress) public onlyRoot {
        doctors[doctorAddress] = true;
    }
    
    function removeDoctor(address doctorAddress) public onlyRoot {
        doctors[doctorAddress] = false;
    }
    
    function addRoot(address rootAddress) public onlyOwner {
        root = rootAddress;
    }

    function startDiesase(uint identifier) public onlyRoot {
        require(!diseases[identifier].created, 'This diseases is created');
        
        diseases[identifier].created = true;
    }
    
    function addUserDiseaseFree(uint disease, address user, uint validity) public onlyDoctor {
        require(diseases[disease].created, 'This disease dont exist');
        
        diseases[disease].users[user] = validity;
    }
    
    function getUserStamp(uint disease, address user) public view returns (uint timestamp) {
        return diseases[disease].users[user];
    }

    function checkUserValidity(
        uint disease,
        string memory message, 
        uint8 v, 
        bytes32 r, 
        bytes32 s
    ) public view returns (bool validity) {
        address user = verifyString(message, v, r, s);
        
        return diseases[disease].users[user] > now;
    }
    
    function verifyString(
        string memory message,
        uint8 v, 
        bytes32 r, 
        bytes32 s
    ) public pure returns (address signer) {
        string memory header = "\x19Ethereum Signed Message:\n000000";

        uint256 lengthOffset;
        uint256 length;
        assembly {
            // The first word of a string is its length
            length := mload(message)
            // The beginning of the base-10 message length in the prefix
            lengthOffset := add(header, 57)
        }

        // Maximum length we support
        require(length <= 999999);

        // The length of the message's length in base-10
        uint256 lengthLength = 0;

        // The divisor to get the next left-most message length digit
        uint256 divisor = 100000;

        // Move one digit of the message length to the right at a time
        while (divisor != 0) {

            // The place value at the divisor
            uint256 digit = length / divisor;
            if (digit == 0) {
                // Skip leading zeros
                if (lengthLength == 0) {
                    divisor /= 10;
                    continue;
                }
            }

            // Found a non-zero digit or non-leading zero digit
            lengthLength++;

            // Remove this digit from the message length's current value
            length -= digit * divisor;

            // Shift our base-10 divisor over
            divisor /= 10;

            // Convert the digit to its ASCII representation (man ascii)
            digit += 0x30;
            // Move to the next character and write the digit
            lengthOffset++;

            assembly {
                mstore8(lengthOffset, digit)
            }
        }

        // The null string requires exactly 1 zero (unskip 1 leading 0)
        if (lengthLength == 0) {
            lengthLength = 1 + 0x19 + 1;
        } else {
            lengthLength += 1 + 0x19;
        }

        // Truncate the tailing zeros from the header
        assembly {
            mstore(header, lengthLength)
        }

        // Perform the elliptic curve recover operation
        bytes32 check = keccak256(header, message);

        return ecrecover(check, v, r, s);
    }
}
