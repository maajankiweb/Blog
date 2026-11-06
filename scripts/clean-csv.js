const fs = require('fs');
const path = require('path');

const csvPath = path.resolve('public', 'woocommerce_products_import.csv');
const content = fs.readFileSync(csvPath, 'utf8');

function parseCSVLine(text) {
  let row = [''];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push('');
    } else {
      row[row.length - 1] += c;
    }
  }
  return row;
}

const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
const parsedHeader = parseCSVLine(lines[0]);
const imgIdx = parsedHeader.indexOf('Images');

const newRows = [];
for (let i = 0; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  if (i > 0 && imgIdx !== -1) {
    // Empty out image URL so WooCommerce does NOT make failing remote HTTP requests during CSV import
    cols[imgIdx] = '';
  }

  const csvRow = cols
    .map((val) => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return '"' + val.replace(/"/g, '""') + '"';
      }
      return val;
    })
    .join(',');

  newRows.push(csvRow);
}

fs.writeFileSync(csvPath, newRows.join('\n'), 'utf8');
console.log('Images column successfully cleared for safe CSV import!');
