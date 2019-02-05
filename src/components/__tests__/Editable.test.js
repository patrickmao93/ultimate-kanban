import React from "react";
import { mount } from "enzyme";

import Editable from "components/Editable";

let wrapped;
let onEdit;
let onInputClick;
beforeEach(() => {
  onEdit = jest.fn((id, value) => "onEdit called with" + id + value);
  onInputClick = jest.fn(id => " onInputClick called with" + id);

  wrapped = mount(
    <Editable
      id={"0"}
      editing={false}
      content="test"
      onEdit={onEdit}
      onInputClick={onInputClick}
    />
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("should render an readOnly input field by default", () => {
  expect(wrapped.find("input").prop("readOnly")).toBeTruthy();
});

it("should call onInputClick when it's clicked", () => {
  wrapped.find("input").simulate("click");
  wrapped.update();
  expect(onInputClick.mock.calls.length).toEqual(1);
  expect(onInputClick.mock.calls[0][0]).toBeTruthy();
});

describe("Editing", () => {
  beforeEach(() => {
    wrapped = mount(
      <Editable
        id={"0"}
        editing={true}
        content="test"
        onEdit={onEdit}
        onInputClick={onInputClick}
      />
    );
  });

  it("should save on losing focus", () => {
    wrapped.simulate("blur");
    wrapped.update();
    expect(onEdit.mock.calls.length).toEqual(1);
  });

  it("should save on pressing enter", () => {
    wrapped.simulate("keydown", { key: "Enter" });
    wrapped.update();
    expect(onEdit.mock.calls.length).toEqual(1);
  });
});
