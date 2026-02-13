import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BidiText, DirectionProvider, RtlFlip } from "../src/components.js";

describe("BidiText", () => {
  it("renders Hebrew text with dir=rtl", () => {
    const { container } = render(<BidiText>שלום</BidiText>);
    const span = container.querySelector("span");
    expect(span?.getAttribute("dir")).toBe("rtl");
    expect(span?.textContent).toBe("שלום");
  });

  it("renders English text with dir=ltr", () => {
    const { container } = render(<BidiText>Hello</BidiText>);
    const span = container.querySelector("span");
    expect(span?.getAttribute("dir")).toBe("ltr");
  });

  it("renders with custom tag", () => {
    const { container } = render(<BidiText as="p">שלום</BidiText>);
    expect(container.querySelector("p")).toBeTruthy();
  });
});

describe("DirectionProvider", () => {
  it("wraps children with dir attribute", () => {
    const { container } = render(
      <DirectionProvider direction="rtl">
        <span>content</span>
      </DirectionProvider>,
    );
    const div = container.querySelector("div");
    expect(div?.getAttribute("dir")).toBe("rtl");
  });
});

describe("RtlFlip", () => {
  it("renders rtl content when direction is rtl", () => {
    const { getByText } = render(
      <RtlFlip direction="rtl" rtl={<span>RTL</span>} ltr={<span>LTR</span>} />,
    );
    expect(getByText("RTL")).toBeTruthy();
  });

  it("renders ltr content when direction is ltr", () => {
    const { getByText } = render(
      <RtlFlip direction="ltr" rtl={<span>RTL</span>} ltr={<span>LTR</span>} />,
    );
    expect(getByText("LTR")).toBeTruthy();
  });
});
