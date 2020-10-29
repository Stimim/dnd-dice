#!/bin/bash

INPUT="./src/dice-expr-grammar.jison"
OUTPUT="./src/app/data-type/dice-expr-grammar.js"
jisons "${INPUT}" -o "${OUTPUT}" -m js

cat >>"${OUTPUT}" <<__DOC__

export function parseDiceExpr(expr) {
  return diceExprGrammar.parse(expr);
}
__DOC__
