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

    describe("deployment", () => {
        it("should mint 10000 * 10^18 tokens (10^18 being decimals part)", async () => {
            expect(await refContract.totalSupply()).to.equal(BigInt(10000000000000000000000));
        });

        it("should mint all the tokens to deployer", async () => {
            expect(await refContract.balanceOf(owner.address)).to.equal(await refContract.totalSupply());
        });

        it("should assign unique hash to deployer", async () => {
            expect(await refContract.userList(owner.address)).to.equal(await refContract.getUid(SHA256("1234567890").toString()));
        });

        it("should have name and symbol as nonAnom NAT", async () => {
            expect(await refContract.name()).to.equal("nonAnom");
            expect(await refContract.symbol()).to.equal("NAT");
        });
    });

    describe("regsiterUser", () => {
        it("shouldn't register usser if it's not the caller", async () => {
            await expect(refContract.registerUser(add1.address, SHA256("1234567890").toString())).to.be.revertedWith("calling party not registering");
        });
        it("should map into userList", async () => {
            await refContract.registerUser(owner.address, SHA256("1234567890").toString());
            expect(await refContract.userList(owner.address)).to.not.equal("");
        });
    });

    describe("getUid", () => {
        it("should generate correct hash", async () => {
            const t = await ethers.utils.defaultAbiCoder.encode(['string', 'address'], [SHA256("1234567890").toString() ,owner.address]);
            const y = await ethers.utils.solidityKeccak256(['bytes'], [t]);
            expect(await refContract.getUid(SHA256("1234567890").toString())).to.equal(y);
        });
    });
});