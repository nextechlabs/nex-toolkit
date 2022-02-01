import fs from "fs";
import path from "path";
import { getAddress } from "@ethersproject/address";
import nexdexDefault from "./tokens/nexdex-default.json";
import nexdexExtended from "./tokens/nexdex-extended.json";
import nexdexTop100 from "./tokens/nexdex-top-100.json";
import nexdexTop15 from "./tokens/nexdex-top-15.json";

const lists = {
  "nexdex-default": nexdexDefault,
  "nexdex-extended": nexdexExtended,
  "nexdex-top-100": nexdexTop100,
  "nexdex-top-15": nexdexTop15
};

const checksumAddresses = (listName: string): void => {
  let badChecksumCount = 0;
  const listToChecksum = lists[listName];
  const updatedList = listToChecksum.reduce((tokenList, token) => {
    const checksummedAddress = getAddress(token.address);
    if (checksummedAddress !== token.address) {
      badChecksumCount += 1;
      const updatedToken = { ...token, address: checksummedAddress };
      return [...tokenList, updatedToken];
    }
    return [...tokenList, token];
  }, []);

  if (badChecksumCount > 0) {
    console.info(`Found and fixed ${badChecksumCount} non-checksummed addreses`);
    const tokenListPath = `${path.resolve()}/src/tokens/${listName}.json`;
    console.info("Saving updated list to ", tokenListPath);
    const stringifiedList = JSON.stringify(updatedList, null, 2);
    fs.writeFileSync(tokenListPath, stringifiedList);
    console.info("Checksumming done!");
  } else {
    console.info("All addresses are already checksummed");
  }
};

export default checksumAddresses;
