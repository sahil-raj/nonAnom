const SHA256 = require('crypto-js/SHA256');

async function main() {
    const [deployer] = await ethers.getSigners();
    const NonAnom = await ethers.getContractFactory("NonAnom");
    const nonAnom = await NonAnom.deploy(SHA256("1234567890").toString());
    console.log(await nonAnom);
}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.error(err);
    process.exit(0);
});