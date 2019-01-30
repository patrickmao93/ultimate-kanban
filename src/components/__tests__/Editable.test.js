import React from "react";
import { mount } from "enzyme";

import Editable from "components/Editable";

let wrapped;

beforeEach(() => {
  wrapped = mount(<Editable />);
});

afterEach(() => {
  wrapped.unmount();
});

it("has a span and a hidden input field", () => {
  expect(wrapped.find());
});
