//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title CheckIn
 * @notice Contract to check in to the BatchRegistry
 * @dev This contract calls the checkIn function on the BatchRegistry contract
 */
contract CheckIn {
    address public immutable owner;
    IBatchRegistry public immutable batchRegistry;

    error OnlyOwner();

    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyOwner();
        _;
    }

    /**
     * @notice Constructor to set the BatchRegistry address and owner
     * @param _batchRegistryAddress Address of the BatchRegistry contract
     */
    constructor(address _batchRegistryAddress) {
        batchRegistry = IBatchRegistry(_batchRegistryAddress);
        owner = msg.sender;
    }

    /**
     * @notice Function to check in to the BatchRegistry
     * @dev Only the owner can call this function
     */
    function checkMeIn() public onlyOwner {
        batchRegistry.checkIn();
    }

    /**
     * @notice Get the contract address stored in BatchRegistry for the owner
     * @return The contract address stored in BatchRegistry
     */
    function getMyContractAddress() public view returns (address) {
        return batchRegistry.yourContractAddress(owner);
    }
}

/**
 * @title IBatchRegistry
 * @notice Interface for the BatchRegistry contract
 */
interface IBatchRegistry {
    function checkIn() external;
    function yourContractAddress(address builder) external view returns (address);
}

