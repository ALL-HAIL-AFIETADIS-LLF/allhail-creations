const TheKingsNFT_B2C1 = artifacts.require("TheKingsNFT_B2C1");

module.exports = function (deployer) {
  deployer.deploy(TheKingsNFT_B2C1, "Name", "Symbol", "https://");
};
