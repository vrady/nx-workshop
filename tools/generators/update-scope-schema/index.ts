import { Tree, formatFiles, updateJson, readJson } from '@nrwl/devkit';

function getScopes(nxJson: any): string[] {
  const projects: any[] = Object.values(nxJson.projects);
  const allScopes = projects
    .map(project => project.tags
      .filter((tag: string) => tag.startsWith('scope:'))
    )
    .reduce((acc, tags) => [...acc, ...tags], [])
    .map((scope: string) => scope.slice(6));
  return Array.from(new Set(allScopes));
}

function replaceScopes(content: string, scopes: string[]): string {
  const joinScopes = scopes.map(s => `'${s}'`).join(' | ');
  const PATTERN = /interface Schema \{\n.*\n.*\n\}/gm;
  return content.replace(PATTERN,
    `interface Schema {
  name: string;
  directory: ${joinScopes};
}`
  );
}

export default async function (tree: Tree, schema: any) {
  const scopes = getScopes(readJson(tree, 'nx.json'));
  updateJson(tree, 'tools/generators/util-lib/schema.json', schemaJson => {
    schemaJson.properties.directory["x-prompt"].items = scopes.map(scope => ({
      value: scope,
      label: scope
    }))
    return schemaJson;
  })
  const content = tree.read('tools/generators/util-lib/index.ts', 'utf-8');
  const newContent = replaceScopes(content, scopes);
  tree.write('tools/generators/util-lib/index.ts', newContent);
  await formatFiles(tree);
}
