/**
 * rehype-table-wrap - legt um jede Markdown-Tabelle einen scrollbaren Rahmen.
 *
 * Warum das noetig ist: `.prose table` ist auf 100 % Breite gestylt, aber eine
 * Tabelle mit vier Spalten und echten Inhalten unterschreitet auf 375 px die
 * Mindestbreite ihrer Zellen nicht - sie schiebt stattdessen die ganze Seite
 * quer. Das faellt am Desktop nie auf und macht mobil jede Seite mit Tabelle
 * kaputt.
 *
 * Die naheliegende CSS-Loesung (`display:block;overflow-x:auto` auf der
 * Tabelle selbst) scheidet aus: sie schaltet den Tabellen-Layoutalgorithmus ab,
 * danach stehen die Spalten der einzelnen Zeilen nicht mehr untereinander.
 * Deshalb der Wrapper im HTML statt einer Regel im Stylesheet.
 */
import { visit } from 'unist-util-visit';

export default function rehypeTableWrap() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || index === null) return;
      // Schon eingepackt (z. B. handgeschriebenes HTML)? Dann nichts tun.
      if (parent.type === 'element' && parent.properties?.className?.includes?.('tablewrap')) return;
      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['tablewrap'] },
        children: [node],
      };
    });
  };
}
