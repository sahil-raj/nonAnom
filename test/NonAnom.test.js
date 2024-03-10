const {expect} = require("chai");
const {ethers} = require("hardhat");
const SHA256 = require('crypto-js/SHA256');

describe("NonAnom contract tests", () => {
    let NonAnom, add1, add2, owner, refContract;

    beforeEach(async () => {
        NonAnom = await ethers.getContractFactory("NonAnom");
        [owner, add1, add2] = await ethers.getSigners();
        refContract = await NonAnom.deploy(SHA256("1234567890").toString());
    });

    describe("deployment", async () => {
        it("should mint 10000 * 10^18 tokens (10^18 being decimals part)", async () => {
            expect(await refContract.totalSupply()).to.equal(BigInt(10000000000000000000000));
            // console.log(await refContract.runner.address, owner.address);
        });

        it("should mint all the tokens to deployer", async () => {
            expect(await refContract.balanceOf(owner.address)).to.equal(await refContract.totalSupply());
        });

        it("should assign unique hash to deployer", async () => {
            expect(await refContract.userList(owner.address)).to.equal(await refContract.getUid(SHA256("1234567890").toString()));
        });

    });
});