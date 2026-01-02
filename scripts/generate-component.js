// scripts/generate-component.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = question =>
  new Promise(resolve => rl.question(question, answer => resolve(answer)));

const LAYERS = [
  { key: '1', name: 'atom', folder: 'atoms' },
  { key: '2', name: 'molecule', folder: 'molecules' },
  { key: '3', name: 'organism', folder: 'organisms' },
  { key: '4', name: 'template', folder: 'templates' },
];

function toPascalCase(str) {
  return str
    .replace(/[-_]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

async function main() {
  console.log('🚀 Gerador de componentes');
  console.log('Selecione o tipo:');
  console.log('  1) atom');
  console.log('  2) molecule');
  console.log('  3) organism');
  console.log('  4) template');
  console.log('');

  const typeAnswer = await ask('Digite o número do tipo (1-4): ');
  const layer = LAYERS.find(l => l.key === typeAnswer.trim());

  if (!layer) {
    console.log('❌ Tipo inválido. Cancelando.');
    rl.close();
    return;
  }

  const nameAnswer = await ask('Nome do componente (ex: IconButton): ');
  const componentName = toPascalCase(nameAnswer.trim());

  if (!componentName) {
    console.log('❌ Nome de componente inválido. Cancelando.');
    rl.close();
    return;
  }

  const baseDir = path.resolve(
    __dirname,
    '..',
    'src',
    'components',
    layer.folder,
    componentName,
  );

  if (fs.existsSync(baseDir)) {
    console.log('⚠️  A pasta já existe, nada foi criado:');
    console.log(`   ${baseDir}`);
    rl.close();
    return;
  }

  fs.mkdirSync(baseDir, { recursive: true });

  const hookName = `use${componentName}`;

  // ---------- types.ts ----------
  const typesContent = `export type ${componentName}Props = {
  // TODO: adicionar props
};
`;

  // ---------- styles.ts ----------
  const stylesContent = `import styled from 'styled-components/native';

export const Container = styled.View\`
  /* TODO: estilos do ${componentName} */
\`;
`;

  // ---------- useNome.ts ----------
  const hookContent = `import { useCallback } from 'react';
import type { ${componentName}Props } from './types';

export const ${hookName} = (_props: ${componentName}Props) => {
  // TODO: lógica do hook

  const handlePress = useCallback(() => {
    // TODO: implementar
  }, []);

  return {
    handlePress,
  };
};
`;

  // ---------- index.tsx ----------
  const indexContent = `import React from 'react';
import * as S from './styles';
import type { ${componentName}Props } from './types';
import { ${hookName} } from './${hookName}';

export const ${componentName} = (props: ${componentName}Props) => {
  const { handlePress } = ${hookName}(props);

  return (
    <S.Container>
      {/* TODO: implementar UI do ${componentName} */}
    </S.Container>
  );
};
`;

  fs.writeFileSync(path.join(baseDir, 'types.ts'), typesContent, 'utf8');
  fs.writeFileSync(path.join(baseDir, 'styles.ts'), stylesContent, 'utf8');
  fs.writeFileSync(path.join(baseDir, `${hookName}.ts`), hookContent, 'utf8');
  fs.writeFileSync(path.join(baseDir, 'index.tsx'), indexContent, 'utf8');

  console.log('✅ Componente criado com sucesso:');
  console.log(`   Tipo: ${layer.name}`);
  console.log(`   Nome: ${componentName}`);
  console.log(`   Pasta: ${baseDir}`);

  rl.close();
}

main().catch(err => {
  console.error('❌ Erro ao gerar componente:', err);
  rl.close();
});
