import Fuse from 'fuse.js';
import { SearchProvider, CommanderSearchResult } from '@teambit/command-bar';

const searchedKeys: (keyof CommanderSearchResult)[] = ['displayName'];

export class CommandSearcher implements SearchProvider {
  private fuseCommands = new Fuse<CommanderSearchResult>([], {
    // weight can be included here.
    // fields loses weight the longer it gets, so it seems ok for now.
    keys: searchedKeys,
  });

  constructor(commands: CommanderSearchResult[]) {
    this.fuseCommands.setCollection(commands);
  }

  update(commands: CommanderSearchResult[]) {
    this.fuseCommands.setCollection(commands);
  }

  search(term: string, limit: number): CommanderSearchResult[] {
    const unprefixedPattern = term.replace(/^>/, '');
    const searchResults = this.fuseCommands.search(unprefixedPattern, { limit });
    return searchResults.map((x) => x.item);
  }

  test(term: string): boolean {
    return term.startsWith('>');
  }
}