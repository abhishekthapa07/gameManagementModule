const fs = require("fs");
const envData = require("dotenv").config().parsed;
import { expect } from "chai";

describe("System test", () => {

  describe("Node, express, mongo db releted values", () => {
    // Node version checking

    it("should node version install equal or greater then 12.18", () => {
      const nodeVersion = parseFloat(process.versions.node);
      expect(nodeVersion).to.be.not.below(12.18);
      expect(nodeVersion).to.be.gte(12.18);
    });

    // port number test
    it("Should port number should be between 3000 to 4000", () => {
      expect(+envData.PORT).to.not.be.below(3000);
      expect(+envData.PORT).to.not.be.above(4000);
    });

    // NODE_ENV test
    it("Should NODE_ENV value should either be develop || test || production.", () => {
      expect(envData.NODE_ENV).to.be.oneOf(["develop", "test", "production"]);
    });

    // DATABASE name check
    it("should database url name  must be 'mongodb://localhost:27017/dbName", () => {
      expect(envData.DATABASE).to.be.a("string");
      expect(envData.DATABASE).to.include("mongodb://localhost:27017/");
      expect(envData.DATABASE.length).to.be.gt(30);
    });

    // SESSION_SECRET key check
    it("should SESSION_SECRET key  must be exits", () => {
      expect(envData.SESSION_SECRET).to.be.a("string");
      expect(envData.SESSION_SECRET).to.exist;
      expect(envData.SESSION_SECRET.length).to.be.gt(1);
    });
  });
});
