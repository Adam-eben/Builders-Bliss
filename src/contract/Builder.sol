// SPDX-License-Identifier: MIT
/* Note: 👆 The above line is mandatory to avoid compiler warnings like 
(Warning: SPDX license identifier not provided in source file.) */

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
    function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed creator,
        address indexed spender,
        uint256 value
    );
}

contract Materials {
    uint256 internal materialsLength = 0;
    address internal cUsdTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct Material {
        address payable creator;
        string image;
        string name;
        string quantity;
        string location;
        uint256 price;
        bool forSale;
    }

    mapping(uint256 => Material) public materials;

    // restrict only the creator of a Material to execute an operation on it
    modifier onlyCreator(uint256 _index) {
        require(msg.sender == materials[_index].creator, "Not the creator");
        _;
    }

    // add a new Material to material mapping based on input parameters
    function addMaterial(
        string memory _image,
        string memory _name,
        string memory _quantity,
        string memory _location,
        uint256 _price
    ) public {
        Material storage materialsss = materials[materialsLength];

        materialsss.creator = payable(msg.sender);
        materialsss.image = _image;
        materialsss.name = _name;
        materialsss.quantity = _quantity;
        materialsss.location = _location;
        materialsss.price = _price;
        materialsss.forSale = true;
        materialsLength++;
    }

    // get material from materials array using @_index
    function getMaterial(uint256 _index)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            bool
        )
    {
        return (
            materials[_index].creator,
            materials[_index].image,
            materials[_index].name,
            materials[_index].quantity,
            materials[_index].location,
            materials[_index].price,
            materials[_index].forSale
        );
    }

    // set sell status of Material at index @_index
    function flagForSale(uint256 _index) public onlyCreator(_index) {
        materials[_index].forSale = !materials[_index].forSale;
    }

    // buy Material at index @_index
    function buyMaterial(uint256 _index) public payable {
        require(
            materials[_index].forSale == true,
            "this material is not for sale"
        );
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                materials[_index].creator,
                materials[_index].price
            ),
            "Transfer failed."
        );
        materials[_index].creator = payable(msg.sender);
    }

    // get the length of total materials created
    function getMaterialsLength() public view returns (uint256) {
        return (materialsLength);
    }
}
