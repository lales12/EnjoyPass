pragma solidity < 0.5.0;


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
    
    function checkUser(uint disease, address user) public view returns (bool validity) {
        return diseases[disease].users[user] > now;
    }
}
