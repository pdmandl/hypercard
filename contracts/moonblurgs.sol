// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./ERC721A.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract moonblurgs is Ownable, ERC721A, ReentrancyGuard {
    uint256 public immutable maxPerAddressDuringMint;
    uint256 public immutable publicPrice;

    mapping(address => uint256) public allowlist;

    constructor() ERC721A("moonblurgs.wtf", "BLURG", 20, 10000) {
        maxPerAddressDuringMint = 20;
        publicPrice = 0;
    }

    modifier callerIsUser() {
        require(tx.origin == msg.sender, "The caller is another contract");
        _;
    }

    function publicSaleMint(uint256 quantity) external payable callerIsUser {
        require(isPublicSaleOn(), "public sale has not begun yet");
        require(
            totalSupply() + quantity <= collectionSize,
            "reached max supply"
        );
        require(quantity <= maxPerAddressDuringMint, "max 20 per transaction");
        _safeMint(msg.sender, quantity);
        refundIfOver(publicPrice * quantity);
    }

    function refundIfOver(uint256 price) private {
        require(msg.value >= price, "Need to send more ETH.");
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
    }

    // For marketing etc.
    function devMint(uint256 quantity) external onlyOwner {
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(msg.sender, maxPerAddressDuringMint);
        }
    }

    string private _baseTokenURI;
    string private _baseTokenURIeggs;
    bool private _isPublicSaleActive;

    function isPublicSaleOn() public view returns (bool) {
        return _isPublicSaleActive;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function _baseURIeggs()
        internal
        view
        virtual
        override
        returns (string memory)
    {
        return _baseTokenURIeggs;
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function setBaseURIeggs(string calldata baseURI) external onlyOwner {
        _baseTokenURIeggs = baseURI;
    }

    function setPublicSaleState(bool state) external onlyOwner {
        _isPublicSaleActive = state;
    }

    function withdrawMoney() external onlyOwner nonReentrant {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }

    function setOwnersExplicit(uint256 quantity)
        external
        onlyOwner
        nonReentrant
    {
        _setOwnersExplicit(quantity);
    }

    function numberMinted(address owner) public view returns (uint256) {
        return _numberMinted(owner);
    }

    function getOwnershipData(uint256 tokenId)
        external
        view
        returns (TokenOwnership memory)
    {
        return ownershipOf(tokenId);
    }
}
