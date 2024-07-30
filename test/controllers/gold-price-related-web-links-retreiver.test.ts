import { beforeEach, describe, expect, it, vi } from "vitest";
import { test_data } from "../mock-data/gold-price-test-data";
import GoldPriceRelatedWebLinksRetreiver from "../../src/controllers/gold-price-related-web-links-retreiver";
import { isValidUrl } from "../../src/utils/url";
import { mockSerpApi } from "../utils/mock-serpapi";

describe("retreive website links related to the gold price", async () => {
  let goldPriceRelatedWebLinksRetreiver: GoldPriceRelatedWebLinksRetreiver;
  let mock;

  beforeAll(() => {
    goldPriceRelatedWebLinksRetreiver = new GoldPriceRelatedWebLinksRetreiver();
    mock = mockSerpApi();
  });

  beforeEach(() => {
    mock.getJson
      .mockReturnValueOnce(test_data[0])
      .mockReturnValueOnce(test_data[1])
      .mockReturnValueOnce(test_data[2]);
  });

  it("should get list of urls", async () => {
    const linksToSearch =
      await goldPriceRelatedWebLinksRetreiver.getGoldPriceLinks();
    linksToSearch.forEach((url) => {
      expect(isValidUrl(url)).toBe(true);
    });
  });
});