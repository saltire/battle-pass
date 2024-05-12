const { promises: fs } = require('node:fs');

fs.readdir('./src/assets/items')
  .then(names => {
    names.forEach(name => {
      const varName = name.replaceAll('-', '_').replace('.png', '');
      console.log(`import ${varName} from '../assets/items/${name}';`);
    });

    console.log(`\nexport const items = [`);
    ['hat', 'face', 'top_shirt', 'bottom_pants'].forEach(slot => {
      const shortSlot = slot.replace(/.*_/, '');
      names.filter(name => name.startsWith(slot)).forEach(filename => {
        const name = filename.replace('.png', '');
        const varName = name.replaceAll('-', '_');
        console.log(`  { name: '${name}', slot: '${shortSlot}', url: ${varName} },`);
      });
    });
    console.log('];');
  });
