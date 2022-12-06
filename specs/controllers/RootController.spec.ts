require("dotenv").config();
import supertest from "supertest";
import { expect } from "chai";
import app from "../../src/app";
import { clearData } from "../db";

const request = supertest(app());

describe("Root Controller", function () {
  before(async () => await clearData());

  it("Should 200", function (done) {
    request.get("/").expect(200, done);
  });
});
