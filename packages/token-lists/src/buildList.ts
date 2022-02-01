import fs from "fs";
import path from "path";
import { TokenList } from "@uniswap/token-lists";
import { version as nexdexDefaultVersion } from "../lists/nexdex-default.json";
import { version as nexdexExtendedVersion } from "../lists/nexdex-extended.json";
import { version as nexdexTop15Version } from "../lists/nexdex-top-15.json";
import { version as nexdexTop100Version } from "../lists/nexdex-top-100.json";
import nexdexDefault from "./tokens/nexdex-default.json";
import nexdexExtended from "./tokens/nexdex-extended.json";
import nexdexTop100 from "./tokens/nexdex-top-100.json";
import nexdexTop15 from "./tokens/nexdex-top-15.json";

export enum VersionBump {
  "major" = "major",
  "minor" = "minor",
  "patch" = "patch",
}

type Version = {
  major: number;
  minor: number;
  patch: number;
};

const lists = {
  "nexdex-default": {
    list: nexdexDefault,
    name: "NexDex Default",
    keywords: ["nexdex", "default"],
    logoURI:
      "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png",
    sort: false,
    currentVersion: nexdexDefaultVersion,
  },
  "nexdex-extended": {
    list: nexdexExtended,
    name: "NexDex Extended",
    keywords: ["nexdex", "extended"],
    logoURI:
      "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png",
    sort: true,
    currentVersion: nexdexExtendedVersion,
  },
  "nexdex-top-100": {
    list: nexdexTop100,
    name: "NexDex Top 100",
    keywords: ["nexdex", "top 100"],
    logoURI:
      "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png",
    sort: true,
    currentVersion: nexdexTop100Version,
  },
  "nexdex-top-15": {
    list: nexdexTop15,
    name: "NexDex Top 15",
    keywords: ["nexdex", "top 15"],
    logoURI:
      "https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png",
    sort: true,
    currentVersion: nexdexTop15Version,
  },
};

const getNextVersion = (currentVersion: Version, versionBump?: VersionBump) => {
  const { major, minor, patch } = currentVersion;
  switch (versionBump) {
    case VersionBump.major:
      return { major: major + 1, minor, patch };
    case VersionBump.minor:
      return { major, minor: minor + 1, patch };
    case VersionBump.patch:
    default:
      return { major, minor, patch: patch + 1 };
  }
};

export const buildList = (listName: string, versionBump?: VersionBump): TokenList => {
  const { list, name, keywords, logoURI, sort, currentVersion } = lists[listName];
  const version = getNextVersion(currentVersion, versionBump);
  return {
    name,
    timestamp: new Date().toISOString(),
    version,
    logoURI,
    keywords,
    // sort them by symbol for easy readability (not applied to default list)
    tokens: sort
      ? list.sort((t1, t2) => {
          if (t1.chainId === t2.chainId) {
            // CAKE first in extended list
            if ((t1.symbol === "CAKE") !== (t2.symbol === "CAKE")) {
              return t1.symbol === "CAKE" ? -1 : 1;
            }
            return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
          }
          return t1.chainId < t2.chainId ? -1 : 1;
        })
      : list,
  };
};

export const saveList = (tokenList: TokenList, listName: string): void => {
  const tokenListPath = `${path.resolve()}/lists/${listName}.json`;
  const stringifiedList = JSON.stringify(tokenList, null, 2);
  fs.writeFileSync(tokenListPath, stringifiedList);
  console.info("Token list saved to ", tokenListPath);
};
