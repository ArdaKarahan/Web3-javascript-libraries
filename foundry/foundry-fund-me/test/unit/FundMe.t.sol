// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console} from "../../lib/forge-std/src/Test.sol";
import {FundMe} from "../../src/FundMe.sol";
import {DeployFundMe} from "../../script/FundMe.s.sol";

contract FundMeTest is Test {
    FundMe fundMe;

    address user = makeAddr("user");
    uint constant ethValue = 0.1 ether;
    uint constant startingValue = 1 ether;
    uint256 constant gasPrice = 1;

    function setUp() external {
        DeployFundMe deployFundMe = new DeployFundMe();
        fundMe = deployFundMe.run();
        vm.deal(user, startingValue);
    }

    function testMinimumDollarIsFive() public view {
        assertEq(fundMe.MINIMUM_USD(), 5e18);
    }

    function testOwnerIsMsgSender() public view {
        assertEq(fundMe.i_owner(), msg.sender);
    }

    function testPriceFeedVersionIsAccurate() public view {
        uint version = fundMe.getVersion();
        assertEq(version, 4);
    }

    function testFundFailsWhenNotEnoughETH() public {
        vm.expectRevert();
        fundMe.fund();
    }

    function testFundWhenEnoughETH() public {
        vm.prank(user);
        fundMe.fund{value: ethValue}();

        uint amountFunded = fundMe.getAddressToAmountFunded(user);
        assertEq(amountFunded, ethValue);
    }

    function testAddFundersArrayOfFunders() public {
        vm.prank(user);
        fundMe.fund{value: ethValue}();

        address funder = fundMe.getFunder(0);
        assertEq(funder == user, true);
    }

    modifier funded() {
        vm.prank(user);
        fundMe.fund{value: ethValue}();
        _;
    }

    function testOnlyOwnerCanWithdraw() public funded {
        vm.expectRevert();
        vm.prank(user);
        fundMe.withdraw();
    }

    function testWithdrawWithASingleFunder() public funded {
        uint256 startingOwnerBalance = fundMe.getOwner().balance;
        uint256 startingFundMeBalance = address(fundMe).balance;

        vm.prank(fundMe.getOwner());
        fundMe.withdraw();

        uint256 endingOwnerBalance = fundMe.getOwner().balance;
        uint256 endingFundMeBalance = address(fundMe).balance;
        assertEq(endingFundMeBalance == 0, true);
        assertEq(
            startingFundMeBalance + startingOwnerBalance == endingOwnerBalance,
            true
        );
    }

    function testWithdrawWithMultipleFunders() public funded {
        uint256 numberOfFunders = 10;
        uint256 startingFunderIndex = 1;
        for (uint256 i = startingFunderIndex; i < numberOfFunders; i++) {
            hoax(vm.addr(i), ethValue);
            fundMe.fund{value: ethValue}();
        }

        uint256 startingOwnerBalance = fundMe.getOwner().balance;
        uint256 startingFundMeBalance = address(fundMe).balance;

        vm.txGasPrice(gasPrice);
        vm.prank(fundMe.getOwner());
        fundMe.withdraw();

        uint256 endingOwnerBalance = fundMe.getOwner().balance;
        uint256 endingFundMeBalance = address(fundMe).balance;

        assertEq(endingFundMeBalance == 0, true);
        assertEq(
            startingFundMeBalance + startingOwnerBalance == endingOwnerBalance,
            true
        );
    }

    function testCheaperWithdrawWithMultipleFunders() public funded {
        uint256 numberOfFunders = 10;
        uint256 startingFunderIndex = 1;
        for (uint256 i = startingFunderIndex; i < numberOfFunders; i++) {
            hoax(vm.addr(i), ethValue);
            fundMe.fund{value: ethValue}();
        }

        uint256 startingOwnerBalance = fundMe.getOwner().balance;
        uint256 startingFundMeBalance = address(fundMe).balance;

        vm.txGasPrice(gasPrice);
        vm.prank(fundMe.getOwner());
        fundMe.cheaperWithdraw();

        uint256 endingOwnerBalance = fundMe.getOwner().balance;
        uint256 endingFundMeBalance = address(fundMe).balance;

        assertEq(endingFundMeBalance == 0, true);
        assertEq(
            startingFundMeBalance + startingOwnerBalance == endingOwnerBalance,
            true
        );
    }
}
