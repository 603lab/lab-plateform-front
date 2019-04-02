/**
 * 该方法存在一个风险, 当存在 < || > 符号时, 其后面内容也同样被置空
 */
export function replaceHtmlTag(str) {
  return str.toString().replace(/<[^>]*>/g, '');
}
