import Fuse, { FuseSearchOptions } from "fuse.js";

export default class FuzzyFinder {
  data: any[];
  fuse: Fuse<any>;
  static fuzzyFinderOptions = {
    isCaseSensitive: false,
    includeScore: false,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 1,
    location: 0,
    threshold: 0.6,
    distance: 100,
    useExtendedSearch: false,
    ignoreLocation: false,
    ignoreFieldNorm: false,
    fieldNormWeight: 1,
  }

  constructor(data: any[], keys: string[]) {
    this.data = data;
    let localFinderOptions = FuzzyFinder.fuzzyFinderOptions;
    (localFinderOptions as any).keys = keys;
    this.fuse = new Fuse(data, localFinderOptions);
  }

  search(query: string) {
    return this.fuse.search(query)
  }
}
