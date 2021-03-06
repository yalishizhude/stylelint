"use strict";

const declarationValueIndex = require("../declarationValueIndex");
const postcss = require("postcss");

describe("declarationValueIndex", () => {
  it("has a space before the value", () => {
    return rules("a { a: b}", decl => {
      expect(declarationValueIndex(decl)).toBe(3);
    });
  });

  it("has a colon before the value", () => {
    return rules("a { a :b }", decl => {
      expect(declarationValueIndex(decl)).toBe(3);
    });
  });

  it("has no spaces before the value", () => {
    return rules("a { a:b }", decl => {
      expect(declarationValueIndex(decl)).toBe(2);
    });
  });

  it("has multiple characters before the value", () => {
    return rules("a { a  : b }", decl => {
      expect(declarationValueIndex(decl)).toBe(5);
    });
  });

  it("has a newline before the value", () => {
    return rules("a { a:\nb }", decl => {
      expect(declarationValueIndex(decl)).toBe(3);
    });
  });
});

function rules(css, cb) {
  return postcss()
    .process(css, { from: undefined })
    .then(result => {
      return result.root.walkDecls(cb);
    });
}
