import { expect } from "chai";
import { clearData, connect, disconnect } from "../db";
import { Profile } from "../../src/models/Profile";

describe("Profile model", function () {
  before(async () => await clearData());

  it("Should save a profile", async () => {
    const profile = new Profile({ address: "Post office road, Salugara" });
    await profile.save();
  });
});
