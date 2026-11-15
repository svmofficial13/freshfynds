// Build-time helper: turns a "Myth / Reality" pair in an article into a card.
//
// In Markdown (or Pages CMS) the owner writes two paragraphs:
//
//   **Myth:** Crush the dhaniya seeds and they'll come up thick.
//
//   **Reality:** Splitting helps, but seed age matters just as much.
//
// This file finds that pair in the article's HTML and wraps both paragraphs in
// <div class="myth-card">…</div>. The text itself is never changed.
// The look of the card lives in src/styles/global.css (search for "myth-card").
//
// It is a plugin for Sätteri, Astro's Markdown processor (registered in
// astro.config.mjs). It runs only while the site is built: no JavaScript is
// sent to the reader. It imports nothing; a plain loop is enough here.
//
// Sätteri gives plugins a read-only tree. Changes are made by calling helpers
// on `ctx` (ctx.replaceNode, ctx.removeNode), which Sätteri applies afterwards.
//
// Note: Astro caches each article's HTML. After editing this file, delete
// .astro/data-store.json and node_modules/.astro/data-store.json, then rebuild,
// or old articles keep their old HTML.

// Returns the bold label at the start of a paragraph, in lower case and without
// the colon (e.g. "myth" or "reality"). Returns "" for anything else.
// Works for both **Myth:** and **Myth**: (colon inside or outside the bold).
function labelOf(node, ctx) {
  if (!node || node.type !== "element" || node.tagName !== "p") return "";
  const first = node.children[0];
  if (!first || first.type !== "element" || first.tagName !== "strong") return "";
  return ctx.textContent(first).trim().replace(/:$/, "").trim().toLowerCase();
}

// Returns the position of the next real element after position `i`, skipping
// the blank line breaks that sit between paragraphs in the HTML.
function nextElementIndex(children, i) {
  let j = i + 1;
  while (j < children.length && children[j].type === "text" && children[j].value.trim() === "") {
    j++;
  }
  return j;
}

// Makes a plain copy of a node and everything inside it.
// Needed because Sätteri tracks the original nodes: if the card held the
// original Reality paragraph, removing that paragraph below would also
// remove it from inside the card.
function copyNode(node) {
  const copy = { type: node.type };
  if (node.tagName) copy.tagName = node.tagName;
  if (node.properties) copy.properties = { ...node.properties };
  if (node.value !== undefined) copy.value = node.value;
  if (node.children) {
    copy.children = [];
    for (const child of node.children) copy.children.push(copyNode(child));
  }
  return copy;
}

// Looks at the article's top-level paragraphs only (not inside lists or quotes).
// A Myth paragraph with no Reality paragraph straight after it stays normal text.
function wrapMythCards(root, ctx) {
  const children = root.children;
  for (let i = 0; i < children.length; i++) {
    if (labelOf(children[i], ctx) !== "myth") continue;

    const j = nextElementIndex(children, i);
    if (labelOf(children[j], ctx) !== "reality") continue;

    // Put a card where the Myth paragraph was, holding copies of both paragraphs...
    ctx.replaceNode(children[i], {
      type: "element",
      tagName: "div",
      properties: { className: ["myth-card"] },
      children: [copyNode(children[i]), copyNode(children[j])],
    });
    // ...then remove the old Reality paragraph and the line breaks before it.
    for (let k = i + 1; k <= j; k++) {
      ctx.removeNode(children[k]);
    }

    i = j; // carry on after this pair
  }
}

// The plugin itself. "after" runs once per article, after the HTML is built.
export const mythCards = {
  name: "myth-cards",
  after: wrapMythCards,
};
