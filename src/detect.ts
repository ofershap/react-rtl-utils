const RTL_REGEX =
  /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0780-\u07BF\u0860-\u086F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

const LTR_REGEX = /[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]/;

export type Direction = "rtl" | "ltr";

export function detectDirection(text: string): Direction {
  const stripped = text.replace(/[\s\d\p{P}\p{S}]/gu, "");
  if (stripped.length === 0) return "ltr";

  let rtlCount = 0;
  let ltrCount = 0;

  for (const char of stripped) {
    if (RTL_REGEX.test(char)) rtlCount++;
    else if (LTR_REGEX.test(char)) ltrCount++;
  }

  return rtlCount > ltrCount ? "rtl" : "ltr";
}

export function isRtl(text: string): boolean {
  return detectDirection(text) === "rtl";
}

export function isLtr(text: string): boolean {
  return detectDirection(text) === "ltr";
}

export function hasRtlChars(text: string): boolean {
  return RTL_REGEX.test(text);
}

export function hasLtrChars(text: string): boolean {
  return LTR_REGEX.test(text);
}

export function isMixed(text: string): boolean {
  return hasRtlChars(text) && hasLtrChars(text);
}
